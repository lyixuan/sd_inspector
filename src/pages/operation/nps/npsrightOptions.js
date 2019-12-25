import React from 'react';
import { connect } from 'dva';
// import styles from '../style.less'
import Echart from '../../indexPage/ManagementBench/scoreContrast/components/echart/index';
import BILoading from '@/components/BILoading';
import EmptyBox from '@/assets/workBench/emptyBox.png';

@connect(({ xdOperation, loading }) => ({
  xdOperationNpsData: xdOperation.xdOperationNpsData,
  loadingTime: loading.effects['xdWorkModal/getNpsData'],
}))
class NPSLeft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  optionsDraw = () => {
    // let  JosnList = [];
    const { cloudOptions = [] } = this.props;
    const colorArr = ['#FC5B5C', '#00B27B', '#F5A623', '#FF57D5', '#4A90E2', '#8B572A', '#4AE2BD'];
    const worldCloudoption = {
      title: {
        x: 'center',
        textStyle: {
          fontSize: 16,
          color: '#FFFFFF',
        },
      },
      // tooltip: {
      //   show: true,
      // },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#eee',
        borderWidth: 1,
        borderRadius: 10,
        shadowBlur: 10,
        shadowOffsetX: 1,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0,0,0,0.8)',
        textStyle: {
          color: '#666',
          fontSize: 12,
        },
        // trigger: 'axis',
        axisPointer: {
          // 坐标轴指示器，坐标轴触发有效
          type: 'none', // 默认为直线，可选为：'line' | 'shadow'
        },
        animation: false,
        // formatter: function (params) {
        //   if(params[0]) {
        //     return "学分均分：" + (params[1]?params[1].value:params[3].value) +"分"+
        //       "<br>环比：" +  (params[4]?params[4].value:'--')+"%";
        //   }
        // }
        formatter: function(params) {
          var str = params.data.name;
          return str;
        },
      },
      series: [
        {
          type: 'wordCloud',
          left: 'center',
          top: 'center',
          width: '90%',
          height: '90%',
          right: null,
          bottom: null,
          sizeRange: [20, 30],
          textPadding: 60,
          rotationRange: [0, 0],
          rotationStep: 0,
          gridSize: 12,
          autoSize: {
            enable: true,
            minSize: 12,
          },
          textStyle: {
            normal: {
              color: function() {
                return colorArr[Math.floor(Math.random() * colorArr.length)];
              },
              fontFamily: 'sans-serif',
              fontWeight: '500',
            },
            emphasis: {
              // shadowBlur: 10,
              // shadowColor: '#333'
            },
          },
          data: cloudOptions,
        },
      ],
    };
    // cloudOptions.length>0 && (worldCloudoption.series[0].data = cloudOptions);
    return worldCloudoption;
  };
  render() {
    const { cloudOptions = [] } = this.props;
    return (
      <div
        style={{
          width: '360px',
          height: '213px',
          background: 'rgba(255,255,255,1)',
          boxShadow: '0px 0px 4px 0px rgba(0,0,0,0.14)',
          borderRadius: '20px',
        }}
      >
        <Echart options={this.optionsDraw()} style={{ height: '213px', width: '360px' }} />
      </div>
    );
  }
}

export default NPSLeft;
