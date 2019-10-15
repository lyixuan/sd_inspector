import React from 'react';
import Edit from '../_edit';
import Info from '../_info';
import OwnLaunchDetail from './ownLaunchDetail';
import SopLaunchDetail from './sopLaunchDetail';
import MasterLaunchDetail from './masterLaunchDetail';
import AppealEdit from './appealEdit';
import styles from './appeal.less';
import moment from 'moment';

class Appeal extends React.Component {
  isEmptyObj = data => {
    return Object.keys(data).length;
  };
  render() {
    const { dataList, appealStatus = 0, setStateData } = this.props;
    const status = Number(appealStatus);
    let dataList1 = {},
      dataList2 = {};
    if (dataList && dataList.length > 0) {
      if (dataList[0].type === 1) {
        dataList1 = dataList[0];
        dataList2 = dataList[1] ? dataList[1] : {};
      } else {
        dataList2 = dataList[0];
        dataList1 = dataList[1] ? dataList[1] : {};
      }
    }
    const data1 = this.isEmptyObj(dataList1);
    const data2 = this.isEmptyObj(dataList2);
    return (
      <div>
        {data1 ? (
          <>
            <div className={styles.appealWrap}>
              <div className={styles.s1_title}>
                一次申诉(审核页面)
                <span className={styles.txtCls}>
                  （一次申诉截止日期：
                  {dataList1.appealEndDate
                    ? moment(dataList1.appealEndDate).format('YYYY-MM-DD')
                    : null}
                  ）
                </span>
              </div>
              <OwnLaunchDetail dataList={dataList1} />
              {status === 2 ? (
                <div
                  className={styles.masterContent}
                  style={{ borderTop: '1px solid #DCDDE0', paddingTop: '20px' }}
                >
                  <div className={styles.appealTitle}>SOP审核</div>
                  <AppealEdit
                    {...this.props}
                    hideDate
                    showWarn={false}
                    setStateData={setStateData}
                  />
                </div>
              ) : null}
              {dataList1.sopAppealCheck && dataList1.sopAppealCheck.length === 0 ? null : (
                <SopLaunchDetail dataList={dataList1} />
              )}
              {dataList1.masterAppealCheck && dataList1.masterAppealCheck.length === 0 ? null : (
                <MasterLaunchDetail dataList={dataList1} />
              )}
              {status === 4 ? (
                <div className={styles.masterContent}>
                  <div className={styles.appealTitle}>主管审核</div>
                  <AppealEdit {...this.props} showWarn={true} setStateData={setStateData} />
                </div>
              ) : null}
            </div>
          </>
        ) : null}
        {data2 ? (
          <div className={styles.appealWrap}>
            <div className={styles.s1_title}>
              二次申诉
              <span className={styles.txtCls}>
                （二次申诉截止日期：
                {dataList2.appealEndDate
                  ? moment(dataList2.appealEndDate).format('YYYY-MM-DD')
                  : null}
                ）
              </span>
            </div>
            <OwnLaunchDetail dataList={dataList2} />
            {status === 6 ? (
              <div
                className={styles.masterContent}
                style={{ borderTop: '1px solid #DCDDE0', paddingTop: '20px' }}
              >
                <div className={styles.appealTitle}>SOP审核</div>
                <AppealEdit {...this.props} hideDate showWarn={false} setStateData={setStateData} />
              </div>
            ) : null}
            {dataList2.sopAppealCheck && dataList2.sopAppealCheck.length === 0 ? null : (
              <SopLaunchDetail dataList={dataList2} />
            )}
            {!dataList2.masterAppealCheck ? null : <MasterLaunchDetail dataList={dataList2} />}
            {status === 8 ? (
              <div className={styles.masterContent}>
                <div className={styles.appealTitle}>主管审核</div>
                <AppealEdit {...this.props} hideDate showWarn={true} setStateData={setStateData} />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Appeal;
