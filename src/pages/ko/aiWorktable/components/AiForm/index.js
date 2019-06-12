import React from 'react';
import BISelect from '@/ant_components/BISelect';
import styles from './style.less';
// import formStyles from '../../../components/formCommon.less';
import { Skeleton, Form } from 'antd'
const { Option } = BISelect;

class AiForm extends React.Component {
  constructor(props) {
    super(props);
  }
  handleSearch() {

  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div className={`${styles.formCotainer}`}>
          <Form
            layout="inline"
            className="ant-advanced-search-form"
            onSubmit={this.handleSearch}
          >
            <Skeleton loading={false} active>
              <div className={styles.rowWrap}>
                <div className={styles.itemCls}>
                  <Form.Item label='学员出勤：'>
                    {getFieldDecorator('attendanceStatus', {
                      initialValue: '1',
                    })(
                      <BISelect placeholder="请选择" allowClear >
                        {/*{[{value: '1', name: 'yyyy'}].map(item => <Option key={item.value} value={item.value}>{item.name}</Option>)}*/}
                        <Option key={1} value={1}>1111</Option>
                      </BISelect>
                    )}
                  </Form.Item>
                </div>
                <div className={styles.itemCls} />
                <div className={styles.itemCls} />
              </div>
            </Skeleton>
            <div className={`${styles.rowWrap} ${styles.buttonGroup}`}>
              {/*<BIButton onClick={this.handleReset} style={{ marginRight: '10px' }}>重置</BIButton>*/}
              {/*<BIButton type="primary" htmlType="submit">*/}
                {/*查询*/}
              {/*</BIButton>*/}
            </div>
          </Form>
        </div>
    );
  }
}
export default Form.create({ name: 'AiForm'})(AiForm);
