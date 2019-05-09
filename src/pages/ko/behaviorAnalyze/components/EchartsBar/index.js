import React from 'react';
import Echart from '@/components/Echart';
import Empty from '@/components/Empty';
import style from './style.less';
import { formatDateToWeek } from '@/utils/utils'
import { options } from './component/bar_echarts';
import TitleName from './component/titleName';

class BarEcharts extends React.Component {
  eConsole = (e) => {
    this.props.gotoUserList && this.props.gotoUserList(e);
  };
  dealDate = () => {
    const { tabFromParams = {} } = this.props;
    const dateArr = tabFromParams.recordTimeList || [];
    if (dateArr.length) {
      return `${formatDateToWeek(dateArr[0])} ~ ${formatDateToWeek(dateArr[1])}`
    }
  }
  render() {
    const { behaviourData, userSize } = this.props.behavior;
    const date = this.dealDate();
    return (
      <div className={style.barWrap}>
        <TitleName name='用户行为事件分析' />
        <div className={style.barContent}>
          {
            Number(userSize) === 0 ? <Empty isEmpty={true} /> : <Echart
              isEmpty={behaviourData.length}
              clickEvent={this.eConsole}
              style={{ width: '100%', height: '267px' }}
              options={options(behaviourData, date)} />
          }

        </div>
      </div>
    );
  }
}

export default BarEcharts;
