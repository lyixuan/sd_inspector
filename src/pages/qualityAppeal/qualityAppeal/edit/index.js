import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import { Row, Col, Input, Radio, message } from 'antd';
import BIButton from '@/ant_components/BIButton';
import PersonInfo from './../../qualityNewSheet/detail/components/personInfo';
import SubOrderDetail from './../../components/subOrderDetail';
import IllegalInfo from './../../qualityNewSheet/detail/components/IllegalInfo';
import AppealInfo from './../component/appealInfo';
import SuperiorCheck from './../component/superiorCheck';
import SOPCheckResult from './../component/sopCheckResult';
import sopCheckRecords from './../component/sopCheckRecords';
import router from 'umi/router';
const { TextArea } = Input;
const RadioGroup = Radio.Group;

@connect(({ qualityAppealHome, EditAppeal }) => ({
  qualityAppealHome,
  EditAppeal,
}))
class EditAppeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        id: this.props.location.query.id || 1,
      },
      submitParam: {
        checkResult: null,
        appealEndDate: null,
        type: 1,
        desc: '',
        qualityId: this.props.location.query.id || 1,
      },
      appealInfoCollapse: [],
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'qualityAppealHome/getDetailData',
      payload: this.state.params,
    });
    this.props.dispatch({
      type: 'qualityAppealHome/getQualityDetailData',
      payload: this.state.params,
    });
  }

  getAppealInfos(detailData) {
    let domFragment = [];
    detailData.forEach((item, index) => {
      this.state.appealInfoCollapse.push(false);
      domFragment.push(
        <>
          <AppealInfo
            data={{
              appealStart: item.appealStart,
              appealEndDate: item.appealEndDate,
              id: item.id,
              type: item.type,
              index: index,
              isCollapse: this.state.appealInfoCollapse[index],
            }}
            onClick={index => this.handleAppealInfoCollapse(index)}
          />
          {/* <SOPCheckResult
            data={{
              sopAppealCheck: item.sopAppealCheck,
              isCollapse: this.state.appealInfoCollapse[index],
            }}
          /> */}
          {/* <SuperiorCheck data={item.masterAppealCheck} /> */}
        </>
      );
    });
    return domFragment;
  }
  getSuperiorCheck(detailData) {
    let domFragment = [];
    detailData.forEach((item, index) =>
      domFragment.push(
        <>
          <SOPCheckResult
            data={{
              sopAppealCheck: item.sopAppealCheck,
              isCollapse: this.state.appealInfoCollapse[index],
            }}
          />
        </>
      )
    );
    return domFragment;
  }
  handleAppealInfoCollapse(index) {
    this.state.appealInfoCollapse[index] = !this.state.appealInfoCollapse[index];
    this.setState({ appealInfoCollapse: this.state.appealInfoCollapse });
  }
  handleSubmit = e => {
    let params = this.state.submitParam;
    if (!this.state.submitParam.checkResult) {
      message.warn('请选择审核结果');
      return;
    }
    if (!this.state.submitParam.desc) {
      message.warn('请填写审核说明');
      return;
    }
    this.props.dispatch({
      type: 'EditAppeal/sopCheckAppeal',
      payload: { params },
    });
    router.push({
      pathname: '/qualityAppeal/qualityAppeal'
    });
  };
  radioChange = e => {
    this.state.submitParam.checkResult = e.target.value;
    this.setState({ submitParam: this.state.submitParam });
  };
  inputChange = e => {
    e.persist();
    this.state.submitParam.desc = e.target.value;
    this.setState({ submitParam: this.state.submitParam });
  };

  render() {
    const detailData = this.props.qualityAppealHome.DetailData;
    const qualityDetailData = this.props.qualityAppealHome.QualityDetailData;
    this.state.submitParam.appealEndDate = detailData[detailData.length - 1] ? detailData[detailData.length - 1].appealEndDate : ''
    this.state.submitParam.type = detailData[detailData.length - 1] ? detailData[detailData.length - 1].type : ''
    return (
      <div className={styles.editAppeal}>
        <section>
          {/* 质检违规人员信息 */}
          <PersonInfo data={qualityDetailData} />
        </section>
        <section>
          <div className={styles.subOrderNum}>子订单编号：{qualityDetailData.orderNum}</div>
          <SubOrderDetail data={qualityDetailData.orderDetail} />
        </section>
        <section>
          {/* 质检违规详情 */}
          <section>{/* 质检审核 */}</section>
          <div className={styles.divideLine} />
          <IllegalInfo data={qualityDetailData} />
        </section>

        <section>
          {/* 申诉信息 */}
          {this.getAppealInfos(detailData)}
        </section>
        <div className={styles.editBox}>
          <div className={styles.title}>SOP审核</div>
          <Row className="gutter-row2">
            <Col span={24} className="editRow">
              <div className={styles.label}>审核结果：</div>
              <div className={styles.content}>
                <RadioGroup onChange={this.radioChange}>
                  <Radio value={1}>通过</Radio>
                  <Radio value={0}>驳回</Radio>
                </RadioGroup>
              </div>
            </Col>
          </Row>
          <Row className="gutter-row2">
            <Col span={24} className="editRow">
              <div className={styles.label}>审核说明：</div>
              <div className={styles.content}>
                <TextArea rows={4} onChange={this.inputChange} />
              </div>
            </Col>
          </Row>
        </div>
        {this.getSuperiorCheck(detailData)}
        <Row className="gutter-row">
          <Col span={24}>
            <div className={styles.gutterBox1}>
              <span className={styles.gutterBtn2}>
                <BIButton>取消</BIButton>
              </span>
              <span className={styles.gutterBtn1}>
                <BIButton type="primary" onClick={this.handleSubmit}>
                  提交
                </BIButton>
              </span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default EditAppeal;
