import React from 'react';
import { connect } from 'dva';
import { Form, Icon, Row, Col, TreeSelect, Input, Upload, Radio } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIRadio from '@/ant_components/BIRadio';
import BIModal from '@/ant_components/BIModal';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { BiFilter, DeepCopy } from '@/utils/utils';
import styles from './style.less';
import SubOrderDetail from './../../components/subOrderDetail';
import SOPCheckResult from './../../qualityAppeal/component/sopCheckRecords';
import AppealInfo from './../../qualityAppeal/component/AppealInfo';
const { Option } = BISelect;
const TreeNode = TreeSelect.TreeNode;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

class EditQualityNewSheet extends React.Component {
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
  getDomFragementByRole = (role, data, getFieldDecorator) => {
    if (role == 1) {
      return (
        <Form.Item label="*质检类型111：">
          {getFieldDecorator('type', {
            initialValue: this.state.type,
          })(
            <BISelect allowClear labelInValue initialValue="lucy" style={{ width: 280 }}>
              {BiFilter('ORDER_STATE').map(item => (
                <Option value={item.id} key={item.name}>
                  {item.name}
                </Option>
              ))}
            </BISelect>
          )}
        </Form.Item>
      );
    } else if (role == 2) {
      return;
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles.qualityContainter}>
        <div className={styles.title}>质检违规详情</div>
        <Form layout="inline" className={styles.formBox}>
          <div className={styles.content}>
            {/* <Row>
              <Col className="gutter-row" span={20}>
                {this.getDomFragementByRole(this.state.id, {}, getFieldDecorator)}
              </Col>
            </Row> */}
            <Row>
              <Col className="gutter-row" span={20}>
                <Form.Item label="*质检类型">
                  质检类型
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
                  {getFieldDecorator('userRole', {
                    initialValue: this.state.userRole,
                  })(
                    <BISelect allowClear labelInValue initialValue="lucy" style={{ width: 280 }}>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">lucy</Option>
                    </BISelect>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={0} style={{ lineHeight: '40px' }}>
              <Col className="gutter-row" span={12}>
                <Form.Item label="*归属人：">
                  {getFieldDecorator('user', {
                    initialValue: this.state.user,
                  })(<BIInput placeholder="请输入" style={{ width: 280 }} />)}
                </Form.Item>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*归属组织：">
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
            <div className={styles.verify}>
              <div className={styles.title}>质检审核</div>
              <div className={styles.verifyContent}>
                <Row>
                  <Col span={12} style={{ display: 'flex' }}>
                    <span className={styles.label}> 审核结果：</span>
                    <span className={styles.texts}>已驳回</span>
                  </Col>
                  <Col span={12}>
                    <span className={styles.label}>操作时间：</span>
                    <span className={styles.texts}>2019-02-12 12：22：22</span>
                  </Col>
                </Row>
                <Row>
                  <Col span={24} style={{ display: 'flex' }}>
                    <span className={styles.label}> 审核详情：</span>
                    <span className={styles.texts}>
                      郭珊老师在4月2日19:30-21:00讲的【开学典礼】教师资格证课程中，在课程31分23秒老师介绍教师资格证时，只介绍了资格证的考试时间，考试安排，含金量，全国通用，未介绍资格证的定义，PPT也未展示定义，参考话术：职业资格证即职业资格证书，是表明劳动者具有从事某一职业所必备的学识和技能的证明。
                    </span>
                  </Col>
                </Row>
              </div>
            </div>
            <div className={styles.appealContent}>
              <section>
                <AppealInfo data={this.state.qualityData} />
              </section>
              <section>
                <SOPCheckResult data={this.state.qualityData.sopCheckDetail} />
              </section>
              <div className={styles.appealMaster}>
                <div className={styles.appealTitle}>主管审核</div>
                <div>
                  <Row>
                    <Col span={12}>
                      <Form.Item label="*审核结果">
                        <RadioGroup>
                          <Radio value={1}>通过</Radio>
                          <Radio value={2}>驳回</Radio>
                        </RadioGroup>
                      </Form.Item>
                    </Col>
                    <Col className="gutter-row txRight" span={12}>
                      <Form.Item label="*二申截止日期：">
                        {getFieldDecorator('dateViolation', {
                          initialValue: this.state.dateViolation,
                        })(<BIDatePicker style={{ width: 280 }} />)}
                      </Form.Item>
                    </Col>
                  </Row>
                </div>
                <div>
                  <Row className="gutter-row">
                    <Col span={24} style={{ display: 'flex' }}>
                      <Form.Item label="*审核说明：" style={{ marginRight: '0' }} />
                      <TextArea rows={4} />
                    </Col>
                  </Row>
                </div>
              </div>
            </div>



            <Row className="gutter-row">
              <Col span={24}>
                <div className={styles.gutterBox1}>
                  <span className={styles.gutterBtn2}>
                    <BIButton>取消</BIButton>
                  </span>
                  <span className={styles.gutterBtn1}>
                    <BIButton type="primary">提交</BIButton>
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

const WrappedHorizontalLoginForm = Form.create({ name: 'Search_Form' })(EditQualityNewSheet);

export default WrappedHorizontalLoginForm;
