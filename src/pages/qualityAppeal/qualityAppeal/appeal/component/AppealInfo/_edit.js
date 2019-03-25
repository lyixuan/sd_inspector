import React from 'react';
import {  Row, Col,Checkbox } from 'antd';
import moment from 'moment';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIRadio from '@/ant_components/BIRadio';
import BIInput from '@/ant_components/BIInput';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      appealEndDate:null,
      value:null,
      desc:null,
      isWarn:null
    }
  }
  onChangeCheckBox=(e)=>{
    console.log(e)
    this.setState({
      isWarn: e.target.value,
    });
  };
  onChangeRadio=(e)=>{
    this.setState({
      value: e.target.value,
    });
  };
  onChangeDate=(e,dateString)=>{
    this.setState({
      appealEndDate:dateString,
    });
  };
  onChangeInput=(e)=>{
    console.log(e.target.value);
    this.setState({
      desc: e.target.value,
    });
  };
  render() {
    const {value,desc} = this.state;
    const {hideDate} =  this.props;
    return (
      <div>
        <Row>
          <Col span={12}>
            <span>审核结果：</span>
            <BIRadio onChange={this.onChangeRadio} value={this.state.value}>
              <BIRadio.Radio value={1}>通过</BIRadio.Radio>
              {value===1?<Checkbox onChange={this.onChangeCheckBox}>警告</Checkbox>:null}
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

