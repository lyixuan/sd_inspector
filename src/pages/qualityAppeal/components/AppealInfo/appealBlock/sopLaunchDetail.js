import React from 'react';
import AppealInfo from './appealInfo';
// import Info from '../_info';
import styles from './appeal.less';
import moment from 'moment';

class Appeal extends React.Component {
  isEmptyObj = data => {
    return Object.keys(data).length;
  };
  render() {
    const { sopAppealCheck = {} } = this.props.dataList ? this.props.dataList : {};
    // let dataList1 = {};
    // if (dataList && dataList.length > 0) {
    //   if (dataList[0].type === 1) {
    //     dataList1 = dataList[0];
    //   } else {
    //     dataList1 = dataList[1] ? dataList[1] : {};
    //   }
    // }
    // const data1 = this.isEmptyObj(dataList1);
    return (
      <div>
        {sopAppealCheck ? (
          <>
            {/* <div className={styles.appealWrap}> */}
            {sopAppealCheck && sopAppealCheck.length === 0 ? null : (
              <div className={styles.resultWrap}>
                <div className={styles.s2_title}>SOP审核结果</div>
                <AppealInfo data={sopAppealCheck} />
              </div>
            )}
            {/* </div> */}
          </>
        ) : null}
      </div>
    );
  }
}

export default Appeal;
