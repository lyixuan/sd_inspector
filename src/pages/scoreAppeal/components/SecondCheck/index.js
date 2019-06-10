import React from 'react';
import moment from 'moment';
import BIInput from '@/ant_components/BIInput/index';
import styles from './style.css';
import BIRadio from '@/ant_components/BIRadio/index';
import BISelect from '@/ant_components/BISelect/index';
import BIDatePicker from '@/ant_components/BIDatePicker/index';
import { InputNumber } from 'antd';
import { BiFilter } from '@/utils/utils';
const { Option } = BISelect;


class SecondCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkResult:undefined,
      desc:undefined,
      appealNum:undefined,
    };
  }
  onFormChange = (value,vname)=>{
    console.log(value)
    this.setState({
      [vname]:value
    },()=>this.props.onFormChange(value,vname));

  };

  disabledDate=(current)=>{
    return current && current < moment().endOf('day');
  };
  render() {
    const {checkResult,desc,appealNum,actualRecommendLevel,score}= this.state;
    const {firstOrSec,creditType,dimensionType}= this.props;
    return (
      <section className={styles.personInfoCon}>
        <div className={styles.container}>
          <div className={styles.secRow} >
            <div style={{lineHeight:'32px'}}>
              <span style={{ width: 90 }}>*审核结果： </span>
              <BIRadio onChange={(e) => this.onFormChange(e.target.value, 'checkResult')} value={checkResult}>
                <BIRadio.Radio value={1}>通过</BIRadio.Radio>
                <BIRadio.Radio value={0}>驳回</BIRadio.Radio>
              </BIRadio>
            </div>
            {Number(creditType)===12&&(
              <div>
                <span style={{ width: 110 }}>*申诉个数：</span>
                <InputNumber min={0} max={1} step={0.01} value={appealNum} onChange={(val) => this.onFormChange(val, 'appealNum')} />
              </div>
            )}
            {Number(creditType)===17&&(
              <div>
                <span style={{ width: 110 }}>*申诉个数：</span>
                <InputNumber min={0} step={1} value={appealNum} onChange={(val) => this.onFormChange(val, 'appealNum')} />
              </div>
            )}
            {Number(dimensionType)===42&&checkResult===1&&(
              <div>
                <span style={{ width: 110 }}>*实际推荐等级：</span>
                <BISelect style={{width:230}} placeholder="请选择" value={actualRecommendLevel} onChange={(val)=>this.onFormChange(val,'actualRecommendLevel')}>
                  {BiFilter('SCORE_APPEAL_DIS').map(item => {
                    if(item.parentId===42){
                      return <Option key={item.id}>
                        {item.name}
                      </Option>
                    }
                  })}
                </BISelect>
              </div>
            )}
            {Number(dimensionType)===42&&checkResult===1&&(
              <div>
                <span style={{ width: 110 }}>*学分：</span>
                <InputNumber min={0} step={1} value={score} onChange={(e) => this.onFormChange(e.target.value, 'score')} />
              </div>
            )}
            {Number(creditType)===47&&checkResult===1&&(
              <div>
                <span style={{ width: 110 }}>*学分日期：</span>
                <BIDatePicker onChange={(val,valStr) => this.onFormChange(valStr, 'creditDate')}/>
              </div>
            )}
            {firstOrSec&&checkResult===0&&(
              <div>
                <span style={{ width: 110 }}>*二申截止日期：</span>
                <BIDatePicker onChange={(val,valStr) => this.onFormChange(valStr, 'secondAppealEndDate')}
                              disabledDate={this.disabledDate}/>
              </div>
            )}
          </div>
          <div style={{marginTop:'15px'}}/>
          <div  className={styles.secRow}>
            <span style={{ width: 90 }}>&nbsp;审核说明：</span>
            <BIInput.TextArea  maxLength={1000} value={desc} onChange={(e) => this.onFormChange(e.target.value, 'desc')} rows={4} />
          </div>
        </div>
      </section>
    );
  }
}

export default SecondCheck;
