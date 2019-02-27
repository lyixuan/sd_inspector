import React from 'react';
import echarts from 'echarts'

export default class EchartsComponent extends React.Component {

  componentDidMount (){
    this.initChart(this.props.options)
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.update) !== JSON.stringify(this.props.update)) {
      // 接口出来后应该按照data进行判断
      this.initChart(nextProps.options)
    }
  }
  createRef = id => {
    this.ID = id;
  };
  initChart= option =>{
    const myChart = echarts.init(this.ID);
    myChart.setOption(option);
  };
  render(){
    const {style} = this.props;
    return <div ref={this.createRef} style={{...style}} />
  }
}
