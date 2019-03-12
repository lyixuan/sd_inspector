import React, { Component } from 'react';
import DocButton  from './components/DocButton';
import DocInput  from './components/DocInput';
import DocSelect  from './components/DocSelect';

import style from './style.css';

class Doc extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.container}>
        <h2 className={style.title}>自定义组件文档</h2>

        <DocButton></DocButton>
        <DocInput />
        <DocSelect></DocSelect>

      </div>
    )
  }
}

export default Doc;

