import React, { PureComponent } from 'react';
import { Button } from 'antd';
import className from 'classnames';
import styles from './index.less';
import common from '../../utils/common.less';

export default class ButtonBox extends PureComponent {
  render() {
    return (
      <div className="download-content">
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
      </div>
    );
  }
}
