import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { WeatherData } from './weather-data';

@Component({
  selector: 'app-d3-weather-histogram',
  templateUrl: './d3-weather-histogram.component.html',
  styleUrls: ['./d3-weather-histogram.component.scss']
})
export class D3WeatherHistogramComponent implements OnInit {

  dataSet: any;
  binDataSet: any;
  dimensions: any;
  svg: any;
  ctr: any;
  bin: any;
  selection: any = 'humidity';
  labelsGroup: any;
  meanLine: any;

  exitTransition: any;
  updateTransition: any;

  mean: any;

  xScale: any;
  yScale: any;

  xAxis: any;
  xAxisGroup: any;

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

  async draw() {
    await this.setData();
    
    this.buildSvgContainers();
    this.buildXScale();
    this.buildBin();
    this.buildBinDataSet();
    this.buildYScale();
    this.drawGraph();
    this.drawXAxis();
    this.buildMeanLine();
    this.d3ChangeDetection();
  }

  private d3ChangeDetection(){
    d3.select('#weather-histogram-metric')
      .on('change', (e: any) => {
        e.preventDefault();
        this.histogram(e.target.value)
      })
  }

  private buildMean(){
    const histData  = <WeatherData[]>this.dataSet;
    this.mean = d3.mean(histData, (d: any) => d.currently[this.selection]);
  }

  private buildMeanLine(){
    if(!this.meanLine){
      this.meanLine = this.ctr.append('line')
        .style("stroke", "#d62828")
        .style("stroke-dasharray", "6")
        .style("stroke-width", "2px")
    }
    this.buildMean()

    this.meanLine.transition(this.updateTransition)
      .attr('x1', this.xScale(this.mean))
      .attr('y1', 0)
      .attr('x2', this.xScale(this.mean))
      .attr('y2', this.dimensions.ctrHeight)
  }

  private histogram(selectionChange: string){
    this.selection = selectionChange;
    this.buildXScale();
    this.buildBin();
    this.buildBinDataSet();
    this.buildYScale();
    this.drawGraph();
    this.drawXAxis();
    this.buildMeanLine();
  }

  private drawGraph(){
    //We want to give each bar some padding
    const padding = 1;
    
    //So one of the cool things about D3, is you can change 
    //transition functions in the order you would like them
    this.exitTransition = d3.transition().duration(500);
    this.updateTransition = this.exitTransition.transition().duration(1000);
    
    this.ctr.selectAll('rect')
      .data(this.binDataSet)
      .join(
        (enter: any) => enter.append('rect')
          .attr('width', (d: any) => d3.max([0, this.xScale(d.x1) - this.xScale(d.x0) - padding]))
          .attr('height', 0)
          .attr('x', (d: any) => this.xScale(d.x0))
          .attr('y', this.dimensions.ctrHeight)
          .attr('fill', '#b8de6f'),
        (update: any) => update,
        //attr first, it doesn't make sense to change the
        //color after they are removed.
        (exit: any) => exit.attr('fill', '#f39233')
          .transition(this.exitTransition)
          .attr('y', this.dimensions.ctrHeight)
          .attr('height', 0)
          .remove()
      )
      .transition(this.updateTransition)
      .attr('width', (d: any) => d3.max([0, this.xScale(d.x1) - this.xScale(d.x0) - padding]))
      .attr('height', (d: any) => this.dimensions.ctrHeight - this.yScale(d.length))
      .attr('x', (d: any) => this.xScale(d.x0))
      .attr('y', (d: any) => this.yScale(d.length))
      .attr('fill', '#01c5c4')


    //Uncomment this line to see how this looks when not animating
    //correctly
    /*
    this.ctr.selectAll('rect')
      .data(this.binDataSet)
      .join('rect')
      .transition()
      .attr('width', (d: any) => d3.max([0, this.xScale(d.x1) - this.xScale(d.x0) - padding]))
      .attr('height', (d: any) => this.dimensions.ctrHeight - this.yScale(d.length))
      .attr('x', (d: any) => this.xScale(d.x0))
      .attr('y', (d: any) => this.yScale(d.length))
      .attr('fill', '#01c5c4')
    */
      if(!this.labelsGroup){
        this.buildLabelsGroup();
      }

      this.labelsGroup.selectAll('text')
        .data(this.binDataSet)
        .join(
          (enter: any) => enter.append('text')
            .attr('x', (d: any) => this.xScale(d.x0) + (this.xScale(d.x1) - this.xScale(d.x0)) /2)
            .attr('y',this.dimensions.ctrHeight)
            .text((d: any) => d.length),
          (update: any) => update,
          (exit: any) => exit.transition(this.exitTransition)
            .attr('y', this.dimensions.ctrHeight)
            .remove()
        )
        .transition(this.updateTransition)
        .attr('x', (d: any) => this.xScale(d.x0) + (this.xScale(d.x1) - this.xScale(d.x0)) /2)
        .attr('y', (d: any) => this.yScale(d.length) - 10)
        .text((d: any) => d.length)
      //Remove labelsGroup
      //Uncomment this to see what happens on a change.
      /*
      this.ctr.append('g')
        .classed('bar-labels', true)
        .selectAll('text')
        .data(this.binDataSet)
        .join('text')
        .attr('x', (d: any) => this.xScale(d.x0) + (this.xScale(d.x1) - this.xScale(d.x0)) /2)
        .attr('y', (d: any) => this.yScale(d.length) - 10)
        .text((d: any) => d.length)
      */
  }
  
