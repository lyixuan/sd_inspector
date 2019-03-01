import React  from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LocaleProvider from 'antd/lib/locale-provider';
import styles from './basicLayoutM1.less'

function BasicLayoutM1(props) {
  return (
    <LocaleProvider locale={zhCN}>
    <div className={styles.basicWrap}>
        <div className={styles.headerWrap} />
        { props.children }
    </div>
    </LocaleProvider>
  );
}

export default BasicLayoutM1;
