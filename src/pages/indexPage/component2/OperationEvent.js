import React from 'react';
import style from './style.less';
import ExamTime from '@/components/ExamTime';
import Echarts from './Echart_WorkBentch';
import styleFather from '../indexPage.less';
import yunying from '@/assets/newIndex/yunying@2x.png';
import gengduo from '@/assets/newIndex/gengduo@2x.png';
import { Spin } from 'antd';
import { handleDataTrace } from '@/utils/utils';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import {getOption} from './operation_option';

class OperationEvent extends React.Component {
  jump = () =>{
    // handleDataTrace({"widgetName":`创收_进入详情`,"traceName":`2.0/创收_进入详情`});
    jumpGobalRouter('examPlant/index' );
  };
  jump2 = () =>{
    // handleDataTrace({"widgetName":`创收_进入详情`,"traceName":`2.0/创收_进入详情`});
    jumpGobalRouter('examPlant/registTouch' );
  };
  render() {
    const { touchRatio,provinceList ,examLoading} = this.props;
    const options = getOption(touchRatio);
    return (
      <div className={style.scoreWrap}>
        <div className={style.scoreHeader}>
          <span className={style.leftLine}/> <span className={style.leftText}>运营大事件</span>
        </div>
        <Spin spinning={this.props.examLoading}>
        <div className={styleFather.boxCross}>
          <div className={styleFather.boxHeader}>
            <img src={yunying} alt=""/>
            <span className={styleFather.headerTitle}>报考</span>
            <img src={gengduo} alt="" onClick={()=>this.jump()}/>
          </div>
          <div className={style.operation}>
            <div className={style.echartPie} onClick={this.jump2}>
              <Echarts options={options} style={{ height: 140}}/>
            </div>
            <div className={style.timeMap}>
              <ExamTime totalWidth={890} splitNumber={provinceList.length} provinceList={provinceList}/>
            </div>
          </div>
        </div>
        </Spin>
      </div>
    );
  }
}

export default OperationEvent;
