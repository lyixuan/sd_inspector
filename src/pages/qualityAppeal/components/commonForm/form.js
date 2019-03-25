import React from 'react';
import { Form, message, Row, Col, Input, Upload } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import BIDatePicker from '@/ant_components/BIDatePicker';
import OrgCascader from '@/components/OrgCascader';
import BICascader from '@/ant_components/BICascader';
import BIRadio from '@/ant_components/BIRadio';
import { BiFilter } from '@/utils/utils';
import styles from './style.less';
import SubOrderDetail from '../subOrderDetail';
import { uploadAttachment } from '../../services';



const { Option } = BISelect;
const { TextArea } = Input;
const format = 'YYYY-MM-DD';
let isZip = false;
let isLt10M = false;
class CreateQualityNewSheet extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            level: null,   // 展示层级
            violationLevelObj: {},
            fileList: []
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
        this.props.form.setFieldsValue({ organize: [] });
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
        const { dimensionTreeList = [] } = this.props;
        const params = this.props.form.getFieldsValue();
        const { qualityType, dimensionId } = params || {};
        return qualityType && dimensionId ? dimensionTreeList[0] ? dimensionTreeList[0].children : [] : [];
    }



    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
            const { violationLevelObj } = this.state;
            const { violationLevel } = violationLevelObj;
            if (this.props.onSubmit) {
                this.props.onSubmit({ ...values, violationLevel });
            }
        });
    }
    // 质检类型onchange
    qualityChange = (val) => {
        this.props.form.setFieldsValue({ dimensionId: undefined });
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
    uploadChange = (info) => {
        // tip 目前支持上传一个文件
        const { file = null } = info || {};
        let attUrl = '';
        if (file) {
            const { response = null } = file;
            if (response) {
                if (response.code === 20000) {
                    attUrl = response.data;
                    this.setState({ fileList: file });
                } else {
                    this.setState({ fileList: [] });
                    message.error(response.msgDetail);
                }
            } else {
                message.error('上传错误');
                this.setState({ fileList: [] });
            }
        }
        const params = this.props.form.getFieldsValue();
        if (this.props.setAttUrl) {
            this.props.setAttUrl(attUrl, params);
        }
    };
    renderViolationLevelName = () => {
        const dimension = this.props.form.getFieldValue('dimension');
        if (Array.isArray(dimension) && dimension.length > 0) {
            const obj = dimension.slice(-1)[0] || {};
            return obj
        } return {}

    }
    renderGovernorComponent = () => {
        const { getFieldDecorator } = this.props.form;
        const { params } = this.props;
        const values = this.props.form.getFieldsValue();
        const { qualityType, role } = values || {};
        const violationLevelObj = this.renderViolationLevelName();
        const isShowMasterMail = (role === 'csleader' || role === 'csofficer') && qualityType === 1 && (violationLevelObj.violationLevelname === '一级违规' || violationLevelObj.violationLevelname === '特级违规');
        if (isShowMasterMail) {
            return (
                <Row style={{ lineHeight: '40px' }}>
                    <Col className="gutter-row" span={12} style={{ display: 'flex' }}>
                        <Form.Item label="*客诉主管邮箱：">
                            {getFieldDecorator('customerMail', {
                                initialValue: params.masterMail,
                            })(<BIInput placeholder="请输入" style={{ width: 170 }} />)}
                        </Form.Item>
                        <div className={styles.text}>@sunland.com</div>
                    </Col>
                    <Col className="gutter-row txRight" span={12}>
                        <Form.Item label="*主管扣除绩效：">
                            {getFieldDecorator('qualityValue', {
                                initialValue: params.qualityValue,
                            })(<BIInput placeholder="请输入" style={{ width: 260 }} />)}
                            <span style={{ display: "inline-block", width: "20px" }}>%</span>
                        </Form.Item>
                    </Col>
                </Row>
            )
        } else return null;
    }
    renderQualityValue = () => {
        const { getFieldDecorator } = this.props.form;
        const values = this.props.form.getFieldsValue();
        const { qualityType, role } = values || {};
        return (
            <Row style={{ lineHeight: '40px' }}>
                <Col className="gutter-row" span={12}>
                    <Form.Item label="*扣除学分">
                        {getFieldDecorator('qualityType', {
                            initialValue: this.state.credit,
                        })(<BIInput placeholder="请输入" style={{ width: 260 }} />)}
                        <span style={{ display: "inline-block", width: "20px", textAlign: "right" }}>%</span>
                    </Form.Item>
                </Col>
            </Row>
        )

    }
    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel()
        }
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
                                    })(<BIDatePicker style={{ width: 280 }} format={format} />)}
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row txRight" span={12}>
                                <Form.Item label="*质检扣分日期：">
                                    {getFieldDecorator('reduceScoreDate', {
                                        initialValue: params.reduceScoreDate,
                                    })(<BIDatePicker style={{ width: 280 }} format={format} />)}
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
                                        initialValue: params.dimension,
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
                        {this.renderQualityValue()}
                        <Row className="gutter-row">
                            <Col className="gutter-row" span={12}>
                                <Form.Item label="*学院类型">
                                    {getFieldDecorator('familyType', {
                                        initialValue: params.familyType || undefined,
                                    })(

                                        <BISelect allowClear placeholder="请选择" style={{ width: 280 }}>
                                            {BiFilter('FAMILY_TYPE').map(item => (
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
                                <Form.Item label="*附件：">
                                    <Upload
                                        {...uploadAttachment()}
                                        onChange={this.uploadChange}
                                        beforeUpload={this.beforeUpload}
                                        fileList={this.state.fileList}
                                    >
                                        <BIButton type="primary"
                                        >
                                            上传附件
                    </BIButton>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className="gutter-row">
                            <Col span={24} style={{ display: 'flex' }}>
                                <Form.Item label="*违规详情:">
                                    {getFieldDecorator('desc', {
                                        initialValue: this.state.credit,
                                    })(<TextArea placeholder="请输入违规详情" />)}
                                </Form.Item>
                                x
                            </Col>
                        </Row>
                        {/* 显示children */}
                        <Row>
                            <Col span={24}>
                                {this.props.otherNode}
                            </Col>
                        </Row>
                        <Row className="gutter-row">
                            <Col span={24}>
                                <div className={styles.gutterBox1}>
                                    <span className={styles.gutterBtn2}>
                                        <BIButton onClick={this.onCancel}>取消</BIButton>
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
                        <BIButton style={{ marginRight: 10 }} onClick={this.onCancel}>
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
        // 对分类级别进行处理
        // returnObj['dimension'] = Form.createFormField({
        //     value: [params.secondAssortmentId, params.secondAssortmentId, params.thirdAssortmentId].filter(item => item),
        // });

        // // 此处后期应对学院家族小组进行处理
        // returnObj['organize'] = Form.createFormField({
        //     value: [params.collegeId, params.familyId, params.groupId].filter(item => item),
        // });
    })
    return returnObj
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Search_Form', mapPropsToFields, })(CreateQualityNewSheet);

export default WrappedHorizontalLoginForm;
