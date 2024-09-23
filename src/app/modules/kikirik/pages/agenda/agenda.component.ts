import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions, EventSourceInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { cl } from '@fullcalendar/core/internal-common';
import { Gesture, GestureController, ModalController } from '@ionic/angular';
import { MatDialog } from '@angular/material/dialog';
import { SeleccionHoraDialogComponent } from '../../components/seleccion-hora-dialog/seleccion-hora-dialog.component';
import { EventImpl } from '@fullcalendar/core/internal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CrearAlarmaComponent } from '../crear-alarma/crear-alarma.component';
import { AlarmasService } from '../../services/alarmas.service';
import { PausaAlarma } from '../../models/pausa-alarma.model';
import { Alarma } from '../../models/alarma.model';
import { OptionsConfirm } from 'src/app/shared/models/dialog-confirm-options.model';
import { DialogConfirmServiceService } from 'src/app/shared/services/dialog-confirm-service.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements AfterViewInit, OnInit {
  currentDate: Date = new Date();
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @ViewChild('calendarContainer', { static: false }) calendarContainer!: ElementRef;
  selectedDateStr: string | null = null;
  selectedDate: Date | null = this.currentDate;
  eventsSelectedDate: EventImpl[] = [];
  alarmas: Alarma[] = [];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: false,
    initialDate: this.currentDate,
    height: '270px',
    locales: [esLocale],
    locale: esLocale,
    events: [
    ],
    eventContent: function (arg) {
      const container = document.createElement('div');
      let contentHtml = '';
      contentHtml = `<mat-icon class="material-symbols-rounded" style="margin-rigth:0px; font-size: 14px;top: -6px;position: relative; color: ${arg.event.extendedProps['alarma']['marcador']['color']};">${arg.event.extendedProps['alarma']['marcador']['icono']}</mat-icon>`;
      container.innerHTML = contentHtml;
      return { domNodes: [container] };
    },
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    selectOverlap: false,
    fixedWeekCount: false, // Añade esta línea para evitar semanas adicionales
    plugins: [dayGridPlugin, interactionPlugin],
    dayMaxEventRows: 3,
  };
  constructor(
    private cdr: ChangeDetectorRef,
    private gestureCtrl: GestureController,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private modalCtrl: ModalController,
    private alarmasService: AlarmasService,
    private dialogConfirmServiceService: DialogConfirmServiceService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.alarmas = this.alarmasService.getAlarmas;
      this.calendarOptions.events = this.generarEventosDeAlarmasParaMes(this.currentDate, this.alarmas);
      setTimeout(() => {
        this.findCalendarEventsByDate(this.currentDate);
      }, 0);
    }, 0);
  }

  ngAfterViewInit() {
    const gesture: Gesture = this.gestureCtrl.create({
      el: this.calendarContainer.nativeElement,
      gestureName: 'swipe',
      onMove: (ev) => this.handleSwipe(ev),
      direction: 'x',
    });
    gesture.enable();
  }

  handleDateClick(clickInfo: any) {
    console.log("clicinfo", clickInfo);
    const clickedDate = clickInfo.dateStr;
    const date = clickInfo.date;
    // Eliminar la clase "fc-day-selected" de cualquier día previamente seleccionado
    if (this.selectedDateStr) {
      const prevSelectedDay = document.querySelector(`.fc-daygrid-day[data-date='${this.selectedDateStr}']`);
      if (prevSelectedDay) {
        prevSelectedDay.classList.remove('fc-day-selected');
      }
    }

    // Aplicar la clase "fc-day-selected" al día actual clickeado
    const currentSelectedDay = document.querySelector(`.fc-daygrid-day[data-date='${clickedDate}']`);
    if (currentSelectedDay) {
      currentSelectedDay.classList.add('fc-day-selected');
    }

    // Almacenar el día seleccionado
    this.selectedDateStr = clickedDate;
    this.selectedDate = date;
    this.findCalendarEventsByDate(this.selectedDate!);
  }

  allowOneDaySelection(selectInfo: any) {
    const { start, end } = selectInfo;
    return start.toISOString() === end.toISOString();  // Permite solo un día
  }

  handleEventClick(clickInfo: any) {
    clickInfo.jsEvent.preventDefault();
    clickInfo.jsEvent.cancelBubble = true;
    console.log("clickInfoEvent", clickInfo);
    // Obtener la fecha del evento y llamar a `handleDateClick`
    const eventDate = clickInfo.event.startStr;
    const start = clickInfo.event.start;  // Obtener la fecha del evento
    this.handleDateClick({ dateStr: eventDate, date: start });  // Reutilizar la lógica de `dateClick`
  }

  openModal() {
    const dialogRef = this.dialog.open(SeleccionHoraDialogComponent, {
      data: { selectedDate: this.selectedDate },
      width: '300px',
      height: 'auto'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('The dialog was closed', result);
        this.selectedDate = new Date(result);
        this.currentDate = new Date(result);
        this.updateCalendar();
      }
    });
  }

  handleSwipe(ev: any) {
    if (ev.startX < ev.currentX) {
      this.prevMonth();
    } else if (ev.startX > ev.currentX) {
      this.nextMonth();
    }
  }

  todaySelected() {
    this.currentDate = new Date();
    this.updateCalendar();
  }

  prevMonth() {
    const newDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() - 1));
    this.currentDate = newDate;
    this.updateCalendar();
  }

  nextMonth() {
    const newDate = new Date(this.currentDate.setMonth(this.currentDate.getMonth() + 1));
    this.currentDate = newDate;
    this.updateCalendar();
  }

  updateCalendar() {

    if (this.calendarComponent) {
      const calendarApi = this.calendarComponent.getApi();
      calendarApi.gotoDate(this.currentDate);
      this.calendarOptions.events = this.generarEventosDeAlarmasParaMes(this.currentDate, this.alarmas);
      this.cdr.detectChanges()
      setTimeout(() => {
        this.findCalendarEventsByDate(this.currentDate);
      }, 0);
    }
  }

  findCalendarEventsByDate(date: Date) {
    const calendarApi = this.calendarComponent.getApi();
    const events = calendarApi.getEvents();

    // Filtrar eventos por la fecha especificada
    const filteredEvents = events.filter(event => {
      const eventStart = event.start ? new Date(event.start) : null;
      return eventStart && eventStart.toDateString() === date.toDateString();
    });
    this.eventsSelectedDate = filteredEvents;
    console.log('Eventos del calendario para la fecha', date.toDateString(), ':', filteredEvents);
  }

  async mostrarCrear() {
    const modal = await this.modalCtrl.create({
      component: CrearAlarmaComponent,
    });
    modal.present();
    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      this.alarmas = this.alarmasService.getAlarmas;
      this.calendarOptions.events = this.generarEventosDeAlarmasParaMes(this.currentDate, this.alarmas);
      setTimeout(() => {
        this.findCalendarEventsByDate(this.currentDate);
      }, 0);
      this.snackBar.open('Se ha creado la alarma correctamente', '', { panelClass: 'snack-bar-propio', duration: 2000 });
    }
  }

  // Función para verificar si una fecha está en pausa
  estaEnPausa(fecha: Date, pausas: PausaAlarma[]) {
    return pausas.some(pausa => {
      const fechaInicial = new Date(pausa.fechaInicial);
      const fechaFinal = pausa.fechaFinal ? new Date(pausa.fechaFinal) : null;

      if (fechaFinal) {
        return fecha >= fechaInicial && fecha <= fechaFinal;
      } else {
        return fecha >= fechaInicial;
      }
    });
  }

  generarEventosDeAlarmasParaMes(currentDate: Date, alarmas: Alarma[]) {
    const eventos: EventSourceInput = [];
    const fechaActual = new Date(currentDate);

    // Calcular el rango: el mes de currentDate + primera semana del siguiente mes
    const inicioMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), -0);
    const finMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth() + 1, 0); // Primeros 7 días del siguiente mes

    // Iterar sobre las alarmas
    alarmas.forEach(alarma => {
      if (!alarma.activa) return; // Saltar alarmas inactivas

      const diasActivos = alarma.dias;
      const horaAlarma = alarma.hora;
      const fechaCreacion = new Date(alarma.fechaCreacion);

      // Mapeo de días a índices (lunes = 1, ..., domingo = 7)
      const diasSemana = {
        lunes: 1,
        martes: 2,
        miercoles: 3,
        jueves: 4,
        viernes: 5,
        sabado: 6,
        domingo: 0
      };

      // Iterar sobre los días de la semana y verificar si están activos
      for (const [dia, activo] of Object.entries(diasActivos)) {
        if (activo) {
          // Empezar a buscar desde el primer día del mes actual
          const fechaInicio = new Date(inicioMes);

          // Ajustar la fecha para que coincida con el primer día activo
          while (fechaInicio.getDay() !== diasSemana[dia as keyof typeof diasSemana]) {
            fechaInicio.setDate(fechaInicio.getDate() + 1);
          }

          // Generar eventos hasta la primera semana del mes siguiente
          for (let fechaEvento = new Date(fechaInicio); fechaEvento <= finMes; fechaEvento.setDate(fechaEvento.getDate() + 7)) {

            // Verificar si la fecha del evento está dentro del rango de creación de la alarma
            if (fechaEvento >= fechaCreacion && !this.estaEnPausa(fechaEvento, alarma.pausas)) {

              // Crear el evento para FullCalendar
              eventos.push({
                title: alarma.nombre,
                date: fechaEvento.toISOString().split('T')[0], // Fecha en formato "YYYY-MM-DD"
                display: 'list-item',
                extendedProps: {
                  alarma: alarma // Incluir la alarma completa en extendedProps
                },
                editable: false,
                interactive: false
              });
            }
          }
        }
      }
    });
    return eventos;
  }

  async eliminarAlarma(alarma: Alarma) {
    let options: OptionsConfirm = {
      tituloBtnConfirmar: 'SI',
      tituloBtnCancelar: 'NO',
      width: '280px',
    }
    let confirmacion = await this.dialogConfirmServiceService.succesConfirmMessaje('¿Esta seguro de eliminar la alarma?', options);
    console.log(confirmacion);
    if (confirmacion) {
      this.alarmasService.eliminarAlarma(alarma);
      this.alarmas = this.alarmasService.getAlarmas;
      this.calendarOptions.events = this.generarEventosDeAlarmasParaMes(this.currentDate, this.alarmas);
      setTimeout(() => {
        this.findCalendarEventsByDate(this.currentDate);
      }, 0);
      this.snackBar.open('Se ha eliminado la alarma', '', { panelClass: 'snack-bar-propio', duration: 2000 });
    }
  }
}
