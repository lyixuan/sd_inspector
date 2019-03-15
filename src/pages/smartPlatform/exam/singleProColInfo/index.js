import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import BIRadio from '@/ant_components/BIRadio';
import Echart from '@/components/Echart';
import styles from './style.less';
import {blendChartOptions}  from '../component/echartOptions/college_options';
import {famProOPtion}  from '../component/echartOptions/family_prov_options';

@connect(({ exam, loading }) => ({
  exam,
  loading: loading.models.exam,
}))
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1,
      name:'考试计划人数',
      legend:['人均服务老生','人均服务新生','老生考试计划人数','新生考试计划人数'],
      legendGroup:['新生考试计划人数/人均服务新生','老生触达人数/人均服务老生'],
    };

  }
  componentDidMount() {

  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  render() {
    const { exam } = this.props;
    const {value} = this.state;
    const { dataList = {} } = exam;
    const { data1 = {}, data2 = {} } = dataList;
    const newOptions =  value===1?blendChartOptions(this.state,exam,'single','山西'):famProOPtion(this.state,data2,'fam','山西');
    return (
      <Spin spinning={false}>
        <div className={styles.m_container}>
          <div className={styles.radioCls}>
            <BIRadio onChange={this.onChange} value={this.state.value}>
              <BIRadio.Radio value={1}>学院</BIRadio.Radio>
              <BIRadio.Radio value={2}>家族</BIRadio.Radio>
            </BIRadio>
          </div>
          <div className='m_box'>
            <Echart update={value} style={{ width: '100%', height: value===1?'410px':'510px' }} options={newOptions} />
          </div>
        </div>
      </Spin>
    );
  }

}
export default Survey;
