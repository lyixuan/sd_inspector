import React from 'react';
import { Input, Form, message, Upload } from 'antd';
import { BiFilter, DeepCopy } from '@/utils/utils';
import BIButton from '@/ant_components/BIButton';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BICascader from '@/ant_components/BICascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import DownLoad from '@/components/DownLoad';
import { uploadAttachment } from '@/pages/qualityAppeal/services';
import { STATIC_HOST } from '@/utils/constants';
import Box from './box';
import BoxItem from './boxItem';
import SubOrder from './subOrder';
import styles from './form.less';
import moment from 'moment/moment';

const { Option } = BISelect;
const { TextArea } = Input;

const BaseForm = Form.create({ name: 'base_form' })(
  class extends React.Component {
    handleCancel = () => {
      this.props.onCancel();
    };

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.onSubmit(values);
        }
      });
    };

    getOrgMapByMail = () => {
      this.props.getOrgMapByMail(this.props.form.getFieldValue('mail'));
    };

    getSubOrderDetail = () => {
      this.props.getSubOrderDetail(this.props.form.getFieldValue('orderNum'));
    };

    disabledDate = current => {
      return current && current > moment().endOf('day');
    };

    dimensionIdList = () => {
      const { dimensionList1, dimensionList2 } = this.props;
      const qualityType = this.props.form.getFieldValue('qualityType');
      return qualityType === 1 ? dimensionList1 : qualityType === 2 ? dimensionList2 : [];
    };

    onChangeDimensionId = (dimensionId) => {
      const qualityType = this.props.form.getFieldValue('qualityType');
      if (!qualityType || !dimensionId) return;
      this.props.getDimensionTreeList(dimensionId, qualityType);
    };

    dimensionTreeList = () => {
      const { dimensionTreeList = [] } = this.props;
      const params = this.props.form.getFieldsValue();
      const { qualityType, dimensionId } = params || {};
      return qualityType && dimensionId ? dimensionTreeList[0] ? dimensionTreeList[0].children : [] : [];
    };

    onChangeDimensionTree = (value, objArr) => {
      let violationLevelObj = objArr.slice(-1);
      violationLevelObj = violationLevelObj.length > 0 ? violationLevelObj[0] : {};
      const qualityType = this.props.form.getFieldValue('qualityType');
      this.props.changeDimensionTree({ qualityType, ...violationLevelObj });
      console.log(1, violationLevelObj);
    };

    attachedRoleList = () => {
      const qualityType = this.props.form.getFieldValue('qualityType');
      let listRole = [];
      if (qualityType === 1) {
        // 客诉
        listRole = [{ id: 'cssupervisor', name: '客诉主管' }, { id: 'csleader', name: '客诉组长' }];
      } else if(qualityType===2){
        listRole = [{ id: 'family', name: '家族长' }, { id: 'group', name: '运营长' }];
      }
      return listRole;
    };

    renderUpload = () => {
      const { formType, upLoadType } = this.props;
      const upLoadTypeObj = BiFilter('QUALITY_UPLOAD_TYPE').find(item => item.name === upLoadType) || {};
      const { attUrl = '' } = this.props || {};
      const name = attUrl && attUrl.split('/')[3];
      if (upLoadType !== 'appeal') {
        return (
          <Upload
            {...uploadAttachment()}
            fileList={[]}
            data={{ type: upLoadTypeObj.id || 1 }}
            onChange={this.uploadChange}
            beforeUpload={this.beforeUpload}
          >
            <BIButton type="primary">上传附件</BIButton>
            <span style={{ color: '#aaa', fontSize: 12 }}>（请上传10M以内的rar、zip格式文件）</span>
          </Upload>
        );
      } else {
        return attUrl ? (
          <DownLoad
            loadUrl={`${STATIC_HOST}/${attUrl}`}
            text={name}
            fileName={() => name}
            textClassName={styles.downCls}
          />
        ) : null;
      }
    };

    renderAttachedPersonList = (attachedPersonList, attachedRoleList, expand) => {
      const { getFieldDecorator } = this.props.form;
      const count = expand ? 4 : 2;
      const children = [];
      for (let i = 0; i < attachedPersonList.length; i++) {
        children.push(
          <div className={styles.formRow} style={{ display: i < count ? 'block' : 'none' }}>
            <BoxItem label={i===0?"连带责任人处罚":""} oneRow noSemicolon={i!==0}>
              <Form.Item className={styles.formItem} style={{ width: 140 }}>
                {getFieldDecorator(`roleName-${i}`, {
                  initialValue: attachedPersonList[i].roleName || undefined,
                })(<BISelect allowClear placeholder="连带责任人角色" notFoundContent="先选择质检类型">
                  {attachedRoleList.map(item => (
                    <Option value={item.id} key={item.id}>{item.name}</Option>
                  ))}
                </BISelect>)}
              </Form.Item> &nbsp;
              <Form.Item className={styles.formItem}>
                {getFieldDecorator(`userName-${i}`, {
                  initialValue: attachedPersonList[i].userName || undefined,
                })(<BIInput allowClear placeholder="邮箱前缀" addonAfter="@sunlands.com"/>)}
              </Form.Item> &nbsp;
              <Form.Item className={styles.formItem} style={{ width: 140 }}>
                {getFieldDecorator(`punishType-${i}`, {
                  initialValue: attachedPersonList[i].punishType || undefined,
                })(<BISelect allowClear placeholder="处罚方式">
                  {BiFilter('PUNISH_TYPE_LIST').map(item => (
                    <Option value={item.id} key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>)}
              </Form.Item> &nbsp;
              <Form.Item className={styles.formItem} style={{ width: 140 }}>
                {getFieldDecorator(`reduceScore-${i}`, {
                  initialValue: attachedPersonList[i].reduceScore || undefined,
                  rules: [{
                    validator(rule, value, callback) {
                      if (isNaN(value)) {
                        callback({ message: '请输入合法数据' });
                      } else {
                        callback();
                      }
                    },
                  }],
                })(<BIInput placeholder="处罚力度" allowClear  addonAfter={'元'}/>)}
              </Form.Item>
            </BoxItem>
          </div>,
        );
      }
      return children;
    };

    render() {
      const { form, params, orgList, orderNumData = {} } = this.props;
      const {
        mail, role, name, organize, orderNum, violationDate, reduceScoreDate, qualityType, familyType,
        dimensionId, dimension, violationLevel, punishType, qualityValue, attachedPersonList = [], desc, id,
      } = params || {};
      const { getFieldDecorator } = form;

      const dimensionIdList = this.dimensionIdList();
      const dimensionTreeList = this.dimensionTreeList();
      const attachedRoleList = this.attachedRoleList();

      return (
        <Form className="baseForm" onSubmit={this.handleSubmit}>

          {/*非编辑字段*/}
          <Form.Item style={{ display: 'none' }}>
            {getFieldDecorator('id', {
              initialValue: id,
            })(<Input/>)}
          </Form.Item>

          {/*第一部分*/}
          <Box title="质检归属人信息">
            <div className={styles.formRow}>
              <BoxItem label="邮箱" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('mail', {
                    initialValue: mail, rules: [{ required: true, message: '请输入邮箱' }],
                  })(<BIInput allowClear placeholder="请输入" addonAfter="@sunlands.com"/>)}
                </Form.Item>&nbsp;&nbsp;
                <BIButton type="primary" size="default" onClick={this.getOrgMapByMail}
                          loading={this.props.loadingMail}>查询</BIButton>
              </BoxItem>
              <BoxItem label="角色" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('role', {
                    initialValue: role || undefined, rules: [{ required: true, message: '请选择归属人角色' }],
                  })(<BISelect allowClear placeholder="请选择" onChange={this.changeRole}>
                    {BiFilter('FRONT_ROLE_TYPE_LIST').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="姓名" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('name', {
                    initialValue: name, rules: [{ required: true, message: '请输入归属人' }],
                  })(<BIInput placeholder="请输入"/>)}
                </Form.Item>
              </BoxItem>
              <BoxItem label="组织架构" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('organize', {
                    initialValue: organize, rules: [{ required: true, message: '请选择归属组织' }],
                  })(<BICascader placeholder='请选择' changeOnSelect options={orgList}
                                 fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                  />)}
                </Form.Item>
              </BoxItem>
            </div>
          </Box>

          {/*第二部分*/}
          <div className={styles.formRow} style={{ marginBottom: 10, marginLeft: 15 }}>
            <BoxItem label="子订单编号">
              <Form.Item className={styles.formItem}>
                {getFieldDecorator('orderNum', {
                  initialValue: orderNum,
                })(<BIInput allowClear placeholder="请输入"/>)}
              </Form.Item>&nbsp;&nbsp;
              <BIButton type="primary" size="default" onClick={this.getSubOrderDetail}
                        loading={this.props.loadingOrder}>查询</BIButton>
            </BoxItem>
          </div>
          {orderNumData && <Box title="子订单信息">
            <SubOrder orderNumData={orderNumData}/>
          </Box>}

          {/*第三部分*/}
          <Box title="违规基础信息">
            <div className={styles.formRow}>
              <BoxItem label="违规日期" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('violationDate', {
                    initialValue: violationDate, rules: [{ required: true, message: '请选择违规日期' }],
                  })(<BIDatePicker style={{ width: 230 }} disabledDate={this.disabledDate} format="YYYY-MM-DD"/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="扣分日期" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('reduceScoreDate', {
                    initialValue: reduceScoreDate, rules: [{ required: true, message: '请选择扣分日期' }],
                  })(<BIDatePicker style={{ width: 230 }} format="YYYY-MM-DD"/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="质检类型" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('qualityType', {
                    initialValue: qualityType, rules: [{ required: true, message: '请选择质检类型' }],
                  })(<BISelect placeholder="请选择" allowClear>
                    {BiFilter('QUALITY_TYPE').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>)}
                </Form.Item>
              </BoxItem>
              <BoxItem label="学院类型" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('familyType', {
                    initialValue: familyType, rules: [{ required: true, message: '请选择学院类型' }],
                  })(<BISelect allowClear placeholder="请选择">
                    {BiFilter('FAMILY_TYPE').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="分维" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('dimensionId', {
                    initialValue: dimensionId || undefined, rules: [{ required: true, message: '请选择分维' }],
                  })(<BISelect allowClear placeholder="请选择" notFoundContent="先选择质检类型"
                               onChange={this.onChangeDimensionId}>
                    {dimensionIdList.map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="违规分类" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('dimension', {
                    initialValue: dimension || undefined, rules: [{ required: true, message: '请选择违规分类' }],
                  })(<BICascader placeholder="请选择" options={dimensionTreeList}
                                 notFoundContent="先选择分维"
                                 fieldNames={{ label: 'title', value: 'key', children: 'children' }}
                                 displayRender={label => label[label.length - 1]}
                                 onChange={this.onChangeDimensionTree}
                  />)}
                </Form.Item>
              </BoxItem>
              <BoxItem label="违规等级" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('violationLevel', {
                    initialValue: violationLevel || undefined, rules: [{ required: true, message: '请选择违规等级' }],
                  })(<BISelect allowClear placeholder="请选择">
                    {BiFilter('VIOLATION_LEVEL').map(item => (
                      <Option value={item.id} key={item.name}>
                        {item.name}
                      </Option>
                    ))}
                  </BISelect>)}
                </Form.Item>
              </BoxItem>
            </div>

            <div className={styles.line}/>

            <div className={styles.formRow}>
              <BoxItem label="归属人处罚" required oneRow>
                <Form.Item className={styles.formItem} style={{ width: 140 }}>
                  {getFieldDecorator('punishType', {
                    initialValue: punishType || undefined, rules: [{ required: true, message: '请选择处罚方式' }],
                  })(
                    <BISelect allowClear placeholder="处罚方式" notFoundContent="先选择违规分类"
                              onChange={this.onChangePunishType}>
                      {BiFilter('PUNISH_TYPE_LIST').map(item => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                    </BISelect>,
                  )}
                </Form.Item> &nbsp;
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('qualityValue', {
                    initialValue: qualityValue || undefined, rules: [{
                      validator(rule, value, callback) {
                        if (isNaN(value)) {
                          callback({ message: '请输入合法数据' });
                        } else {
                          callback();
                        }
                      },
                    }],
                  })(<BIInput placeholder="处罚力度" addonAfter={'元'}/>)}
                </Form.Item>
              </BoxItem>
            </div>
            {this.renderAttachedPersonList(attachedPersonList, attachedRoleList, false)}
          </Box>
          {/*第四部分*/}
          <Box title="违规详情">
            <div className={styles.formRow}>
              <BoxItem label="附件" oneRow>
                <div style={{ width: 300, display: 'inline-block' }}>{this.renderUpload()}</div>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="违规详情" required oneRow>
                <Form.Item className={styles.textArea}>
                  {getFieldDecorator('desc', {
                    initialValue: desc, rules: [{ required: true, message: '请输入违规详情' }],
                  })(<TextArea maxLength={1000} rows="4" placeholder="请输入违规详情"/>)}
                </Form.Item>
              </BoxItem>
            </div>
          </Box>
        </Form>
      );
    };

  },
);


export default BaseForm;

