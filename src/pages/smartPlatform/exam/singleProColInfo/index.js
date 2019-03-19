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
  loading: loading.models.exam,
}))
class Survey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:1,
      name:'考试计划人数',
      legend_examPlan:['人均服务老生','人均服务新生','老生考试计划人数','新生考试计划人数'],
      legend_examNotice:['老生触达率','新生触达率','应通知老生','应通知新生','触达人数','通知率'],
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
    const { mapInfo = {} } = examOrg;
    const style1={width: '100%', height: '410px'};
    const style2={width: '100%', height: '1700px'};
    const sty = value === 1?style1:style2;
    const newOptions =  value===1?blendChartOptions(this.state,mapInfo,'single',this.params.name,this.params.unit,this.params.type):famProOPtion(this.state,mapInfo,'fam',this.params.name,this.params.unit,this.params.type);
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
            <Echart update={newOptions} style={sty} options={newOptions} />
          </div>
        </div>
      </Spin>
    );
  }

}
export default Survey;
