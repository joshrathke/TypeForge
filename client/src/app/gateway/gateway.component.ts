import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gateway',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./gateway.component.css']
})
export class GatewayComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('GATEWAY INITIALIZING');
  }

}
