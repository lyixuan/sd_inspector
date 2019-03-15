import React from 'react';
import { connect } from 'dva';
import { Form, Icon } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIRadio from '@/ant_components/BIRadio';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BIButtonYellow from '@/components/BIButtonYellow';
import BIButtonBlue from '@/components/BIButtonBlue';
import { Row, Col, TreeSelect, Input } from 'antd';
import styles from './style.less'
const { Option } = BISelect;
const TreeNode = TreeSelect.TreeNode;
const { TextArea } = Input;


class CreateQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: undefined,
      mail: undefined,
      user: undefined,
      userRole: undefined,
      organize: undefined,
      order: undefined,
      dateViolation: undefined,
      dateDeduction: undefined,
      treeValue: undefined,
      dimension: undefined,
    };
  }
  onChange = (treeValue) => {
    console.log(treeValue);
    this.setState({ treeValue });
  }

  render() {
    const { getFieldDecorator, } = this.props.form;
    return (
      <div className={styles.qualityContainter}>
        <div className={styles.title}>质检违规详情</div>
        <Form layout='inline' className={styles.formBox}>
          <div className={styles.content}>
            <Row>
              <Col className="gutter-row" span={20}>
                <Form.Item label="*质检类型：">
                  {getFieldDecorator('type', {
                    initialValue: this.state.type,
                  })(
                    <BISelect allowClear labelInValue defaultValue="lucy" style={{ width: 280 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">lucy</Option>
                    </BISelect>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ lineHeight: "40px" }}>
              <Col className="gutter-row" span={12} style={{ display: "flex" }}>
                <Form.Item label="*归属人邮箱：">
                  {getFieldDecorator('mail', {
                    initialValue: this.state.mail,
                  })(
                    <BIInput placeholder="请输入" style={{ width: 170 }} />
                  )}
                </Form.Item>
                <div className={styles.text}>@sunland.com</div>
                <div><BIButton type="primary" htmlType="submit">查询</BIButton></div>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*归属人角色：">
                  {getFieldDecorator('userRole', {
                    initialValue: this.state.userRole,
                  })(
                    <BISelect allowClear labelInValue defaultValue="lucy" style={{ width: 280 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">lucy</Option>
                    </BISelect>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={0} style={{ lineHeight: "40px" }}>
              <Col className="gutter-row" span={12}>
                <Form.Item label="*归属人：">
                  {getFieldDecorator('user', {
                    initialValue: this.state.user,
                  })(
                    <BIInput placeholder="请输入" style={{ width: 280 }} />
                  )}
                </Form.Item>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*归属组织：">
                  {getFieldDecorator('organize', {
                    initialValue: this.state.organize,
                  })(
                    <BISelect allowClear labelInValue defaultValue="lucy" style={{ width: 280 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">lucy</Option>
                    </BISelect>
                  )}
                </Form.Item>
              </Col>
            </Row>

          </div>
          <div className={styles.content}>
            <Row>
              <Col className="labelWidth" span={24}>
                <Form.Item label="*有无子订单编号？">
                  <BIRadio>有</BIRadio>
                  <BIRadio>无</BIRadio>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col className="gutter-row" span={12} style={{ display: "flex" }}>
                <Form.Item label="*子订单编号：">
                  {getFieldDecorator('order', {
                    initialValue: this.state.order,
                  })(
                    <BIInput placeholder="请输入" style={{ width: 280 }} />
                  )}
                </Form.Item>
                <div style={{ marginTop: "4px" }}><BIButton type="primary" htmlType="submit">查询</BIButton></div>
              </Col>
            </Row>
          </div>
          <div className={styles.content}>
            <Row>
              <Col className="gutter-row" span={12}>
                <Form.Item label="*质检违规日期：">
                  {getFieldDecorator('dateViolation', {
                    initialValue: this.state.dateViolation,
                  })(
                    <BIDatePicker style={{ width: 280 }} ></BIDatePicker>
                  )}
                </Form.Item>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*质检扣分日期：">
                  {getFieldDecorator('dateDeduction', {
                    initialValue: this.state.dateViolation,
                  })(
                    <BIDatePicker style={{ width: 280 }} ></BIDatePicker>
                  )}
                </Form.Item>
              </Col>

            </Row>
            <Row className="gutter-row">
              <Col span={12}>
                <Form.Item label="*分维：">
                  {getFieldDecorator('dimension', {
                    initialValue: this.state.dimension,
                  })(
                    <TreeSelect
                      style={{ width: 280 }}
                      value={this.state.value}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      placeholder="Please select"
                      allowClear
                      treeDefaultExpandAll
                      onChange={this.onChange}
                    >
                      <TreeNode value="parent 1" title="parent 1" key="0-1">
                        <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
                          <TreeNode value="leaf1" title="my leaf" key="random" />
                          <TreeNode value="leaf2" title="your leaf" key="random1" />
                        </TreeNode>
                        <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
                          <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} key="random3" />
                        </TreeNode>
                      </TreeNode>
                    </TreeSelect>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row className="gutter-row">
              <Col span={12}>
                <Form.Item label="*违规分类：">
                  {getFieldDecorator('organize', {
                    initialValue: this.state.organize,
                  })(
                    <BISelect allowClear labelInValue defaultValue="lucy" style={{ width: 280 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">lucy</Option>
                    </BISelect>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row className="gutter-row">
              <Col span={12}>
                <Form.Item label="*附件：">
                  <BIButton type="primary" htmlType="submit">上传附件</BIButton>
                </Form.Item>
              </Col>
            </Row>
            <Row className="gutter-row">
              <Col span={24} style={{ display: "flex" }}>
                <Form.Item label="*违规详情：" style={{ marginRight: "0" }}>
                </Form.Item>
                <TextArea rows={4} />
              </Col>
            </Row>
          </div>
        </Form>

      </div >
    )
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Search_Form' })(CreateQualityNewSheet);

export default WrappedHorizontalLoginForm;
