import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { style } from 'd3';
import { WeatherModel } from './weather-model';

@Component({
  selector: 'app-d3-scatterplot',
  templateUrl: './d3-scatterplot.component.html',
  styleUrls: ['./d3-scatterplot.component.scss']
})
export class D3ScatterplotComponent implements OnInit {

  dataSet: any;
  dimensions: any;
  svg: any;
  tooltip: any;
  //container
  ctr: any;
  xScale: any;
  yScale: any;
  xAxis: any;
  yAxis: any;

  xAxisGroup: any;
  yAxisGroup: any;

  formatter: any = d3.format('.2f');
  dateFormatter: any = d3.timeFormat('%B %-d, %Y');

  //voronoi diagram
  delaunay: any;
  voronoi: any;

  constructor() { }

  ngOnInit(): void {
    this.draw();
  }

  async draw() {
    await this.setData();

    this.buildSvg();
    this.buildContainer();
    this.buildScales();
    this.drawCircles();
    this.buildAxes();
    this.buildDelaunay();
  }

  private buildAxes(){
    this.setXAxis();
    this.setYAxis();
  }

  private setXAxis(){
    this.xAxis = d3.axisBottom(this.xScale)
    //Ticks will override how many ticks D3 will default to.
      .ticks(5)
    //Tick values allows us to specify exactly what values we want.
    // .tickValues([0.4, 0.5, 0.8])
    .tickFormat((d: any) => d * 100 + '%')

    this.xAxisGroup = this.ctr.append('g')
      .call(this.xAxis)
      .style("transform", `translateY(${this.dimensions.ctrHeight}px)`)
      .classed('axis', true);

    this.xAxisGroup.append('text')
      .attr('x', this.dimensions.ctrWidth/2)
      .attr('y', this.dimensions.margin.bottom - 10)
      .attr('fill', 'black')
      .text('Humidity')
  }

  private setYAxis(){
    this.yAxis = d3.axisLeft(this.yScale);

    this.yAxisGroup = this.ctr.append('g')
      .call(this.yAxis)
      .classed('axis', true);

    this.yAxisGroup.append('text')
      //We have to add negative here.  When we do a rotation
      //This messes with positioning
      .attr('x', -this.dimensions.ctrHeight/2)
      .attr('y', -this.dimensions.margin.left + 15)
      .attr('fill', 'black')
      //We need to use .html here
      //as we want to use an html degree entity
      //if we do text it will write it exactly as &deg;
      //.text('Temperature &deg; F')
      .html('Temperature &deg; F')
      .style('transform', 'rotate(270deg)')
      .style('text-anchor', 'middle')
  }

  private buildScales(){
    this.buildXScale();
    this.buildYScale();
  }

  private buildXScale(){
    const  scatterData  = <WeatherModel[]>this.dataSet;
    const xExtent = <[number, number]>d3.extent(scatterData, obj => obj.currently.humidity);
    //Here we are building our function to do our data conversion.
    this.xScale = d3.scaleLinear()
      .domain(xExtent)
      //Can also do .range()
      //rangeRound is only applied to the output range
      //Where as nice is applied to the domain.
      //This also makes it a bit easier to debug values
      //You should try rounding whenever possible
      .rangeRound([0, this.dimensions.ctrWidth])
      //We are not adding the nice value to this function
      //Humidity is a value from 0 to 1.  So removing decimals
      //here may cause the data to be incorrect.

      //Clamp function is basically if we get new data outside of our range
      //this will prevent that data from being drawn outside of our range
      //So D3 knows not to draw outside the graph itself.
      .clamp(true)
  }

  private buildYScale(){
    const  scatterData  = <WeatherModel[]>this.dataSet;
    const yExtent = <[number, number]>d3.extent(scatterData, obj => obj.currently.apparentTemperature);
    //Here we are building our function to do our data conversion.
    this.yScale = d3.scaleLinear()
      .domain(yExtent)
      //Can also do .range()
      //rangeRound is only applied to the output range
      //Where as nice is applied to the domain.
      //This also makes it a bit easier to debug values
      //You should try rounding whenever possible

      //One other thing, see the y axis when we flip these
      //.rangeRound([0, this.dimensions.ctrHeight])
      //This is because D3 maps from top to bottom
      .rangeRound([this.dimensions.ctrHeight, 0])
      //This function will round a decimal to the nearest whole number
      //Since this is temperature we want to see 76 degrees on our plot
      //And not 76.3231
      .nice()
      //Clamp function is basically if we get new data outside of our range
      //this will prevent that data from being drawn outside of our range
      //So D3 knows not to draw outside the graph itself.
      .clamp(true);
  }

