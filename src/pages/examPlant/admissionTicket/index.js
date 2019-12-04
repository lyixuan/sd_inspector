import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect'
import BILoading from '@/components/BILoading';
import TabSwitch from './components/tabSwitch';
import styles from './style.less';

const { Option } = BISelect;

@connect(({ admissionTicket, loading }) => ({
  admissionTicket

}))
class AdmissionTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectVal: null
    }
  }

  getProvinceData() {
    this.props.dispatch({
      type: 'examPlant/getProvinceData',
      payload: { params: { id: this.state.selectVal } }
    })
  }
  render() {
    return (
      <div>
        <TabSwitch></TabSwitch>
      </div>
    );
  }
}

export default AdmissionTicket;
