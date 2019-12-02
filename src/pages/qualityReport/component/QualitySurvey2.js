import React from 'react';
import { Table, Spin } from 'antd';
import BIWrapperTable from '@/pages/qualityReport/component/BIWrapperTable2'
import style from './style.less';

export default class QualitySurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  clickXing = (lv) => {
    this.props.clickXing && this.props.clickXing(lv);
  };


  getColumns = () => {
    const { name, totalCountName, specialViolationName, dimensionNameList = [] } = this.props.headers || {};
    const col1 = [
      {
        title: name,
        dataIndex: 'name',
        fixed:'left',
        width:140
      },
      {
        title: totalCountName,
        dataIndex: 'totalCount',
        fixed:'left',
        width:80,
        align:'right'
      },
      {
        title: specialViolationName,
        dataIndex: 'specialViolationCount',
      }];

    const col2 = dimensionNameList && dimensionNameList.map((val) => {
      return {
        title: val.dimensionName,
        children: [{
          title:<span><span className={style.dotStl} style={{ background: '#F34E2D' }}/> <span>{val.primaryViolationName}</span></span>,
          dataIndex: val.dimensionId + val.primaryViolationName,
          width:80,
          align:'center'
        },
          {
            title:<span><span className={style.dotStl} style={{ background: '#F0963C' }}/> <span>{val.secondViolationName}</span></span>,
            dataIndex: val.dimensionId + val.secondViolationName,
            width:80,
            align:'center'
          },
          {
            title: <span><span className={style.dotStl} style={{ background: '#32B67A' }}/> <span>{val.thirdViolationName}</span></span>,
            dataIndex: val.dimensionId + val.thirdViolationName,
            width:80,
            align:'center'
          }],
      };
    });
    return col1.concat(col2);
  };

  render() {
    const { top = 10, type = 'class', cycle = 'current', linkTital = '质检手册', linkRouter = '', width = 1280, headers } = this.props;


    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        key: i,
        name: 'John Brown',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
      });
    }

    return (
      <div className={style.qualitySurvey}>
        <div className={style.title}>质检违规场景概览</div>
        <div className="qualitySurveyTable">
          <BIWrapperTable
            name='sadfab'
            columns={this.getColumns()}
            rowKey={(record, index) => index}
            dataSource={data}
            bordered
            size="middle"
            pagination={false}
            scroll={{x:'max-content', y:470 }}
          />
        </div>
      </div>
    );
  }
}
