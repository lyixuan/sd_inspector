import React from 'react';
import Box from './box';
import styles from './styles.less';

class IncomeOverview extends React.Component {
  render() {
    const { IncomeData,IncomeOrderCollege,IncomeOrderFamily,IncomeOrderGroup } = this.props;
    return (
      <div className={styles.index}>
        <Box type={1} IncomeData={IncomeData} titleName={'创收数据'}/>
        <Box IncomeOrder={IncomeOrderCollege}  titleName={'学院排名'}/>
        <Box IncomeOrder={IncomeOrderFamily}  titleName={'家族排名'}/>
        <Box IncomeOrder={IncomeOrderGroup}  titleName={'小组排名'}/>
      </div>
    );
  }
}

export default IncomeOverview;
