import React from 'react';
import { connect } from 'dva';
import styles from '../style.less'
import Echart from '../../scoreContrast/components/echart'
import BILoading from '@/components/BILoading'
import EmptyBox from '@/assets/workBench/emptyBox.png'

@connect(({xdFamilyModal,loading}) => ({
  xdFamilyModal,
  loading: loading.effects['xdFamilyModal/getNpsAutonomousEvaluation'],
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
    const colorArr=['#FC5B5C','#00B27B','#F5A623','#FF57D5','#4A90E2','#8B572A','#4AE2BD']
    const worldCloudoption={
      title: {
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
        gridSize: 12,
        autoSize: {
          enable: true,
          minSize: 14,
        },
        textStyle: {
          normal: {
            color: function () {
              return colorArr[Math.floor((Math.random()*colorArr.length))]
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
          {
            this.props.loading?
              <BILoading isLoading={this.props.loading}/>
              :
              (cloudOptions.length>0 ? <Echart options={this.optionsDraw()} style={{height:'337px',width:'334px'}}/>:<div className={styles.emptyMain}><img src={EmptyBox}/></div>)
          }
        </div>


      </div>
    );
  }
}

export default NPSLeft;
