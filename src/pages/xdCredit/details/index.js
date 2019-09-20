import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import creditImg from '@/assets/xdcredit/credit.gif'
import styles from './style.less';

@connect(({xdWorkModal, loading}) => ({
  xdWorkModal,
  loading:loading.effects['xdWorkModal/groupPkList'],
}))
class  CreditDetials extends React.Component {
  columns = () => {
    const { detailsData } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'numOrder',
        key: 'numOrder',
        render: (text, r , i) => i + 1
      }, {
        title: detailsData.titleOne,
        dataIndex: 'valOne',
        key: 'valOne',
      }, {
        title: detailsData.titleOne,
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
    if (this.props.dementionId === r.id)  {
      return styles.selectedRow;
    } else if (r.level === 4 && r.num) {
      return styles.clickRow;
    }
    return styles['rowBg' + b]
  }

  render() {
    const  dataSource = this.props.detailsData.data;
    return (
          <div className={styles.detials}>
              <BITable
                columns={this.columns()}
                dataSource={dataSource}
                rowClassName={this.setRowClassName}
                pagination = {false}
                rowKey={record => record.id}
                loading={this.props.loading}
                smalled={true}
              />
              {
                dataSource.length > 0 ? '' : <div className={styles.noneData}>
                  <img src={creditImg} alt='权限'/>
                </div> 
              }
          </div>
    );
  }
}

export default CreditDetials;
