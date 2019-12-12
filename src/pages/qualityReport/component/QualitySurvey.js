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

  getDom =()=>{
    let domLeft = document.querySelector(".qualitySurveyTable .ant-table-fixed-left .ant-table-body-outer .ant-table-tbody tr:last-child");
    let dom0 = document.querySelector(".qualitySurveyTable .ant-table-scroll .ant-table-body .ant-table-tbody tr:last-child");

    const that = this;
    if(!(domLeft && dom0)){
      setTimeout(function() {
        that.getDom();
      }, 500);
    } else {
      let domLeft1 = domLeft.querySelector("td:nth-child(1)");
      let domLeft2 = domLeft.querySelector("td:nth-child(2)");
      let dom1 = dom0.querySelector("td:nth-child(1)");
      let dom1List = dom0.querySelectorAll("td");
      domLeft.setAttribute('style',"position: absolute;");
      dom0.setAttribute('style',"position: absolute;");
      domLeft1.setAttribute('style',"text-align: left;width:90px;");
      domLeft2.setAttribute('style',"text-align: right;width:70px;");

      dom1.setAttribute('style',"text-align: left;width:90px;");
      dom1List.forEach((domItem)=>{
        domItem.setAttribute('style',"text-align: center;width:70px;")
      })
    }
      // dom.removeChild(rmdom1)
      // dom.removeChild(rmdom2)
      // dom.removeChild(rmdom3)
    // }
  };

  getColumns = (lastLineIdx) => {
    const { name, totalCountName, specialViolationName, dimensionNameList = [] } = this.props.headers || {};
    const {maxCount,scrollx} = this.props;
    const col1 = [
      {
        title: name,
        dataIndex: 'name',
        align:'left',
        width:scrollx?90:130,
        fixed: 'left',
      },
      {
        title: totalCountName,
        dataIndex: 'totalCount',
        align:'right',
        width:scrollx?70:90,
        fixed: 'left',
      },
      {
        title: specialViolationName,
        dataIndex: 'specialViolationCount',
        align:'center',
        width:scrollx?70:'',
      }];

    const col2 = dimensionNameList && dimensionNameList.map((val) => {
      const colCell1 = {
        title:<span className={style.ttbg}><span className={style.dotStl} style={{ background: '#F34E2D' }}/> <span>{val.primaryViolationName}</span></span>,
        align:'center',
        dataIndex: val.dimensionId + val.primaryViolationName,
        width:scrollx?70:'',
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
        width:scrollx?70:'',
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
        width:scrollx?70:'',
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

  render() {
    // this.getDom();
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
