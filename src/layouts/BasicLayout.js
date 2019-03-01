import React  from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LocaleProvider from 'antd/lib/locale-provider';

function BasicLayout(props) {
  return (
    <LocaleProvider locale={zhCN}>
      { props.children }
    </LocaleProvider>
  );
}

export default BasicLayout;
