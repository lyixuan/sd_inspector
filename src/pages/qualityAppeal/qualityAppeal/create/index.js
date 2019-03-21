import React from 'react';
import { connect } from 'dva';
import { Form, Icon, message, Row, Col, TreeSelect, Input, Upload, Radio } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIRadio from '@/ant_components/BIRadio';
import BIModal from '@/ant_components/BIModal';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { BiFilter, DeepCopy } from '@/utils/utils';
import styles from './style.less';
import SubOrderDetail from './../../components/subOrderDetail';
import SOPCheckResult from '../component/sopCheckRecords';
import AppealInfo from '../component/AppealInfo';
import { BaseModels } from './../../../qualityAppeal/qualityNewSheet/_utils/baseModels';
const { Option } = BISelect;
const TreeNode = TreeSelect.TreeNode;
const { TextArea } = Input;
const RadioGroup = Radio.Group;

let isLt10M = false;
let isZip = false;

@connect(({ qualityAppealHome, createAppeal }) => ({
  qualityAppealHome,
  createAppeal
}))

class EditQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.paramsModel = new BaseModels();
    this.state = {
      params: {
        id: 1,
      },
      params2: this.paramsModel.initModel,
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
      fileList: this.props.fileList
    };
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'qualityAppealHome/getDetailData',
      payload: this.state.params,
    });


  }
  getAppealInfos(detailData) {
    let domFragment = [];
    detailData.forEach(item =>
      domFragment.push(
        <>
          <AppealInfo
            data={{ appealStart: item.appealStart, appealEndDate: item.appealEndDate, id: item.id }}
          />
          <SOPCheckResult data={item.sopAppealCheck} />
          {/* <SuperiorCheck data={item.masterAppealCheck} /> */}
        </>
      )
    );
    return domFragment;
  }

  // 根据邮箱获取归属组织
  getOrgMapByMail = () => {
    const mail = this.props.form.getFieldValue('mail');
    if (!mail) return;
    this.props.dispatch({
      type: 'qualityAppealHome/getOrgMapByMail',
      payload: { mail },
    })
  }

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
        type: 'createAppeal/reviewAppel',
        payload: {},
      })

      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  // 文件预上传判断
  beforeUpload = file => {
    const arr = file.name.split('.');
    isZip = arr[arr.length - 1] === 'zip' || arr[arr.length - 1] === 'rar';
    if (!isZip) {
      message.error('文件仅支持zip或rar格式!');
    }
    isLt10M = file.size / 1024 / 1024 < 10;
    if (!isLt10M) {
      message.error('文件不能大于10MB！');
    }
    return isZip && isLt10M;
  };

  uploadFileChange = info => {
    console.log(156, info)
    // tip 目前支持上传一个文件
    let { fileList } = info;
    if (isLt10M) {
      fileList = fileList.slice(-1);
      if (isZip) {
        this.setState({ fileList });
        this.props.dispatch({
          type: 'createAppeal/uploadFile',
          payload: { file: fileList[0].name, type: 3 },
        })
      }
    }

  };

  onChange = treeValue => {
    console.log(treeValue);
    this.setState({ treeValue });
  };
  // 子订单编号onchange
  radioChange = (e, getFieldDecorator) => {
    if (e.target.value == 1) {
      this.setState({
        radioChange: this.getOrder(getFieldDecorator)
      })
    } else {
      this.setState({
        radioChange: null
      })
    }
  }
  // 有子订单编号DOM结构
  getOrder = (getFieldDecorator) => {
    return (
      <div>
        <Row>
          <Col className="gutter-row" span={12} style={{ display: 'flex' }}>
            <Form.Item label="*子订单编号：">
              {getFieldDecorator('order', {
                initialValue: this.state.order,
                rules: [{ required: true, message: '请输入子订单编号' }],
              })(<BIInput placeholder="请输入" style={{ width: 280 }} />)}
            </Form.Item>
            <div style={{ marginTop: '4px', marginLeft: '15px' }}>
              <BIButton type="primary">
                查询
                </BIButton>
            </div>
          </Col>
        </Row>
        <SubOrderDetail data={this.state.orderDetail} />
      </div>
    );
  };

  render() {
    console.log(99, this.props)
    const { getFieldDecorator } = this.props.form;
    const { params } = this.state;
    const props = {
      beforeUpload: this.beforeUpload,
      onChange: this.uploadFileChange,
    };
    const detailData = this.props.qualityAppealHome.DetailData;
    return (
      <div className={styles.qualityContainter}>
        <div className={styles.title}>质检违规详情</div>
        <Form layout="inline" onSubmit={this.handleSubmit} className={styles.formBox}>
          <div className={styles.content}>
            <Row>
              <Col className="gutter-row" span={20}>
                <Form.Item label="*质检类型">
                  质检类型
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ lineHeight: '40px' }}>
              <Col className="gutter-row" span={12} style={{ display: 'flex' }}>
                <Form.Item label="*归属人邮箱">
                  {getFieldDecorator('mail', {
                    initialValue: params.mail,
                    rules: [{ required: true, message: '请输入邮箱' }],
                  })(<BIInput placeholder="请输入" style={{ width: 170 }} />)}
                </Form.Item>
                <div className={styles.text}>@sunland.com</div>
                <div>
                  <BIButton type="primary" onClick={this.getOrgMapByMail}>
                    查询
                  </BIButton>
                </div>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*归属人角色：">
                  {getFieldDecorator('role', {
                    initialValue: params.role,
                    rules: [{ required: true, message: '请选择归属人角色' }],
                  })(
                    <BISelect allowClear labelInValue placeholder="请选择" style={{ width: 280 }}>
                      {BiFilter("QUALITY_RULE_TYPE").map(item => (
                        <Option value={item.id} key={item.name}>
                          {item.name}
                        </Option>
                      ))}
                    </BISelect>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={0} style={{ lineHeight: '40px' }}>
              <Col className="gutter-row" span={12}>
                <Form.Item label="*归属人：">
                  {getFieldDecorator('name', {
                    initialValue: params.name,
                    rules: [{ required: true, message: '请输入归属人' }],
                  })(<BIInput placeholder="请输入" style={{ width: 280 }} />)}
                </Form.Item>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*归属组织：">
                  {getFieldDecorator('organize', {
                    initialValue: this.state.organize,
                  })(
                    <TreeSelect
                      style={{ width: 280 }}
                      setFieldsValue={this.state.value}
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
          </div>
          <div className={styles.content}>
            <Row>
              <Col className="labelWidth" span={24}>
                <Form.Item label="*有无子订单编号？">
                  {getFieldDecorator('orderNum', {
                    initialValue: params.orderNum,
                  })(

                    <RadioGroup onChange={(e) => (this.radioChange(e, getFieldDecorator))}>
                      <Radio value={1}>有</Radio>
                      <Radio value={2}>无</Radio>
                    </RadioGroup>
                  )}


                </Form.Item>
              </Col>
            </Row>
            {this.state.radioChange}

            {/* <Row>
              <Col className="gutter-row" span={12} style={{ display: 'flex' }}>
                <Form.Item label="*子订单编号：">
                  {getFieldDecorator('order', {
                    initialValue: this.state.order,
                  })(<BIInput placeholder="请输入" style={{ width: 280 }} />)}
                </Form.Item>
                <div style={{ marginTop: '4px', marginLeft: '15px' }}>
                  <BIButton type="primary">
                    查询
                  </BIButton>
                </div>
              </Col>
            </Row>
            <SubOrderDetail data={this.state.orderDetail} /> */}
          </div>
          <div className={styles.content}>
            <Row>
              <Col className="gutter-row" span={12}>
                <Form.Item label="*质检违规日期：">
                  {getFieldDecorator('violationDate', {
                    initialValue: params.violationDate,
                  })(<BIDatePicker style={{ width: 280 }} />)}
                </Form.Item>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*质检扣分日期：">
                  {getFieldDecorator('reduceScoreDate', {
                    initialValue: params.reduceScoreDate,
                  })(<BIDatePicker style={{ width: 280 }} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row className="gutter-row">
              <Col span={12}>
                <Form.Item label="*分维：">
                  {getFieldDecorator('dimensionId', {
                    initialValue: params.dimensionId,
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
                <Form.Item label="*违规分类：">
                  {getFieldDecorator('dimension', {
                    initialValue: this.state.dimension,
                  })(
                    <TreeSelect
                      style={{ width: 280 }}
                      setFieldsValue={this.state.value}
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
              <Col className="txRight" span={12}>
                <Form.Item label="*违规等级：">
                  <div style={{ width: "280px", textAlign: "left" }}>一级违规</div>
                </Form.Item>
              </Col>
            </Row>
            {/* <Row style={{ lineHeight: '40px' }}>
              <Col className="gutter-row" span={12} style={{ display: 'flex' }}>
                <Form.Item label="*客诉主管邮箱：">
                  {getFieldDecorator('customerMail', {
                    initialValue: this.state.customerMail,
                  })(<BIInput placeholder="请输入" style={{ width: 170 }} />)}
                </Form.Item>
                <div className={styles.text}>@sunland.com</div>
              </Col>
              <Col className="gutter-row txRight" span={12}>
                <Form.Item label="*主管扣除绩效：">
                  {getFieldDecorator('userRole', {
                    initialValue: this.state.userRole,
                  })(<BIInput placeholder="请输入" style={{ width: 260 }} />)}
                  <span style={{ display: "inline-block", width: "20px" }}>%</span>
                </Form.Item>
              </Col>
            </Row>
            <Row style={{ lineHeight: '40px' }}>
              <Col className="gutter-row" span={12}>
                <Form.Item label="*扣除学分">
                  {getFieldDecorator('credit', {
                    initialValue: this.state.credit,
                  })(<BIInput placeholder="请输入" style={{ width: 260 }} />)}
                  <span style={{ display: "inline-block", width: "20px", textAlign: "right" }}>%</span>
                </Form.Item>
              </Col>
            </Row> */}
            <Row className="gutter-row">
              <Col span={12}>
                <Form.Item label="*附件：">
                  <Upload {...props} fileList={this.state.fileList} >
                    <BIButton type="primary">
                      上传附件
                    </BIButton>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            <Row className="gutter-row">
              <Col span={24} style={{ display: 'flex' }}>
                <Form.Item label="*违规详情：" style={{ marginRight: '0' }} />
                <TextArea rows={4} />
              </Col>
            </Row>

            {/* <div className={styles.verify}>
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
            </div> */}

            {this.getAppealInfos(detailData)}

            {/* <div className={styles.appealContent}>
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
            </div> */}

            <Row className="gutter-row">
              <Col span={24}>
                <div className={styles.gutterBox1}>
                  <span className={styles.gutterBtn2}>
                    <BIButton>取消</BIButton>
                  </span>
                  <span className={styles.gutterBtn1}>
                    <BIButton type="primary" htmlType="submit">提交</BIButton>
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
