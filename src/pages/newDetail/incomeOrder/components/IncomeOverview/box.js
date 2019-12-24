import React from 'react';
import styles from './styles.less';
import Echarts from '../Echarts';
import {getOptionIncomeData} from '../Echarts/income_data';
import {getOptionIncomeOrder} from '../Echarts/income_order';
import { changeToThousandsForIncome } from '@/utils/utils';

class Box extends React.Component {
  render() {
    const {type,IncomeData=[],IncomeOrder=[],titleName=''} = this.props||{};
    const { sumData, pieData=[]} = IncomeData || {};
    let {sumAmount=0} = sumData || {};
    const optionIncomeData = getOptionIncomeData(pieData,sumAmount);
    const optionIncomeOrder = getOptionIncomeOrder(IncomeOrder,titleName);
    const dot = pieData.map((item,idx)=>{
      return <div key={idx}>
        <span>
        <i style={{backgroundColor: `${item.name==='好推'?'#45D199':item.name==='续报'?'#FEC350':'#6769DA'}`}}/>
          {changeToThousandsForIncome(item.value,1)+'万'}
        </span>
        <span><i/>{item.name}</span>
      </div>
    });
    return (
      <div className={type===1?styles.wrap1:styles.wrap}>
        <div className={styles.title}>
          <span/>
          <span>{titleName}</span>
        </div>
        {type===1&&
        <div>
          <Echarts options={optionIncomeData} style={{ height: 190,width:220,float:'left'}}/>
          <div className={styles.footer}>
            {dot}
          </div>
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
