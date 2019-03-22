import React from 'react';
import { Form, message, Row, Col, Input, Upload } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import BIDatePicker from '@/ant_components/BIDatePicker';
import OrgCascader from '@/components/OrgCascader';
import BICascader from '@/ant_components/BICascader';
import { BiFilter } from '@/utils/utils';
import styles from './style.less';
import SubOrderDetail from './../../components/subOrderDetail';

const { Option } = BISelect;
const { TextArea } = Input;

class CreateQualityNewSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: null,   // 展示层级
            violationLevelObj: {},


            credit: undefined, //学分
            customerMail: undefined,//客诉主管邮箱
            visible: false,
        };
    }

    getOrgMapByMail = () => {
        const values = this.props.form.getFieldsValue();
        const { mail } = values;
        if (!mail) return;
        if (this.props.getOrgMapByMail) {
            this.props.getOrgMapByMail(mail, values);
        }
    }
    changeOrg = (value) => {
        const level = BiFilter("FRONT_ROLE_TYPE_LIST").find(item => item.id === value).level;
        this.setState({
            level
        });
    }
    getOrgRole = () => {
        const role = this.props.form.getFieldValue('role');
        const obj = BiFilter("FRONT_ROLE_TYPE_LIST").find(item => item.id === role) || {};
        return obj.level || 3;
    }
    getOrderNum = () => {
        const values = this.props.form.getFieldsValue();
        const { orderNum } = values;
        if (!orderNum) {
            message.error('请输入正确的子订单编号');
        }
        if (this.props.getOrderNum) {
            this.props.getOrderNum(orderNum, values)
        }
    }
    chooseDimensionList = () => {
        const { dimensionList1, dimensionList2 } = this.props;
        const qualityType = this.props.form.getFieldValue('qualityType');
        return qualityType === 1 ? dimensionList1 : qualityType === 2 ? dimensionList2 : [];
    }
    changeDimension = (dimensionId) => {
        const params = this.props.form.getFieldsValue();
        const { qualityType } = params || {};
        if (!qualityType || !dimensionId) return;
        if (this.props.changeDimension) {
            this.props.changeDimension({ qualityType, dimensionId }, { ...params, dimensionId })
        }
    }
    onChangedimensionTree = (value, objArr) => {
        let violationLevelObj = objArr.slice(-1);
        violationLevelObj = violationLevelObj.length > 0 ? violationLevelObj[0] : {};
        this.setState({ violationLevelObj });
    }
    getDimensionTreeList = () => {
        const { dimensionTreeList } = this.props;
        const params = this.props.form.getFieldsValue();
        const { qualityType, dimensionId } = params || {};
        return qualityType && dimensionId ? dimensionTreeList : [];
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            if (this.props.onSubmit) {
                this.props.onSubmit(values);
            }
        });
    }
    // 质检类型onchange
    qualityChange = (val) => {
        this.props.form.setFieldsValue({ dimensionId: undefined });
    }
    renderGovernorComponent = () => {
        const { getFieldDecorator } = this.props.form;
        const params = this.props.form.getFieldsValue();
        const { qualityType, role } = params || {};
        const { violationLevelObj } = this.state;
        console.log(role, qualityType, violationLevelObj)
        if ((role === 'csleader' || role === 'csofficer') && qualityType === 1 && violationLevelObj.violationLevelname === '一级违规') {
            return (
                <Row style={{ lineHeight: '40px' }}>
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
            )
        } else return null;


    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { params, orgList } = this.props;
        const { violationLevelObj } = this.state;
        const dimensionList = this.chooseDimensionList();
        return (
            <div className={styles.qualityContainter}>
                <div className={styles.title}>质检违规详情</div>
                <Form layout="inline" onSubmit={this.handleSubmit} className={styles.formBox}>
                    <div className={styles.content}>
                        <Row>
                            <Col className="gutter-row" span={20}>
                                <Form.Item label="*质检类型：">
                                    {getFieldDecorator('qualityType', {
                                        initialValue: params.qualityType || undefined,
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
                                <Form.Item label="*归属人邮箱">
                                    {getFieldDecorator('mail', {
                                        initialValue: params.mail,
                                        rules: [{ required: true, message: '请输入邮箱' }],
                                    })(<BIInput placeholder="请输入" style={{ width: 170 }} />)}
                                </Form.Item>
                                <div className={styles.text}>@sunland.com</div>
                                <div>
                                    <BIButton type="primary" onClick={this.getOrgMapByMail} loading={this.props.mailDataLoading}>
                                        查询
                  </BIButton>
                                </div>
                            </Col>
                            <Col className="gutter-row txRight" span={12}>
                                <Form.Item label="*归属人角色：">
                                    {getFieldDecorator('role', {
                                        initialValue: params.role || undefined,
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
                                        initialValue: [],
                                    })(
                                        <OrgCascader
                                            level={this.getOrgRole()}
                                            placeholder="请选择"
                                            options={orgList}
                                            fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                                        />
                                    )}
                                </Form.Item>
                            </Col>
                        </Row>
                    </div>
                    <div className={styles.content}>
                        {this.state.radioChange}
                        <Row>
                            <Col className="gutter-row" span={12} style={{ display: 'flex' }}>
                                <Form.Item label="*子订单编号：">
                                    {getFieldDecorator('orderNum', {
                                        initialValue: params.orderNum,
                                    })(<BIInput placeholder="请输入" style={{ width: 280 }} />)}
                                </Form.Item>
                                <div style={{ marginTop: '4px', marginLeft: '15px' }}>
                                    <BIButton type="primary" onClick={this.getOrderNum} loading={this.props.getOrderNumLoading}>
                                        查询
                  </BIButton>
                                </div>
                            </Col>
                        </Row>
                        {/* 显示子订单详情 */}
                        {!this.props.orderNumData ? null : <SubOrderDetail data={this.props.orderNumData || {}} />}
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
                                        <BISelect allowClear placeholder="请选择" notFoundContent="请选择质检类型" onChange={this.changeDimension} style={{ width: 280 }}>
                                            {dimensionList.map(item => (
                                                <Option value={item.id} key={item.name}>
                                                    {item.name}
                                                </Option>
                                            ))}

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
                                        <BICascader
                                            options={this.getDimensionTreeList()}
                                            fieldNames={{ label: 'title', value: 'key', children: 'children' }}
                                            style={{ width: 280 }}
                                            displayRender={(label) => label[label.length - 1]}
                                            onChange={this.onChangedimensionTree}
                                        />
                                    )}

                                </Form.Item>
                            </Col>
                            <Col className="txRight" span={12}>
                                <Form.Item label="*违规等级:">
                                    <div style={{ width: "280px", textAlign: "left" }}>{violationLevelObj.violationLevelname}</div>
                                </Form.Item>
                            </Col>
                        </Row>
                        {this.renderGovernorComponent()}
                        <Row style={{ lineHeight: '40px' }}>
                            <Col className="gutter-row" span={12}>
                                <Form.Item label="*扣除学分">
                                    {getFieldDecorator('credit', {
                                        initialValue: this.state.credit,
                                    })(<BIInput placeholder="请输入" style={{ width: 260 }} />)}
                                    <span style={{ display: "inline-block", width: "20px", textAlign: "right" }}>%</span>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className="gutter-row">
                            <Col span={12}>
                                <Form.Item label="*附件：">
                                    <Upload>
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
function mapPropsToFields(props) {
    const { params } = props
    const returnObj = {};
    if (!params || typeof params !== 'object') return returnObj;
    Object.keys(params).forEach(item => {

        returnObj[item] = Form.createFormField({
            value: params[item] || undefined,
        });
        // 此处后期应对学院家族小组进行处理
        returnObj['organize'] = Form.createFormField({
            value: [params.collegeId, params.familyId, params.groupId].filter(item => item),
        });
    })
    return returnObj
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Search_Form', mapPropsToFields, })(CreateQualityNewSheet);

export default WrappedHorizontalLoginForm;
