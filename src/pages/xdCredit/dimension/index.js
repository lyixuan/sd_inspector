import React from 'react';
import { connect } from 'dva';
import { Skeleton } from 'antd';
import BITable from '@/ant_components/BITable';
import styles from './style.less'

@connect(({ loading }) => ({
  loading: loading.effects['xdCreditModal/getDimensionList'],
}))
class Dimension extends React.Component {
  columns = () => {
    const columns = [
      {
        title: this.props.dimensionData.groupFullName,
        dataIndex: 'name',
        key: 'name',
        width: '50%',
      }, {
        width: '16%',
        title: '我的',
        dataIndex: 'score',
        key: 'score',
        render: text => <span style={{marginLeft: '-8px'}}>{text}</span>
      }, {
        width: '20%',
        title: '环比（%）',
        dataIndex: 'scoreRatio',
        key: 'scoreRatio',
        render: text => {
          const num = Number(text);
        return <div style={{marginLeft: '-8px'}}>{num === 0 ? text : <span className={num > 0 ? styles.greenColor : styles.redColor}>{text}</span>}</div>
        }
      }, {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        render: (text, record) => <div style={{marginLeft: '-8px'}}>
          {text > 99999 ? 99999 + '+' : text}{record.unit}
          {text && record.level === 4 && <span className={styles.greenColor} style={{ marginLeft: '16px' }}>></span>}
        </div>
      }
    ];
    return columns || [];
  };
  // 组织row
  setRowClassName = (r) => {
    if (this.props.dementionId === r.id) {
      return styles.selectedRow;
    } else if (r.level === 4 && r.num) {
      return styles.clickRow;
    }
    return styles['rowBg' + r.level]
  }
  fillDataSource = (params = [], n = 1) => {
    params.map(item => {
      item.level = n;
      if (item.children && item.children.length > 0) {
        this.fillDataSource(item.children, n + 1);
      }
    })
    return params
  }
  onClickRow = (record) => {
    return {
      onClick: () => {
        if (record.level === 4 && record.num) this.props.onChangeParams(record.id, 'dementionId');
      }
    };
  }

  render() {
    const dataSource = this.fillDataSource(this.props.dimensionData.dimensionList);
    return (
      <div className={styles.dimension}>
        <Skeleton loading={this.props.loading} >
          {
            dataSource.length > 0 && <BITable
              columns={this.columns()}
              dataSource={dataSource}
              defaultExpandAllRows={true}
              rowClassName={this.setRowClassName}
              expandIcon={() => <a />}
              pagination={false}
              onRow={this.onClickRow}
              rowKey={record => record.id}
              loading={this.props.loading}
              scroll={{ x: 0, y: 615 }}
              smalled={true}
            />
          }
        </Skeleton>
      </div>

    );
  }
}

export default Dimension;
