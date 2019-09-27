import React from 'react';
import { connect } from 'dva';
// import styles from '../../style.less';
@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class FamilyScore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      keye: '1'
    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div style={{padding:'16px 24px'}}>familyScore</div>
    );
  }
}

export default FamilyScore;
