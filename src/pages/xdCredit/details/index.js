import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import creditImg from '@/assets/xdcredit/credit.gif'
import styles from './style.less';

@connect(({ loading }) => ({
  loading: loading.effects['xdCreditModal/getDimensionDetail'],
}))
class CreditDetials extends React.Component {
  columns = () => {
    const { detailsData } = this.props;
    console.log(13, detailsData)
    const columns = [
      {
        title: '序号',
        dataIndex: 'numOrder',
        key: 'numOrder',
        render: (text, r, i) => i + 1
      }, {
        title: detailsData.titleOne,
        dataIndex: 'valOne',
        key: 'valOne',
      }, {
        title: detailsData.titleTwo,
        dataIndex: 'valTwo',
        key: 'valTwo',
      }, {
        title: detailsData.titleThree,
        dataIndex: 'valThree',
        key: 'valThree',
      }, {
        title: detailsData.titleFour,
        dataIndex: 'valFour',
        key: 'valFour',
      },
    ];
    if (detailsData.status === 1) {
      columns.push({
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: () => 1
      })
    }
    return columns || [];
  };
  setRowClassName = (r, c, b) => {
    if (this.props.dementionId === r.id) {
      return styles.selectedRow;
    } else if (r.level === 4 && r.num) {
      return styles.clickRow;
    }
    return styles['rowBg' + b]
  }
  onChangeSize = (currentPage) => {
    const { onPageChange } = this.props;
    if (onPageChange) {
      onPageChange(currentPage);
    }
  };

  render() {
    const { dementionId, detailsData, pageSize = 10, totalCount, currentPage } = this.props;
    const dataSource = detailsData.data || [];
    return (
      <div className={`${styles.detials} ${dementionId ? '' : styles.noneData}`}>
        {
          dementionId ? <BITable
            columns={this.columns()}
            dataSource={dataSource}
            rowClassName={this.setRowClassName}
            pagination={{
              onChange: this.onChangeSize,
              defaultPageSize: pageSize,
              current: currentPage,
              total: totalCount,
              showQuickJumper: true,
            }}
            rowKey={record => record.id}
            loading={this.props.loading}
            smalled={true}
          /> : <img src={creditImg} alt='权限' />
        }
      </div>
    );
  }
}

export default CreditDetials;
