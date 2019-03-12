import React, { Component } from 'react';
import DocButton  from './components/DocButton';
import DocInput  from './components/DocInput';
import DocSelect  from './components/DocSelect';
import DocDropDown  from './components/DocDropDown';
import DocMenu  from './components/DocMenu';
import DocModal  from './components/DocModal';

import style from './style.css';

class Doc extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={style.container}>
        <h2 className={style.title}>自定义组件文档</h2>

        <DocButton/>
        <DocInput />
        <DocSelect/>
        <DocDropDown/>
        <DocMenu/>
        <DocModal/>

      </div>
    )
  }
}

export default Doc;

