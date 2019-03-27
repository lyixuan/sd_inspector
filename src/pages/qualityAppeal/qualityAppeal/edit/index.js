import React from 'react';
import { connect } from 'dva';
import styles from './style.less';
import Edit from '../../components/AppealInfo/_edit';
import { Row, Col, message } from 'antd';
import BIButton from '@/ant_components/BIButton';
import PersonInfo from './../../qualityNewSheet/detail/components/personInfo';
import SubOrderDetail from './../../components/subOrderDetail';
import IllegalInfo from './../../qualityNewSheet/detail/components/illegalInfo';
import AppealInfo from './../component/appealInfo';
import SOPCheckResult from './../component/sopCheckResult';
import router from 'umi/router';

@connect(({ qualityAppealHome, EditAppeal }) => ({
  qualityAppealHome,
  EditAppeal,
}))
class EditAppeal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      params: {
        id: this.props.location.query.id || 26,
      },
      submitParam: {
        checkResult: null,
        appealEndDate: null,
        type: 1,
        desc: '',
        qualityId: this.props.location.query.id || 26,
      },
      appealInfoCollapse: [],
      qualityInfoCollapse: true,
    };
    this.appealEndDate = null;
    this.type = null
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
    params.appealEndDate = this.appealEndDate;
    params.type = this.type;
    if (params.checkResult == null) {
      message.warn('请选择审核结果');
      return;
    }
    if (!params.desc) {
      message.warn('请填写审核说明');
      return;
    }
    this.props.dispatch({
      type: 'EditAppeal/sopCheckAppeal',
      payload: { params },
    });
    router.push({
      pathname: '/qualityAppeal/qualityAppeal',
    });
  };
  setStateData = (val)=>{
    const {submitParam} = this.state;
    this.setState({
      submitParam: {...submitParam,...val},
    });
  };

  handleCollapse() {
    this.setState({ qualityInfoCollapse: !this.state.qualityInfoCollapse });
  }
  render() {
    const detailData = this.props.qualityAppealHome.DetailData;
    const qualityDetailData = this.props.qualityAppealHome.QualityDetailData;

    this.appealEndDate = detailData[detailData.length - 1] ? detailData[detailData.length - 1].appealEndDate : '';
    this.type = detailData[detailData.length - 1] ? detailData[detailData.length - 1].type : '';

    return (
      <div className={styles.editAppeal}>
        <section>
          {/* 质检违规人员信息 */}
          <PersonInfo data={qualityDetailData} qualityInfoCollapse={this.state.qualityInfoCollapse}  onClick={() => this.handleCollapse()}/>
        </section>
        <div
          className={
            this.state.qualityInfoCollapse ? `${styles.showPanel} ` : `${styles.hidePanel}`
          }
        >
          <div className={styles.subOrderNum}>子订单编号：{qualityDetailData.orderNum}</div>
          <SubOrderDetail data={qualityDetailData.orderDetail} />
          <>
            {/* 质检违规详情 */}
            <section>{/* 质检审核 */}</section>
            <div className={styles.divideLine} />
            <IllegalInfo data={qualityDetailData} />
          </>
        </div>

        <section>
          {/* 申诉信息 */}
          {this.getAppealInfos(detailData)}
        </section>
        <div className={styles.editBox}>
          <div className={styles.title}>SOP审核</div>
          <Edit hideDate setStateData={this.setStateData} />
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
