import React from 'react';
import {Button, Input, TimePicker, Upload} from 'antd';
import style from './style.less';

class CreateActivity extends React.Component{
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {TextArea} = Input;

    return <div>
      <div className={style.title}>
        <span style={{color: '#8C8C8C'}}>首页 / </span>
        <span style={{color: '#000000'}}>新建活动</span>
      </div>
      <div className={style.content}>
        <div className={style.name}>
          <p className={style.text}>活动名称：</p>
          <Input
            className={style.input}
            placeholder="请输入活动名称（6个字以内）"
            maxLength={6} />
          <p className={style.text}>展示时间：</p>
          <TimePicker className={style.picker} />
        </div>
        <div className={style.question}>
          <p className={style.text}>问题名称：</p>
          <Input className={style.input} placeholder="请输入该活动对应的问题名称" maxLength={25} />
        </div>
        <div className={style.answer}>
          <p className={style.text}>回复内容：</p>
          <div className={style.box}>
            <TextArea
            className={style.area}
            placeholder="请输入活动回复学员的内容" />
            <Upload>
              <div className={style.upload}>上传图片</div>
            </Upload>
          </div>

        </div>
      </div>
    </div>
  }
}

export default CreateActivity;
