import React from 'react';
import { connect } from 'dva';
// import styles from '../../style.less';
// import pkImg from '@/assets/xdwork/pk.png';
// import xdPkImg from '@/assets/workBench/xdpk.gif';
import Proportion from '../../../components/proportion';
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
      <div>
        {/*<Proportion*/}
          {/*leftNum={leftNum}*/}
          {/*rightNum={rightNum}*/}
          {/*leftCollege={userName}*/}
          {/*rightCollege={PkName}*/}
          {/*style={{ width: 'calc(100% - 200px)' }}*/}
        {/*/>*/}
      </div>
    );
  }
}

export default FamilyScore;
