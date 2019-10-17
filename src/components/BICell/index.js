import React from 'react';
import styles from './style.less';

class BICell extends React.Component {
  constructor(props) {
    super();
    this.state = {
      color: 'red',
      width: '85px'
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
      <div className={styles.BICell} onClick={this.onClick} style={{ color: this.getAttribute('color'), width: this.getAttribute('width') }} {...this.props}>
        {this.props.children}
      </div>
    );
  }
}

export default BICell;
