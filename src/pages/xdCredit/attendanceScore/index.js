import React from 'react';
import { connect } from 'dva';
import BILoading from '@/components/BILoading';
import Echart from '../components/echart';
// import EchartBottom from '@/pages/indexPage/ManagementBench/scoreContrast/components/echartBottom';
import BIScrollbar from '@/ant_components/BIScrollbar';

@connect(({ xdCreditModal, loading }) => ({
  loading: loading.effects['xdCreditModal/queryAppealDataPage'],
  appealAttendanceDatas: xdCreditModal.appealAttendanceDatas || {},
}))
class AttendanceScore extends React.Component {
  // getItemStyle = v => {
  //   if (v > 0) {
  //     return {
  //       color: '#47D3FF',
  //       barBorderRadius: [4, 4, 0, 0],
  //     };
  //   } else {
  //     return {
  //       color: '#FF8086',
  //       barBorderRadius: [0, 0, 4, 4],
  //     };
  //   }
  // };
  drawChart = (arr, arr2) => {
    let creaditValue = [];
    let familyName = [];
    let qoqValue = [];
    let dataShadow = [];
    let maxShadow = [];
    let seriesDatas = [];
    let creaditValue2 = [];
    let familyName2 = [];
    let qoqValue2 = [];
    let dataShadow2 = [];
    let maxShadow2 = [];
    let seriesDatas2 = [];
    arr.map((item, index) => {
      creaditValue.push(item.creaditValue);
      familyName.push(item.name);
      qoqValue.push((item.qoqValue * 100).toFixed(2));
      seriesDatas.push({
        // itemStyle: this.getItemStyle(item.creaditValue),
        value: item.creaditValue,
      });
    });
    arr2.map((item, index) => {
      creaditValue2.push(item.creaditValue);
      familyName2.push(item.name);
      qoqValue2.push((item.qoqValue * 100).toFixed(2));
      seriesDatas2.push({
        // itemStyle: this.getItemStyle(item.creaditValue),
        value: item.creaditValue,
      });
    });
    const yMax = Math.max.apply(null, creaditValue);
    const yMin = Math.min.apply(null, creaditValue);
    const yRightMax = Math.max.apply(null, qoqValue);
    const yRightMin = Math.min.apply(null, qoqValue);
    for (let i = 0; i < creaditValue.length; i++) {
      dataShadow.push(yMin);
      maxShadow.push(yMax);
    }
    const barWidth = familyName.length >= 10 ? 20 : 30;
    // const options = {
    //   color: ['#50D4FD', '#FD8188'],
    //   tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //       type: 'cross',
    //       crossStyle: {
    //         color: '#999',
    //       },
    //     },
    //     formatter: '{a2}: {c2}<br />{a3}: {c3}%',
    //   },
    //   xAxis: [
    //     {
    //       type: 'category',
    //       data: familyName,
    //       axisLabel: {
    //         interval: 0,
    //         rotate: familyName.length >= 10 ? 30 : 0,
    //         color: '#000000 ',
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           type: 'dotted',
    //           color: '#4A90E2',
    //         },
    //       },
    //       splitLine: { show: false },
    //       splitArea: { show: false },
    //     },
    //   ],
    //   yAxis: [
    //     {
    //       inverse: false,
    //       splitArea: { show: false },
    //       type: 'value',
    //       min: yMin > 0 ? 0 : yMin,
    //       max: yMax < 0 ? 0 : yMax,
    //       onZeroAxisIndex: 0,
    //       axisLabel: {
    //         formatter: '{value}',
    //         color: '#000000 ',
    //       },
    //       axisLine: {
    //         lineStyle: {
    //           type: 'dotted',
    //           color: 'RGBA(229, 229, 229, 0.8)',
    //         },
    //       },
    //       splitLine: {
    //         lineStyle: {
    //           type: 'dotted',
    //           color: 'RGBA(229, 229, 229, 0.5)',
    //         },
    //       },
    //     },
    //     {
    //       inverse: false,
    //       splitArea: { show: false },
    //       type: 'value',
    //       min: yRightMin > 0 ? 0 : yRightMin,
    //       max: yRightMax < 0 ? 0 : yRightMax,
    //       axisLabel: {
    //         formatter: '{value} %',
    //         color: '#000000 ',
    //       },
    //       onZeroAxisIndex: 0,
    //       axisLine: {
    //         lineStyle: {
    //           type: 'dotted',
    //           color: 'RGBA(229, 229, 229, 0.8)',
    //         },
    //       },
    //       splitLine: {
    //         show: false,
    //       },
    //     },
    //   ],
    //   grid: {
    //     left: 45,
    //     right: 60,
    //     top: 40,
    //     bottom: 60,
    //   },
    //   series: [
    //     {
    //       type: 'bar',
    //       itemStyle: {
    //         normal: { color: 'rgba(0,0,0,0.05)' },
    //       },
    //       // barGap: '-100%',
    //       barWidth,
    //       data: dataShadow,
    //     },
    //     // {
    //     //   // For shadow
    //     //   type: 'bar',
    //     //   itemStyle: {
    //     //     normal: { color: 'rgba(71,211,255,0.06)' },
    //     //   },
    //     //   // barGap: '-100%',
    //     //   barWidth,
    //     //   data: maxShadow,
    //     //   animation: false,
    //     // },
    //     {
    //       name: '均分',
    //       type: 'bar',
    //       itemStyle: {
    //         normal: { color: 'green' },
    //       },
    //       barWidth,
    //       label: {
    //         normal: {
    //           show: true,
    //           position: 'top',
    //           color: '#333', // 56595E
    //           fontSize: 13,
    //         },
    //       },
    //       data: seriesDatas,
    //     },
    //     {
    //       name: '均分',
    //       type: 'bar',
    //       itemStyle: {
    //         normal: { color: 'blue' },
    //       },
    //       barWidth,
    //       label: {
    //         normal: {
    //           show: true,
    //           position: 'top',
    //           color: '#ccc',
    //           fontSize: 13,
    //         },
    //       },
    //       data: seriesDatas2,
    //     },
    //     {
    //       name: '环比',
    //       type: 'line',
    //       yAxisIndex: 1,
    //       itemStyle: {
    //         normal: { color: 'red' },
    //       },
    //       data: qoqValue,
    //     },
    //     {
    //       name: '环比',
    //       type: 'line',
    //       yAxisIndex: 1,
    //       itemStyle: {
    //         normal: { color: 'yellow' },
    //       },
    //       data: qoqValue2,
    //     },
    //   ],
    // };
    const options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999',
          },
        },
        // formatter: '{a2}: {c2}<br />{a3}: {c3}%',
      },
      // tooltip: {
      //   trigger: 'axis',
      //   axisPointer: {
      //     type: 'cross',
      //     crossStyle: {
      //       color: '#999',
      //     },
      //   },
      // },
      grid: {
        left: 45,
        right: 60,
        top: 40,
        bottom: 60,
      },
      // toolbox: {
      //   feature: {
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ['line', 'bar'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true },
      //   },
      // },
      // legend: {
      //   data: ['蒸发量', '降水量', '平均温度', '平均温度1'],
      // },
      xAxis: [
        {
          type: 'category',
          data: familyName,
          axisLabel: {
            interval: 0,
            rotate: familyName.length >= 10 ? 30 : 0,
            color: '#000000 ',
          },
          axisLine: {
            lineStyle: {
              type: 'dotted',
              color: '#4A90E2',
            },
          },
          axisPointer: {
            type: 'shadow',
          },
          splitLine: { show: false },
          splitArea: { show: false },
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: '均分',
          // min: 0,
          // max: 10,
          // interval: 50,
          // axisLabel: {
          //   formatter: '{value}',
          // },
          axisLabel: {
            color: '#000000 ',
            formatter: '{value}',
          },
          // axisLine: {
          //   lineStyle: {
          //     type: 'dotted',
          //     color: 'RGBA(229, 229, 229, 0.8)',
          //   },
          // },
          splitLine: {
            lineStyle: {
              type: 'dotted',
              color: 'RGBA(229, 229, 229, 0.8)',
            },
          },
        },
        {
          type: 'value',
          name: '环比',
          // min: -100,
          // max: 100,
          // interval: 20,
          axisLabel: {
            formatter: '{value} %',
          },
        },
      ],
      series: [
        {
          name: '直播均分',
          type: 'bar',
          barWidth,
          itemStyle: {
            normal: { color: '#53DCD4' },
          },
          data: seriesDatas,
        },
        {
          name: '直播环比',
          type: 'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: { color: '#53DCD4' },
          },
          data: qoqValue,
        },
        {
          name: '重播均分',
          type: 'bar',
          barWidth,
          itemStyle: {
            normal: { color: '#FCD064' },
          },
          data: seriesDatas2,
        },
        {
          name: '重播环比',
          type: 'line',
          yAxisIndex: 1,
          itemStyle: {
            normal: { color: '#FCD064' },
          },
          data: qoqValue2,
        },
      ],
    };

    return options;
  };

  getEchartRender = (live, replay) => {
    return (
      <>
        {live.creaditDataList &&
          live.creaditDataList.length > 0 &&
          replay.creaditDataList &&
          replay.creaditDataList.length > 0 && (
            <Echart
              options={this.drawChart(live.creaditDataList, replay.creaditDataList)}
              style={{ height: '300px', width: live.creaditDataList.length * 100 }}
            />
          )}
      </>
    );
  };
  render() {
    const { live = {}, replay = {} } = this.props.appealAttendanceDatas;
    console.log(this.props.loading, 'xxxx');
    // console.log(creaditDataList, 'creaditDataList');
    return (
      <div>
        <BILoading isLoading={this.props.loading}>
          <BIScrollbar style={{ minHeight: 300 }}>{this.getEchartRender(live, replay)}</BIScrollbar>
          {/* <EchartBottom /> */}
        </BILoading>
      </div>
    );
  }
}

export default AttendanceScore;