  private buildSvg(){
    this.svg = d3.select('#chart')
      .append('svg')
      .attr('width', this.dimensions.width)
      .attr('height', this.dimensions.height)

    this.tooltip = d3.select('#scatterplot-tooltip');
  }

  private buildContainer(){
    //G element will act as a container;
    //The reason we can't just use width/height attributes here
    //Is that D3 won't know where X and Y coordinates are in our graph
    this.ctr = this.svg.append('g')
      .attr(
        'transform', 
        `translate(${this.dimensions.margin.left}, ${this.dimensions.margin.top})`
        )
  }

  private drawCircles(){
    //This will have an empty selection
    //This is normal in D3 and you will see this in many examples.
    //This is so we can do an "enter" selection, to draw data for every
    //piece of data we want to pass to it.
    this.ctr.selectAll('circle')
      .data(this.dataSet)
      .join('circle')
      //CX is X axis for circles, see fundamentals for more information
      //Cause should always be drawn on the X axis
      //Effect should be drawn on the Y Axis
      .attr('cx', (d: any) => this.xScale(d.currently.humidity))
      .attr('cy', (d: any) => this.yScale(d.currently.apparentTemperature))
      .attr('r', 5)
      .attr('fill', 'red')
      //Use this for debugging.
      .attr('data-temp', (d: any)  => d.currently.apparentTemperature)
  }

  private buildDelaunay(){
    this.delaunay = d3.Delaunay.from(
        this.dataSet,
        (d: any) => this.xScale(d.currently.humidity),
        (d: any) => this.yScale(d.currently.apparentTemperature),
      );

    this.voronoi = this.delaunay.voronoi()
    this.voronoi.xmax = this.dimensions.ctrWidth;
    this.voronoi.ymax = this.dimensions.ctrHeight

    this.ctr.append('g')
      .selectAll('path')
      .data(this.dataSet)
      .join('path')
      //Uncomment this out to see the voronoi diagram
      //.attr('stroke', 'black')
      .attr('fill', 'transparent')
      .attr('d', (d: any, i: number) => this.voronoi.renderCell(i))
      .on('mouseenter', (event: any, datum: any) => {
        //d3.select(event.target)
        this.ctr.append('circle')
          .classed('dot-hovered', true)
          .attr('fill', '#120078')
          .attr('r', 8)
          .attr('cx', (d: any) => this.xScale(datum.currently.humidity))
          .attr('cy', (d: any) => this.yScale(datum.currently.apparentTemperature))
          .style('pointer-event', 'none')

        this.tooltip.style('display', 'block')
          .style('top', this.yScale(datum.currently.apparentTemperature) - 25 + "px")
          .style('left', this.xScale(datum.currently.humidity) + "px")

        this.tooltip.select('.metric-humidity span')
          .text(this.formatter(datum.currently.humidity))

        this.tooltip.select('.metric-temperature span')
          .text(this.formatter(datum.currently.apparentTemperature))

        this.tooltip.select('.metric-date')
          .text(this.dateFormatter(datum.currently.time * 1000))
      })
      .on('mouseleave', (event: any) => {
        /*d3.select(event.target)
          .attr('fill', 'red')
          .attr('r', 5)
        */
        this.ctr.select('.dot-hovered').remove()

        this.tooltip.style('display', 'none');
      })
  }

  private async setData(){
    await this.getData();

    this.dimensions = {
      width: 800,
      height: 800,
      margin: {
        top: 50,
        bottom: 50,
        left: 50,
        right: 50
      }
    }
    
    this.dimensions.ctrWidth = this.dimensions.width - this.dimensions.margin.left - this.dimensions.margin.right;
    this.dimensions.ctrHeight = this.dimensions.height - this.dimensions.margin.top - this.dimensions.margin.bottom;
  }

  async getData(){
    this.dataSet = await d3.json('assets/graph-data/weather-data.json');
  }
}
