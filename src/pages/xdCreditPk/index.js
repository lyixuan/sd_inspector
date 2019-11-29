import React from 'react';
import { connect } from 'dva';
import XdFamilyPk from './family';
import XdClassPk from './class';
import styles from './style.less';

@connect(xdFamilyModal => ({
  xdFamilyModal,
}))
class XdFamily extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    
  }
  render() {
    return (
      <> 
        <XdFamilyPk />
        <XdClassPk />
      </>
    );
  }
}

export default XdFamily;
