import React from 'react';
import { connect } from 'dva';
import BISelect from '@/ant_components/BISelect'
import styles from './style.less';

const { Option } = BISelect;

@connect(({ admissionTicket, loading }) => ({
  admissionTicket

}))
class TabSwitch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        dfdf
      </div>
    );
  }
}

export default TabSwitch;
