import { Component, OnInit } from '@angular/core';
import { TestService } from '../test.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  callCenter?: string;
  callCenter2?: string;
  array = [
    "enes",
    "emre",
    "gemici"

  ];

  constructor(private testService: TestService) { }

  ngOnInit(): void {



    
    //let ennes = 'ennes';
    this.callCenter = '444 00 00';

    this.callCenter2 = this.testService.callCenter2;

  }

}
