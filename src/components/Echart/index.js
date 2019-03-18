import React from 'react';
import echarts from 'echarts';
import Empty from '@/components/Empty';
import config from '../../../config/config';

export default class EchartsComponent extends React.Component {

  componentDidMount() {
    this.initChart(this.props.options)
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options)) {
      this.drawChart(nextProps)
    }
    if (JSON.stringify(nextProps.update) !== JSON.stringify(this.props.update)) {
      // 接口出来后应该按照data进行判断
      this.drawChart(nextProps)
    }

    if (JSON.stringify(nextProps.style) !== JSON.stringify(this.props.style)) {
      // style 变化，resize echarts
      this.myChart.resize({ height: nextProps.style.height });
      this.myChart.setOption(nextProps.options);
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
    this.myChart.clear();
    if (!this.myChart) {
      this.initChart();
    }
    // this.myChart.resize();
    this.myChart.setOption(options);
    if (this.props.clickEvent) {
      this.myChart.on("click", this.props.clickEvent);
    }

  }

  render() {
    const { style, isEmpty } = this.props;
    return <>
      {isEmpty ? <Empty isEmpty={isEmpty} /> : null}
      <div ref={this.createRef} style={{ ...style }} /></>
  }
}
