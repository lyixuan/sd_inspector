import React from 'react';
import styles from './appeal.less';
import AppealInfo from './appealInfo';
import { Row, Col } from 'antd';
import moment from 'moment';

export default class MasterLaunchDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
    };
  }
  componentDidMount() {}

  render() {
    const { masterAppealCheck } = this.props.dataList ? this.props.dataList : {};
    if (!masterAppealCheck) {
      return <div></div>;
    }
    return (
      <div>
        {masterAppealCheck ? (
          <>
            {/* <div className={styles.appealWrap}> */}
            <div className={styles.resultWrap}>
              <div className={styles.s2_title}>主管审核</div>
              <AppealInfo data={masterAppealCheck} />
            </div>
            {/* </div> */}
          </>
        ) : null}
      </div>
    );
  }
}
