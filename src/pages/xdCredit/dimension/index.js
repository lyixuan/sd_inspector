import React from 'react';
import { connect } from 'dva';
import { Skeleton } from 'antd';
import BITable from '@/ant_components/BITable';
import IndentNum from '../../indexPage/components/indentNum';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
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
        width: '160px',
        render: text => <span data-trace='{"widgetName":"选择明细","traceName":"数据服务/学分明细/选择明细"}'>{text}</span>
      }, {
        width: '80px',
        title: '我的',
        dataIndex: 'score',
        key: 'score',
        className: 'txRight',
        render: text => {
          return <div data-trace='{"widgetName":"选择明细","traceName":"数据服务/学分明细/选择明细"}'>{text}</div>
        }
      }, {
        width: '80px',
        title: '环比(%)',
        dataIndex: 'scoreRatio',
        className: 'txRight',
        key: 'scoreRatio',
        render: text => {
          const num = Number(text);
          const imgSrc = num > 0 ? up : down;
          return (
            <div data-trace='{"widgetName":"选择明细","traceName":"数据服务/学分明细/选择明细"}'>
              {num == 0 ? { text } : <span>{text}<img style={{ marginLeft: '3px' }} src={imgSrc} /></span>}
            </div>
          )
        }
      }, {
        width: '95px',
        title: '数量',
        dataIndex: 'num',
        className: 'txRight',
        key: 'num',
        render: (text, record) => <div style={{ whiteSpace: 'nowrap' }} data-trace='{"widgetName":"选择明细","traceName":"数据服务/学分明细/选择明细"}'>
          {record.level === 4 && <>
            {text > 99999 ? 99999 + '+' : text}{record.unit}
            {text ? <span className={styles.greenColor} style={{ marginLeft: '5px' }}>></span> : ''}
          </>}
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
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        })
        // document.body.scrollTop = document.documentElement.scrollTop = 0;
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
            dataSource.length > 0 ? <BITable
              columns={this.columns()}
              bordered
              dataSource={dataSource}
              defaultExpandAllRows={true}
              rowClassName={this.setRowClassName}
              expandIcon={() => <a />}
              pagination={false}
              onRow={this.onClickRow}
              indentSize={10}
              rowKey={record => record.id}
              smalled={true}
            /> : <BITable
                columns={this.columns()}
                pagination={false}
                onRow={this.onClickRow}
                rowKey={record => record.id}
              />
          }
        </Skeleton>
      </div>

    );
  }
}

export default Dimension;
