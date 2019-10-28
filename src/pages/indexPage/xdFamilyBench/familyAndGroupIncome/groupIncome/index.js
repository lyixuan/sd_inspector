import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
import xdPkImg from '@/assets/workBench/incomeImg.gif';
import BILoading from '@/components/BILoading'
@connect(({ xdWorkModal, loading }) => ({
  familyIncomeGroup: xdWorkModal.familyIncomeGroup,
  loading: loading.effects['xdWorkModal/getIncomeFamilyGroupPk'],
}))
class GroupIncome extends React.Component {
  componentDidMount() {
    console.log(11, this.props.familyAndGroup)
    this.props.getIncomeFamilyGroupPk(this.props.familyAndGroup.state.groupPkInitFlag);
  }
  columns = () => {
    const { colName = [] } = this.props.familyIncomeGroup;
    const columns = [{
      title: '创收维度',
      dataIndex: '创收维度',
      key: '创收维度',
      width: "12%",
      render: (text, record) => record[0],
    }];

    if (colName && colName.length > 0) {
      colName.map(({ groupName, groupId }, index) => columns.push({
        title: groupName,
        dataIndex: groupName,
        key: groupName,
        className: this.getTdClass(groupId),
        width: '13%',
        render: (text, record) => record[index + 1],
      }))
    }
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

    const dataSource = this.props.familyIncomeGroup && this.props.familyIncomeGroup.data
    const colName = this.props.familyIncomeGroup && this.props.familyIncomeGroup.colName
    return (
      <div className={styles.creditContainer} style={{ display: 'block' }}>
        {
          this.props.loading?<BILoading isLoading={this.props.loading} />:<BITable
            columns={this.columns()}
            dataSource={dataSource || []}
            pagination={false}
            loading={this.props.loading}
            rowKey={record => record.id}
            scroll={{ y: 408 }}
            smalled
          >
          </BITable>
        }
        {
          (colName || []).length <=0 && !this.props.loading && <div className={styles.tableImg}><img src={xdPkImg} /></div>
        }
      </div>
    );
  }
}

export default GroupIncome;
