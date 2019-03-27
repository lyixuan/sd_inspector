import React from 'react';
import {  Row, Col,Checkbox } from 'antd';
import moment from 'moment';
import BIDatePicker from '@/ant_components/BIDatePicker/index';
import BIRadio from '@/ant_components/BIRadio/index';
import BIInput from '@/ant_components/BIInput/index';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appealEndDate:null,
      checkResult:null,
      desc:null,
      isWarn:null
    }
  }
  onChangeCheckBox=(e)=>{
    const {setStateData} =  this.props;
    this.setState({
      isWarn: Number(e.target.checked),
    },()=>{
      setStateData(this.state)
    });
  };
  onChangeRadio=(e)=>{
    const {setStateData} =  this.props;
    let param={};
    if(e.target.value===0){
      param={
        checkResult: e.target.value,
        isWarn:null
      }
    }else {
      param={
        checkResult: e.target.value,
      }
    }
    this.setState(param,()=>{
      setStateData(this.state)
    });
  };
  disabledDate=(current)=> {
    const day1 = new Date();
    day1.setTime(day1.getTime()-24*60*60*1000);
    return  current < moment(day1,'YYYY-MM-DD');
  };
  onChangeDate=(e,dateString)=>{
    const {setStateData} =  this.props;
    this.setState({
      appealEndDate:dateString,
    },()=>{
      setStateData(this.state)
    });
  };
  onChangeInput=(e)=>{
    const {setStateData} =  this.props;
    this.setState({
      desc: e.target.value,
    },()=>{
      setStateData(this.state)
    });
  };
  render() {
    const {checkResult} = this.state;
    const {hideDate,showWarn,formType} =  this.props;
    const isShowDate = formType&&formType==='quality' && checkResult===0;
    return (
      <div>
        <Row>
          <Col span={12}>
            <span style={{display:'inline-block',height:'38px'}}>审核结果：</span>
            <BIRadio onChange={this.onChangeRadio} value={checkResult}>
              <BIRadio.Radio value={1}>通过</BIRadio.Radio>
              {checkResult===1&&showWarn?<Checkbox onChange={this.onChangeCheckBox}>警告</Checkbox>:null}
              <BIRadio.Radio value={0}>驳回</BIRadio.Radio>
            </BIRadio>
          </Col>
          {
            hideDate || isShowDate ?null:<Col className="gutter-row txRight" span={12}>
              <span>*{this.props.dataName?this.props.dataName:'二申截止日期'}： </span>
              <BIDatePicker disabledDate={this.disabledDate} onChange={this.onChangeDate} style={{ width: 280 }} />
            </Col>
          }

        </Row>
        <Row className="gutter-row">
          <Col span={24} style={{ display: 'flex' }}>
            <span style={{width:80}}>审核说明：</span>
            <BIInput.TextArea onChange={this.onChangeInput} rows={4} />
          </Col>
        </Row>
      </div>
    );
  }

}

export default Edit;

