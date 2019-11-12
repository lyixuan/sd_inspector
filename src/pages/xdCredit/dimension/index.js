import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import up from '@/assets/xdFamily/rankUp.png';
import down from '@/assets/xdFamily/rankDown.png';
import open from '@/assets/xdCredit/open.png';
import close from '@/assets/xdCredit/close.png';
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
        title: '学分/环比',
        dataIndex: 'scoreRatio',
        className: 'txRight',
        key: 'scoreRatio',
        render: (text, record) => {
          const num = Number(text);
          const imgSrc = num > 0 ? up : down;
          return (
            <div className={styles.scoreRatio}>
              <span className={styles.score}>{record.score}</span>
              <span className={styles.ratio}>{text}{text === 'N/A' || num === 0 ? '' : <img src={imgSrc} alt=""/>}</span>
            </div>
          )
        }
      },
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
  // 展开关闭图标渲染
  expandIconRender = (panelProps) => {
    if (panelProps.record.level === 2 || panelProps.record.level === 3) {
      if (panelProps.expanded) {
        return <img src={close} onClick={panelProps.onExpand} className={styles.expandIcon} alt=""/>
      } else {
        return <img src={open} onClick={panelProps.onExpand} className={styles.expandIcon} alt=""/>
      }
    } else {
      return <img src={open} style={{width: 0}} alt=""/>
    }
  }

  render() {
    const dataSource = this.fillDataSource(this.props.dimensionData.dimensionList);
    return (
      <div className={styles.dimension}>
        {
          dataSource.length > 0 ? <BITable
            columns={this.columns()}
            bordered
            dataSource={dataSource}
            // defaultExpandAllRows={true}
            rowClassName={this.setRowClassName}
            expandIcon={this.expandIconRender}
            pagination={false}
            onRow={this.onClickRow}
            // indentSize={40}
            rowKey={record => record.id}
            smalled={true}
            defaultExpandedRowKeys={[1,2,10]}
            onExpand={(a, b, c) => {console.log(999,a, b, c)}}
            // onExpandedRowsChange={(a, b, c) => {console.log(768,a, b, c)}}
            // expandRowByClick={true}
            loading={this.props.loading}
          /> : ''
        }
      </div>

    );
  }
}

export default Dimension;
