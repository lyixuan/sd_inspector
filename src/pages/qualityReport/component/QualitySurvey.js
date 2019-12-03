import React from 'react';
import { Table, Spin } from 'antd';
import BIWrapperTable from '@/components/BIWrapperTable'
import style from './style.less';
import { BiFilter } from '@/utils/utils';

export default class QualitySurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getDom();
  }

  clickXing = (lv) => {
    this.props.clickXing && this.props.clickXing(lv);
  };

  getColumns = () => {
    const { name, totalCountName, specialViolationName, dimensionNameList = [] } = this.props.headers || {};

    const ddd = {
      key: 1,
      name: 'John Brown',
      totalCount: 1 + 1,
      street: 'Lake Park',
      building: 'C',
      number: 2035,
      companyAddress: 'Lake Street 42',
      companyName: 'SoftLake Co',
      gender: 'M',
    }
    const col1 = [
      {
        title: name,
        dataIndex: 'name',
        children: [{
          // title: name,
          // dataIndex: 'name',
          children: [{
            title:'总计',
            dataIndex: 'name',
            align:'center'
          }]
        }]
      },
      {
        title: totalCountName,
        dataIndex: 'totalCount',
        width:80,
        align:'right',
        children: [{
          children: [{
            title:ddd.totalCount,
            dataIndex: 'totalCount',
            align:'right'
          }]
        }]
      },
      {
        title: specialViolationName,
        dataIndex: 'specialViolationCount',
        children: [{
          children: [{
            title:ddd.specialViolationCount,
            dataIndex: 'specialViolationCount',
            align:'center'
          }]
        }]
      }];

    const col2 = dimensionNameList && dimensionNameList.map((val) => {
      return {
        title: val.dimensionName,
        children: [{
          title:<span><span className={style.dotStl} style={{ background: '#F34E2D' }}/> <span>{val.primaryViolationName}</span></span>,
          dataIndex: val.dimensionId + val.primaryViolationName,
          align:'center',
          children: [{
            title:ddd[val.dimensionId + val.primaryViolationName],
            dataIndex: val.dimensionId + val.primaryViolationName,
            align:'center'
          }]
        },
          {
            title:<span><span className={style.dotStl} style={{ background: '#F0963C' }}/> <span>{val.secondViolationName}</span></span>,
            dataIndex: val.dimensionId + val.secondViolationName,
            align:'center',
            children: [{
              title:ddd[val.dimensionId + val.secondViolationName],
              dataIndex: val.dimensionId + val.secondViolationName,
              align:'center'
            }]
          },
          {
            title: <span><span className={style.dotStl} style={{ background: '#32B67A' }}/> <span>{val.thirdViolationName}</span></span>,
            dataIndex: val.dimensionId + val.thirdViolationName,
            align:'center',
            children: [{
              title:ddd[val.dimensionId + val.thirdViolationName],
              dataIndex: val.dimensionId + val.thirdViolationName,
              align:'center'
            }]
          }],
      };
    });
    return col1.concat(col2);
  };

  getDom =()=>{
    let dom0 = document.querySelector(".qualitySurveyTable .ant-table-thead tr:nth-child(1)");
    let dom = document.querySelector(".qualitySurveyTable .ant-table-thead tr:nth-child(2)");
    let spandom1 = dom0.querySelector("th:nth-child(1)");
    let spandom2 = dom0.querySelector("th:nth-child(2)");
    let spandom3 = dom0.querySelector("th:nth-child(3)");
    let rmdom1 = dom.querySelector("th:nth-child(1)");
    let rmdom2 = dom.querySelector("th:nth-child(2)");
    let rmdom3 = dom.querySelector("th:nth-child(3)");
    if(!dom){
      this.getDom();
    } else {
      spandom1.setAttribute('rowspan',2)
      spandom2.setAttribute('rowspan',2)
      spandom3.setAttribute('rowspan',2)
      dom.removeChild(rmdom1)
      dom.removeChild(rmdom2)
      dom.removeChild(rmdom3)
    }
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
            name='sadfa'
            columns={this.getColumns()}
            rowKey={(record, index) => index}
            dataSource={data}
            bordered
            size="middle"
            pagination={false}
            scroll={{ y:470 }}
          />
        </div>
      </div>
    );
  }
}
