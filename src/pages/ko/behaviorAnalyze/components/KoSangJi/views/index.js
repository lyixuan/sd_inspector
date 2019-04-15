import React from 'react';
import styles from './index.less'

class Views extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      option: {},
    };
  }
  componentDidMount() {

  }
  render() {
    const dataObj = [{name:'PV',data:12121},{name:'UV',data:121},{name:'跳出率',data:'20%'},{name:'转化率',data:'5%'}]
    return (
      <div className={styles.contentWrap}>
        {
          dataObj.map((item,index)=>{
            return (
              <div className={styles.itemCls} key={index}>
                <div className={styles.nameCls}>{item.name}</div>
                <div className={styles.dataCls}>{item.data}</div>
              </div>
            )
          })
        }

      </div>
    );
  }
}

export default Views;
