import React from 'react';
import {  Row, Col } from 'antd';
import moment from 'moment';
import styles from './style.less';

class Info extends React.Component {
  renderDom = (data,type)=>{
    return(
      <>
        <Row>
          <Col span={12} >
            {
              type==='startAppeal'?<> <span> 附件：</span><span>{data.attUrl}</span></>:
                <><span className={data.checkResult!==1?styles.redIcon:styles.greenIcon}> 审核结果：</span><span>{data.checkResult}</span></>
            }
          </Col>
          <Col span={4}>
            <span> 执行人：</span>
            <span>{data.operator}</span>
          </Col>
          <Col span={8}>
            <span>操作时间：</span>
            <span>{moment(data.operateDate).format('YYYY年MM月DD日 HH:mm:ss')}</span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <span>{type==='startAppeal'?'申诉说明':'审核说明'} ：</span>
            <span>{data.desc}</span>
          </Col>
        </Row>
      </>
    )
  };
  render() {
    const {data,type} = this.props;
    const isArr = data instanceof Array;
      return (
      <div className={styles.itemInfo}>
        {!data?null: (
          <>
            {
              isArr?data.map(item=>{
                this.renderDom(item,type)
              }): this.renderDom(data,type)
            }
          </>
        )
        }
      </div>
    );
  }

}

export default Info;
