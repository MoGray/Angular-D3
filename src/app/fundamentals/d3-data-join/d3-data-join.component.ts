import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-data-join',
  templateUrl: './d3-data-join.component.html',
  styleUrls: ['./d3-data-join.component.scss']
})
export class D3DataJoinComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.dataJoin();
  }

  private dataJoin(){
    const data = [10, 20, 30, 40, 50]

    const el = d3.select('#data-join-ul')
      .selectAll('.data-join')
      .data(data)
      .join('li')
      .attr('class', 'data-join')
      //.text('Hello');
      .text((d) => {
        return d;
      })
    //You will notice that for this log, in the _groups property
    //each object in the array will contain normal element properties
    //but will also contain __data__ this is added by D3.

    //Also notice that there are now _enter and _exit fields which are different
    //than the d3-select-component fields that are logged.
    console.log("Data join")
    console.log(el);

    //The _enter and _exit fields are used for two reasons:

    //_enter is used if you have 4 data points but 5 elements, you would have
    //more elements to select than data points to map.

    //_exit is used when you have more data points than elements.
  }

}
