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
    const {dataSource,columns,loading} = this.props;
    return (
      <div className={styles.newSheetWrap}>

        {/*table*/}
        <div className={styles.tableBlock}>
          <br/>
          <BITable bordered rowKey={record=>record.id + Math.random()*1000} dataSource={dataSource} columns={columns} pagination={false} loading={loading} />
          <br/>
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
