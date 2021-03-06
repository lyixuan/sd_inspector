import React from 'react';
import { Tooltip } from 'antd';
import BIWrapperTable from '@/components/BIWrapperTable'
import BIWrapperProgress from './BIWrapperProgress';
import guanli from '@/assets/quality/guanli2x.png';

import style from './style.less';
import config from '../../../../config/config';
import { jumpGobalRouter } from '@/pages/ko/utils/utils';

export default class PersonRank extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getColumns=()=>{
    return [
      {
        title: '归属组织',
        dataIndex: 'itemName',
        width:250,
        render: (text, record) => {
          const traceStr = JSON.stringify({widgetName:`点击质检归属人-${this.props.traceType}`,traceName:`质检管理/${this.props.traceType}质检报告/归属人质检情况排行/点击质检归属人`});
          return (
            <>
              <Tooltip placement="right" title="点击查看质检详情" >
                <span style={{cursor:'pointer'}}  data-trace={traceStr} onClick={()=>this.jumpQualityRouter('qualityAppeal/qualityAppeal', {qualityType:"2",userName:record.userName})}>{`${record.collegeName ? record.collegeName : ''}${record.groupName ? `/${record.groupName}` : ''}`}</span>
              </Tooltip >
            </>
          );
        },
      },
      {
        title: '质检归属人',
        dataIndex: 'userName',
        width:90,
        render: (text, record) => {
          return (
            <>
              <Tooltip placement="right" title="点击查看质检详情" >
              <span style={{cursor:'pointer'}} onClick={()=>this.jumpQualityRouter('qualityAppeal/qualityAppeal', {qualityType:"2",userName:record.userName})}>{text}</span>
              </Tooltip >
              </>
          );
        },
      },
      {
        title: '质检违规数',
        dataIndex: 'totalCount',
        align:'right',
        width:90,
        render: (text, record) => {
          return (
            <div style={{width:80, float:'right'}}>
              <BIWrapperProgress  text={record.totalCount} percent={`${record.totalCountRatio*100}%`}/>
            </div>
          );
        },
      },
    ];
  };

  jumpQualityRouter = (path, params)=> {
    const { beginDate , endDate } = this.props;
    const time = {reduceScoreBeginDate:beginDate,reduceScoreEndDate:endDate};
    params = {...params,...time};
    const origin = window.location.origin;
    if (path) {
      const url = `${origin}${config.base}${path}`;
      const strParams = encodeURIComponent(JSON.stringify(params));
      window.open(`${url}?p=${strParams}`);
    }
  };

  render() {
    const { personRankData } = this.props;
    const traceStr = JSON.stringify({widgetName:`点击质检管理-${this.props.traceType}`,traceName:`质检管理/${this.props.traceType}质检报告/归属人质检情况排行/点击质检管理`});
    return (
      <div className={style.qualitySurvey} style={{marginTop:20}}>
        <div className={style.title}>归属人质检情况排行 <Tooltip placement="top" title="点击查看质检详情" >
          <img data-trace={traceStr}  onClick={()=>this.jumpQualityRouter('qualityAppeal/qualityAppeal', {})} src={guanli} alt=""/>
        </Tooltip ></div>
        <div style={{height:545}}>
          <BIWrapperTable
            name='rrt'
            columns={this.getColumns()}
            rowKey={(record, index) => index}
            dataSource={personRankData}
            size="middle"
            pagination={false}
            scroll={{ y:470 }}
          />
        </div>
      </div>
    );
  }
}
