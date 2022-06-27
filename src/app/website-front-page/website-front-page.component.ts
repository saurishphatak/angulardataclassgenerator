import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-website-front-page',
  templateUrl: './website-front-page.component.html',
  styleUrls: ['./website-front-page.component.css']
})
export class WebsiteFrontPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  generatorText = "{GENERATOR}";
}
