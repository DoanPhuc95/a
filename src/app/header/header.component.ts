import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  // ,template: "<h3 *ngIf='loggedin'>abc</h3>"
})
export class HeaderComponent implements OnInit {

  public loggedin;
  constructor( ) {
    this.loggedin =  2;
  }

  ngOnInit() {
  }
}
