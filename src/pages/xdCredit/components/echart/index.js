import React from 'react';
import echarts from 'echarts';
import styles from './styles.less';
require('echarts-wordcloud');

export default class EchartsComponent extends React.Component {
  componentDidMount() {
    this.initChart(this.props.options)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options)) {
      try{
        this.drawChart(nextProps)
      }catch (e) {
        console.error('echarts data error')
      }
    }

    if (JSON.stringify(nextProps.style) !== JSON.stringify(this.props.style)) {
      this.myChart.setOption(nextProps.options);
    }
  }
  createRef = id => {
    this.ID = id;
  };
  initChart = () => {
    try {
      this.myChart = echarts.init(this.ID);
      this.drawChart();
    }catch (e) {
      console.error('echarts data error')
    }
  };
  drawChart(nextProps = this.props) {
    const { options } = nextProps;
    this.myChart.clear();
    if (!this.myChart) {
      this.initChart();
    }
    this.myChart.setOption(options);
    if (this.props.clickEvent) {
      this.myChart.on("click", this.props.clickEvent);
    }

  }

  render() {
    return (
      <div style={this.props.style} className={styles.collegeInner}>
        <div ref={this.createRef} className={styles.echartDom} />
     </div>
    )
  }
}
