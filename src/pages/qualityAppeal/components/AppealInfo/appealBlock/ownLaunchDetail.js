import React from 'react';
import AppealInfo from './appealInfo';
import styles from './appeal.less';

class OwnLaunchDetail extends React.Component {
  isEmptyObj = data => {
    return Object.keys(data).length;
  };
  render() {
    const { appealStart } = this.props.dataList ? this.props.dataList : {};
    const InfoList1 =
      appealStart &&
      appealStart.map((v, i) => {
        if (i === 0) {
          return <AppealInfo type="startAppeal" data={v} key={i}/>;
        }
      });
    return (
      <div>
        {appealStart ? (
          <>
            {/* <div className={styles.appealWrap}> */}
            <div className={styles.resultWrap}>
              <div className={styles.s2_title}>申诉发起人</div>
              {InfoList1}
            </div>
            {/* </div> */}
          </>
        ) : null}
      </div>
    );
  }
}

export default OwnLaunchDetail;
