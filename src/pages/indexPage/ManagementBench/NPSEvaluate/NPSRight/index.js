import React from 'react';
import { connect } from 'dva';
import styles from '../style.less'
import Echart from '../../scoreContrast/components/echart'

@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class NPSLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
  }
  optionsDraw=()=>{
    const worldCloudoption={
      title: {
        // text: '研发部邮件主题分析',
        x: 'center',
        textStyle: {
          fontSize: 23,
          color:'#FFFFFF'
        }

      },
      tooltip: {
        show: true
      },
      series: [{
        // name: '研发部邮件主题分析',
        type: 'wordCloud',
        left: 'center',
        top: '-10px',
        width: '90%',
        height: '90%',
        right: null,
        bottom: null,
        sizeRange: [12, 24],
        textPadding: 0,
        rotationRange: [0, 0],
        rotationStep: 0,
        gridSize: 2,
        autoSize: {
          enable: true,
          minSize: 12
        },
        textStyle: {
          normal: {
            color: function() {
              return 'rgb(' + [
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160),
                Math.round(Math.random() * 160)
              ].join(',') + ')';
            },
            fontFamily: 'sans-serif',
            fontWeight: 'bold',
          },
          emphasis: {
            // shadowBlur: 10,
            // shadowColor: '#333'
          }
        },
        data: [{
          name: "态度一般",
          value: 900
        }]
      }]
    }
    let  JosnList = [];

    JosnList.push({
      name: "态度一般",
      value: 900
    }, {
      name: "态度好",
      value: 890
    }, {
      name: "态度差",
      value: 900
    }, {
      name: "回复及时",
      value: 888
    }, {
      name: "回复不及时",
      value: 777
    }, {
      name: "不回复",
      value: 688
    }, {
      name: "解决问题能力强",
      value: 588
    }, {
      name: "问题未及时解决",
      value: 516
    }, {
      name: "问题未解决",
      value: 515
    }, {
      name: "关心我",
      value: 483
    }, {
      name: "不够关心我",
      value: 11
    }, {
      name: "不关心我",
      value: 11
    }, {
      name: "考试规划合理",
      value: 11
    }, {
      name: "考试规划不清晰",
      value: 11
    });
    worldCloudoption.series[0].data = JosnList;
   return worldCloudoption
  }
  render() {
    return (
      <div style={{ width: '334px',}} className={styles.NPSRight}>
        <div className={styles.title}>NPS标签词云图</div>
        <div className={styles.cloudChart}>
          <Echart options={this.optionsDraw()} style={{height:'337px',width:'334px'}}/>
        </div>


      </div>
    );
  }
}

export default NPSLeft;
