import React from 'react';
import { Row, Col } from 'antd';
import moment from 'moment';
import { BiFilter } from '@/utils/utils';
import { STATIC_HOST } from '@/utils/constants';
import styles from './style.less';

class Info extends React.Component {
  renderDom = (data, type, i = 0) => {
    return (
      <div key={i} className={styles.infoCls}>
        <Row>
          <Col span={12} >
            {
              type === 'startAppeal' ? <> <span> 附件：</span> {data.attUrl?<a href={`${STATIC_HOST}${data.attUrl}`} >附件1</a>:null}</> :
                <>
                  <span className={data.checkResult !== 1 ? styles.redIcon : styles.greenIcon}> 审核结果：</span>
                  <span>{BiFilter('APPEAL_RESULT_TYPE').map(item => { if (item.id === data.checkResult) return item.name })}</span>
                </>
            }
          </Col>
          <Col span={4}>
            <span> 执行人：</span>
            <span>{data.operator}</span>
          </Col>
          <Col span={8}>
            <span>操作时间：</span>
            <span>{data.operateDate ? moment(data.operateDate).format('YYYY年MM月DD日 HH:mm:ss') : null}</span>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <span>{type === 'startAppeal' ? '申诉说明' : '审核说明'} ：</span>
            <span>{data.desc}</span>
          </Col>
        </Row>
      </div>
    )
  };
  render() {
    const { data, type } = this.props;
    const isArr = data instanceof Array;

    return (
      <div className={styles.itemInfo}>
        {!data ? null : (
          <>
            {
              isArr ? data.map((item, i) => {
                return this.renderDom(item, type, i)
              }) : this.renderDom(data, type)
            }
          </>
        )
        }
      </div>
    );
  }

}

export default Info;
