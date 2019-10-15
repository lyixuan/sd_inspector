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
    console.log(this.props.dataList, 'masterAppealCheck');
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

//   render() {
//     const { masterAppealCheck = {}, isCollapse } = this.props.dataList ? this.props.dataList : {};
//     if (!masterAppealCheck) {
//       return <div></div>;
//     }
//     return (
//       {}
//           {!dataList1.masterAppealCheck ? null : (
//                   <div className={styles.resultWrap}>
//                     <div className={styles.s2_title}>主管审核</div>
//                     <Info data={dataList1.masterAppealCheck} />
//                   </div>
//                 )}
//     );
//   }
// }

// <section className={isCollapse ? `${styles.hidePanel}` : `${styles.showPanel} `}>
//   <div className={styles.personInfoCon}>
//     <article className={styles.appealPerson}>
//       <div className={styles.secctionTitle}>主管审核：</div>
//       <div>
//         <Row className={styles.container}>
//           <Col span={12} style={{ marginLeft: 3 }}>
//             <div
//               className={
//                 Number(masterAppealCheck.checkResult)
//                   ? styles.resultDotColor1
//                   : styles.resultDotColor2
//               }
//             >
//               审核结果：{Number(masterAppealCheck.checkResult) === 1 ? '通过' : '不通过'}
//             </div>
//           </Col>
//           <Col span={4}>
//             <span>执行人：{masterAppealCheck.operator}</span>
//           </Col>
//           <Col span={8}>
//             <span>
//               操作时间：
//               {moment(masterAppealCheck.operateDate).format('YYYY年MM月DD日 HH:mm:ss')}
//             </span>
//           </Col>
//         </Row>
//         <div>
//           <div className={styles.secCol}>
//             <div>审核说明：{masterAppealCheck.desc}</div>
//           </div>
//         </div>
//       </div>
//     </article>
//   </div>
// </section>
