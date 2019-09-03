import React from 'react';
import { Input, Progress, Cascader } from 'antd';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BIModal from '@/ant_components/BIModal';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect/formSelect';
import BICascader from '@/ant_components/BICascader/FormCascader';
import BIRadio from '@/ant_components/BIRadio';
import create from '@/assets/ai/create.png'
import styles from '../style.less';
import router from 'umi/router';
import { Link } from 'dva/router';

const { TextArea } = BIInput;
const { Option } = BISelect;

@connect(({ AiDetail, loading }) => ({
  loading,
  AiDetail,
  pageData: AiDetail.pageData,
  // submitParam: AiDetail.submitParam,
  isLoading: loading.effects['AiDetail/submit']
}))

class DataClassfy extends React.Component {
  constructor(props) {
    super(props);
    console.log(27, this.props.id)
    this.state = {
      // id: props.id,
      // idList: this.props.idList,
      // nextId: null,
      // tabType: 'im',
      // percent: 0,
      // currentId: 0,
      submitParam: this.props.submitParam,
      visible: false,
      evaluationNature: this.props.submitParam && this.props.submitParam.evaluationNature ? this.props.submitParam.evaluationNature : '',
      action: '' // // action 1-上一条  2-下一条 3-跳过
    };

  }
  setOrg = () => {
    let org = ''
    this.props.pageData && this.props.pageData.result.ordIdList.map(item => {
      if (item.ordId == this.state.submitParam.ordId) {
        org = item.org
      } else {
        return ' '
      }
    })
    return org
  }
  setLifeCycle = () => {
    let lifeCycle = ''
    this.props.pageData && this.props.pageData.result.ordIdList.map(item => {
      if (item.ordId == this.state.submitParam.ordId) {
        lifeCycle = item.lifeCycle
      } else {
        return ' '
      }
    })
    return lifeCycle
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.pageData) !== JSON.stringify(nextProps.pageData)) {
      if (JSON.stringify(this.state.submitParam) != '{}') {
        this.setState({
          submitParam: this.state.submitParam
        })
      } else {
        this.setState({
          submitParam: nextProps.submitParam
        })
      }

      // if (nextProps.pageData.result.ordIdList.length > 0) {
      //   nextProps.pageData.result.ordIdList.map(item => {
      //     if (item.ordId == this.state.submitParam.ordId) {
      //       this.setState({
      //         org: item.org
      //       })
      //     }

      //   })
      // }

    }

  }
  orderChange = (val) => {
    this.setState({
      submitParam: { ...this.state.submitParam, ordId: val.name }
    })


  }
  // 咨询类型切换
  onChangeConsult = (value) => {
    const consultTypeIdList = value.map(item => {
      return item.value
    })
    this.setState({
      submitParam: { ...this.state.submitParam, consultTypeIdList },
    })
  }
  // 原因切换
  onChangeReson = (value, selectedOptions) => {
    const reasonTypeIdList = value
    const evaluationNature = selectedOptions.length > 0 ? selectedOptions[selectedOptions.length - 1]['evaluationNature'] : ''

    this.setState({
      evaluationNature: evaluationNature,
      submitParam: { ...this.state.submitParam, reasonTypeIdList, evaluationNature }
    })
  }
  // 选择是否质检
  onChangeRadio = (e) => {
    this.setState({
      submitParam: { ...this.state.submitParam, evaluationFlag: e.target.value }
    })
  }
  // 备注
  handleRemark = (e) => {
    this.setState({
      submitParam: { ...this.state.submitParam, remark: e.target.value },
    })
  };
  submit = (action) => { // action 1-上一条  2-下一条 3-跳过
    if (this.state.submitParam.evaluationFlag == 1) {
      this.state.submitParam.evaluationFlag = false;
    } else {
      this.state.submitParam.evaluationFlag = true;
    }
    this.setState({ action });


    // if (this.props.type == 1) {
    //   this.setState({
    //     tabType: 'im'
    //   })
    // } else if (this.props.type == 2) {
    //   this.setState({
    //     tabType: 'bbs'
    //   })
    // } else {
    //   this.setState({
    //     tabType: 'nps'
    //   })
    // }
    if (action === 2) { // 提交, 下一条，提交数据后请求上或下一条的详情
      let params = {
        type: this.props.type,
        itemId: this.props.pageData.item.itemId,
        result: {...this.state.submitParam, lifeCycle: this.setLifeCycle()},
      };
      this.props.computedIdNew(() => {
        this.props.dispatch({
          type: 'AiDetail/submit',
          payload: { params: params },
          callback: () => {
            this.detailEditData();
          }
        });
      }, action);
    } else { // 上一条 跳过不提交，请求下一条的详情
      this.props.computedIdNew(this.detailEditData, action);
    }
  }
  detailEditData = () => { // 请求详情数据
    const { id, type, params } = this.props;
    if (!id) {
      this.setState({ // 按钮状态标志
        visible: true
      });
      return;
    }
    router.push({
      pathname: '/qualityMarking/detail',
      query: { params: JSON.stringify({ type: params, id}) }
    });
    this.props.dispatch({
      type: 'AiDetail/edit',
      payload: { params: {id, type} },
      callback: (submitParam) => {
        this.setState({
          submitParam: { ...submitParam }
        })
      }
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleOk = () => {
    const { type } = this.props;
    const tabType = type == 3 ? 'nps' : (type == 2 ? 'bbs' : 'im');
    router.push({
      pathname: `/qualityMarking/${tabType}`,
    });
  }

  render() {
    let { consultTypeTree, reasonTypeTree, idList } = this.props.AiDetail;
    let { type, isLoading, pageData } = this.props;
    let orderList = pageData && pageData.result ? pageData.result.ordIdList : [{ ordId: -100, org: '' }];
    const currentId = this.props.idList.indexOf(this.props.id) + 1;
    const percent = currentId / this.props.idList.length * 100;
    const { visible, action } = this.state;
    return (
      <>
        <div className={styles.consultContent}>
          <ul className={styles.consultInput}>
            {
              type != 1 && orderList && orderList.length != 1 ?
                <>
                  <li>
                    <label>选择订单：</label>
                    <div className={styles.selects}>
                      {orderList instanceof Array && orderList.length > 0 ? <BISelect style={{ width: '100%' }} value={this.state.submitParam.ordId} placeholder="请选择" onChange={(val) => { this.orderChange(val) }}>
                        {orderList.map(item => (
                          <Option key={item.ordId}>{item.ordId}</Option>)
                        )}
                      </BISelect> : '--'}
                    </div>
                  </li>
                  <li>
                    <label>后端归属：</label>
                    <p>{this.setOrg()}</p>
                    {/* <p>{this.state.org}</p> */}
                  </li>
                </>
                : null
            }
            {
              type != 1 && orderList && orderList.length == 1 ?
                <>
                  <li>
                    <label>选择订单：</label>
                    <div className={styles.selects}>
                      <p>{orderList && orderList[0] ? orderList[0].ordId : ''}</p>
                    </div>
                  </li>
                  <li>
                    <label>后端归属：</label>
                    <p>{orderList && orderList[0] ? orderList[0].org : ''}</p>
                  </li>
                </>
                : null
            }
            {
              type == 3 ?
                <li>
                  <label>生命周期：</label>
                  <p>{this.setLifeCycle()}</p>
                </li>
                : null
            }

            {
              type == 1 ?
                <li>
                  <label>咨询类型：</label>
                  <div className={styles.selects}>
                    <BICascader
                      changeOnSelect
                      fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                      options={consultTypeTree}
                      value={this.state.submitParam.consultTypeIdList}
                      onChange={this.onChangeConsult}
                      placeholder="请选择"
                      popupClassName={styles.reasontype}
                    />
                  </div>
                </li>
                : null
            }
            <li>
              <label>原因分类：</label>
              <div className={`${styles.selects} ${styles.ZJCascader}`}>
                <Cascader
                  changeOnSelect
                  fieldNames={{ label: 'name', value: 'id', evaluationNature: 'evaluationNature', children: 'nodeList' }}
                  options={reasonTypeTree}
                  onChange={this.onChangeReson}
                  value={this.state.submitParam.reasonTypeIdList}
                  placeholder="请选择"
                  popupClassName={styles.reasontype}
                />
              </div>
            </li>
            <li>
              <label>评价性质：</label>
              <p>{this.state.submitParam.evaluationNature}</p>
            </li>
            {
              type == 1 ?
                <li>
                  <label>是否质检：</label>
                  <BIRadio onChange={this.onChangeRadio} value={this.state.submitParam.evaluationFlag}>
                    <BIRadio.Radio value={1}>否</BIRadio.Radio>
                    <BIRadio.Radio value={2}>是</BIRadio.Radio>
                  </BIRadio>
                  {this.state.submitParam.evaluationFlag === 2 && <Link className={styles.routeQuality} to={'/qualityAppeal/qualityNewSheet/create'} target="_blank">
                    <span>创建质检单</span>
                    <img src={create} alt=""/></Link>}
                </li>
                : null
            }
            <li className={styles.textarea}>
              <label>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</label>
              <TextArea
                value={this.state.submitParam.remark}
                className={styles.inputTextArea}
                autosize={{ minRows: 4, maxRows: 4 }}
                placeholder="请输入"
                maxLength="100"
                onChange={this.handleRemark}
              />
            </li>
          </ul>
          <div className={styles.btn}>
            <BIButton disabled={currentId === 1} onClick={() => this.submit(1)} loading={isLoading && action === 1}>
              上一条
            </BIButton>
            <BIButton type='primary' style={{margin: '0 8px'}} onClick={() => this.submit(2)} loading={isLoading && action === 2}>
              提交，下一条
            </BIButton>
            <BIButton type='warning' onClick={() => this.submit(3)}>
              {'跳'}{'过'}
            </BIButton>
          </div>
          <div className={styles.progress}>
            <p className={styles.number}>{currentId}/{idList ? idList.length : 1}</p>
            <Progress percent={percent} showInfo={false} />
          </div>
        </div>
        <BIModal
          visible={visible}
          onOk={() => this.state.handleOk()}
          onCancel={this.handleCancel}
          closable={false}
          footer={[
            <BIButton key="submit" type="primary" onClick={() => this.handleOk()}>
              确定
                </BIButton>,
          ]}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ paddingBottom: '0', paddingTop: '20px' }}>已到达最后一条数据，即将返回首页～</p>
          </div>
        </BIModal>
      </>
    );
  }
}

export default DataClassfy;

