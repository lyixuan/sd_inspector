import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
import xdPkImg from '@/assets/workBench/incomeImg.gif';
import BILoading from '@/components/BILoading'
@connect(({ xdFamilyModal, loading }) => ({
  familyIncomeGroup: xdFamilyModal.familyIncomeGroup,
  loading: loading.effects['xdFamilyModal/getIncomeFamilyGroupPk'],
}))
class GroupIncome extends React.Component {
  componentDidMount() {
    this.props.getIncomeFamilyGroupPk(this.props.familyAndGroup.state.groupPkInitFlag);
  }
  columns = () => {
    const { colName = [] } = this.props.familyIncomeGroup;
    const columns = [{
      title: '创收维度',
      dataIndex: '创收维度',
      key: '创收维度',
      width: "12%",
      render: (text, record) => record && record.option[0],
    }];

    if (colName && colName.length > 0) {
      colName.map(({ groupName, groupId }, index) => columns.push({
        title: groupName,
        dataIndex: groupName,
        key: groupName,
        className: this.getTdClass(groupId),
        width: '13%',
        render: (text, record) => record && record.option[index + 1],
      }))
    }
    return columns || []
  }
  // setRowClassName = (record) => {
  //   console.log(record, 'kkkkkk')
  //   let className = ''
  //   if (record.level === 1 && record.dimensionName === "学分均分") {
  //     className = "oneLevelBgColor"
  //   } else if (record.level === 1 && record.dimensionName !== "学分均分") {
  //     className = "otherLevelBgColor"
  //   } else {
  //     className = "otherLevelBgColor1"
  //   }
  //   return className
  // }
  getTdClass = (groupId) => {
    if (this.props.familyAndGroup) {
      const { myGroupValue = [] } = this.props.familyAndGroup.state;
      if (myGroupValue.includes(String(groupId))) {
        return styles.row1;
      } else {
        return styles.row2;
      }
    }
  }
  render() {
    const dataSource = this.props.familyIncomeGroup && this.props.familyIncomeGroup.dataShow;
    const { colName = []} = this.props.familyIncomeGroup && this.props.familyIncomeGroup;
    return (
      <div className={styles.creditContainer} style={{ display: 'block' }}>
        <BILoading isLoading={this.props.loading}>
          {
            <BITable
              columns={this.columns()}
              dataSource={dataSource || []}
              pagination={false}
              rowKey={(record, index) => index}
              scroll={{ y: 408 }}
              smalled
            />
          }
          {
            colName.length <=0 && <div className={styles.tableImg}><img src={xdPkImg} /></div>
          }
        </BILoading>
      </div>
    );
  }
}

export default GroupIncome;
