import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SvgExampleComponent } from './svg-example/svg-example.component';
import { SvgPathComponent } from './svg-path/svg-path.component';
import { D3SelectComponent } from './fundamentals/d3-select/d3-select.component';
import { D3AppendElementComponent } from './fundamentals/d3-append-element/d3-append-element.component';
import { D3DataJoinComponent } from './fundamentals/d3-data-join/d3-data-join.component';
import { D3DataJoinUpdatePatternComponent } from './fundamentals/d3-data-join-update-pattern/d3-data-join-update-pattern.component';
import { D3FundamentalsComponent } from './fundamentals/d3-fundamentals/d3-fundamentals.component';
import { D3ScatterplotComponent } from './D3-graphing/d3-scatterplot/d3-scatterplot.component';
import { D3GraphsComponent } from './D3-graphing/d3-graphs/d3-graphs.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { D3ScalesComponent } from './D3-graphing/d3-linear-scales/d3-linear-scales.component';
import { D3QuantizeScaleComponent } from './D3-graphing/d3-quantize-scale/d3-quantize-scale.component';
import { D3QuantileScaleComponent } from './D3-graphing/d3-quantile-scale/d3-quantile-scale.component';
import { D3ThresholdScaleComponent } from './D3-graphing/d3-threshold-scale/d3-threshold-scale.component';
import { D3LogScaleComponent } from './D3-graphing/d3-log-scale/d3-log-scale.component';
import { D3WeatherHistogramComponent } from './animations/d3-weather-histogram/d3-weather-histogram.component';
import { D3AnimationsComponent } from './animations/d3-animations/d3-animations.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgExampleComponent,
    SvgPathComponent,
    D3SelectComponent,
    D3AppendElementComponent,
    D3DataJoinComponent,
    D3DataJoinUpdatePatternComponent,
    D3FundamentalsComponent,
    D3ScatterplotComponent,
    D3GraphsComponent,
    D3ScalesComponent,
    D3QuantizeScaleComponent,
    D3QuantileScaleComponent,
    D3ThresholdScaleComponent,
    D3LogScaleComponent,
    D3WeatherHistogramComponent,
    D3AnimationsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
