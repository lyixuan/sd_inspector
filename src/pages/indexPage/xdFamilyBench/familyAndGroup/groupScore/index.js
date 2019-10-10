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
class GroupScore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1',
      "data": {
        "dimensionList": [{
          "children": [],
          "dimensionName": "绩效排名系数",
          "shangOne": ["2","3","4","5"],
          "id": -1,
          "myNum": 0,
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "集团排名",
          "shangOne": ["50/93","50/92","50/94","50/95"],
          "id": -2,
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "家族内排名",
          "shangOne": [3355,333,444,555],
          "id": -3,
          "myNum": 0,
          "myScore": "13/28",
          "myScoreRatio": null,
          "parentId": 0,
          "unit": null
        }, {
          "children": [],
          "dimensionName": "人均在服学员",
          "shangOne": [8.11,8.11,8.11,8.11],
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
                "shangOne": [2.78,2.78,2.78,2.78,],
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
              "shangOne": [2.78,2.78,2.78,2.78,],
              "id": 36,
              "myNum": 0,
              "myScore": "5.09",
              "myScoreRatio": "16.31",
              "parentId": 2,
              "unit": ""
            }, {
              "dimensionName": "有效做题",
              "shangOne": [2.78,2.78,2.78,2.78,],
              "id": 39,
              "myNum": 0,
              "myScore": "5.19",
              "myScoreRatio": "35.49",
              "parentId": 2,
              "unit": "",
              children:[]
            }],
            "dimensionName": "正面均分",
            "shangOne": [2.78,2.78,2.78,2.78,],
            "id": 2,
            "myNum": 0,
            "myScore":"11.81" ,
            "myScoreRatio": "14.15",
            "parentId": 1,
            "unit": ""
          },{
            "dimensionName": "负面均分",
            "shangOne": [-5.11,-5.11,-5.11,-5.11,],
            "parentId": 0,
            "unit": "",
            id:'-1'
          }],
          "dimensionName": "学分均分",
          "shangOne": [2.78,2.78,2.78,2.78,],
          "id": 1,
          "myNum": 0,
          "myScore": "11.16",
          "myScoreRatio": "4.95",
          "parentId": 0,
          "unit": ""
        }],
        mygroup:[{id:1,familyName:'狐逻&泰罗/狐逻会计'},{id:2,familyName:'狐逻&泰罗/狐逻会计'},{id:3,familyName:'狐逻&泰罗/狐逻会计'},{id:4,familyName:'狐逻&泰罗/狐逻会计'}]
      },
      groupList:[],
      pkGroupIds:null,
      myFamilyGroupList:[]
    }
  }
  componentDidMount() {
    this.getGroupPkList();
  }
  getGroupPkList=()=>{
    this.props.dispatch({
      type:'xdWorkModal/getGroupPkList',
      payload: { params: {pkGroupIds:this.state.pkGroupIds} },
      callback: (data) => {
        this.setState({
          groupList: data
        })
      }
    })
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
    const {mygroup} = this.state.data
    const columns = [
      {
        title:'学分维度',
        dataIndex:'dimensionName',
        key:'dimensionName',
        width:"16%"
      }
    ]
    mygroup.map((item,index)=>{
      columns.push({
        title:item.familyName,
        dataIndex:item.id,
        key:item.id,
        render:(text,record)=>{
          return(
          <div>
            {record.shangOne&&record.shangOne[index]}
            </div>
          )
        }
      })
    })

    return columns || []
  }
  setRowClassName = (record) => {
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

export default GroupScore;