  private buildLabelsGroup(){
    this.labelsGroup = this.ctr.append('g')
        .style('text-anchor', 'middle')
  }

  private buildBinDataSet(){
    this.binDataSet = this.bin(this.dataSet);

    console.log('Original vs Bin Weather DataSet');
    console.log({original: this.dataSet, bin: this.binDataSet})
  }

  private buildBin(){
    this.bin = d3.bin()
      .domain(this.xScale.domain())
      .value((d: any) => d.currently[this.selection])
      .thresholds(10)
  }
  
  private buildXScale(){
    const histData  = <WeatherData[]>this.dataSet;
    const xExtent = <[number, number]>d3.extent(histData, (obj: any) => obj.currently[this.selection]);
    
    this.xScale = d3.scaleLinear()
      .domain(xExtent)
      .range([0, this.dimensions.ctrWidth])
      .nice()
  }

  private buildYScale(){
    const histData  = <any[]>this.binDataSet;
    const max = <number>d3.max(histData, d => d.length);
    this.yScale = d3.scaleLinear()
      .domain([0, max])
      .range([this.dimensions.ctrHeight, 0])
      .nice()
  }

  private drawXAxis(){
    this.xAxis = d3.axisBottom(this.xScale);

    if(!this.xAxisGroup){
      this.xAxisGroup = this.ctr.append('g')
        .style('transform', `translateY(${this.dimensions.ctrHeight}px)`)
    }

      this.xAxisGroup.transition().call(this.xAxis);
  }

  private buildSvgContainers(){
    this.svg = d3.select('#weather-histogram')
      .append("svg")
      .attr("width", this.dimensions.width)
      .attr("height", this.dimensions.height)

    this.ctr = this.svg.append("g")
      .attr(
        "transform",
        `translate(${this.dimensions.margins}, ${this.dimensions.margins})`
      )
  }

  private async setData(){
    await this.getData();

    this.dimensions = {
      width: 800,
      height: 400,
      margins: 50
    };
  
    this.dimensions.ctrWidth = this.dimensions.width - this.dimensions.margins * 2
    this.dimensions.ctrHeight = this.dimensions.height - this.dimensions.margins * 2 
  }

  async getData(){
    this.dataSet = await d3.json('assets/graph-data/weather-data.json');
  }

}
