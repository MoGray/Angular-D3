import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-log-scale',
  templateUrl: './d3-log-scale.component.html',
  styleUrls: ['./d3-log-scale.component.scss']
})
export class D3LogScaleComponent implements OnInit {
  dataSet: any;
  dimensions: any;
  svg: any;
  circlesGroup: any;

  scale: any;
  axis: any;

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

  async draw() {
    await this.setData();
    
    this.svg = d3.select('#logscale')
      .append("svg")
      .attr("width", this.dimensions.width)
      .attr("height", this.dimensions.height)

    this.setScale();
    this.buildCircles();
    this.setAxis();
  }

  private setAxis(){
    this.axis = d3.axisLeft(this.scale);
    this.svg.append('g')
      .attr('transform', `translate(${this.dimensions.margin}, 0)`)
      .call(this.axis);
  }

  private buildCircles(){
    this.circlesGroup = this.svg.append('g')
      .style('font-size', '16px')
      .style('dominant-baseline', 'middle')

    this.circlesGroup.selectAll('circle')
      .data(this.dataSet)
      .join('circle')
      .attr('cx', this.dimensions.margin)
      .attr('cy', (d: any) => this.scale(d.size))
      .attr('r', 6);

    this.circlesGroup.selectAll('text')
      .data(this.dataSet)
      .join('text')
      .attr('x', this.dimensions.margin + 15)
      .attr('y', (d: any) => this.scale(d.size))
      .text((d: any) => d.name)
  }

  private setScale(){
    const extent = <[number, number]>d3.extent(this.dataSet, (d: any) => <number>d.size);
    this.scale = d3.scaleLog()
      .domain(extent)
      .range([
        this.dimensions.height - this.dimensions.margin,
        this.dimensions.margin])
  }

  private async setData(){
    await this.getData();

    this.dimensions = {
      width: 200,
      height: 500,
      margin: 50
    }; 
  }

  async getData(){
    this.dataSet = await d3.json('assets/graph-data/galaxy-data.json');
    //This will sort the dataset in descending order.
    this.dataSet.sort((a: any, b: any) => a - b)
  }


}
