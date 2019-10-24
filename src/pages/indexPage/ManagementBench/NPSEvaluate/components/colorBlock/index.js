import React from 'react';
import { connect } from 'dva';
import styles from './style.less'

@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class colorBlock extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {
  }
  render() {
    // const { userId} = this.state;
    const {className,data} = this.props
    return (
      <>
      <span className={`${styles.colorStyle} ${styles[className]}`}>{data.label} {data.num}</span>

      </>
    );
  }
}

export default colorBlock;
