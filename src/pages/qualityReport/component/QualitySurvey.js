import React from 'react';
import BIWrapperTable from '@/components/BIWrapperTable'
import style from './style.less';

export default class QualitySurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    // this.getDom();
  }

  getColumns = (lastLineIdx) => {
    const { name, totalCountName, specialViolationName, dimensionNameList = [] } = this.props.headers || {};
    const {maxCount,scrollx} = this.props;
    const col1 = [
      {
        title: name,
        dataIndex: 'name',
        align:'left',
        width:130,
      },
      {
        title: totalCountName,
        dataIndex: 'totalCount',
        align:'right',
        width:90,
      },
      {
        title: specialViolationName,
        dataIndex: 'specialViolationCount',
        align:'center',
      }];

    const col2 = dimensionNameList && dimensionNameList.map((val) => {
      const colCell1 = {
        title:<span className={style.ttbg}><span className={style.dotStl} style={{ background: '#F34E2D' }}/> <span>{val.primaryViolationName}</span></span>,
        align:'center',
        dataIndex: val.dimensionId + val.primaryViolationName,
        width:scrollx?76:'',
        render: (text, record,idx) => {
          return (
            <>
              <span className={style.cell} style={{background:`rgba(242,45,47,${record[val.dimensionId + val.primaryViolationName]&&idx!==lastLineIdx?record[val.dimensionId + val.primaryViolationName]/maxCount:0})`}}>{record[val.dimensionId + val.primaryViolationName]}</span>
            </>
          );
        },
      };
      const colCell2 = {
        title:<span><span className={style.dotStl} style={{ background: '#F0963C' }}/> <span>{val.secondViolationName}</span></span>,
        align:'center',
        dataIndex: val.dimensionId + val.secondViolationName,
        width:scrollx?76:'',
        render: (text, record,idx) => {
          return (
            <>
              <span className={style.cell} style={{background:`rgba(242,45,47,${record[val.dimensionId + val.secondViolationName]&&idx!==lastLineIdx?record[val.dimensionId + val.secondViolationName]/maxCount:0})`}}>{record[val.dimensionId + val.secondViolationName]}</span>
            </>
          );
        },
      };
      const colCell3 = {
        title: <span><span className={style.dotStl} style={{ background: '#32B67A' }}/> <span>{val.thirdViolationName}</span></span>,
        align:'center',
        dataIndex: val.dimensionId + val.thirdViolationName,
        width:scrollx?76:'',
        render: (text, record,idx) => {
          return (
            <>
              <span className={style.cell} style={{background:`rgba(242,45,47,${record[val.dimensionId + val.thirdViolationName]&&idx!==lastLineIdx?record[val.dimensionId + val.thirdViolationName]/maxCount:0})`}}>{record[val.dimensionId + val.thirdViolationName]}</span>
            </>
          );
        },
      };

      const children = [];
      if(val.primaryViolationName){
        children.push(colCell1)
      }
      if(val.secondViolationName){
        children.push(colCell2)
      }
      if(val.thirdViolationName){
        children.push(colCell3)
      }
      return {
        title: val.dimensionName,
        children,
      };
    });

    return col1.concat(col2);
  };

  getValues = () => {
    const { values=[] } = this.props;
    let data = [];
    values.map((item)=>{
      let details = {name:item.name,totalCount:item.totalCount,specialViolationCount:item.specialViolationCount};
      item.dimensionCountList.forEach((val)=>{
        details[val.dimensionId+'一级'] = val.primaryViolationCount;
        details[val.dimensionId+'二级'] = val.secondViolationCount;
        details[val.dimensionId+'三级'] = val.thirdViolationCount;
      });
      data.push(details);
    });
    data.push(data[0]);
    data = data.slice(1);
    const column = this.getColumns(data.length-1);
    return {data,column};
  };

  getDom =()=>{
    const {scrollx} = this.props;
    let dom0 = scrollx?document.querySelector(".qualitySurveyTable .ant-table-fixed .ant-table-thead tr:nth-child(1)"):document.querySelector(".qualitySurveyTable .ant-table-thead tr:nth-child(1)");
    let dom = scrollx?document.querySelector(".qualitySurveyTable .ant-table-fixed .ant-table-thead tr:nth-child(2)"):document.querySelector(".qualitySurveyTable .ant-table-thead tr:nth-child(2)");

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

    const {scrollx} = this.props;
    const scrollData = scrollx?{x:'max-content',y:470} : {y:470};
    const {data,column} = this.getValues();
    return (
      <div className={style.qualitySurvey}>
        <div className={style.title}>质检违规场景概览</div>
        <div className="qualitySurveyTable">
          <BIWrapperTable
            name='sadfa'
            columns={column}
            rowKey={(record, index) => index}
            dataSource={data}
            bordered
            size="middle"
            pagination={false}
            scroll={scrollData}
          />
        </div>
      </div>
    );
  }
}
