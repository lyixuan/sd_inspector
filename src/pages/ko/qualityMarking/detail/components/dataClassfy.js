import React from 'react';
import { Input, Progress } from 'antd';
import { connect } from 'dva';
import BIModal from '@/ant_components/BIModal';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect/formSelect';
import BICascader from '@/ant_components/BICascader/FormCascader';
import BIRadio from '@/ant_components/BIRadio';
import styles from '../style.less';
import router from 'umi/router';

const { TextArea } = Input;
const { Option } = BISelect;

@connect(({ AiDetail, workTableModel, loading }) => ({
  loading,
  AiDetail,
  idList: workTableModel.idList,
  pageData: AiDetail.pageData,
  // submitParam: AiDetail.submitParam,
  isLoading: loading.effects['AiDetail/submit']
}))

class DataClassfy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: null,
      idList: this.props.idList.length > 0 ? this.props.idList : localStorage.getItem('idList'),
      submitParam: this.props.submitParam,
      nextId: null,
      visible: false,
      tabType: 'im',
      org: '',
      percent: 0
    };

  }
  componentDidMount() {
    this.computedId();
  }
  computedId() {
    let idList = this.state.idList
    if (idList) {
      if (!Array.isArray(idList)) {
        idList = idList.split(",").map(item => {
          return +item
        })
      }
      this.state.idList = idList
      this.state.currentId = idList.indexOf(Number(this.props.id))
      this.state.nextId = idList[this.state.currentId + 1] ? idList[this.state.currentId + 1] : idList[idList.length - 1]
      this.state.percent = (this.state.currentId + 1) / idList.length * 100
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.pageData != nextProps.pageData) {
      this.computedId();
      this.setState({
        submitParam: nextProps.submitParam
      })
      if (nextProps.pageData.result.ordIdList.length > 0) {
        nextProps.pageData.result.ordIdList.map(item => {
          if (item.ordId == this.state.submitParam.ordId) {
            this.setState({
              org: item.org
            })
          }

        })
      }

    }

  }
  orderChange = (val) => {
    console.log(79, val, val.name)
    // this.state.submitParam.ordId = val.name
    this.setState({
      submitParam: { ...this.state.submitParam, ordId: val.name },
      org: val.value
    })


  }
  // 咨询类型切换
  onChangeConsult = (value) => {
    const consultTypeIdList = value.map(item => {
      return item.value
    })
    // this.state.submitParam.consultTypeIdList = consultTypeIdList
    this.setState({
      submitParam: { ...this.state.submitParam, consultTypeIdList },
    })
  }
  // 原因切换
  onChangeReson = (value) => {
    const reasonTypeIdList = value.map(item => {
      return item.value
    })
    // this.state.submitParam.reasonTypeIdList = reasonTypeIdList
    this.setState({
      submitParam: { ...this.state.submitParam, reasonTypeIdList }
    })
  }
  // 选择是否质检
  onChangeRadio = (e) => {
    this.state.submitParam.evaluationFlag = e.target.value
  }
  // 备注
  handleRemark = (e) => {
    // this.state.submitParam.remark = e.target.value
    this.setState({
      submitParam: { ...this.state.submitParam, remark: e.target.value },
    })
  };
  submit = () => {
    if (!this.state.nextId || this.state.nextId == this.state.idList[this.state.currentId]) {
      this.setState({
        visible: true
      })
      return;
    }
    let params = {
      type: this.props.type,
      itemId: this.props.id,
      result: this.state.submitParam,
    };
    let params2 = {
      id: this.state.nextId,
      type: this.props.type
    }
    // console.log(112, params); return;

    if (this.props.type == 1) {
      this.setState({
        tabType: 'im'
      })
    } else if (this.props.type == 2) {
      this.setState({
        tabType: 'bbs'
      })
    } else {
      this.setState({
        tabType: 'nps'
      })
    }
    this.props.dispatch({
      type: 'AiDetail/submit',
      payload: { params: params, params2: params2 },
      callback: () => {
        router.push({
          pathname: `/qualityMarking/detail/${this.state.nextId}/${this.props.type}`,
        });
        let obj = {
          type: this.props.type,
          id: this.state.nextId,
        }
        this.props.dispatch({
          type: 'AiDetail/edit',
          payload: { params: obj },
          callback: (submitParam) => {
            this.setState({
              submitParam: { ...submitParam }
            })
          }
        })
      }
    });

  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleOk = () => {
    router.push({
      pathname: `/qualityMarking/${this.state.tabType}`,
    });
  }
  render() {
    let { consultTypeTree, reasonTypeTree } = this.props.AiDetail;
    let { type, isLoading, pageData } = this.props
    let orderList = pageData && pageData.result ? pageData.result.ordIdList : [{ ordId: 0, org: '' }]
    let idList = this.state.idList
    let percent = 0;
    // if (idList) {
    //   if (!Array.isArray(idList)) {
    //     idList = idList.split(",").map(item => {
    //       return +item
    //     })
    //   }
    //   this.state.idList = idList
    //   this.state.currentId = idList.indexOf(Number(this.props.id))
    //   this.state.nextId = idList[this.state.currentId + 1] ? idList[this.state.currentId + 1] : idList[idList.length - 1]
    //   percent = (this.state.currentId + 1) / idList.length * 100
    // }
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
                      <BISelect style={{ width: '100%' }} value={this.state.submitParam.ordId} placeholder="请选择" onChange={(val) => { this.orderChange(val) }}>
                        {orderList.map(item => (
                          <Option key={item.ordId} value={item.org}>{item.ordId}</Option>)
                        )}
                      </BISelect>
                    </div>
                  </li>
                  <li>
                    <label>后端归属：</label>
                    <p>{this.state.org}</p>
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
                  <p>{orderList[0].lifeCycle}</p>
                </li>
                : null
            }

            {
              type == 1 ?
                <li>
                  <label>咨询类型：</label>
                  <div className={styles.selects}>
                    <BICascader
                      fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                      options={consultTypeTree}
                      value={this.state.submitParam.consultTypeIdList}
                      onChange={this.onChangeConsult}
                      placeholder="请选择" />
                  </div>
                </li>
                : null
            }
            <li>
              <label>原因分类：</label>
              <div className={styles.selects}>
                <BICascader
                  fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                  options={reasonTypeTree}
                  onChange={this.onChangeReson}
                  value={this.state.submitParam.reasonTypeIdList}
                  placeholder="请选择" />
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
                  <BIRadio onChange={this.onChangeRadio} defaultValue={1}>
                    <BIRadio.Radio value={1}>否</BIRadio.Radio>
                    <BIRadio.Radio value={2}>是</BIRadio.Radio>
                  </BIRadio>
                </li>
                : null
            }
            <li className={styles.textarea}>
              <label>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</label>
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
            <BIButton type="primary" onClick={this.submit} loading={isLoading}>
              提交，下一条
            </BIButton>
          </div>
          <div className={styles.progress}>
            <p className={styles.number}>{this.state.currentId ? this.state.currentId + 1 : 1}/{idList ? idList.length : 1}</p>
            <Progress percent={this.state.percent} showInfo={false} />
          </div>
        </div>
        <BIModal
          visible={this.state.visible}
          onOk={() => this.state.handleOk()}
          onCancel={this.handleCancel}
          closable={false}
          footer={[
            <BIButton key="submit" type="primary" onClick={() => this.handleOk()}>
              确定
                </BIButton>,
          ]}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ paddingBottom: '0', paddingTop: '20px' }}>厉害啦，数据已全部处理！即将返回首页～</p>
          </div>
        </BIModal>
      </>
    );
  }
}

export default DataClassfy;

