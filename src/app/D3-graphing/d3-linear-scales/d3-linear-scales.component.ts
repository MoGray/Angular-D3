import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-linear-scales',
  templateUrl: './d3-linear-scales.component.html',
  styleUrls: ['./d3-linear-scales.component.scss']
})
export class D3ScalesComponent implements OnInit {

  dataSet: any;
  dimensions: any;
  svgHeatmap: any;
  //The reason this is 30, is because it evenly divides into 
  //our dimensions.width 20 times.
  box: number = 30;

  colorLinearScale: any;

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

  async draw() {
    await this.setData();
    
    this.svgHeatmap = d3.select('#heatmap1')
      .append("svg")
      .attr("width", this.dimensions.width)
      .attr("height", this.dimensions.height)

    this.setLinearScales();
    this.drawRectangle();
  }

  private drawRectangle(){
    this.svgHeatmap.append('g')
      .attr('transform', 'translate(2,2)')
      .attr('stroke', 'black')
      .selectAll('rect')
      .data(this.dataSet)
      .join('rect')
      //We subtract 3 here to make sure each box is slightly less large
      //So all of our boxes will fit.
      .attr('width', this.box - 3)
      .attr('height', this.box - 3)
      //We want 20 rectangles to fit our data.
      .attr('x', (d: any, i: number) => this.box * (i % 20))
      .attr('y', (d: any, i: number) => this.box * ((i/20) | 0))
      .attr('fill', this.colorLinearScale)
  }

  private setLinearScales(){
    const  heatmapData  = <number[]>this.dataSet;
    const extent = <[number, number]>d3.extent(heatmapData);
    this.colorLinearScale = d3.scaleLinear<string>()
      .domain(extent)
      .range(['white', 'red'])
  }

  private async setData(){
    await this.getData();

    this.dimensions = {
      width: 600,
      height: 150,
    }  
  }

  async getData(){
    this.dataSet = await d3.json('assets/graph-data/heatmap-data.json');
    //This will sort the dataset in descending order.
    this.dataSet.sort((a: any, b: any) => a - b)
  }
}
