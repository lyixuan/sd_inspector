import React from 'react';
import styles from './styles.less';
import Echarts from '../Echarts';
import {getOptionIncomeData} from '../Echarts/income_data';
import {getOptionIncomeOrder} from '../Echarts/income_order';

class Box extends React.Component {
  render() {
    const {type,IncomeData=[],IncomeOrder=[],titleName=''} = this.props||{};
    const { sumData, pieData=[]} = IncomeData || {};
    let {sumAmount=0} = sumData || {};
    const optionIncomeData = getOptionIncomeData(pieData,sumAmount);
    const optionIncomeOrder = getOptionIncomeOrder(IncomeOrder,titleName);
    return (
      <div className={type===1?styles.wrap1:styles.wrap}>
        <div className={styles.title}>
          <span></span>
          <span>{titleName}</span>
        </div>
        {type===1&&
        <div>
          <Echarts options={optionIncomeData} style={{ height: 190}}/>
        </div>
        }
        {type!==1&&
        <div>
          <Echarts options={optionIncomeOrder} style={{ height: 180}}/>
        </div>
        }
      </div>

    );
  }
}

export default Box;
