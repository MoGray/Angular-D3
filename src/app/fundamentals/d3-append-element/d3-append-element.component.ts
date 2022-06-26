import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-append-element',
  templateUrl: './d3-append-element.component.html',
  styleUrls: ['./d3-append-element.component.scss']
})
export class D3AppendElementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //This will add a <p> tag within our #append-element html element.
    const appendElement = d3.select('#append-element')
      .append('p')
      .style('color', 'red')
      //There is a problem with the attr method though
      //This will replace all classes, not add to the
      //additional classes
      
      //.attr('class', 'new-class')
      //.attr('class', 'bar')

      //However there is a method that will add to a class
      .classed('foobar', true)
      .classed('foodbard', true)
      .text('Hello World');
  }

}
