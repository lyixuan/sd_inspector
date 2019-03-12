import React, { Component } from 'react';
import {Divider,Input} from 'antd';

import Box from '../Box';
import Left from '../Left';
import Right from '../Right';

import BIDatePicker from '@/ant_components/BIDatePicker';
const { TextArea } = Input;


class DocDatePicker extends Component {

  onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  render() {
    const btn =
`import BIPagination from '@/ant_components/BIPagination'

<BIPagination showSizeChanger showQuickJumper onShowSizeChange={this.onShowSizeChange} defaultCurrent={3} total={500} />`;

    return (
      <Box title="BIDatePicker 日期选择框">
        <Left>
          <BIDatePicker onChange={this.onChange} />

          <Divider orientation="left"> 组件说明 </Divider>
          <div>
            API 同 <a href="https://ant.design/components/date-picker-cn/" target="view_window">Ant DatePicker</a>
          </div>
        </Left>
        <Right>
          <TextArea rows={5} defaultValue={btn} />
        </Right>
      </Box>
    )
  }
}


export default DocDatePicker;

