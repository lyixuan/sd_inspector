/*
* 非必传：defaultCurrent,  （展示第几页，默认是1）
*        defaultPageSize, （每页展示条数，默认30条）
*        pageSizeOptions, （配合onShowSizeChange方法使用，array类型，现默认【30】）
*        onShowSizeChange,（控制每页展示条数的方法，现在默认30条，目前该方法不用传，留已后备用）
*        showPageSize,     (大于该值则展示分页,默认是30)
*
* 必 传： onChange，（点击页码的方法回调  function类型）
*         total,   （总条数  number类型）
* */
import React, { Component } from 'react';
import Pagination from 'antd/lib/pagination';

class Index extends Component {
  render() {
    const {
      defaultCurrent,
      defaultPageSize,
      pageSizeOptions,
      total,
      onChange,
      onShowSizeChange,
      showPageSize,
    } = this.props;
    const isShowPage = showPageSize ? total > showPageSize : total > 0;
    return isShowPage ? (
      <Pagination
        showQuickJumper
        showSizeChanger
        showTotal={total => `共 ${total} 条`}
        onChange={onChange}
        onShowSizeChange={onShowSizeChange}
        current={defaultCurrent || 1}
        total={total || 0}
        defaultPageSize={defaultPageSize || 10}
        pageSizeOptions={pageSizeOptions || ['10','20','50','100']}
      />
    ) : null;
  }
}

export default Index;
