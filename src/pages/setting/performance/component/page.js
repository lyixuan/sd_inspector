import React from 'react';
import { Row, Col, Table } from 'antd';
import moment from 'moment';
import BISelect from '@/ant_components/BISelect';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import styles from '../style.less';
const { BIRangePicker } = BIDatePicker;
const { Option } = BISelect;

// @connect(({ performanceModel }) => ({
//   performanceModel,
// }))
class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    const { p = null } = this.props.location.query;
  }

  onPageChange = page => {
    this.props.queryData(page);
  };

  render() {
    const { dataSource, columns, page, loading } = this.props;
    return (
      <div className={styles.newSheetWrap}>
        {/*table*/}
        <div className={styles.tableBlock}>
          <BITable
            rowKey={record => {
              return record.id;
            }}
            dataSource={dataSource}
            columns={columns}
            pagination={false}
            loading={loading}
          />
          <br />
          {
            <BIPagination
              showQuickJumper
              defaultPageSize={page.pageSize ? page.pageSize : 15}
              onChange={this.onPageChange}
              current={page.pageNum}
              total={page.total}
            />
          }
        </div>
      </div>
    );
  }
}
export default NewQualitySheet;
