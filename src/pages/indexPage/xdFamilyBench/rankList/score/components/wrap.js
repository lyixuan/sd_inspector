import React from 'react';
import moment from 'moment';
import styles from '../index.less';
import BITable from '@/ant_components/BITable'
import { connect } from 'dva';


class Wrap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userMsg: '',
      userFlag: false,
      userLocation: ''
    }
  }

  componentDidMount() {
    const id = `#${this.props.rowId} .ant-table-body`;
    document.querySelector(id).onscroll = (e) => {
      this.getScrollFn(e.target.scrollTop)
    }
  }
  componentWillUnmount() {
    document.querySelector(`#${this.props.rowId} .ant-table-body`).onscroll = '';
  }
  getScrollFn = (scrollTop = 0) => {
    const { userLocation, userFlag } = this.state;
    if (scrollTop > userLocation && scrollTop < userLocation + 200) {
      if (userFlag === true) {
        this.setState({
          userFlag: false
        })
      }
    } else if (userFlag === false) {
      this.setState({
        userFlag: true
      })
    }
  }
  getRowClassName = (record, index) => {
    if (this.props.userId === record.userId || record.isMyGroup) {
      this.state.userMsg = record;
      this.state.userLocation = 40 * (index + 1) - 230;
      return styles.pkUser;
    };
  }

  render() {
    const { userMsg, userFlag } = this.state;
    return (
      <div className={styles.scoreTable}>
        <div className={`${styles.header} ${styles[this.props.className]}`}>{this.props.title}</div>
        {userFlag && userMsg && <div className={styles.suspenTable}>
          <BITable
            showHeader={false}
            columns={this.props.columns}
            dataSource={[userMsg]}
            pagination={false}
            rowKey={record => record.userId}
            rowClassName={this.getRowClassName}
            scroll={{ x: 0, y: 200 }}
            smalled
          />
        </div>}
        <div id={this.props.rowId} className={styles.tableBorder}>
          <BITable
            columns={this.props.columns}
            dataSource={this.props.dataSource}
            rowClassName={this.getRowClassName}
            pagination={false}
            scroll={{ x: 0, y: 200 }}
            smalled
          >
          </BITable>
        </div>
      </div>
    );
  }
}

export default Wrap;
