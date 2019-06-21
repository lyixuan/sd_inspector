import React from 'react';
import { Input, Progress } from 'antd';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect/formSelect';
import BICascader from '@/ant_components/BICascader/FormCascader';
import BIRadio from '@/ant_components/BIRadio';
import styles from '../style.less';
import router from 'umi/router';

const { TextArea } = Input;
const { Option } = BISelect;

@connect(({ AiDetail, workTableModel }) => ({
  AiDetail,
  idList: workTableModel.idList,
  pageData: AiDetail.pageData,
}))

class DataClassfy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentId: null,
      idList: this.props.idList.length > 0 ? this.props.idList : localStorage.getItem('idList'),
      ordId: this.props.pageData && this.props.pageData.item.ordId ? this.props.pageData.item.ordId : '请选择',
      consultTypeId: 91,
      consultTypeIdList: [],
      reasonTypeIdList: [],
      evaluationFlag: 1,
      evaluationNature: this.props.pageData && this.props.pageData.result.evaluationNature ? this.props.pageData.result.evaluationNature : null,
      remark: '',
      nextId: null
    };

  }
  componentDidMount() {

  }
  orderChange = (val) => {
    console.log(35, val)
    this.setState({
      ordId: val.value
    })
  }
  // 咨询类型切换
  onChangeConsult = (value) => {
    console.log(20, value)
    value.map(item => {
      this.state.consultTypeIdList.push(item.value)
    })
  }
  // 原因切换
  onChangeReson = (value) => {
    value.map(item => {
      this.state.reasonTypeIdList.push(item.value)
    })
  }
  // 选择是否质检
  onChangeRadio = (e) => {
    this.state.evaluationFlag = e.target.value
  }
  // 备注
  handleRemark = (e) => {
    this.state.remark = e.target.value
  };
  submit = () => {
    let params = {
      type: this.props.type,
      itemId: this.props.id,
      result: {
        resultId: null,
        consultTypeIdList: this.state.consultTypeIdList, //咨询类型id
        reasonTypeIdList: this.state.reasonTypeIdList,// 原因分类id
        evaluationNature: this.state.evaluationNature, //评价性质
        evaluationFlag: this.state.evaluationFlag, //是否质检
        remark: this.state.remark, //备注
        orderId: this.state.ordId, //选择订单
      }
    };
    let params2 = {
      id: this.state.nextId,
      type: this.props.type
    }
    let tabType = 1;
    if (this.props.type == 1) {
      tabType = 'im';
    } else if (this.props.type == 2) {
      tabType = 'bbs';
    } else {
      tabType = 'nps';
    }
    this.props.dispatch({
      type: 'AiDetail/submit',
      payload: { params: params, params2: params2 },
      callback: () => {
        router.push({
          pathname: `/qualityMarking/detail/${this.state.nextId}/${this.props.type}`,
        });
      }
    });
    if (!this.state.nextId) {
      router.push({
        pathname: '/qualityMarking/' + tabType,
      });
    }
  }
  render() {
    let { consultTypeTree, reasonTypeTree, pageData } = this.props.AiDetail;
    let { type } = this.props
    pageData = pageData && pageData.result ? pageData.result.ordIdList : [{ ordId: 0, org: '' }]
    let idList = this.state.idList
    let currentId = null
    let percent = 100;
    if (idList) {
      if (!Array.isArray(idList)) {
        idList = idList.split(",")
      }
      currentId = idList.indexOf(this.props.id)
      this.state.nextId = idList[currentId + 1]
      percent = (currentId + 1) / idList.length
      console.log(122, currentId + 1 / idList.length)
    }

    return (
      <>
        <div className={styles.consultContent}>
          <ul className={styles.consultInput}>
            {
              type != 1 ?
                <>
                  <li>
                    <label>选择订单：</label>
                    <div className={styles.selects}>
                      <BISelect style={{ width: '100%' }} value={this.state.ordId} placeholder="请选择" onChange={(val) => { this.orderChange(val) }}>
                        {pageData.map(item => (
                          <Option key={item.ordId} value={item.ordId}>{item.org}</Option>)
                        )}
                      </BISelect>
                    </div>
                  </li>
                  <li>
                    <label>后端归属：</label>
                    <p>后端归属后端归属后端归属</p>
                  </li>
                </>
                : null
            }
            {
              type == 3 ?
                <li>
                  <label>生命周期：</label>
                  <p>70</p>
                </li>
                : null
            }

            {
              type == 1 ?
                <li>
                  <label>咨询类型：</label>
                  {/* {
                    item.orderList
                  } */}
                  <div className={styles.selects}>
                    <BICascader
                      fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                      options={consultTypeTree}
                      value={this.state.consultTypeIdList}
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
                  placeholder="请选择" />
              </div>
            </li>
            <li>
              <label>评价性质：</label>
              <p>{this.state.evaluationNature}</p>
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
                className={styles.inputTextArea}
                autosize={{ minRows: 4, maxRows: 4 }}
                placeholder="请输入"
                maxLength="100"
                onChange={this.handleRemark}
              />
            </li>
          </ul>
          <div className={styles.btn}>
            <BIButton type="primary" onClick={this.submit}>
              提交，下一条
            </BIButton>
          </div>
          <div className={styles.progress}>
            <p className={styles.number}>{currentId ? currentId + 1 : 1}/{idList ? idList.length : 1}</p>
            <Progress percent={percent} showInfo={false} />
          </div>
        </div>
      </>
    );
  }
}

export default DataClassfy;

