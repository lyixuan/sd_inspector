import React from 'react';
import { Input, Progress } from 'antd';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect/formSelect';
import BICascader from '@/ant_components/BICascader/FormCascader';
import BIRadio from '@/ant_components/BIRadio';
import styles from '../style.less';

const { TextArea } = Input;
const { Option } = BISelect;

@connect(({ AiDetail }) => ({
  AiDetail
}))

class DataClassfy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      consultTypeId: 91,
      consultTypeIdList: [],
      reasonTypeIdList: [],
      evaluationFlag: 1,
      remark: ''

    };
  }
  componentDidMount() {

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
    console.log(19, value)
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
    console.log(52, e.target.value)
    this.state.remark = e.target.value
  };
  submit = () => {
    let type = 1;
    if (this.props.type == 'im') {
      type = 1;
    } else if (this.props.type == 'bbs') {
      type = 2;
    } else {
      type = 3;
    }
    let params = {
      type: type,
      id: this.props.id,
      result: {
        consultTypeIdList: this.state.consultTypeIdList, //咨询类型id
        reasonTypeIdList: this.state.reasonTypeIdList,// 原因分类id
        evaluationNature: '负面', //评价性质
        evaluationFlag: this.state.evaluationFlag, //是否质检
        remark: this.state.remark, //备注
        orderId: null, //选择订单
      }
    };
    console.log(65, params)
    return;
    this.props.dispatch({
      type: 'AiDetail/submit',
      payload: { params: params }
    });
  }
  render() {
    const { consultTypeTree, reasonTypeTree } = this.props.AiDetail;
    const type = this.props.type
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
                      <BISelect style={{ width: '100%' }} placeholder="请选择" value='123'>
                        <Option key={1}>
                          333
                        </Option>
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
              <p>负面</p>
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
            <p className={styles.number}>100/200</p>
            <Progress percent={50} showInfo={false} />
          </div>
        </div>
      </>
    );
  }
}

export default DataClassfy;

