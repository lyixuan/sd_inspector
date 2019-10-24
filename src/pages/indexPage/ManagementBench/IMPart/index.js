import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import IMLeft from './IMLeft'
import IMRight from './IMRight'
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class IMPart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    // const { userId} = this.state;
    return (
      <div className={styles.IMMain}>
        <IMLeft/>
        <IMRight/>
      </div>
    );
  }
}

export default IMPart;
