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
class DataClassfy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  onChange = (value) => {
    console.log(19, value)
  }
  onChangeRadio = (e) => {
    console.log(23, e)

  }
  render() {
    const { reasonTypeTree } = this.props.AiDetail;
    return (
      <>
        <div className={styles.consultContent}>
          <ul className={styles.consultInput}>
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
            <li>
              <label>生命周期：</label>
              <p>70</p>
            </li>
            <li>
              <label>原因分类：</label>
              <div className={styles.selects}>
                <BICascader
                  fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                  options={reasonTypeTree} onChange={this.onChange} placeholder="请选择" />
              </div>
            </li>
            <li>
              <label>评价性质：</label>
              <p>负面</p>
            </li>
            <li className={styles.textarea}>
              <label>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</label>
              <TextArea
                className={styles.inputTextArea}
                autosize={{ minRows: 4, maxRows: 4 }}
                placeholder="请输入"
                maxLength="100"
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

