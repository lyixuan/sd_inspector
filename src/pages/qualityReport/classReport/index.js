import React from 'react';
import { connect} from 'dva';
import { message,Spin } from 'antd';
import QualitySurvey from '../component/QualitySurvey';
import TopSelect from '../component/TopSelect';


@connect(({ classReport,loading }) => ({
  classReport,
  loading:loading.effects['classReport/getCommentPage'],
}))

class CubePlanDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }


  render() {
    const {surveyData} = this.props.classReport;
    const {} = surveyData || {};
    const headers = {
      name:"归属组织",
      totalCountName:"总计",
      specialViolationName:"特技违规",
      dimensionNameList:[
        {
          dimensionName:"品牌形象公司权益",
          dimensionId:"pp",
          primaryViolationName:"一级",
          secondViolationName:"二级",
          thirdViolationName:"三级",
        },
        {
          dimensionName:"徇私舞弊",
          dimensionId:"pttp",
          primaryViolationName:"一级",
          secondViolationName:"二级",
          thirdViolationName:"三级",
        },
        {
          dimensionName:"用户体验",
          dimensionId:"dd",
          primaryViolationName:"一级",
          secondViolationName:"二级",
          thirdViolationName:"三级",
        }
      ]
    }
    return (
      <Spin  spinning={false}>
        <div>
          <TopSelect title="班主任质检报告" type={1}/>
          <QualitySurvey headers={headers}/>
      </div>
      </Spin>
    );
  }
}

export default CubePlanDetail;
