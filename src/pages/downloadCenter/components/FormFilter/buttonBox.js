import React, { PureComponent } from 'react';
import { Button } from 'antd';
import className from 'classnames';
import styles from './index.less';
import common from '../../utils/common.css';

export default class ButtonBox extends PureComponent {
  render() {
    return (
      <>
        <Button
          type="primary"
          className={className(common.searchButton, styles.buttonSearch)}
          onClick={this.props.onSubmit}
        >
          查询
        </Button>
        <Button type="primary" className={common.resetButton} onClick={this.props.onReset}>
          重置
        </Button>
      </>
    );
  }
}
