import React from 'react';
import moment from 'moment';
import BIInput from '@/ant_components/BIInput/index';
import styles from './style.css';
import BIRadio from '@/ant_components/BIRadio/index';
import BISelect from '@/ant_components/BISelect/index';
const { Option } = BISelect;

class SecondCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkResult:undefined,
      desc:undefined,
    };
  }
  onFormChange = (value,vname)=>{
    this.setState({
      [vname]:value
    },()=>this.props.onFormChange(value,vname));

  };
  render() {
    const {checkResult,desc}= this.state;
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.container}>
          <div className={styles.secRow} >
            <span style={{ width: 90 }}>*审核结果：</span>
            <BIRadio onChange={(e) => this.onFormChange(e.target.value, 'checkResult')} value={checkResult}>
              <BIRadio.Radio value={1}>通过</BIRadio.Radio>
              <BIRadio.Radio value={0}>驳回</BIRadio.Radio>
            </BIRadio>
          </div>
          <div style={{marginTop:'15px'}}/>
          <div  className={styles.secRow}>
            <span style={{ width: 90 }}>&nbsp;申诉说明：</span>
            <BIInput.TextArea  maxLength={1000} value={desc} onChange={(e) => this.onFormChange(e.target.value, 'desc')} rows={4} />
          </div>
        </div>
      </section>
    );
  }
}

export default SecondCheck;
