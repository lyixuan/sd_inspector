import React from 'react';
import echarts from 'echarts';
import styles from './styles.less';

export default class EchartsComponent extends React.Component {

  componentDidMount() {
    this.initChart(this.props.options)
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options)) {
      console.log(112344)
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
    console.log(234,options)
    this.myChart.clear();
    if (!this.myChart) {
      this.initChart();
    }
    this.myChart.setOption(options);
    if (this.props.clickEvent) {
      this.myChart.on("click", this.props.clickEvent);
    }
    window.addEventListener("resize", () => {
      this.myChart.resize();
    });

  }

  render() {
    const { style } = this.props;
    return (
      <div className={styles.echartContainer} style={{ ...style }}>
        <div ref={this.createRef} className={styles.echartDom} />
      </div>
    )
  }
}
