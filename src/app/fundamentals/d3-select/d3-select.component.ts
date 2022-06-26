import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-select',
  templateUrl: './d3-select.component.html',
  styleUrls: ['./d3-select.component.scss']
})
export class D3SelectComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const pBrowser = document.querySelector('#foo')
    //This will always grab the first element it finds
    //So if we had something like:
    //const pD3 = d3.select('p')
    //To find paragraph tags, it may select the wrong paragraph tag.
    //To get all elements you can use:
    //const pD3 = d3.selectAll('p')
    const pD3 = d3.select('#foo')

    /*
      This is to show the differences in selectors.
      D3 has methods that make it easier to work with selections.
    */
    console.log("Browser Selector");
    console.log(pBrowser);
    console.log("D3 Selector");
    console.log(pD3);
  }

}
