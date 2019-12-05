import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect'
import BILoading from '@/components/BILoading';
import TabSwitch from './components/tabSwitch';
import TicketRankList from './components/ticketRankList';
import styles from './style.less';

const { Option } = BISelect;

@connect(({ admissionTicket, loading }) => ({
  admissionTicket

}))
class AdmissionTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabParams: [
        {
          title: '准考证填写排行',
          key: '1',
          children: <TicketRankList></TicketRankList>,
        }, {
          title: '尚小德渠道的填写明细',
          key: '2',
          children: <div>222</div>,
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
  render() {
    const { tabParams } = this.state;
    return (
      <div className={styles.ticketPage}>
        <TabSwitch
          startTime='2019-10-11'
          endTime='2019-12-11'
          tabs={tabParams}>

        </TabSwitch>
      </div>
    );
  }
}

export default AdmissionTicket;
