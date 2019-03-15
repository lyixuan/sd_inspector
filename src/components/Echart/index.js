import React from 'react';
import echarts from 'echarts';
import config from '../../../config/config';

export default class EchartsComponent extends React.Component {

  componentDidMount (){
    this.initChart(this.props.options)
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.update) !== JSON.stringify(this.props.update)) {
      // 接口出来后应该按照data进行判断
      this.drawChart(nextProps)
    }
  }
  createRef = id => {
    this.ID = id;
  };
   eConsole=(param)=> {
     const origin = window.location.origin;
     const url = `${origin}${config.base}smartPlatform/exam/collegeinfo?${param.name}`;
     window.location.href = url;
  };
  initChart = () => {
    this.myChart = echarts.init(this.ID);
    this.drawChart();
  };
  drawChart(nextProps = this.props) {
    const { options } = nextProps;
    this.myChart.clear();
    if (!this.myChart) {
      this.initChart();
    }
    // this.myChart.resize();
    this.myChart.setOption(options);
    if(this.props.clickEvent){
      this.myChart.on("click", this.eConsole);
    }

  }

  render(){
    const {style} = this.props;
    return <div ref={this.createRef} style={{...style}} />
  }
}
