import React, { Component } from 'react';
import DocButton  from './components/DocButton';
import DocInput  from './components/DocInput';
import DocSelect  from './components/DocSelect';
import DocDropDown  from './components/DocDropDown';
import DocMenu  from './components/DocMenu';
import DocModal  from './components/DocModal';
import DocTable  from './components/DocTable';
import DocPagination  from './components/DocPagination';
import DocDatePicker  from './components/DocDatePicker';
import DocTabs  from './components/DocTabs';
import DocTreeSelect  from './components/DocTreeSelect';

import style from './style.css';
import { LocaleProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';

class Doc extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <div className={style.container}>
          <h1 className={style.title}>自定义组件文档</h1>
          <DocButton/>
          <DocInput />
          <DocSelect/>
          <DocDropDown/>
          <DocMenu/>
          <DocModal/>
          <DocTable/>
          <DocPagination/>
          <DocDatePicker/>
          <DocTabs/>
          <DocTreeSelect/>
        </div>
      </LocaleProvider>
    )
  }
}

export default Doc;

