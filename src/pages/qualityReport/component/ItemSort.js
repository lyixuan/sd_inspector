import React from 'react';
import { Tooltip } from 'antd';
import BIWrapperTable from '@/components/BIWrapperTable'
import { jumpGobalRouter } from '@/pages/ko/utils/utils';
import BIWrapperProgress from './BIWrapperProgress';
import shouce from '@/assets/quality/shouce2x.png';
import yi from '@/assets/quality/yi.png';
import er from '@/assets/quality/er.png';
import san from '@/assets/quality/san.png';
import te from '@/assets/quality/te.png';
import style from './style.less';

export default class ItemSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  getColumns=()=>{
    return [
      {
        title: '违规项',
        dataIndex: 'itemName',
        width:250,
        render: (text, record) => {
          const traceStr = JSON.stringify({widgetName:`点击违规项-${this.props.traceType}`,traceName:`质检管理/${this.props.traceType}质检报告/违规项质检情况排行/点击违规项`});
          return (
            <>
              <Tooltip placement="right" title="点击查看质检细则" >
                <span style={{cursor:'pointer'}} data-trace={traceStr}  onClick={()=>jumpGobalRouter(`classQuality/qualityType/${this.props.traceType==='班主任'?2:1}`, {keyWord: text})}>{text}</span>
              </Tooltip >
            </>
          );
        },
      },
      {
        title: '质检违规数量',
        dataIndex: 'totalCount',
        width:90,
        align:'center',
        render: (text, record) => {
          return (
            <div style={{width:80,margin:'auto'}}>
              <BIWrapperProgress  text={record.totalCount} percent={`${record.totalCountRatio*100}%`}/>
            </div>
          );
        },
      },
      {
        title: '违规等级',
        dataIndex: 'violationLevel',
        align:'right',
        width:90,
        render: (text, record) => {
          let str = yi;
            if(record.violationLevel ==='一级违规'){
              str=yi;
            }
          if(record.violationLevel ==='二级违规'){
            str=er;
          }
          if(record.violationLevel ==='三级违规'){
            str=san;
          }
          if(record.violationLevel ==='特级违规'){
            str=te;
          }
          return (
            <div style={{width:80,float:'right'}}>
              <img width={70} src={str} alt=""/>
            </div>
          );
        },
      },
    ];
  };

  render() {
    const { assortmentRankData } = this.props;
    const traceStr = JSON.stringify({widgetName:`点击质检手册入口-${this.props.traceType}`,traceName:`质检管理/${this.props.traceType}质检报告/违规项质检情况排行/点击质检手册入口`});
    return (
      <div className={style.qualitySurvey} style={{marginTop:20}}>
        <div className={style.title}>违规项质检情况排行 <Tooltip placement="top" title="点击查看质检细则" >
          <img data-trace={traceStr} onClick={()=>jumpGobalRouter(`classQuality/qualityType/${this.props.traceType==='班主任'?2:1}`, {})} src={shouce} alt=""/>
        </Tooltip ></div>
        <div style={{height:545}}>
          <BIWrapperTable
            name='rrt'
            columns={this.getColumns()}
            rowKey={(record, index) => index}
            dataSource={assortmentRankData}
            size="middle"
            pagination={false}
            scroll={{ y:470 }}
          />
        </div>
      </div>
    );
  }
}
