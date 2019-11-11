import React from 'react';
import { connect } from 'dva';
import { Skeleton } from 'antd';
import BITable from '@/ant_components/BITable';
import IndentNum from '../../indexPage/components/indentNum';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import BILoading from '@/components/BILoading';
import styles from './style.less'

@connect(({ loading }) => ({
  loading: loading.effects['xdCreditModal/getDimensionList'],
}))
class Dimension extends React.Component {
  columns = () => {
    const columns = [
      {
        title: this.props.dimensionData.groupFullName,
        dataIndex: 'dimensionName',
        key: 'dimensionName',
        rowClassName: styles.fontWeight,
        width: '170px',
        render: (text, record) => {
          if (record.sequenceNo) {
            return <span><b>{record.sequenceNo} {text}</b></span>
          } else {
            return <span>{text}</span>
          }

        }
      }, {
        width: 90,
        title: '学分',
        dataIndex: 'score',
        key: 'score',
        className: 'txRight',
        render: text => {
          return <div>{text}</div>
        }
      }, {
        width: 90,
        title: '环比(%)',
        dataIndex: 'scoreRatio',
        className: 'txRight',
        key: 'scoreRatio',
        render: text => {
          const num = Number(text);
          const imgSrc = num > 0 ? up : down;
          return (
            <div>
              {num == 0 ? text : <span>{text}{text == 'N/A' ? null : <img style={{ marginLeft: '3px', width: '10px', height: '12px' }} src={imgSrc} />}</span>}
            </div>
          )
        }
      }, {
        width: 105,
        title: '数量',
        dataIndex: 'num',
        className: 'txRight',
        key: 'num',
        render: (text, record) => <div style={{ whiteSpace: 'nowrap' }}>
          {record.level === 4 && <div style={{ cursor: text ? 'pointer' : '' }}>
            {text > 99999 ? 99999 + '+' : text}{record.unit}
            {text ? <span className={styles.greenColor} style={{ marginLeft: '5px' }}>></span> : ''}
          </div>}
        </div>
      }
    ];
    return columns || [];
  };
  // 组织row
  // setRowClassName = (r) => {
  //   if (this.props.dementionId === r.id) {
  //     return styles.selectedRow;
  //   } else if (r.level === 4 && r.num) {
  //     return styles.clickRow;
  //   }
  //   return styles['rowBg' + r.level]
  // }
  setRowClassName = record => {
    let className = ''
    if (this.props.dementionId === record.id) {
      return styles.selectedRow;
    } else if (record.flagMark === 3) {
      className = 'yellowBgColor';
    } else if (record.flagMark === 1) {
      className = 'plusBgColor';
    } else if (record.flagMark === 2) {
      className = 'minusBgColor';
    }
    return className
  }
  fillDataSource = (params = [], n = 1, flagMark) => {
    params.map(item => {
      item.level = n;
      item.flagMark = item.dimensionName === '学分均分' ? 3 : flagMark; // 1 正面均分  2 负面均分 3学分均分 其它
      if (item.children && item.children.length > 0) {
        const mark = item.dimensionName === '学分均分' ? 1 : (item.dimensionName === '负面均分' ? 2 : flagMark);
        this.fillDataSource(item.children, n + 1, mark);
      }
    })
    return params
  }
  onClickRow = (record) => {
    return {
      onClick: () => {

        // document.body.scrollTop = document.documentElement.scrollTop = 0;
        if (record.level === 4 && record.num) {
          const obj = { widgetName: record.dimensionName, traceName: `数据服务/学分明细/${record.dimensionName}` }
          const { BI = {} } = window;
          this.props.onChangeParams(record.id, 'dementionId');
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
          BI.traceV && BI.traceV(obj);
        }
      }
    };
  }

  render() {
    const dataSource = this.fillDataSource(this.props.dimensionData.dimensionList);
    return (
      <div className={styles.dimension}>
        {/* <Skeleton loading={this.props.loading} > */}
        {
          this.props.loading && this.props.dimisionLoadingStatus ? <BILoading isLoading={this.props.loading} /> : dataSource.length > 0 ? <BITable
            columns={this.columns()}
            bordered
            dataSource={dataSource}
            // defaultExpandAllRows={true}
            rowClassName={this.setRowClassName}
            expandIcon={() => <a />}
            pagination={false}
            onRow={this.onClickRow}
            indentSize={10}
            rowKey={record => record.id}
            smalled={true}
            expandedRowKeys={[1,3,4,]}
          /> : <BITable
              columns={this.columns()}
              pagination={false}
              onRow={this.onClickRow}
              rowKey={record => record.id}
            />
        }
        {/* </Skeleton> */}
      </div>

    );
  }
}

export default Dimension;
