import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import esLocale from '@fullcalendar/core/locales/es';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss'],
})
export class AgendaComponent implements OnInit {
  currentDate: Date = new Date();
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;
  @ViewChild('calendarContainer', { static: false }) calendarContainer!: ElementRef;
  arrayTareas = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    headerToolbar: false,
    initialDate: this.currentDate,
    height: '250px',
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
        }
      },
      {
        title: '',
        date: '2024-09-25',
        color: 'purple',
        display: 'list-item',
        extendedProps: {
          color: 'blue',
          iconName: 'engineering'
        }
      },
      {
        title: '',
        date: '2024-09-25',
        display: 'list-item',
        extendedProps: {
          iconName: 'sports_gymnastics',
          color: 'green'
        }
      },
      {
        title: '',
        date: '2024-09-13',
        display: 'list-item',
        extendedProps: {
          iconName: 'sports_esports',
          color: 'green'
        }
      },
      {
        title: '',
        date: '2024-09-13',
        display: 'list-item',
        className: 'circulo',
        extendedProps: {
          iconName: 'change_history',
          color: 'black'
        }
      },
      {
        title: '',
        date: '2024-09-13',
        display: 'list-item',
        extendedProps: {
          iconName: 'home',
          color: 'purple'
        }
      },
      {
        title: '',
        date: '2024-09-16',
        display: 'list-item',
        extendedProps: {
          iconName: 'home',
          color: 'purple'
        }
      },
      {
        title: '',
        date: '2024-09-16',
        display: 'list-item',
        extendedProps: {
          iconName: 'home',
          color: 'purple'
        }
      },
      {
        title: '',
        date: '2024-09-16',
        display: 'list-item',
        extendedProps: {
          iconName: 'favorite',
          color: 'pink'
        }
      },
      {
        title: '',
        date: '2024-09-17',
        display: 'list-item',
        extendedProps: {
          iconName: 'favorite',
          color: 'green'
        }
      },
      {
        title: '',
        date: '2024-09-15',
        display: 'list-item',
        extendedProps: {
          iconName: 'favorite',
          color: 'green'
        }
      },
    ],
    eventContent: function (arg) {
      const container = document.createElement('div');
      let contentHtml = '';
      contentHtml = `<mat-icon class="material-symbols-rounded" style="margin-rigth:4px; font-size: 14px;top: -5px;position: relative; color: ${arg.event.extendedProps['color']};">${arg.event.extendedProps['iconName']}</mat-icon>`;
      container.innerHTML = contentHtml;
      return { domNodes: [container] };
    },
    fixedWeekCount: false, // Añade esta línea para evitar semanas adicionales
    plugins: [dayGridPlugin]
  };
  constructor() { }

  ngOnInit() {
    console.log("inicio");
  }
  async openModal() {
    console.log("openModal");
  }

  prevMonth() {

  }
  nextMonth() { }

  adjustHeight() {
    const container = document.getElementById('container-tareas');
    if (container) {
      const headerHeight = 500; // Ajusta este valor según sea necesario
      container.style.height = `calc(100vh - ${headerHeight}px)`;
    }
  }
}
