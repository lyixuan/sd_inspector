import React from 'react';
import { connect } from 'dva';
import styles from '../style.less';
import BITable from '@/ant_components/BITable'
@connect(({ xdWorkModal, loading }) => ({
  profitList: xdWorkModal.familyIncomeGroup || [],
  loading: loading.effects['xdWorkModal/getIncomeFamilyGroupPk'],
}))
class GroupIncome extends React.Component {
  componentDidMount() {
    this.props.getIncomeFamilyGroupPk();
  }
  fillDataSource = () => {
    const [ _, ...others] = this.props.profitList;
    return others;
  }
  columns = () =>{
    const { profitList } = this.props;
    const columns = [];
    if (profitList && profitList.length > 0) {
      profitList[0].map((item, index) => columns.push({
        title: item,
        dataIndex: item,
        key: item,
        render: (text, record) => record[index],
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
  render() {
    return (
      <div className={styles.creditContainer} style={{display:'block'}}>
        {
          <BITable
            columns={this.columns()}
            dataSource={this.fillDataSource()}
            pagination={false}
            loading={this.props.loading}
            rowKey={record => record.id}
            scroll={{ y: 400 }}
            smalled
          >
          </BITable>
        }

      </div>
    );
  }
}

export default GroupIncome;
