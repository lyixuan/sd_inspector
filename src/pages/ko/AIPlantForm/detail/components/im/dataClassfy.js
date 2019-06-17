import React from 'react';
import { Input, Progress } from 'antd';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BISelect from '@/ant_components/BISelect/formSelect';
import BICascader from '@/ant_components/BICascader/FormCascader';
import BIRadio from '@/ant_components/BIRadio';
import styles from '../../style.less';

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
      default: null
    };
  }
  componentDidMount() {
    this.getConsultTree();//获取咨询分类树形结构
    this.getResonTree();//获取原因分类树形结构
    console.log(27, this.props.AiDetail)

  }
  componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(nextProps.AiDetail.consultTypeTree) !==
      JSON.stringify(this.props.AiDetail.consultTypeTree)
    ) {

      this.setState({
        default: [5, 61]
      })
    }

  }
  getConsultTree = () => {
    this.props.dispatch({
      type: 'AiDetail/getConsultTypeTree',
      payload: {},
    });
  }
  getResonTree = () => {
    this.props.dispatch({
      type: 'AiDetail/getReasonTypeTree',
      payload: {},
    });
  }
  onChangeConsult = (value) => {
    console.log(20, value)
  }
  onChangeReson = (value) => {
    console.log(19, value)
  }
  onChangeRadio = (e) => {
    console.log(23, e)

  }
  render() {
    const { consultTypeTree, reasonTypeTree } = this.props.AiDetail;
    console.log(62, this.state.default)
    let defaults = ['保险问题', '退保金额']
    // defaults.push(this.state.default)
    return (
      <>
        <div className={styles.consultContent}>
          <ul className={styles.consultInput}>
            <li>
              <label>咨询类型：</label>
              <div className={styles.selects}>
                <BICascader
                  fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                  options={consultTypeTree}
                  value={this.state.default}
                  onChange={this.onChangeConsult}
                  placeholder="请选择" />
              </div>
            </li>
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
            <li>
              <label>是否备注：</label>
              <BIRadio onChange={this.onChangeRadio} defaultValue={2}>
                <BIRadio.Radio value={1}>删除用户</BIRadio.Radio>
                <BIRadio.Radio value={2}>添加用户</BIRadio.Radio>
              </BIRadio>
            </li>
            <li className={styles.textarea}>
              <label>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</label>
              <TextArea
                className={styles.inputTextArea}
                autosize={{ minRows: 4, maxRows: 4 }}
                placeholder="请输入"
                onChange={this.handelChange}
              />
            </li>
          </ul>
          <div className={styles.btn}>
            <BIButton type="primary">
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

