import React from 'react';
import * as d3 from 'd3';
import {Index} from './SVG'

class KoDetail extends React.Component {
  componentDidMount() {
    // this.drewLended()
  }
  drewLended = () => {
    this.chart = d3
      .select(this.svgDom).html(Index);
    // const ids=this.chart.select('#name1').style('fill','red').on('mousemove', tip.show);
    const ids=this.chart.select('#name1').style('fill','red').on('mousemove',function(e){console.log(d3.select(this))})
    console.log(1,ids)

  };

  render() {
    return (
      <div ref={dom => {
        this.svgDom = dom;
      }}>
      </div>
    );
  }
}

export default KoDetail;
