import { Component, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { library, playCircle, radio, search } from 'ionicons/icons';

@Component({
  selector: 'app-kikirik',
  templateUrl: './kikirik.component.html',
  styleUrls: ['./kikirik.component.scss'],
})
export class KikirikComponent implements OnInit {

  constructor() {
    addIcons({ library, playCircle, radio, search });
  }


  ngOnInit() { }


}
