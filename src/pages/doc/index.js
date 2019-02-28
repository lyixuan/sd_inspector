import React, { Component } from 'react';
import Divider from 'antd/lib/divider';
import Button from 'antd/lib/button';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import DatePickerDecorator from 'antd/lib/date-picker';

import Box from './Box';
import Left from './Left';
import Right from './Right';
import style from './style.css';

const { TextArea } = Input;
const Option = Select.Option;
const { RangePicker } = DatePickerDecorator;

class Doc extends Component {
  constructor(props){
    super(props);
  }
  render() {
    const children = [];
    for (let i = 10; i < 36; i++) {
      children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }

    const btn = '<Button type="primary">查询</Button>\n<Button type="primary2">重置</Button>\n<Button type="primary" size="small">保存</Button>\n<Button size="small">取消</Button>\n<Button type="primary" size="large">任务列表</Button>';

    const select = `<Select defaultValue="lucy">
                    <Option value="jack">Jack</Option>
                    <Option value="lucy">Lucy</Option>
                    <Option value="Yiminghe">yiminghe</Option>
</Select>`;
    const select2 = `<Select mode="multiple" showArrow={true} placeholder="全部" maxTagCount={1}
                    defaultValue={[\'a10\', \'c12\']}>
                    <Option key="a10">a10</Option>
                    <Option key="b11">b11</Option>
                    <Option key="c12">c12</Option>
</Select>`;
    const select3 = `<RangePicker/>`;

    return (
      <div className={style.container}>
        <h2 className={style.title}>组件UI文档</h2>
        <Box title="Botton">
          <Left>
            <Button type="primary">查询</Button> <span style={{marginLeft: 10}}></span>
            <Button type="primary2">重置</Button> <span style={{marginLeft: 10}}></span>
            <Button type="primary" size="small">保存</Button> <span style={{marginLeft: 10}}></span>
            <Button size="small">取消</Button> <span style={{marginLeft: 10}}></span>
            <Button type="primary" size="large">任务列表</Button>
            <Divider> Code </Divider>
            <TextArea rows={5} defaultValue={btn}/>
          </Left>
          <Right>
            <div>
              size定义 <br/>
              1、size 默认 ：宽度115px，高度38px；用于搜索按钮和重置等操作按钮； <br/>
              2、size='small' ：宽度75px，高度38px；用于弹框的保存、取消操作； <br/>
              3、size='large' ：宽度135px，高度38px；用于列表上方等的长文字操作； <br/>
            </div>
            <div>
              <br/>
              type定义 <br/>
              1、type 默认 ：空心按钮； <br/>
              2、type='primary' ：蓝色主色；主要操作按钮； <br/>
              3、type='primary2' ：辅助色淡红色；操作按钮； <br/>
            </div>
          </Right>
        </Box>
        <Box title="Input">
        </Box>
        <Box title="Select">
          <Left>
            <Select defaultValue="lucy">
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>
            <span style={{marginLeft: 10}}></span>
            <Select mode="multiple" showArrow={true} placeholder="全部" maxTagCount={1} defaultValue={['a10', 'c12']}>
              {children}
            </Select>
            <span style={{marginLeft: 10}}></span>
            <RangePicker/>
            <Divider> Code </Divider>
            <TextArea rows={12} defaultValue={`${select}\n${select2}\n${select3}`}/>
          </Left>
          <Right>
            <div>
              size定义 <br/>
              1、size 默认 ：宽度185px，高度36px；用于搜索部分下拉； <br/>
              2、size='small' ：后续添加 <br/>
              3、size='large' ：后续添加 <br/>
              4、日期选择 size 默认：宽度285px，高度36px； <br/>
            </div>
            <div>
              <br/>
              type定义 <br/>
              1、type 默认 ：黑底蓝字； <br/>
            </div>
          </Right>
        </Box>
      </div>
    )
  }
}


export default Doc;

