import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import { cl } from '@fullcalendar/core/internal-common';
import { Gesture, GestureController } from '@ionic/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements AfterViewInit, OnInit {
  currentDate: Date = new Date();
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @ViewChild('calendarContainer', { static: false }) calendarContainer!: ElementRef;
  arrayTareas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  selectedDate: string | null = null;
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: false,
    initialDate: this.currentDate,
    height: '270px',
    locales: [esLocale],
    locale: esLocale,
    events: [
      {
        title: '',
        date: '2024-09-25',
        color: 'red',
        display: 'list-item',
        extendedProps: {
          color: 'black',
          iconName: 'sports_soccer'
        },
        editable: false,
        interactive: false
      },
      {
        title: '',
        date: '2024-09-25',
        color: 'purple',
        display: 'list-item',
        extendedProps: {
          color: 'blue',
          iconName: 'engineering'
        },
        editable: false,
        interactive: false
      },
      {
        title: '',
        date: '2024-09-25',
        display: 'list-item',
        extendedProps: {
          iconName: 'sports_gymnastics',
          color: 'green'
        },
        editable: false,
        interactive: false
      },
      {
        title: '',
        date: '2024-09-13',
        display: 'list-item',
        extendedProps: {
          iconName: 'sports_esports',
          color: 'green'
        },
        editable: false,
        interactive: false
      },
      {
        title: '',
        date: '2024-09-13',
        display: 'list-item',
        className: 'circulo',
        extendedProps: {
          iconName: 'change_history',
          color: 'black'
        },
        editable: false,
        interactive: false
      },
      {
        title: '',
        date: '2024-09-13',
        display: 'list-item',
        extendedProps: {
          iconName: 'home',
          color: 'purple'
        },
        editable: false,
        interactive: false
      },
      {
        title: '',
        date: '2024-09-16',
        display: 'list-item',
        extendedProps: {
          iconName: 'home',
          color: 'purple'
        },
        editable: false,
        interactive: false
      },
      {
        title: '',
        date: '2024-09-16',
        display: 'list-item',
        extendedProps: {
          iconName: 'home',
          color: 'purple'
        },
        editable: false,
        interactive: false
      },
      {
        title: '',
        date: '2024-09-16',
        display: 'list-item',
        extendedProps: {
          iconName: 'favorite',
          color: 'pink'
        },
        editable: false,
        interactive: false
      },
      {
        title: '',
        date: '2024-09-17',
        display: 'list-item',
        extendedProps: {
          iconName: 'favorite',
          color: 'green'
        },
        editable: false,
        interactive: false
      },
      {
        title: '',
        date: '2024-09-15',
        display: 'list-item',
        extendedProps: {
          iconName: 'favorite',
          color: 'green'
        },
        editable: false,
        interactive: false
      },
    ],
    eventContent: function (arg) {
      const container = document.createElement('div');
      let contentHtml = '';
      contentHtml = `<mat-icon class="material-symbols-rounded" style="margin-rigth:0px; font-size: 14px;top: -6px;position: relative; color: ${arg.event.extendedProps['color']};">${arg.event.extendedProps['iconName']}</mat-icon>`;
      container.innerHTML = contentHtml;
      return { domNodes: [container] };
    },
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    selectOverlap: false,
    fixedWeekCount: false, // Añade esta línea para evitar semanas adicionales
    plugins: [dayGridPlugin, interactionPlugin]
  };
  constructor(
    private cdr: ChangeDetectorRef,
    private gestureCtrl: GestureController,
  ) { }

  ngOnInit() {
    console.log("inicio");
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
    const clickedDate = clickInfo.dateStr;

    // Eliminar la clase "fc-day-selected" de cualquier día previamente seleccionado
    if (this.selectedDate) {
      const prevSelectedDay = document.querySelector(`.fc-daygrid-day[data-date='${this.selectedDate}']`);
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
    this.selectedDate = clickedDate;
  }

  allowOneDaySelection(selectInfo: any) {
    const { start, end } = selectInfo;
    return start.toISOString() === end.toISOString();  // Permite solo un día
  }

  handleEventClick(clickInfo: any) {
    clickInfo.jsEvent.preventDefault();
    clickInfo.jsEvent.cancelBubble = true;
    // Obtener la fecha del evento y llamar a `handleDateClick`
    const eventDate = clickInfo.event.startStr;  // Obtener la fecha del evento
    this.handleDateClick({ dateStr: eventDate });  // Reutilizar la lógica de `dateClick`
  }

  async openModal() {
    console.log("openModal");
  }

  handleSwipe(ev: any) {
    if (ev.startX < ev.currentX) {
      this.prevMonth();
    } else if (ev.startX > ev.currentX) {
      this.nextMonth();
    }
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
      this.cdr.detectChanges()
    }
  }

}
