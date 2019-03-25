import React from 'react';
import Edit from './_edit';
import Info from './_info';
import styles from './style.less';
import moment from 'moment';

class Index extends React.Component {

  render() {
    const {dataList,appealStatus=0} = this.props;
    const status = Number(appealStatus);
    let dataList1={},dataList2={};
    if(dataList&&dataList.length>0){
      if(dataList[0].type===1){
        dataList1 = dataList[0];
        dataList2 = dataList[1];
      }else {
        dataList2 = dataList[0];
        dataList1 = dataList[1];
      }

    }
    return (
      <div>
        <div className={styles.appealWrap}>
          <div className={styles.s1_title}>一次申诉<span className={styles.txtCls}>（一次申诉截止日期：{moment(dataList1.appealEndDate).format('YYYY-MM-DD')}）</span></div>
          <div className={styles.resultWrap}>
            <div className={styles.s2_title}>申诉发起人</div>
            <Info type='startAppeal' data={dataList1.appealStart}/>
          </div>
          <div className={styles.resultWrap}>
            <div className={styles.s2_title}>SOP审核结果</div>
            <Info data={dataList1.sopAppealCheck}/>
          </div>
          {status===2?(
            <div className={styles.masterContent}>
              <div className={styles.appealTitle}>SOP审核</div>
              <Edit />
            </div>
          ):null}
          {
            status===4?(
              <>
                <div className={styles.resultWrap}>
                  <div className={styles.s2_title}>主管审核</div>
                  <Info data={dataList1.masterAppealCheck}/>
                </div>
                {status===4?(
                  <div className={styles.masterContent}>
                    <div className={styles.appealTitle}>主管审核</div>
                    <Edit />
                  </div>
                ):null}
              </>
            ):null
          }
        </div>
        {
          status===6||status===8?(
            <div className={styles.appealWrap}>
              <div className={styles.s1_title}>二次申诉<span className={styles.txtCls}>（二次申诉截止日期：{moment(dataList2.appealEndDate).format('YYYY-MM-DD')}）</span></div>
              <div className={styles.resultWrap}>
                <div className={styles.s2_title}>申诉发起人</div>
                <Info type='startAppeal' data={dataList2.appealStart}/>
              </div>
              <div className={styles.resultWrap}>
                <div className={styles.s2_title}>SOP审核结果</div>
                <Info data={dataList2.sopAppealCheck}/>
              </div>
              {status===6?(
                <div className={styles.masterContent}>
                  <div className={styles.appealTitle}>SOP审核</div>
                  <Edit />
                </div>
              ):null}
              {status===8?(
                <>
                  <div className={styles.masterContent}>
                    <div className={styles.appealTitle}>主管审核</div>
                    <Info data={dataList2.masterAppealCheck}/>
                  </div>
                  {status===8?(
                    <div className={styles.masterContent}>
                      <div className={styles.appealTitle}>主管审核</div>
                      <Edit />
                    </div>
                  ):null}
                </>
              ):null}
            </div>
          ):null
        }
      </div>
    );
  }

}

export default Index;
