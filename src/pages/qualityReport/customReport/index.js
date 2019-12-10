import React from 'react';
import { connect } from 'dva';
import { Spin } from 'antd';
import QualitySurvey from '../component/QualitySurvey';
import ItemSort from '../component/ItemSort';
import SearchSelect from '../component/SearchSelect';
import { handleDataTrace } from '@/utils/utils';


@connect(({ qualityReport, loading }) => ({
  qualityReport,
  loading: loading.effects['qualityReport/qualitySurveyData'] || loading.effects['qualityReport/qualityAssortmentRank'] ,
}))

class CustomReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    handleDataTrace({ widgetName: `客诉质检报告`, traceName: `质检管理/客诉质检报告`,traceType:200 });
  }

  componentDidMount() {
    const that = this;
    const { startDate:beginDate, endDate, organization } = this.props.qualityReport;
    if (beginDate && endDate  && organization) {
      this.query({ beginDate, endDate, organization });
    } else {
      setTimeout(function() {
        that.componentDidMount();
      }, 500);
    }
  }

  query = (params) => {
    const arr = params.organization.split('-');
    const org = {
      collegeId: arr[0] ? Number(arr[0]) : null,
      familyId: arr[1] ? Number(arr[1]) : null,
      groupId: arr[2] ? Number(arr[2]) : null,
    };

    this.props.dispatch({
      type: 'qualityReport/qualitySurveyData',
      payload: { ...params, ...org, ...{ qualityType: 1 } },
    });
    this.props.dispatch({
      type: 'qualityReport/qualityAssortmentRank',
      payload: { ...params, ...org, ...{ qualityType: 1 } },
    });
  };

  reset = (params) => {
    this.props.dispatch({
      type: 'qualityReport/saveTimeReset',
      payload: { params },
    }).then(() => {
      const { startDate:beginDate, endDate, organization } = this.props.qualityReport;
      this.query({ beginDate, endDate, organization });
    });
  };

  changeDate = (params) => {
    this.props.dispatch({
      type: 'qualityReport/saveTime',
      payload: { ...params },
    });
  };

  changeOrganization = (params) => {
    this.props.dispatch({
      type: 'qualityReport/saveOrganization',
      payload: { ...params },
    });
  };

  render() {
    const { orgTreeList = [], surveyData,assortmentRankData,startDate, endDate, activeStartDate, activeEndDate, startDateBak, endDateBak, organization, organizationBak } = this.props.qualityReport;
    const { headers = [], values = [], maxCount } = surveyData || {};
    return (
      <Spin spinning={this.props.loading}>
        <SearchSelect title="客诉报告"
                      orgList={orgTreeList}
                      beginDate={startDate}
                      endDate={endDate}
                      startDateBak={startDateBak}
                      endDateBak={endDateBak}
                      activeStartDate={activeStartDate}
                      activeEndDate={activeEndDate}
                      organization={organization}
                      organizationBak={organizationBak}
                      changeDate={(params) => this.changeDate(params)}
                      changeOrganization={(params) => this.changeOrganization(params)}
                      reset={(params) => this.reset(params)}
                      search={(params) => this.query(params)}/>
        <QualitySurvey headers={headers} values={values} maxCount={maxCount} scrollx={true}/>
        <div style={{marginBottom:20}}><ItemSort assortmentRankData={assortmentRankData}/></div>
      </Spin>
    );
  }
}

export default CustomReport;

