import React from 'react';
import Edit from './_edit';
import Info from './_info';
import styles from './style.less';


class QualityAppeal extends React.Component {
  render() {
    const {setStateData,data} = this.props;
    return (
      <div className={styles.appealWrap} style={{marginLeft:'-20px'}}>
        <div className={styles.mtitle}>质检审核</div>
        <div className={styles.resultWrap}>
          <div className={styles.s2_title}>审核记录</div>
          <Info data={data}/>
        </div>
        {setStateData?<Edit {...this.props} dataName='一审截止日期' showWarn={false} setStateData={setStateData}/>:null}
      </div>
    );
  }
}

export default QualityAppeal;
