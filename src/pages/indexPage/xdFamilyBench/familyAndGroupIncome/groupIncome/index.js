import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
@connect(({ xdWorkModal, loading }) => ({
  familyIncomeGroup: xdWorkModal.familyIncomeGroup,
  loading: loading.effects['xdWorkModal/getIncomeFamilyGroupPk'],
}))
class GroupIncome extends React.Component {
  componentDidMount() {
    this.props.getIncomeFamilyGroupPk(true);
  }
  columns = () =>{
    const { colName = [] } = this.props.familyIncomeGroup;
    const columns = [{
        title: '创收维度',
        dataIndex: '创收维度',
        key: '创收维度',
        render: (text, record) => record[0],
      }];
    
    if (colName && colName.length > 0) {
      colName.map(({ groupName, groupId }, index) => columns.push({
        title: groupName,
        dataIndex: groupName,
        key: groupName,
        className: this.getTdClass(groupId),
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
    return (
      <div className={styles.creditContainer} style={{display:'block'}}>
        {
          <BITable
            columns={this.columns()}
            dataSource={this.props.familyIncomeGroup.data || []}
            pagination={false}
            loading={this.props.loading}
            rowKey={record => record.id}
            scroll={{ y: 208 }}
            smalled
          >
          </BITable>
        }

      </div>
    );
  }
}

export default GroupIncome;
