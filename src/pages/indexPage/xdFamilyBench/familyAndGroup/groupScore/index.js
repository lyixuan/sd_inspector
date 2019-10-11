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
      groupList:{},
      pkGroupIds:null,
      myFamilyGroupList:[],
      userInfo:{}
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
    const {familyGroupPkList} = this.props.xdWorkModal.xdWorkModal
    const columns = [
      {
        title:'学分维度',
        dataIndex:'dimensionName',
        key:'dimensionName',
        width:"16%"
      }
    ]
    familyGroupPkList.groupList.map((item,index)=>{
      columns.push({
        title:item.groupName,
        dataIndex:item.groupId,
        key:item.groupId,
        render:(text,record)=>{
          return(
          <div>
            {record.values&&record.values[index]}
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
    console.log(83,this.props.nums)
    const {familyGroupPkList} = this.props.xdWorkModal.xdWorkModal
    const dataSource = familyGroupPkList && familyGroupPkList.dimensionList&&familyGroupPkList.dimensionList.length > 0 && this.fillDataSource(familyGroupPkList.dimensionList)
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
