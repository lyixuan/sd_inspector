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
    if(e.target.value===2){
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
    const {checkResult,desc} = this.state;
    const {hideDate} =  this.props;
    return (
      <div>
        <Row>
          <Col span={12}>
            <span>审核结果：</span>
            <BIRadio onChange={this.onChangeRadio} value={this.state.checkResult}>
              <BIRadio.Radio value={1}>通过</BIRadio.Radio>
              {checkResult===1?<Checkbox onChange={this.onChangeCheckBox}>警告</Checkbox>:null}
              <BIRadio.Radio value={2}>驳回</BIRadio.Radio>
            </BIRadio>
          </Col>
          {
            hideDate?null:<Col className="gutter-row txRight" span={12}>
              <span>*二申截止日期： </span>
              <BIDatePicker onChange={this.onChangeDate} style={{ width: 280 }} />
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

