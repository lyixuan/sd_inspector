import React from 'react';
import router from 'umi/router';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';

class CSTable extends React.Component {

  onJumpPage = (pathname,query) => {
    router.push({
      pathname,
      query
    });
  };
  render() {
    const {dataSource=[],columns=[],loading,page={}} = this.props;
    return (
      <div style={{padding: '30px',paddingTop:0,background:'#fff',overflow:'hidden'}}>
        <BITable rowKey={record=>record.id + Math.random()*1000} dataSource={dataSource} columns={columns} pagination={false} loading={loading} />
        <br/>
        <BIPagination showQuickJumper defaultPageSize={page.pageSize?page.pageSize:30} onChange={this.onPageChange} current={page.pageNum} total={page.total} />
      </div>
    );
  }
}

export default CSTable;
