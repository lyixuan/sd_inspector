import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import BISelect from '@/ant_components/BISelect'
import BILoading from '@/components/BILoading';
import TabSwitch from '../components/tabSwitch';
import TicketRankList from './components/ticketRankList';
import Details from './components/details';
import storage from '@/utils/storage';
import styles from './style.less';

@connect(({ admissionTicket, examPlant, loading }) => ({
  admissionTicket,
  examPlant
}))
class AdmissionTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgType: 'college'
    }
  }
  initDate = () => {
    return {
      startTime: moment('2019-09-01'),
      endTime: moment(new Date().getTime())
    }
  }
  tabParams = () => {
    const tab = [
      {
        title: <span data-trace={`{"widgetName":"准考证填写排行","traceName":"报考大盘/准考证填写排行"}`}>准考证填写排行</span>,
        key: '1',
        children: <TicketRankList getList={this.getList}></TicketRankList>,
      }, {
        title: <span data-trace={`{"widgetName":"尚小德渠道的填写明细","traceName":"报考大盘/尚小德渠道的填写明细"}`}>尚小德渠道的填写明细</span>,
        key: '2',
        children: <Details getDetailList={this.getDetailList}></Details>,
      }
    ]
    return tab
  }
  // componentDidMount = () => {
  //   this.getPageData();
  //   this.getDetailData()
  // }
  componentDidMount = () => {
    this.props.dispatch({
      type: 'examPlant/updateDate',
      payload: { params: this.initDate() }
    }).then(() => {
      this.getPageData();
      this.getDetailData()
    })
  }
  getDetailData = () => {
    this.props.dispatch({
      type: 'admissionTicket/zkzWriteDetail',
      payload: { params: this.getParams(2) }
    })
  }
  getPageData = () => {
    this.props.dispatch({
      type: 'admissionTicket/zkzWriteList',
      payload: { params: this.getParams(1) }
    })
  }
  getParams = (type) => {
    const startTime = this.props.examPlant.startTime || this.state.startTime
    const endTime = this.props.examPlant.endTime || this.state.endTime
    const operatorId = storage.getUserInfo().userId;
    const params = {
      operatorId: operatorId,
      startDate: moment(startTime).format('YYYY-MM-DD'),
      endDate: moment(endTime).format('YYYY-MM-DD')
    }
    if (type == 1) {
      return { ...params, orgType: this.state.orgType }
    } else {
      return params
    }
  }

  getList = (type) => {
    if (type) {
      if (type === 1) {
        type = 'college'
      } else if (type === 2) {
        type = 'family'
      } else {
        type = 'group'
      }
      this.setState({
        orgType: type
      }, () => {
        this.getPageData();
      })
    } else {
      this.getPageData();
    }

  }
  getDetailList = () => {
    this.getDetailData();
  }

  render() {
    const { startTime, endTime } = this.initDate();
    return (
      <div className={styles.ticketPage}>
        <TabSwitch
          page='ticket'
          beginDate={'2019-07-01'}
          startTime={startTime}
          endTime={endTime}
          getList={this.getList}
          getDetailList={this.getDetailList}
          tabs={this.tabParams()}>
        </TabSwitch>
      </div>
    );
  }
}

export default AdmissionTicket;
