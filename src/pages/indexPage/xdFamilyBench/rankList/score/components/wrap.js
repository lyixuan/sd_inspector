import React from 'react';
import moment from 'moment';
import styles from '../index.less';
import BITable from '@/ant_components/BITable'
import { connect } from 'dva';


class Wrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className={styles.scoreTable}>
        <div className={`${styles.header} ${styles[this.props.className]}`}>{this.props.title}</div>
        <div className={styles.tableBorder}>
          <BITable
            columns={this.props.columns}
            dataSource={this.props.dataSource}
            pagination={false}
            scroll={{ x: 0, y: 200 }}
          >
          </BITable>
        </div>
      </div>
    );
  }
}

export default Wrap;
