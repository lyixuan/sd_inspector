import React from 'react';
import BICell from '../BICell';
import styles from './style.less';
import checkIcon from '../../assets/xdcredit/checkIcon.png';

class BISelectCell extends React.Component {
  constructor(props) {
    super();
    this.state = {
      text: '',
      rightIcon: <img src={checkIcon} />,
    }
  }
  onClick = obj => {
    if (this.props.onClick && typeof this.props.onClick === 'function') {
      this.props.onClick(obj);
    }
  }
  getAttribute = type => {
    return this.props[type] ? this.props[type] : this.state[type];
  }
  render() {
    return (
      <BICell>
        <div className={styles.BISelects} onClick={this.onClick}>
          {this.getAttribute('text')}
          <div className={styles.icon}>{this.getAttribute('rightIcon')}</div>
        </div>
      </BICell>
    );
  }
}

export default BISelectCell;
