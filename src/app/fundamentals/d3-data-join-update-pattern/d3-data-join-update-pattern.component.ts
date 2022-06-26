import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-d3-data-join-update-pattern',
  templateUrl: './d3-data-join-update-pattern.component.html',
  styleUrls: ['./d3-data-join-update-pattern.component.scss']
})
export class D3DataJoinUpdatePatternComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.dataJoin();
  }

  private dataJoin(){
    const data = [11, 22, 33, 44, 55]

    const el = d3.select('#data-join-update-ul')
      .selectAll('.data-join-update-li')
      .data(data)
      .join(
        enter => {
          return enter.append('li')
            .style('color', 'purple')
            .style('font-size', 'xx-large')
        },
        update => {
          return update.style('color', 'green')
        },
        exit => exit.remove()
      )
      .attr('class', 'data-join-update-li')
      .text(d => d)

      /*
        Instead of .join() they used to have an update pattern that is DEPRECATED
        but it might be useful when looking at others code.  It's basically what we wrote in join
        the difference is you do it on the element itself.  So above we would do something
        like this:

        el.enter().append('li)
        el.exit().remove()

        etc...
        This however is deprecated but it may be good to know.
      */
  }

}
