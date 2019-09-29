import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
function CustomExpandIcon(props) {
  return (
    <a />
  );
}
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class GroupIncome extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      "data": {
        "dimensionList": [{
          "children": [],
          "dimensionName": "绩效排名系数",
          "shangOne": "2",
          "shangTwo": "2",
          "hanOne": "2",
          "hanTwo": "2",
          "guanOne": "2",
          "guanTwo": "2",
          "id": -1,
          "myNum": 0,
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "集团排名",
          "shangOne": "50/93",
          "shangTwo": "50/93",
          "hanOne": "50/93",
          "hanTwo": "50/93",
          "guanOne": "50/93",
          "guanTwo": "50/93",
          "id": -2,
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "家族内排名",
          "shangOne": "3355",
          "shangTwo": "3355",
          "hanOne": "3355",
          "hanTwo": "3355",
          "guanOne": "3355",
          "guanTwo": "3355",
          "id": -3,
          "myNum": 0,
          "myScore": "13/28",
          "myScoreRatio": null,
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "人均在服学员",
          "shangOne": "8.11",
          "shangTwo": "8.11",
          "hanOne": "8.11",
          "hanTwo": "8.11",
          "guanOne": "8.11",
          "guanTwo": "8.11",
          "id": -4,
          "myNum": 0,
          "myScore": "1672",
          "myScoreRatio": "0.00",
          "parentId": 0,
          "unit": null
        }, {
          "children": [{
            "children": [{
              "children": [{
                "children": [],
                "dimensionName": "有效直播",
                "shangOne": "2.78",
                "shangTwo": "2.78",
                "hanOne": "2.78",
                "hanTwo": "2.78",
                "guanOne": "2.78",
                "guanTwo": "2.78",
                "id": 37,
                "myNum": 5049,
                "myScore": "3.63",
                "myScoreRatio": "6.80",
                "parentId": 36,
                "unit": "个"
              }, {
                "children": [],
                "dimensionName": "有效重播",
                "groupScore": "0.64",
                "id": 38,
                "myNum": 4023,
                "myScore": "1.46",
                "myScoreRatio": "49.41",
                "parentId": 36,
                "unit": "个"
              }],
              "dimensionName": "有效出勤",
              "shangOne": "3.61",
              "shangTwo": "3.61",
              "hanOne": "3.61",
              "hanTwo": "3.61",
              "guanOne": "3.61",
              "guanTwo": "3.61",
              "id": 36,
              "myNum": 0,
              "myScore": "5.09",
              "myScoreRatio": "16.31",
              "parentId": 2,
              "unit": ""
            }, {
              "dimensionName": "有效做题",
              "shangOne": "3.69",
              "shangTwo": "3.69",
              "hanOne": "3.69",
              "hanTwo": "3.69",
              "guanOne": "3.69",
              "guanTwo": "3.69",
              "id": 39,
              "myNum": 0,
              "myScore": "5.19",
              "myScoreRatio": "35.49",
              "parentId": 2,
              "unit": "",
              children:[]
            }],
            "dimensionName": "正面均分",
            "shangOne": "6.80",
            "shangTwo": "6.80",
            "hanOne": "6.80",
            "hanTwo": "6.80",
            "guanOne": "6.80",
            "guanTwo": "6.80",
            "id": 2,
            "myNum": 0,
            "myScore":"11.81" ,
            "myScoreRatio": "14.15",
            "parentId": 1,
            "unit": ""
          },{
            "dimensionName": "负面均分",
            "shangOne": "-5.11",
            "shangTwo": "-5.11",
            "hanOne": "-5.11",
            "hanTwo": "-5.11",
            "guanOne": "-5.11",
            "guanTwo": "-5.11",
            "parentId": 0,
            "unit": "",
            id:'-1'
          }],
          "dimensionName": "学分均分",
          "shangOne": "8.11",
          "shangTwo": "8.11",
          "hanOne": "8.11",
          "hanTwo": "8.11",
          "guanOne": "8.11",
          "guanTwo": "8.11",
          "id": 1,
          "myNum": 0,
          "myScore": "11.16",
          "myScoreRatio": "4.95",
          "parentId": 0,
          "unit": ""
        }]
      }
    }
  }
  componentDidMount() {

  }
  fillDataSource = (params, n = 1) => {
    let data = params
    data.map(item => {
      item.level = n;
      if (item.children && item.children.length > 0) {
        this.fillDataSource(item.children, n + 1);
      }
    })
    return data
  }
  columns = () =>{
    const columns = [
      {
        title:'学分维度',
        dataIndex:'dimensionName',
        key:'dimensionName',
        width:"20%"
      },{
        title:'全工商/一组',
        dataIndex:'shangOne',
        key:'shangOne',
        width:'14%'
      },{
        title:'全工商/二组',
        dataIndex:'shangTwo',
        key:'shangTwo',
        width:'14%'
      },{
        title:'汉专/一组',
        dataIndex:'hanOne',
        key:'hanOne',
        width:'14%'
      },{
        title:'汉专/二组',
        dataIndex:'hanTwo',
        key:'hanTwo',
        width:'14%'
      },{
        title:'行管/一组',
        dataIndex:'guanOne',
        key:'guanOne',
        width:'14%'
      },{
        title:'行管/二组',
        dataIndex:'guanTwo',
        key:'guanTwo'
      }
    ]
    return columns || []
  }
  setRowClassName = (record) => {
    console.log()
    let className = ''
    if (record.level === 1 && record.dimensionName === "学分均分") {
      className = "oneLevelBgColor"
    } else if (record.level === 1 && record.dimensionName !== "学分均分") {
      className = "otherLevelBgColor"
    } else {
      className = "otherLevelBgColor1"
    }
    return className
  }
  render() {
    const {data} = this.state
    const dataSource = data && data.dimensionList.length > 0 && this.fillDataSource(data.dimensionList)
    return (
      <div className={styles.creditContainer} style={{display:'block'}}>
        {
          dataSource && dataSource.length > 0 && <BITable
            columns={this.columns()}
            dataSource={dataSource}
            defaultExpandAllRows={true}
            expandIcon={CustomExpandIcon}
            rowClassName={this.setRowClassName}
            pagination={false}
            scroll={{ x: 0, y: 408 }}
            rowKey={record => record.id}
            loading={this.props.loading}
          >
          </BITable>
        }

      </div>
    );
  }
}

export default GroupIncome;
