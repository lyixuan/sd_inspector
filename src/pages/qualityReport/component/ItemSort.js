import React from 'react';
import { Avatar,Spin } from 'antd';
import BIWrapperTable from '@/components/BIWrapperTable'
import style from './style.less';
import { handleDataTrace } from '@/utils/utils';

export default class ItemSort extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  more=(pageNum)=>{
  };

  openBBModal=()=>{

  };


  render() {
    const { screenRange, commentData ,commentLists} = this.props;


    return (
      <div className={style.qualitySurvey}>
        <div className={style.title}>违规项质检情况排行</div>
        <div>
          {/*<BIWrapperTable*/}
            {/*name='rrt'*/}
            {/*columns={this.getColumns()}*/}
            {/*rowKey={(record, index) => index}*/}
            {/*dataSource={data}*/}
            {/*bordered*/}
            {/*size="middle"*/}
            {/*pagination={false}*/}
            {/*scroll={{ y:470 }}*/}
          {/*/>*/}
        </div>
      </div>
    );
  }
}
