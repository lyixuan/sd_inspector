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
    this.props.dispatch({
      type: 'qualityReport/getOrgMapTreeByRole',
      payload: { },
    }).then(()=>{
      let beginDate,endDate,organization;
      let {params=null} = this.props.location.query;
      const pNew = JSON.parse(params);
      if(pNew && pNew.beginDate && pNew.endDate && pNew.organization){
        beginDate = pNew.beginDate;
        endDate = pNew.endDate;
        organization = pNew.organization;
        this.changeDate({startDate: beginDate, endDate:endDate});
        this.changeOrganization({organization});
      } else {
        beginDate = this.props.qualityReport.startDate;
        endDate = this.props.qualityReport.endDate;
        organization = this.props.qualityReport.organization;
      }
      this.query({ beginDate, endDate, organization });
    });

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
    const { orgTreeList = [], surveyData,assortmentRankData, activeStartDate, activeEndDate, startDateBak, endDateBak, organizationBak,startDate:beginDate, endDate,organization  } = this.props.qualityReport;
    const { headers = [], values = [], maxCount } = surveyData || {};

    return (
      <Spin spinning={this.props.loading}>
        <SearchSelect title="客诉报告"
                      orgList={orgTreeList}
                      beginDate={beginDate}
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
                      search={(params) => this.query(params)}
                      traceType="客诉"/>
        <QualitySurvey headers={headers} values={values} maxCount={maxCount} scrollx={true} traceType="客诉"/>
        <div style={{marginBottom:20}}><ItemSort assortmentRankData={assortmentRankData} traceType="客诉"/></div>
      </Spin>
    );
  }
}

export default CustomReport;

