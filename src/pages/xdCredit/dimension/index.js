import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import styles from './style.less'

@connect(( { loading } ) => ({
  loading: loading.effects['xdCreditModal/getUserOrgList'],
}))
class  Dimension extends React.Component {
  columns = () => {
    const columns = [
      {
        title: 'pppp',
        dataIndex: 'name',
        key: 'name',
        width:'40%'
      }, {
        title: '我的',
        dataIndex: 'score',
        key: 'score',
      }, {
        title: '环比（%）',
        dataIndex: 'scoreRatio',
        key: 'scoreRatio',
        render: text => {
          const num = Number(text);
          return num === 0 ? text : <span className={num > 0 ? styles.greenColor : styles.redColor}>{text}</span>
        }
      }, {
        title: '数量',
        dataIndex: 'num',
        key: 'num',
        render: (text, record) => <div>
            {text > 99999 ? 99999 + '+': text}{record.unit} 
            {text && record.level === 4 && <span className={styles.greenColor} style={{marginLeft: '16px'}}>></span>}
          </div>
      }
    ];
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
  fillDataSource = (params = []) =>{
    params.map((item)=>{
      item.name = item.dimensionName;
      item.scoreRatio = '10';
      // item.num = '99990';
      item.score = item.myScore
      if(item.dimensionName === '学分均分'){
        item.children.map(subItem => {
          if(subItem.dimensionName === '正面均分'){
            this.serverArray(item.children)
          }
        })
      }
    })
    return params

  }
 serverArray = (arr, n = 2) =>{
    for(var item = 0;item < arr.length;item++){
        arr[item].name = arr[item].dimensionName;
        arr[item].scoreRatio = '-10';
        arr[item].num = '999909';
        arr[item].score = arr[item].myScore;
        arr[item].level = n;
        if(arr[item].children){
          this.serverArray(arr[item].children, n+1);
        }
    }
    return arr
  }
  onClickRow = (record) => {
    return {
      onClick: () => {
        if (record.level === 4 && record.num) this.props.onChangeParams(record.id, 'dementionId');
      }
    };
  }

  render() {
    const  dataSource = this.fillDataSource(this.props.dimensionList);
    return (
          <div className={styles.dimension}>
            {
                <BITable
                  columns={this.columns()}
                  dataSource={dataSource}
                  defaultExpandAllRows={true}
                  rowClassName={this.setRowClassName}
                  pagination = {false}
                  onRow={this.onClickRow}
                  rowKey={record => record.id}
                  loading={this.props.loading}
                  scroll={{x:0,y:408}}
                  smalled={true}
                />
              }
          </div>
    );
  }
}

export default Dimension;
