import React from 'react';
import Edit from './_edit';
import Info from './_info';
import styles from './style.less';


class QualityAppeal extends React.Component {
  render() {
    const {setStateData,data} = this.props;
    const newdDta = {

    }
    console.log(data)
    return (
      <div className={styles.appealWrap}>
        <div className={styles.mtitle}>质检审核</div>
        <div className={styles.resultWrap}>
          <div className={styles.s2_title}>审核记录</div>
          <Info data={data}/>
        </div>
        {setStateData?<Edit dataName='一审截止日期' setStateData={setStateData}/>:null}
      </div>
    );
  }
}

export default QualityAppeal;
