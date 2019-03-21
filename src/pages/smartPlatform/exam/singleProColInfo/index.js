import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import BIRadio from '@/ant_components/BIRadio';
import Echart from '@/components/Echart';
import styles from './style.less';
import {blendChartOptions}  from '../component/echartOptions/college_options';
import {famProOPtion}  from '../component/echartOptions/family_prov_options';

@connect(({ examOrg, loading }) => ({
  examOrg,
  loading: loading.models.examOrg,
}))
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1,
      name_examPlan:'考试计划人数',
      name_examNotice:'报考通知人数',
      name_examTicket:'准考证填写人数',
      legend_examPlan:['人均服务老生','人均服务新生','老生考试计划人数','新生考试计划人数'],
      legend_examNotice:['老生触达率','新生触达率','应通知老生','应通知新生','触达人数','触达率'],
      legend_examTicket:['老生填写率','新生填写率','老生填写','新生填写','填写人数','填写率'],
      legendGroup:['新生考试计划人数/人均服务新生','老生触达人数/人均服务老生'],
    };
    const { query = {} } = this.props.location;
    this.params = query;
    this.params.unit = query.type === 'examPlan'?'人':'%';
  }
  componentDidMount() {
    this.provinceOrg();
  }
  provinceOrg = (orgType) => {
    const params={
      province:this.params.name,
      orgType:orgType?orgType:'college',
      beginDate:this.params.beginDate,
      endDate:this.params.endDate,
      type:this.params.type,
    };
    this.props.dispatch({
      type: 'examOrg/provinceOrg',
      payload: params,
    });
  };
  onChange = (e) => {
    const orgType = e.target.value === 1?'college':'family';
    this.setState({
        value: e.target.value,
      },
      () => {
        this.provinceOrg(orgType);
      }
    );
  };
  render() {
    const { examOrg } = this.props;
    const {value} = this.state;
    const {type,name,unit} = this.params;

    const { mapInfo = {} } = examOrg;
    const dataLength = mapInfo[type]&&mapInfo[type].data1.length;

    const newOptions =  value===1?blendChartOptions(this.state,mapInfo,'single', name, unit, type):famProOPtion(this.state,mapInfo,'fam', name, unit, type);
    return (
      <Spin spinning={this.props.loading}>
        <div className={styles.m_container}>
          <div className={styles.radioCls}>
            <BIRadio onChange={this.onChange} value={this.state.value}>
              <BIRadio.Radio value={1}>学院</BIRadio.Radio>
              <BIRadio.Radio value={2}>家族</BIRadio.Radio>
            </BIRadio>
          </div>
          <div className='m_box'>
            <Echart isEmpty={mapInfo[type]&&mapInfo[type].data1.length === 0} style={{width: '100%', height:value === 1?'410px':`${dataLength*50}px`}} options={newOptions} />
          </div>
        </div>
      </Spin>
    );
  }

}
export default Survey;
