import React from 'react';
import BIWrapperTable from '@/components/BIWrapperTable'
import BIWrapperProgress from './BIWrapperProgress';
import style from './style.less';

export default class PersonRank extends React.Component {
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
        title: '归属组织',
        dataIndex: 'itemName',
        width:250,
        render: (text, record) => {
          return (
            <>
              {`${record.collegeName ? record.collegeName : ''}${record.groupName ? `/${record.groupName}` : ''}`}
            </>
          );
        },
      },
      {
        title: '质检归属人',
        dataIndex: 'userName',
        width:90,
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


  render() {
    const { personRankData } = this.props;

    return (
      <div className={style.qualitySurvey} style={{marginTop:20}}>
        <div className={style.title}>归属人质检情况排行</div>
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
