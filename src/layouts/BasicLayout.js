import React from 'react';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import LocaleProvider from 'antd/lib/locale-provider';

class BasicLayout extends React.Component {
  componentWillMount() {
    // 从url中拿取paramsId参数,包含userId,token,存储在local中
    this.getAuthToken();
  }
  getAuthToken = () => {
    const { location: { query = {} } } = this.props;
    const paramsId = query.paramsId || ''
    console.log(query);
  }
  render() {
    return (
      <LocaleProvider locale={zhCN}>
        <>
          {this.props.children}
        </>
      </LocaleProvider>
    )
  }
}

export default BasicLayout;
