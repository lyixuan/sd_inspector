import React from 'react';
import { connect } from 'dva';
import QualitySurvey from '../component/QualitySurvey';
import SearchSelect from '../component/SearchSelect';


@connect(({ qualityReport, loading }) => ({
  qualityReport,
  loading: loading.effects['qualityReport/qualitySurveyData'],
}))

class CubePlanDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

  }

  query = (params) => {
    const arr = params.organization.split('-');
    const org = {
      collegeId:arr[0] ? Number(arr[0]) : null,
      familyId: arr[1] ? Number(arr[1]) : null,
      groupId: arr[2] ? Number(arr[2]) : null,
    };

    this.props.dispatch({
      type: 'qualityReport/qualitySurveyData',
      payload: { ...params, ...org,...{ qualityType: 2 } },
    });
  };

  reset = (params) => {
    this.props.dispatch({
      type: 'qualityReport/saveTimeReset',
      payload: { params },
    }).then(()=>{
      console.log(11111)
      const  { startDate, endDate, organization} = this.props.qualityReport;
      this.query({startDate, endDate, organization});
    });
  };

  changeDate = (params) => {
    this.props.dispatch({
      type: 'qualityReport/saveTime',
      payload: { ...params},
    });
  };
  changeOrganization = (params) => {
    this.props.dispatch({
      type: 'qualityReport/saveOrganization',
      payload: { ...params},
    });
  };


  render() {
    const { orgTreeList = [], surveyData, startDate, endDate, activeStartDate, activeEndDate ,startDateBak, endDateBak,organization,organizationBak} = this.props.qualityReport;
    const { headers = [], values = [], maxCount } = surveyData || {};
    return (
      <div>
        <SearchSelect title="班主任质检报告"
                      orgList={orgTreeList}
                      beginDate={startDate}
                      endDate={endDate}
                      startDateBak={startDateBak}
                      endDateBak={endDateBak}
                      activeStartDate={activeStartDate}
                      activeEndDate={activeEndDate}
                      organization={organization}
                      organizationBak={organizationBak}
                      type={1}
                      changeDate={(params)=>this.changeDate(params)}
                      changeOrganization={(params)=>this.changeOrganization(params)}
                      reset={(params) => this.reset(params)}
                      search={(params) => this.query(params)}/>
        <QualitySurvey headers={headers}/>
      </div>
    );
  }
}

export default CubePlanDetail;
