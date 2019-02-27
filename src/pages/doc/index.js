import React, { Component } from 'react';
// import { Button, Table, Form, Popconfirm, Popover } from 'antd';
import Button from 'antd/lib/button';
import Box from './Box'
import style from './style.css';

class Doc extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div className={style.container}>
        <h2 className={style.title}>组件UI文档</h2>
        <Box title="Botton">
          <Button type="primary" size="large">查询</Button>
          <br/>
          <br/>
          <Button type="primary" size="small">查询</Button>
          <Button type="primary" size="small">查询</Button>
          <br/>
          <Button type="primary2" size="middle">查询</Button>
        </Box>
        <Box title="Input">
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
        </Box>
      </div>
    )
  }
}


export default Doc;

