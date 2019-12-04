import React from 'react';
import BIWrapperTable from '@/components/BIWrapperTable'
import BIWrapperProgress from './BIWrapperProgress';
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

  more=(pageNum)=>{
  };

  getColumns=()=>{
    return [
      {
        title: '违规项',
        dataIndex: 'itemName',
      },
      {
        title: '质检违规数量',
        dataIndex: 'totalCount',
        align:'center',
        render: (text, record) => {
          return (
            <div style={{width:80,margin:'auto'}}>
              <BIWrapperProgress right text={record.totalCount} percent={`${record.totalCountRatio*100}%`}/>
            </div>
          );
        },
      },
      {
        title: '违规等级',
        dataIndex: 'violationLevel',
        align:'right',
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


    return (
      <div className={style.qualitySurvey} style={{marginTop:20}}>
        <div className={style.title}>违规项质检情况排行</div>
        <div>
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
