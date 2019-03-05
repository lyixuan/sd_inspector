import React from 'react';
import echarts from 'echarts'

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
  initChart = () => {
    this.myChart = echarts.init(this.ID);
    this.drawChart();
  };
  drawChart(nextProps = this.props) {
    const { options } = nextProps;
    if (!this.myChart) {
      this.initChart();
    }
    this.myChart.setOption(options);
  }

  render(){
    const {style} = this.props;
    return <div ref={this.createRef} style={{...style,boxShadow:'0 0 20px #0070b7',backgroundColor:'#0c162f'}} />
  }
}
