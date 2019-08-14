import React from 'react';
import { Row, Col } from 'antd';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import styles from '../../style.less';

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.init = {
    };
    this.state = {...this.init};
  }
  onPageChange = (currentPage)=>{
    this.props.queryData(this.state,{page:currentPage});
  };

  render() {
    const {dataSource,page,columns,loading} = this.props;
    return (
      <div className={styles.newSheetWrap}>

        {/*table*/}
        <div className={styles.tableBlock}>
          <Row className={styles.gutterRow1}>
            <Col className={styles.gutterCol} span={12}>
              &nbsp;
            </Col>
            <Col className={styles.gutterCol}  span={12}>
              <div className={styles.gutterBox3}>
                总条数：{page.total}
              </div>
            </Col>
          </Row>
          <BITable className='circleTable'  rowKey={record=>record.id + Math.random()*1000} dataSource={dataSource} columns={columns} pagination={false} loading={loading} />
          <br/>
          <BIPagination showQuickJumper defaultPageSize={page.pageSize?page.pageSize:30} onChange={this.onPageChange} current={page.pageNum} total={page.total} />
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
