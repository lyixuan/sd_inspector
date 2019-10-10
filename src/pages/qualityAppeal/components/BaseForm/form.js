import React from 'react';
import {Input, Form ,message} from 'antd';
import { BiFilter } from '@/utils/utils';
import BIButton from '@/ant_components/BIButton';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BICascader from '@/ant_components/BICascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import Box from './box';
import BoxItem from './boxItem';
import SubOrder from './subOrder';
import styles from './form.less';
import moment from 'moment/moment';

const { Option } = BISelect;

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
    onMailChange = e => {
      const mail = e.currentTarget.value ? e.currentTarget.value : null;
      this.props.onMailChange(mail);
    };

    onFormChange=(val) =>{
      console.log(val)
    };

    getSubOrderDetail = () => {
      const orderNum = this.props.form.getFieldValue('orderNum');
      if (!orderNum) {
        message.error('请输入子订单编号');
        return
      }
      this.props.getSubOrderDetail(orderNum);
    };
    disabledDate = current => {
      return current && current > moment().endOf('day');
    };

    chooseDimensionList = () => {
      const { dimensionList1, dimensionList2 } = this.props;
      const qualityType = this.props.form.getFieldValue('qualityType');
      return qualityType === 1 ? dimensionList1 : qualityType === 2 ? dimensionList2 : [];
    };
    changeDimension = (dimensionId) => {
      const qualityType = this.props.form.getFieldValue('qualityType');
      if (!qualityType || !dimensionId) return;
      if (this.props.changeDimension) {
        this.props.changeDimension(dimensionId,qualityType);
      }
    };
    getDimensionTreeList = () => {
      const { dimensionTreeList = [] } = this.props;
      const params = this.props.form.getFieldsValue();
      const { qualityType, dimensionId } = params || {};
      return qualityType && dimensionId ? dimensionTreeList[0] ? dimensionTreeList[0].children : [] : [];
    };
    onChangedimensionTree = (value, objArr) => {
      console.log(value)
      let violationLevelObj = objArr.slice(-1);
      violationLevelObj = violationLevelObj.length > 0 ? violationLevelObj[0] : {};
      console.log(1,violationLevelObj)
      // if (this.props.onChangedimensionTree) {
      //   this.props.onChangedimensionTree({
      //     violationLevelObj, dimension: value,
      //   });
      // }
    };
    render() {
      const { form, params,orgList,orderNumLoading,orderNumData={} } = this.props;
      const { mail, role, name, organize, orderNum, orderId, violationDate, reduceScoreDate,qualityType,familyType,
        dimensionId,dimension,violationLevel,id } = params||{};
      const { getFieldDecorator } = form;

      const dimensionList = this.chooseDimensionList();
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
                          loading={this.props.mailDataLoading}>查询</BIButton>
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
                    initialValue: name,rules: [{ required: true, message: '请输入归属人' }],
                  })(<BIInput placeholder="请输入" />)}
                </Form.Item>
              </BoxItem>
              <BoxItem label="组织架构" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('organize', {
                    initialValue: organize,rules: [{ required: true, message: '请选择归属组织' }],
                  })(<BICascader placeholder='请选择' changeOnSelect options={orgList}
                      fieldNames={{ label: 'name', value: 'id', children: 'nodeList' }}
                      onChange={(val)=>this.onFormChange(val,'videoTypeId')}
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
                })(<BIInput allowClear placeholder="请输入" />)}
              </Form.Item>&nbsp;&nbsp;
              <BIButton type="primary" size="default" onClick={this.getSubOrderDetail}
                        loading={orderNumLoading}>查询</BIButton>
            </BoxItem>
          </div>
          {orderNumData&&<Box title="子订单信息">
            <SubOrder orderNumData={orderNumData}/>
          </Box>}

          {/*第三部分*/}
          <Box title="违规基础信息">
            <div className={styles.formRow}>
              <BoxItem label="违规日期" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('violationDate', {
                    initialValue: violationDate,rules: [{ required: true, message: '请选择违规日期' }],
                  })(<BIDatePicker style={{ width: 230 }} disabledDate={this.disabledDate} format="YYYY-MM-DD"/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="扣分日期" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('reduceScoreDate', {
                    initialValue: reduceScoreDate,rules: [{ required: true, message: '请选择扣分日期' }],
                  })(<BIDatePicker style={{ width: 230 }} format="YYYY-MM-DD"/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="质检类型" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('qualityType', {
                    initialValue: qualityType,rules: [{ required: true, message: '请选择质检类型' }],
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
                    initialValue: familyType,rules: [{ required: true, message: '请选择学院类型' }],
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
                    initialValue: dimensionId||undefined,rules: [{ required: true, message: '请选择分维' }],
                  })(<BISelect allowClear placeholder="请选择" notFoundContent="请选择质检类型" onChange={this.changeDimension}>
                    {dimensionList.map(item => (
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
                    initialValue: dimension||undefined,rules: [{ required: true, message: '请选择违规分类' }],
                  })(<BICascader placeholder="请选择" options={this.getDimensionTreeList()}
                    fieldNames={{ label: 'title', value: 'key', children: 'children' }}
                    displayRender={label => label[label.length - 1]}
                                 onChange={this.onChangedimensionTree}
                  />)}
                </Form.Item>
              </BoxItem>
              <BoxItem label="违规等级" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('violationLevel', {
                    initialValue: violationLevel||undefined,rules: [{ required: true, message: '请选择违规等级' }],
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
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="连带责任人处罚" oneRow>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
            </div>
          </Box>
          {/*第四部分*/}
          <Box title="违规基础信息">
            <div className={styles.formRow}>
              <BoxItem label="附件" oneRow>
                <div></div>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="违规详情" required oneRow>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
            </div>
          </Box>
        </Form>
      );
    }
  },
);


export default BaseForm;

