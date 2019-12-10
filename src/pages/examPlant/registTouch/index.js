import React from 'react';
import { connect } from 'dva';
import moment from 'moment';
import BISelect from '@/ant_components/BISelect'
import BILoading from '@/components/BILoading';
import TabSwitch from '../components/tabSwitch';
import TouchList from './components/touchList';
import Details from './components/details';
import storage from '@/utils/storage';
import styles from './style.less';

const { Option } = BISelect;

@connect(({ registTouch, examPlant, loading }) => ({
  registTouch,
  examPlant
}))
class RegistTouch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orgType: 'college',
      startTime: '2019-12-08',
      endTime: new Date().getTime()
    }
  }
  tabParams = () => {
    const tab = [
      {
        title: <span data-trace={`{"widgetName":"报考触达","traceName":"报考大盘/报考触达"}`}>报考触达</span>,
        key: '1',
        children: <TouchList getList={this.getList}></TouchList>,
      }, {
        title: <span data-trace={`{"widgetName":"尚小德渠道触达明细","traceName":"报考大盘/尚小德渠道触达明细"}`}>尚小德渠道触达明细</span>,
        key: '2',
        children: <Details getDetailList={this.getDetailList}></Details>,
      }
    ]
    return tab
  }
  componentDidMount = () => {
    this.getPageData();
    this.getDetailData()
  }
  getParams = (type) => {
    const operatorId = storage.getUserInfo().userId;
    const startTime = this.props.examPlant.startTime || this.state.startTime
    const endTime = this.props.examPlant.endTime || this.state.endTime
    const params = {
      operatorId: 91,
      startDate: moment(startTime).format('YYYY-MM-DD'),
      endDate: moment(endTime).format('YYYY-MM-DD')
    }
    if (type == 1) {
      return { ...params, orgType: this.state.orgType }
    } else {
      return params
    }
  }
  getPageData = () => {
    this.props.dispatch({
      type: 'registTouch/reachNumRankList',
      payload: { params: this.getParams(1) }
    })
  }
  getDetailData = () => {
    this.props.dispatch({
      type: 'registTouch/reachNumDetail',
      payload: { params: this.getParams(2) }
    })
  }
  getDetailList = () => {
    this.getDetailData()
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



  render() {
    const { startTime, endTime } = this.state;

    return (
      <div className={styles.ticketPage}>
        <TabSwitch
          beginDate={'2019-09-04'}
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

export default RegistTouch;
