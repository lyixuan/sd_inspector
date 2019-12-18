import React from 'react';
import { Row, Col,Spin,Empty } from 'antd';
import BaseInfo from './baseInfo';
import OrderStat from './orderStat';
import ActiveStat from './activeStat';
import LearnStat from './learnStat';
import LearnDetail from './learnDetail';
import ImDetail from './imDetail';
import ExerciseDetail from './exerciseDetail';
import styles from './style.css';

export default class UserPortary extends React.Component {
  getHeight = (offsetWidth)=>{
    let height = 320;
    if(offsetWidth<1400){
      height = 300
    } else if (offsetWidth>=1400 && offsetWidth<1600){
      height = 320
    } else if (offsetWidth>=1600 && offsetWidth<1700) {
      height = 340
    } else if (offsetWidth>=1700) {
      height = 360
    }
    return height;
  };
  render() {
    const offsetWidth = document.body.offsetWidth;
    const height = this.getHeight(offsetWidth);
    const { baseInfo={},tagInfo = {},orderStat={},activeStat=[],learnStat=[],learnDetail={},imDetail={},exerciseDetail={},isLoading=false}  = this.props;

    return (
      <Spin spinning={isLoading}>
        {baseInfo?<div  className={styles.layout}>
          {/*基础信息*/}
          <BaseInfo baseInfo={baseInfo} tagInfo={tagInfo}/>
          <Row gutter={16}>
            <Col span={8}>
              {/*订单详情*/}
              <OrderStat orderStat={orderStat} height={height}/>
            </Col>
            <Col span={8}>
              {/*活跃汇总*/}
              <ActiveStat activeStat={activeStat} height={height}/>
            </Col>
            <Col span={8}>
              {/*学习汇总*/}
              <LearnStat learnStat={learnStat} height={height}/>
            </Col>
          </Row>
          {/*学习状况*/}
          <LearnDetail learnDetail={learnDetail} height={height}/>
          {/*IM情绪值*/}
          <ImDetail imDetail={imDetail} height={height}/>
          {/*做题分析*/}
          <ExerciseDetail exerciseDetail={exerciseDetail} height={height}/>
          <br/>
        </div>:
        <div className={styles.layout1}>
          <div className={styles.contentLayout} style={{minHeight:800,marginBottom:20,paddingTop:50}}><Empty/> </div>
        </div>
        }
      </Spin>
    );
  }
}
