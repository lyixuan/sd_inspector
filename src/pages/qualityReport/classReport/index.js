import React from 'react';
import { connect } from 'dva';
import QualitySurvey from '../component/QualitySurvey';
import SearchSelect from '../component/SearchSelect';
import moment from 'moment/moment';


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
    this.props.dispatch({
      type: 'qualityReport/qualitySurveyData',
      payload: { ...params, ...{ qualityType: 2 } },
    });
  };
  reset = (params) => {
    this.props.dispatch({
      type: 'qualityReport/saveTimeReset',
      payload: { params },
    });
  };

  changeDate = (params) => {
    this.props.dispatch({
      type: 'qualityReport/saveTime',
      payload: { ...params},
    });
  };

  render() {
    const { orgTreeList = [], surveyData, startDate, endDate, activeStartDate, activeEndDate ,startDateBak, endDateBak} = this.props.qualityReport;
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
                      type={1}
                      changeDate={(params)=>this.changeDate(params)}
                      reset={(params) => this.reset(params)}
                      search={(params) => this.query(params)}/>
        <QualitySurvey headers={headers}/>
      </div>
    );
  }
}

export default CubePlanDetail;
