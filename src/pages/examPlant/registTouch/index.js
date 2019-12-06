import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect'
import BILoading from '@/components/BILoading';
import TabSwitch from '../components/tabSwitch';
import TouchList from './components/touchList';
import Details from './components/details';
import styles from './style.less';

const { Option } = BISelect;

@connect(({ admissionTicket, loading }) => ({
  admissionTicket

}))
class RegistTouch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabParams: [
        {
          title: <span data-trace={`{"widgetName":"报考触达","traceName":"报考大盘/报考触达"}`}>报考触达</span>,
          key: '1',
          children: <TouchList></TouchList>,
        }, {
          title: <span data-trace={`{"widgetName":"尚小德渠道触达明细","traceName":"报考大盘/尚小德渠道触达明细"}`}>尚小德渠道触达明细</span>,
          key: '2',
          children: <Details></Details>,
        }
      ]
    }
  }

  getProvinceData() {
    this.props.dispatch({
      type: 'examPlant/getProvinceData',
      payload: { params: { id: this.state.selectVal } }
    })
  }
  refreshList = (data) => {
    console.log(41, data)
  }
  render() {
    const { tabParams } = this.state;
    const startTime = '2019-09-01'
    const endTime = new Date().getTime();
    return (
      <div className={styles.ticketPage}>
        <TabSwitch
          startTime={startTime}
          endTime={endTime}
          refreshList={this.refreshList}
          tabs={tabParams}>

        </TabSwitch>
      </div>
    );
  }
}

export default RegistTouch;
