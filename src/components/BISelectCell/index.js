import React from 'react';
import BICell from './BICell';
import styles from './style.less';

class BISelectCell extends React.Component {
  constructor(props) {
    super();
    this.state = {
      text: '',
      rightIcon: '',
      width: '84px',
      height: '43px'
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
    const { text } = this.state
    return (
      <BICell>
        <div className={styles.BISelects}>
          {this.getAttribute('text')}
          <div style={{ width: this.getAttribute('width'), height: this.getAttribute('height') }}>{this.getAttribute('rightIcon')}</div>
        </div>
      </BICell>
    );
  }
}

export default BISelectCell;
