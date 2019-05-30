import React from 'react';
import { Form, message, Row, Col, Input, Upload } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIDatePicker from '@/ant_components/BIDatePicker';
import OrgCascader from '@/components/OrgCascader';
import BICascader from '@/ant_components/BICascader';
import { BiFilter, msgF } from '@/utils/utils';
import DownLoad from '@/components/DownLoad';
import moment from 'moment';
import { STATIC_HOST } from '@/utils/constants';
import styles from './style.less';
import SubOrderDetail from '../subOrderDetail';
import { uploadAttachment } from '../../services';
import { BaseModels } from './_utils/baseModels';

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
    componentWillReceiveProps(next) {
        const newUrl = next.params.attUrl;
        const oldUrl = this.props.params.attUrl;
        if (newUrl !== oldUrl && !oldUrl) {
            this.setState({
                fileList: newUrl && newUrl !== '' ? [{
                    uid: '-1',
                    name: newUrl.split('/')[3],
                    status: 'done',
                    url: `${STATIC_HOST}/${newUrl}`,
                }] : []
            });

        }
    }
    getOrgMapByMail = () => {
        const values = this.props.form.getFieldsValue();
        this.props.form.validateFields(['mail'], () => {
            const { mail } = values;
            if (!mail) return;
            if (this.props.getOrgMapByMail) {
                this.props.getOrgMapByMail(mail, values);
            }
        })

    }
    // 质检类型onchange
    qualityChange = (qualityType) => {
        // this.props.form.setFieldsValue({ dimensionId: undefined, qualityValue: null, masterQualityValue: null, masterMail: null });
        if (this.props.onChangedimensionTree) {
            this.props.onChangedimensionTree({
                violationLevelObj: {}, dimension: [], dimensionId: undefined, qualityType,
                masterQualityValue: null, masterMail: null, qualityValue: null,
            });
        }
    }
    changeRole = (role) => {
        const values = this.props.form.getFieldsValue();
        const obj = BiFilter("FRONT_ROLE_TYPE_LIST").find(item => item.id === role) || {};
        const { level } = obj;

        // this.props.form.setFieldsValue({ organize: [], qualityValue: null });
        this.setState({
            level
        });
        if (this.props.onChangeRole) {
            this.props.onChangeRole({ ...values, role, organize: [], qualityValue: null, masterQualityValue: null, masterMail: null })
        }
    }
    changeOrg = (...argu) => {
        const organize = argu[0];
        const orgArr = argu[1];
        const returnObj = { organize };
        const orgSymbol = ['college', 'family', 'group'];
        orgArr.forEach((item, index) => {
            const groupType = orgSymbol[index];
            returnObj[groupType + 'Id'] = orgArr[index].id;
            returnObj[groupType + 'Name'] = orgArr[index].name;
        });
        const values = this.props.form.getFieldsValue();
        if (this.props.onChangeOrg) {
            this.props.onChangeOrg({ ...values, ...returnObj })
        }
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
    changeDimension = (dimensionId, ops) => {
        const { props: { children } } = ops;
        const params = this.props.form.getFieldsValue();
        const { qualityType } = params || {};
        if (!qualityType || !dimensionId) return;
        if (this.props.changeDimension) {
            this.props.changeDimension({ qualityType, dimensionId, violationName: children }, { ...params, dimensionId })
        }
    }
    onChangedimensionTree = (value, objArr) => {
        let violationLevelObj = objArr.slice(-1);
        violationLevelObj = violationLevelObj.length > 0 ? violationLevelObj[0] : {};
        if (this.props.onChangedimensionTree) {
            this.props.onChangedimensionTree({
                violationLevelObj, dimension: value,
                masterQualityValue: null, masterMail: null,
            });
        }
    }
    getDimensionTreeList = () => {
        const { dimensionTreeList = [] } = this.props;
        const params = this.props.form.getFieldsValue();
        const { qualityType, dimensionId } = params || {};
        return qualityType && dimensionId ? dimensionTreeList[0] ? dimensionTreeList[0].children : [] : [];
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
        let { fileList = [], file = {} } = info || {};
        if (isLt10M) {
            fileList = fileList.slice(-1);
            if (isZip) {
                this.setState({ fileList });
            }
        }
        let attUrl = '';
        if (fileList.length > 0) {
            const { response = null } = file || {};
            if (response) {
                if (response.code === 20000) {
                    attUrl = response.data.fileUrl;
                    const params = this.props.form.getFieldsValue();
                    if (this.props.setAttUrl) {
                        this.props.setAttUrl(attUrl, params);
                    }
                    this.setState({ fileList: fileList });
                } else {
                    this.setState({ fileList: [] });
                    message.error(msgF(response.msg, response.msgDetail));
                }
            }
        }
    };
    onChangeFamilyType = (value) => {
        const values = this.props.form.getFieldsValue();
        values['familyType'] = value;
        this.formChange(values)
    }
    datePackerChange = (value, key) => {
        const values = this.props.form.getFieldsValue();
        values[key] = value;
        this.formChange(values)

    }
    inputChange = (e, key) => {
        const values = this.props.form.getFieldsValue();
        values[key] = e.currentTarget.value;
        this.formChange(values)
    }
    formChange = (params) => {
        if (this.props.formChange) {
            this.props.formChange(params);
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { violationLevelObj } = this.props;
                const { violationLevel } = violationLevelObj;
                if (this.props.onSubmit) {
                    this.props.onSubmit({ ...values, violationLevel });
                }

            }

        });
    }
    renderGovernorComponent = () => {
        const { getFieldDecorator } = this.props.form;
        const { params } = this.props;
        const values = this.props.form.getFieldsValue();
        const { violationLevelObj } = this.props;
        const isShowMasterMail = BaseModels.checkoutQualityMaster(values, violationLevelObj)
        if (isShowMasterMail) {
            return (
                <Row style={{ lineHeight: '40px' }}>
                    <Col className="gutter-row" span={12} style={{ display: 'flex' }}>
                        <span className={styles.i}>*</span><Form.Item label="客诉主管邮箱：">
                            {getFieldDecorator('masterMail', {
                                initialValue: params.masterMail,
                                rules: [{ required: true, message: '请输入主管邮箱' }],
                            })(<BIInput placeholder="请输入" style={{ width: 170 }} onChange={e => this.inputChange(e, 'masterMail')} />)}
                        </Form.Item>
                        <div className={styles.text}>@sunlands.com</div>
                    </Col>
                    <Col className="gutter-row txRight" span={12}>
                        <span className={styles.i}>*</span><Form.Item label="主管扣除绩效：">
                            {getFieldDecorator('masterQualityValue', {
                                initialValue: params.masterQualityValue,
                                rules: [{
                                  validator(rule, value, callback) {
                                    if (!value||isNaN(value)||Number(value)<0) {
                                      callback({ message: '请输入合法绩效' });
                                    } else if (
                                      value &&
                                      String(value).split('.')[1] &&
                                      String(value).split('.')[1].length > 2
                                    ) {
                                      callback({ message: '最多保留两位小数' });
                                    } else {
                                      callback();
                                    }
                                  },
                                }],
                            })(<BIInput placeholder="请输入" style={{ width: 260 }} onChange={e => this.inputChange(e, 'masterQualityValue')} />)}
                            <span style={{ display: "inline-block", width: "20px" }}>%</span>
                        </Form.Item>
                    </Col>
                </Row>
            )
        } else return null;
    }
    renderQualityValue = () => {
        const values = this.props.form.getFieldsValue();
        // const { qualityType, role } = values || {};
        // const isShowCreate = qualityType === 2 && role !== 'class' && role !== 'group' && role !== 'family';
        // const isShowPerformance = qualityType === 1 && role !== 'csleader' && role !== 'csofficer';
        const isShowCreate = BaseModels.checkoutQualityScore(values);
        const isShowPerformance = BaseModels.checkoutQualityPerfor(values);
        if (isShowCreate) return this.renderQualityType_create();
        if (isShowPerformance) {
          return this.renderQualityType_performance(100);
        }
    };
    checkQuality = (rule, value, callback) => {
        if (value && Number(value) >= 0) {
            callback('请输入大于0的数字,最多保留两位小数');
            return;
        }
        callback();
    };
    checkScore = (rule, value, callback) => {
        const reg = /^[0-9]\d*$/;
        if (reg.test(value)) {
            callback();
            return;
        }
        callback('请输入正整数');
    };
    renderQualityType_performance = (value) => {
        const { getFieldDecorator } = this.props.form;
        const { params } = this.props;
        if (value) {params.qualityValue=params.qualityValue*value}
        return (
            <Row style={{ lineHeight: '40px' }}>
                <Col className="gutter-row" span={12}>
                    <span className={styles.i}>*</span><Form.Item label="扣除绩效">
                        {getFieldDecorator('qualityValue', {
                            initialValue: params.qualityValue,
                            rules: [
                              {
                                validator(rule, value, callback) {
                                  if (!value||isNaN(value)||Number(value)<0) {
                                    callback({ message: '请输入合法绩效' });
                                  } else if (
                                    value &&
                                    String(value).split('.')[1] &&
                                    String(value).split('.')[1].length > 2
                                  ) {
                                    callback({ message: '最多保留两位小数' });
                                  } else {
                                    callback();
                                  }
                                },
                              },
                            ]
                        })(<BIInput placeholder="请输入" style={{ width: 260 }} onChange={e => this.inputChange(e, 'qualityValue')} />)}
                        <span style={{ display: "inline-block", width: "20px", textAlign: "right" }}>%</span>
                    </Form.Item>
                </Col>
            </Row>
        )
    }
    renderQualityType_create = () => {
        const { getFieldDecorator } = this.props.form;
        const { params } = this.props;
        return (
            <>
                <Row style={{ lineHeight: '40px' }}>
                    <Col className="gutter-row" span={12}>
                        <span className={styles.i}>*</span><Form.Item label="扣除学分">
                            {getFieldDecorator('qualityValue', {
                                initialValue: params.qualityValue,
                                rules: [{ required: true, message: '请输入合法学分', validator: this.checkScore }],

                            })(<BIInput placeholder="请输入" style={{ width: 260 }} onChange={e => this.inputChange(e, 'qualityValue')} />)}
                            <span style={{ display: "inline-block", width: "20px", textAlign: "right" }}></span>
                        </Form.Item>
                    </Col>
                </Row>
                <Row className="gutter-row">
                    <Col className="gutter-row" span={12}>
                        <span className={styles.i}>*</span><Form.Item label="学院类型">
                            {getFieldDecorator('familyType', {
                                initialValue: params.familyType || undefined,
                                rules: [{ required: true, message: '请选择学院类型' }],

                            })(
                                <BISelect allowClear placeholder="请选择" style={{ width: 280 }} onChange={this.onChangeFamilyType}>
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
            </>
        )

    }
    renderUpload = () => {
        const { formType, actionType } = this.props;
        const upLoadTypeObj = BiFilter('QUALITY_UPLOAD_TYPE').find(item => item.name === formType) || {};
        const { attUrl = '' } = this.props.params;
        const name = attUrl && attUrl.split('/')[3];
        if (actionType !== 'appeal') {
            return (
                <Upload
                    {...uploadAttachment()}
                    fileList={this.state.fileList}
                    data={{ type: upLoadTypeObj.id || 1 }}
                    onChange={this.uploadChange}
                    beforeUpload={this.beforeUpload}
                >
                    <BIButton type="primary"
                    >
                        上传附件
                    </BIButton>
                    <span style={{ color: '#aaa', fontSize: 12 }}>（请上传10M以内的rar、zip格式文件）</span>
                </Upload>)
        } else {
            return (
                attUrl ? (<DownLoad loadUrl={`${STATIC_HOST}/${attUrl}`} text={name} fileName={() => name} textClassName={styles.downCls} />) : null
            )
        }
    };
    onCancel = () => {
        if (this.props.onCancel) {
            this.props.onCancel()
        }
    };
    disabledDate = (current) => {
        return current && current > moment().endOf('day');
    }
    render() {
        const { attUrl = '' } = this.props.params;
        this.attUrl = attUrl;
        const { getFieldDecorator } = this.props.form;
        const { params, orgList } = this.props;
        const { violationLevelObj } = this.props;
        const dimensionList = this.chooseDimensionList();
        return (
            <div className={styles.commonformWrap}>
                <div className={styles.title}>质检违规详情</div>
                <Form layout="inline" onSubmit={this.handleSubmit} className={styles.formBox}>
                    <div className={styles.content}>
                        <Row>
                            <Col className="gutter-row" span={20}>
                                <span className={styles.i}>*</span><Form.Item label="质检类型">
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
                                <span className={styles.i}>*</span><Form.Item label="归属人邮箱">
                                    {getFieldDecorator('mail', {
                                        initialValue: params.mail,
                                        rules: [{ required: true, message: '请输入邮箱' }],
                                    })(<BIInput placeholder="请输入" style={{ width: 170 }} onChange={e => this.inputChange(e, 'mail')} />)}
                                </Form.Item>
                                <div className={styles.text}>@sunlands.com</div>
                                <div>
                                    <BIButton type="primary" onClick={this.getOrgMapByMail} loading={this.props.mailDataLoading}>
                                        查询
                  </BIButton>
                                </div>
                            </Col>
                            <Col className="gutter-row txRight" span={12}>
                                <span className={styles.i}>*</span><Form.Item label="归属人角色">
                                    {getFieldDecorator('role', {
                                        initialValue: params.role || undefined,
                                        rules: [{ required: true, message: '请选择归属人角色' }],
                                    })(
                                        <BISelect allowClear placeholder="请选择"
                                            onChange={this.changeRole}
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
                                <span className={styles.i}>*</span><Form.Item label="归属人：">
                                    {getFieldDecorator('name', {
                                        initialValue: params.name,
                                        rules: [{ required: true, message: '请输入归属人' }],
                                    })(<BIInput placeholder="请输入" style={{ width: 280 }} onChange={e => this.inputChange(e, 'name')} />)}
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row txRight" span={12}>
                                <span className={styles.i}>*</span><Form.Item label="归属组织：">
                                    {getFieldDecorator('organize', {
                                        initialValue: params.organize,
                                        rules: [{ required: this.getOrgRole() > 0, message: '请输入归属组织' }]
                                    })(
                                        <OrgCascader
                                            level={this.getOrgRole()}
                                            placeholder={params.organizeName || '请选择'}
                                            options={orgList}
                                            fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                                            onChange={this.changeOrg}
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
                                <span className={styles.i} style={{ display: 'inline-block', width: '7.24px' }}>&nbsp;</span><Form.Item label="子订单编号：">
                                    {getFieldDecorator('orderNum', {
                                        initialValue: params.orderNum,
                                    })(<BIInput placeholder="请输入" style={{ width: 280 }} onChange={e => this.inputChange(e, 'orderNum')} />)}
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
                                <span className={styles.i}>*</span><Form.Item label="质检违规日期：">
                                    {getFieldDecorator('violationDate', {
                                        initialValue: params.violationDate,
                                        rules: [{ required: true, message: '请选择质检违规日期' }],
                                    })(<BIDatePicker disabledDate={this.disabledDate} style={{ width: 280 }} format={format} onChange={val => this.datePackerChange(val, 'violationDate')} />)}
                                </Form.Item>
                            </Col>
                            <Col className="gutter-row txRight" span={12}>
                                <span className={styles.i}>*</span><Form.Item label="质检扣分日期：">
                                    {getFieldDecorator('reduceScoreDate', {
                                        initialValue: params.reduceScoreDate,
                                        rules: [{ required: true, message: '请选择质检扣分日期' }],
                                    })(<BIDatePicker disabledDate={this.disabledDate} style={{ width: 280 }} format={format} onChange={val => this.datePackerChange(val, 'reduceScoreDate')} />)}
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row className="gutter-row">
                            <Col span={12}>
                                <span className={styles.i}>*</span><Form.Item label="分维：">
                                    {getFieldDecorator('dimensionId', {
                                        initialValue: params.dimensionId || undefined,
                                        rules: [{ required: true, message: '请选择分维' }],
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
                                <span className={styles.i}>*</span><Form.Item label="违规分类：">
                                    {getFieldDecorator('dimension', {
                                        initialValue: params.dimension || undefined,
                                        rules: [{ required: true, message: '请选择违规分类' }],
                                    })(
                                        <BICascader
                                            placeholder='请选择'
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
                                <span className={styles.i}>*</span><Form.Item label="违规等级:">
                                    <div style={{ width: "280px", textAlign: "left" }}>{violationLevelObj.violationLevelName}</div>
                                </Form.Item>
                            </Col>
                        </Row>
                        {this.renderGovernorComponent()}
                        {this.renderQualityValue()}
                        {/* 当在非编辑状态下进行下载 */}
                        <Row className="gutter-row">
                            <Col span={12}>
                                <span className={styles.i}>&nbsp;</span><Form.Item label="附件：">
                                    {this.renderUpload()}
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row className="gutter-row">
                            <Col span={24}>
                                <span className={styles.i}>*</span><Form.Item label="违规详情:" className="row-details">
                                    {getFieldDecorator('desc', {
                                        initialValue: params.desc,
                                        rules: [{ required: true, message: '请输入违规详情' }],
                                    })(<TextArea maxLength={1000} className={styles.textA} rows="4" placeholder="请输入违规详情" onChange={e => this.inputChange(e, 'desc')} />)}
                                </Form.Item>
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
                                        <BIButton type="primary" htmlType="submit" loading={this.props.checkRepeatQualityIng}>提交</BIButton>
                                    </span>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Form>
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
            value: params[item],
        });
    })
    return returnObj
}

const WrappedHorizontalLoginForm = Form.create({ name: 'Search_Form', mapPropsToFields, })(CreateQualityNewSheet);

export default WrappedHorizontalLoginForm;
