import React from 'react';
import { connect} from 'dva';
import { message,Spin } from 'antd';
import QualitySurvey from '../component/QualitySurvey2';
import SearchSelect from '../component/SearchSelect';


@connect(({ customReport,loading }) => ({
  customReport,
  loading:loading.effects['customReport/getCommentPage'],
}))

class CustomReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }


  render() {
    const {surveyData} = this.props.customReport;
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
        },
        {
          dimensionName:"服务禁语规范",
          dimensionId:"dd3",
          primaryViolationName:"一级",
          secondViolationName:"二级",
          thirdViolationName:"三级",
        },
        {
          dimensionName:"服务态度规范",
          dimensionId:"dd33",
          primaryViolationName:"一级",
          secondViolationName:"二级",
          thirdViolationName:"三级",
        },
        {
          dimensionName:"业绩规范",
          dimensionId:"dd33",
          primaryViolationName:"一级",
          secondViolationName:"二级",
          thirdViolationName:"三级",
        }
      ]
    }
    return (
      <Spin  spinning={false}>
        <div>
          <SearchSelect title="客诉质检报告" type={2}/>
          <QualitySurvey headers={headers}/>
        </div>
      </Spin>
    );
  }
}

export default CustomReport;

