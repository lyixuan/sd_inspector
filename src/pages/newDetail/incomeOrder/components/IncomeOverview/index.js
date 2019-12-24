import React from 'react';
import Box from './box';
import styles from './styles.less';

class IncomeOverview extends React.Component {
  render() {
    const { IncomeData,IncomeOrderCollege,IncomeOrderFamily,IncomeOrderGroup } = this.props;
    return (
      <div className={styles.index}>
        <Box type={1} IncomeData={IncomeData}/>
        <Box IncomeOrder={IncomeOrderCollege}/>
        <Box IncomeOrder={IncomeOrderFamily}/>
        <Box IncomeOrder={IncomeOrderGroup}/>
      </div>
    );
  }
}

export default IncomeOverview;
