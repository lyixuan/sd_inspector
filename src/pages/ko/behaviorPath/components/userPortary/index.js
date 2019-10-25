import React from 'react';
import { Row, Col,Spin } from 'antd';
import BaseInfo from './baseInfo';
import OrderStat from './orderStat';
import ActiveStat from './activeStat';
import LearnStat from './learnStat';
import LearnDetail from './learnDetail';
import ImDetail from './imDetail';
import ExerciseDetail from './exerciseDetail';
import styles from './style.css';

export default class UserPortary extends React.Component {

  render() {

    const { baseInfo={},tagInfo = {},orderStat={},activeStat=[],learnStat=[],learnDetail={},imDetail={},exerciseDetail={},isLoading=false}  = this.props;

    return (
      <Spin spinning={isLoading} className={styles.layout}>
        {/*基础信息*/}
        <BaseInfo baseInfo={baseInfo} tagInfo={tagInfo}/>
        <Row gutter={16}>
          <Col span={8}>
            {/*订单详情*/}
            <OrderStat orderStat={orderStat}/>
          </Col>
          <Col span={8}>
            {/*活跃汇总*/}
            <ActiveStat activeStat={activeStat}/>
          </Col>
          <Col span={8}>
            {/*学习汇总*/}
            <LearnStat learnStat={learnStat}/>
          </Col>
        </Row>
        {/*学习状况*/}
        <LearnDetail learnDetail={learnDetail}/>
        {/*IM情绪值*/}
        <ImDetail imDetail={imDetail}/>
        {/*做题分析*/}
        <ExerciseDetail exerciseDetail={exerciseDetail}/>
        <br/>
      </Spin>
    );
  }
}
