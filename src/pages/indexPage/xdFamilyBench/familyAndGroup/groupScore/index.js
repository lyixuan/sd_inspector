import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
import xdPkImg from '@/assets/workBench/incomeImg.gif';
import BILoading from '@/components/BILoading'
function CustomExpandIcon(props) {
  return (
    <a />
  );
}
@connect(({xdFamilyModal,loading}) => ({
  xdFamilyModal,
  loading: loading.effects['xdFamilyModal/getGroupPkList'],
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
    this.props.getGroupPkList(this.props.familyAndGroup.state.showFamilyGroup);
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
    const {familyGroupPkList} = this.props.xdFamilyModal
    const columns = [
      {
        title:'学分维度',
        dataIndex:'dimensionName',
        key:'dimensionName',
        width:"12%"
      }
    ]
    familyGroupPkList.groupList.map((item,index)=>{
      columns.push({
        title:item.groupName,
        dataIndex:item.groupId,
        key:item.groupId,
        width:'13%',
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
    const {familyGroupPkList} = this.props.xdFamilyModal
    const dataSource = familyGroupPkList && familyGroupPkList.dimensionList&&familyGroupPkList.dimensionList.length > 0 && this.fillDataSource(familyGroupPkList.dimensionList)
    return (
      <div className={styles.creditContainer} style={{display:'block'}}>
        <BILoading isLoading={this.props.loading}>
          {dataSource && dataSource.length > 0 && <BITable
            columns={this.columns()}
            dataSource={dataSource}
            defaultExpandAllRows={true}
            expandIcon={CustomExpandIcon}
            rowClassName={this.setRowClassName}
            pagination={false}
            scroll={{ x: 0, y: 408 }}
            rowKey={record => record.id}
          />}
          {
            familyGroupPkList && familyGroupPkList.groupList <=0 && <div className={styles.tableImg}><img src={xdPkImg} /></div>
          }
        </BILoading>
      </div>
    );
  }
}

export default GroupScore;
