import React from 'react';
import {  Row, Col } from 'antd';
import moment from 'moment';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIRadio from '@/ant_components/BIRadio';
import BIInput from '@/ant_components/BIInput';

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value:null,
    }
  }

  onChangeRadio=(e)=>{
    this.setState({
      value: e.target.value,
    });
  };
  onChangeDate=(e)=>{
    console.log(e)
  };
  onChangeInput=(e)=>{
    console.log(e)
  };
  render() {
    return (
      <div>
        <Row>
          <Col span={12}>
            <span>审核结果：</span>
            <BIRadio onChange={this.onChangeRadio} value={this.state.value}>
              <BIRadio.Radio value={1}>通过</BIRadio.Radio>
              <BIRadio.Radio value={2}>驳回</BIRadio.Radio>
            </BIRadio>
          </Col>
          <Col className="gutter-row txRight" span={12}>
            <span>*二申截止日期： </span>
            <BIDatePicker onChange={this.onChangeDate} style={{ width: 280 }} />
          </Col>
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

