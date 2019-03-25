import React from 'react';
import { connect } from 'dva';
import { Form, Row, Col, TreeSelect, Input, Radio } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import OrgCascader from '@/components/OrgCascader';
import BIModal from '@/ant_components/BIModal';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { BiFilter } from '@/utils/utils';
import styles from './style.less';
import SubOrderDetail from './component/OrderDetail';
import AppealInfo from './component/AppealInfo';
const { Option } = BISelect;
const TreeNode = TreeSelect.TreeNode;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

@connect(({ createPointBook, qualityAppealHome }) => ({
  createPointBook,
  orgList: qualityAppealHome.orgList,
}))
class  CreatePointBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
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
      visible: false,
      orderDetail: {
        stuName: '张三',
        signDate: '2019年02月01日 21：22：30',
        stuId: '00001',
        phoneNum: '18600540558',
        produce: '不过退费',
        payment: '4999元',
        teaName: '李四',
        groupName: '芝士学员|能源管理',
      },
      qualityData: {
        verifyDate: '2019年02月01日 21：22：30',
        mail: 'test@sunlands.com',
        role: '班主任',
        name: '李思思',
        collegeName: null,
        familyName: null,
        orderNum: 123456789,
        groupName: '芝士学院|能源管理|运营1组',
        violationDate: '2019年02月01日 21：22：30',
        reduceScoreDate: '2019年02月01日 21：22：30',
        qualityType: '班主任质检',
        dimension: '超高危',
        primaryAssortment: '服务禁语规范',
        secondAssortment: '禁止沟通中消极对待用户',
        thirdAssortment: '冷漠、不热情、不耐烦',
        violationLevel: '一级违规（扣除学分1000分）',
        attUrl: '附件1',
        desc:
          '违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述',
        orderDetail: {
          stuName: '张三',
          signDate: '2019年02月01日 21：22：30',
          stuId: '00001',
          phoneNum: '18600540558',
          produce: '不过退费',
          payment: '4999元',
          teaName: '李四',
          groupName: '芝士学员|能源管理',
        },
        verifyDate: '2019年02月01日 21：22：30',
        appealEndDate: '2019年02月01日 21：22：30',
        operateDate: '2019年02月01日 21：22：30',
        desc: '没有违规',
        operator: '张三',
        sopCheckDetail: [
          {
            sopCheckResult: '审核通过',
            verifyDate: '2019年02月01日 21：22：30',
            checkDesc: '审核通过',
            operator: '张三',
            sign: true,
          },
          {
            sopCheckResult: '驳回',
            verifyDate: '2019年02月01日 21：22：30',
            checkDesc: '审核通过',
            operator: '张三',
            sign: false,
          },
        ],
      }
    };
  }
  onChange = treeValue => {
    console.log(treeValue);
    this.setState({ treeValue });
  };

  getOrgRole = () => {
    const role = this.props.form.getFieldValue('role');
    const obj = BiFilter("FRONT_ROLE_TYPE_LIST").find(item => item.id === role) || {};
    return obj.level || 3;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log(132, values)
      let qualityInspectionParam = values
      let appealParam = {
        type: 1,
        appealEndDate: 3939,
        desc: 33,
        checkResult: 44,
        qualityId: 44,
        isWarn: 1
      }
      this.props.dispatch({
        type: 'createAppeal12/reviewAppel',
        payload: { qualityInspectionParam, appealParam },
      })

      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.qualityContainter}>
        <div className={styles.title}>质检违规详情 <span className={styles.passTimeCls}>（质检通过时间：2019-02-01 22:22:22）</span>  </div>
        <Form layout="inline" className={styles.formBox}>
          <div className={styles.content}>
            <Row>
              <Col className="gutter-row" span={20}>
                <Form.Item label="*质检类型：">
                  {getFieldDecorator('qualityType', {
                    initialValue: this.state.qualityType || undefined,
                    rules: [{ required: true, message: '请选择质检类型' }],
                  })(
                    <BISelect placeholder="请选择" allowClear style={{ width: 280 }} onChange={this.qualityChange}>
                      {BiFilter('QUALITY_TYPE').map(item => (
                        <Option value={item.id} key={item.name}>
                          {item.name}
                        </Option>
                      ))}
                    </BISelect>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ lineHeight: '40px' }}>
              <Col className="gutter-row" span={12} style={{ display: 'flex' }}>
                <Form.Item label="*归属人邮箱：">
                  {getFieldDecorator('mail', {
                    initialValue: this.state.mail,
                  })(<BIInput placeholder="请输入" style={{ width: 170 }} />)}
                </Form.Item>
                <div className={styles.text}>@sunland.com</div>
                <div>
                  <BIButton type="primary" htmlType="submit">
                    查询
                  </BIButton>
                </div>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*归属人角色：">
                {getFieldDecorator('role', {
                  initialValue: this.state.role || undefined,
                  rules: [{ required: true, message: '请选择归属人角色' }],
                })(
                  <BISelect allowClear placeholder="请选择"
                            onChange={this.changeOrg}
                            style={{ width: 280 }}>
                    {BiFilter("FRONT_ROLE_TYPE_LIST").map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>
                )}
              </Form.Item>
              </Col>
            </Row>
            <Row style={{ lineHeight: '40px' }}>
              <Col className="gutter-row" span={12}>
                <Form.Item label="*归属人：">
                  {getFieldDecorator('name', {
                    initialValue: this.state.name,
                    rules: [{ required: true, message: '请输入归属人' }],
                  })(<BIInput placeholder="请输入" style={{ width: 280 }} />)}
                </Form.Item>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*归属组织：">
                {getFieldDecorator('organize', {
                  initialValue: [],
                })(
                  <OrgCascader
                    level={this.getOrgRole()}
                    placeholder="请选择"
                    options={this.props.orgList}
                    fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                  />
                )}
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div className={styles.content}>
            <Row>
              <Col className="labelWidth" span={24}>
                <Form.Item label="*有无子订单编号？">
                  <RadioGroup>
                    <Radio value={1}>有</Radio>
                    <Radio value={2}>无</Radio>
                  </RadioGroup>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col className="gutter-row" span={12} style={{ display: 'flex' }}>
                <Form.Item label="*子订单编号：">
                  {getFieldDecorator('order', {
                    initialValue: this.state.order,
                  })(<BIInput placeholder="请输入" style={{ width: 280 }} />)}
                </Form.Item>
                <div style={{ marginTop: '4px', marginLeft: '15px' }}>
                  <BIButton type="primary" htmlType="submit">
                    查询
                  </BIButton>
                </div>
              </Col>
            </Row>
            <SubOrderDetail data={this.state.orderDetail} />
          </div>
          <div className={styles.content}>
            <Row>
              <Col className="gutter-row" span={12}>
                <Form.Item label="*质检违规日期：">
                  {getFieldDecorator('dateViolation', {
                    initialValue: this.state.dateViolation,
                  })(<BIDatePicker style={{ width: 280 }} />)}
                </Form.Item>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*质检扣分日期：">
                  {getFieldDecorator('dateDeduction', {
                    initialValue: this.state.dateViolation,
                  })(<BIDatePicker style={{ width: 280 }} />)}
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
                          <TreeNode
                            value="sss"
                            title={<b style={{ color: '#08c' }}>sss</b>}
                            key="random3"
                          />
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
                    <BISelect allowClear labelInValue initialValue="lucy" style={{ width: 280 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">lucy</Option>
                    </BISelect>
                  )}
                </Form.Item>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*违规等级">：
                  {getFieldDecorator('organizeLevel', {
                    initialValue: this.state.organizeLevel,
                  })(<span style={{display:'inline-block',textAlign:'left', width: 280 }}>一级违规</span>)}
                </Form.Item>
              </Col>
            </Row>
            <Row className="gutter-row">
              <Col span={12}>
                <Form.Item label="*附件：">
                  <div style={{ color: "#52C9C2" }}>附件1</div>
                  {/* <Upload>
                    <BIButton type="primary">
                      上传附件
                    </BIButton>
                  </Upload> */}
                </Form.Item>
              </Col>
            </Row>
            <Row className="gutter-row">
              <Col span={24} style={{ display: 'flex' }}>
                <Form.Item label="*违规详情：" style={{ marginRight: '0' }} />
                <TextArea rows={4} />
              </Col>
            </Row>
            <div>
              <div className={styles.title}>申诉信息</div>
              <AppealInfo/>
            </div>

            <Row className="gutter-row">
              <Col span={24}>
                <div className={styles.gutterBox1}>
                  <span className={styles.gutterBtn2}>
                    <BIButton>取消</BIButton>
                  </span>
                  <span className={styles.gutterBtn1}>
                    <BIButton type="primary" onClick={this.handleSubmit}>提交</BIButton>
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        </Form>

        <BIModal
          title="提交确认"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" onClick={this.handleOk}>
              确定
            </BIButton>,
          ]}
        >
          <div className={styles.modalWrap}>该条记录将被提交给质检主管进行审核，确定提交吗？</div>
        </BIModal>
      </div>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Search_Form' })( CreatePointBook);

export default WrappedHorizontalLoginForm;
