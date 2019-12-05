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
          return (
            <>
              <span style={{cursor:'pointer'}} onClick={()=>this.jumpQualityRouter('qualityAppeal/qualityAppeal', {qualityType:"2",userName:record.userName})}>{`${record.collegeName ? record.collegeName : ''}${record.groupName ? `/${record.groupName}` : ''}`}</span>
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
              <span style={{cursor:'pointer'}} onClick={()=>this.jumpQualityRouter('qualityAppeal/qualityAppeal', {qualityType:"2",userName:record.userName})}>{text}</span>
            </>
          );
        },
      },
      {
        title: '质检违规数',
        dataIndex: 'totalCount',
        align:'center',
        width:100,
        render: (text, record) => {
          return (
            <div style={{width:80,margin:'auto'}}>
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

    return (
      <div className={style.qualitySurvey} style={{marginTop:20}}>
        <div className={style.title}>归属人质检情况排行 <Tooltip placement="top" title="点击查看质检详情" >
          <img onClick={()=>this.jumpQualityRouter('qualityAppeal/qualityAppeal', {})} src={guanli} alt=""/>
        </Tooltip ></div>
        <div>
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
