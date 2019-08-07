import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import BISelect from '@/ant_components/BISelect';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import styles from '../style.less';
const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;
class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    const { p = null } = this.props.location.query;
  }

  onPageChange = currentPage => {
    this.props.queryData(this.state, { page: currentPage });
  };

  render() {
    const { dataSource, page, columns, loading } = this.props;
    const total = page.total;
    return (
      <div className={styles.newSheetWrap}>
        {/*table*/}
        <div className={styles.tableBlock}>
          <BITable
            rowKey={record => record.id + Math.random() * 1000}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            loading={loading}
          />
          <br />
          {total && <BIPagination
            showQuickJumper
            defaultPageSize={page.pageSize ? page.pageSize : 30}
            onChange={this.onPageChange}
            current={page.pageNum}
            total={page.total}
          />}
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
