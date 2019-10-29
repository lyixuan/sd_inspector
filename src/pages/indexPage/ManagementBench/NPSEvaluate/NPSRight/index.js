import React from 'react';
import { connect } from 'dva';
import styles from '../style.less'
import Echart from '../../scoreContrast/components/echart'

@connect((xdManagementBench) => ({
  xdManagementBench,
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
    // let  JosnList = [];
    const {cloudOptions=[]} = this.props
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
        top: 'center',
        width: '90%',
        height: '90%',
        right: null,
        bottom: null,
        sizeRange: [14, 36],
        textPadding: 60,
        rotationRange: [0, 0],
        rotationStep: 0,
        gridSize: 4,
        autoSize: {
          enable: true,
          minSize: 14,
        },
        textStyle: {
          normal: {
            color: function(item) {
              let color = '#333333'
              if (item.data.star === 5) {
                color = '#4A90E2';
              } else if (item.data.star>=1 && item.data.star<=3) {
                color = '#FC5B5C';
              }
              return color
            },
            fontFamily: 'sans-serif',
            fontWeight: '500',
          },
          emphasis: {
            // shadowBlur: 10,
            // shadowColor: '#333'
          }
        },
        data: cloudOptions
      }]
    }
    // cloudOptions.length>0 && (worldCloudoption.series[0].data = cloudOptions);
   return worldCloudoption
  }
  render() {
    const {cloudOptions=[]} = this.props
    return (
      <div style={{ width: '334px',}} className={styles.NPSRight}>
        <div className={styles.title}>NPS标签词云图</div>
        <div className={styles.cloudChart}>
          {cloudOptions.length>0 && <Echart options={this.optionsDraw()} style={{height:'337px',width:'334px'}}/>}
        </div>


      </div>
    );
  }
}

export default NPSLeft;
