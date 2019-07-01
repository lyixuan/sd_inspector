import React from 'react';
import { Input, Progress, Cascader } from 'antd';
import { connect } from 'dva';
import BIModal from '@/ant_components/BIModal';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect/formSelect';
import BICascader from '@/ant_components/BICascader/FormCascader';
import BIRadio from '@/ant_components/BIRadio';
import styles from '../style.less';
import router from 'umi/router';
import config from '@/../config/config';

const { TextArea } = Input;
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
      currentId: 0,
      // idList: this.props.idList,
      submitParam: this.props.submitParam,
      nextId: null,
      visible: false,
      tabType: 'im',
      percent: 0,
      evaluationNature: this.props.submitParam && this.props.submitParam.evaluationNature ? this.props.submitParam.evaluationNature : ''
    };

  }
  componentDidMount() {
    console.log(42, this.props.pageData)
  }
  setOrg = () => {
    let org = ''
    this.props.pageData && this.props.pageData.result.ordIdList.map(item => {
      if (item.ordId == this.state.submitParam.ordId) {
        console.log(48, item)
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
  submit = () => {
    console.log(113, this.props.id)
    // if (this.props.id) {
    //   this.setState({
    //     visible: true
    //   })
    //   return;
    // }
    if (this.state.submitParam.evaluationFlag == 1) {
      this.state.submitParam.evaluationFlag = false;
    } else {
      this.state.submitParam.evaluationFlag = true;
    }
    let params = {
      type: this.props.type,
      itemId: this.props.pageData.item.itemId,
      result: this.state.submitParam,
    };
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
    this.props.computedIdNew(() => {
      const strParams = JSON.stringify({ type: { ...this.props.params }, id: this.props.id });
      const url = `/qualityMarking/detail`;
      this.props.dispatch({
        type: 'AiDetail/submit',
        payload: { params: params },
        callback: () => {
          router.push({
            pathname: url,
            query: { params: strParams }
          });
          let obj = {
            type: this.props.type,
            id: this.props.id,
          }
          if (!this.props.id) {
            this.setState({
              visible: true
            })
            return;
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
    let { consultTypeTree, reasonTypeTree, idList } = this.props.AiDetail;
    let { type, isLoading, pageData } = this.props
    let orderList = pageData && pageData.result ? pageData.result.ordIdList : [{ ordId: -100, org: '' }]
    const currentId = this.props.idList.indexOf(this.props.id) + 1
    const percent = currentId / this.props.idList.length * 100
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
                          <Option key={item.ordId}>{item.ordId}</Option>)
                        )}
                      </BISelect>
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
                      placeholder="请选择" />
                  </div>
                </li>
                : null
            }
            <li>
              <label>原因分类：</label>
              <div className={styles.selects}>
                <Cascader
                  changeOnSelect
                  fieldNames={{ label: 'name', value: 'id', evaluationNature: 'evaluationNature', children: 'nodeList' }}
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
                  <BIRadio onChange={this.onChangeRadio} value={this.state.submitParam.evaluationFlag}>
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
            <p className={styles.number}>{currentId}/{idList ? idList.length : 1}</p>
            <Progress percent={percent} showInfo={false} />
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
            <p style={{ paddingBottom: '0', paddingTop: '20px' }}>已到达最后一条数据，即将返回首页～</p>
          </div>
        </BIModal>
      </>
    );
  }
}

export default DataClassfy;

