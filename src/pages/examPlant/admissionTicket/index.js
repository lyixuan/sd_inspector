import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect'
import BILoading from '@/components/BILoading';
import TabSwitch from '../components/tabSwitch';
import TicketRankList from './components/ticketRankList';
import Details from './components/details';
import styles from './style.less';

const { Option } = BISelect;

@connect(({ admissionTicket, loading }) => ({
  admissionTicket

}))
class AdmissionTicket extends React.Component {
  constructor(props) {
    super(props);

  }
  tabParams = () => {
    const tab = [
      {
        title: <span data-trace={`{"widgetName":"准考证填写排行","traceName":"报考大盘/准考证填写排行"}`}>准考证填写排行</span>,
        key: '1',
        children: <TicketRankList></TicketRankList>,
      }, {
        title: <span data-trace={`{"widgetName":"尚小德渠道的填写明细","traceName":"报考大盘/尚小德渠道的填写明细"}`}>尚小德渠道的填写明细</span>,
        key: '2',
        children: <Details></Details>,
      }
    ]
    return tab
  }

  render() {
    return (
      <div className={styles.ticketPage}>
        <TabSwitch
          tabs={this.tabParams()}>
        </TabSwitch>
      </div>
    );
  }
}

export default AdmissionTicket;
