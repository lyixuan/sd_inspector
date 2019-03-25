import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import { BiFilter } from '@/utils/utils';
import styles from './style.less';
import AppealInfo from './component/AppealInfo';


@connect(({ createPointBook, qualityAppealHome }) => ({
  createPointBook,
  orgList: qualityAppealHome.orgList,
}))
class  CreatePointBook extends React.Component {
  constructor(props) {
    super(props);
    this.state={}
  }

  handleSubmit = () => {
    console.log(1)
    // this.props.dispatch({
    //   type: 'createAppeal12/reviewAppel',
    //   payload: { qualityInspectionParam, appealParam },
    // })
  }
  render() {
    return (
      <div className={styles.qualityContainter}>
        <div className={styles.title}>质检违规详情 <span className={styles.passTimeCls}>（质检通过时间：2019-02-01 22:22:22）</span>  </div>
      <div>
        <div>
          <div className={styles.title}>申诉信息</div>
          <AppealInfo/>
        </div>

        <Row className="gutter-row">
          <Col span={24}>
            <div className={styles.gutterBox1}>
                        <span className={styles.gutterBtn2}>
                          <BIButton>取消</BIButton>
                        </span>
              <span className={styles.gutterBtn1}>
                          <BIButton type="primary" onClick={this.handleSubmit}>提交</BIButton>
                        </span>
            </div>
          </Col>
        </Row>
      </div>
        <BIModal
          title="提交确认"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" onClick={this.handleOk}>
              确定
            </BIButton>,
          ]}
        >
          <div className={styles.modalWrap}>该条记录将被提交给质检主管进行审核，确定提交吗？</div>
        </BIModal>
      </div>
    );
  }
}

export default CreatePointBook;
