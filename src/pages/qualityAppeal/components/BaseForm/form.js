import React from 'react';
import { Input, Form, message, Upload,Icon } from 'antd';
import { BiFilter, msgF } from '@/utils/utils';
import BIButton from '@/ant_components/BIButton';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BICascader from '@/ant_components/BICascader';
import BIDatePicker from '@/ant_components/BIDatePicker';
import { uploadAttachment } from '@/pages/qualityAppeal/services';
import BIModal from '@/ant_components/BIModal';
import Box from './box';
import BoxItem from './boxItem';
import SubOrder from './subOrder';
import styles from './form.less';
import moment from 'moment/moment';
import router from 'umi/router';
import { STATIC_HOST } from '@/utils/constants';

const { Option } = BISelect;
const { TextArea } = Input;
const confirm = BIModal.confirm;
let isZip = false;
let isLt10M = false;

const BaseForm = Form.create({ name: 'base_form' })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showMore: false,
        fileList:props.params.attUrl ?[{
          uid: '-1',
          name:  props.params.attUrl.split('/')[3],
          status: 'done',
          url: `${STATIC_HOST}/${props.params.attUrl}`,
        }]:[],
        attUrl:'',
      };
    }

    UNSAFE_componentWillReceiveProps(next) {
      const newAttUrl = next.params.attUrl;
      const oldAttUrl = this.props.params.attUrl;
      if (newAttUrl && newAttUrl !== oldAttUrl) {
        this.setState({
          fileList: [{
            uid: '-1',
            name: newAttUrl.split('/')[3],
            status: 'done',
            url: `${STATIC_HOST}/${newAttUrl}`,
          }]
        })
      }
    }

    getOrgMapByMail = () => {
      this.props.getOrgMapByMail(this.props.form.getFieldValue('mail'),this.props.form);
    };

    getSubOrderDetail = () => {
      this.props.getSubOrderDetail(this.props.form.getFieldValue('orderNum'));
    };

    dimensionIdList = () => {
      const { dimensionList1, dimensionList2 } = this.props;
      return dimensionList1.concat(dimensionList2)
      // const qualityType = this.props.form.getFieldValue('qualityType');
      // return qualityType === 1 ? dimensionList1 : qualityType === 2 ? dimensionList2 : [];
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
      const role = this.props.form.getFieldValue('role');
      this.props.changeDimensionTree({ qualityType, role, form:this.props.form,...violationLevelObj });
    };

    onChangeViolationLevel = (value) => {
      this.props.changeViolationLevel(value,this.props.form);
    };

    attachedRoleList = () => {
      const qualityType = this.props.form.getFieldValue('qualityType');
      let listRole = [];
      if (qualityType === 1) {// 客诉
        listRole = [{ id: 'cssupervisor', name: '客诉主管' }, { id: 'csleader', name: '客诉组长' }];
      } else if(qualityType===2){
        listRole = [{ id: 'family', name: '家族长' }, { id: 'group', name: '运营长' }];
      }
      return listRole;
    };

    changeShowMore = () => {
      this.setState({
        showMore: !this.state.showMore,
      });
    };

    renderAttachedPersonList = (attachedPersonListSrc, attachedRoleList,showMore) => {
      const { form } = this.props;
      const { getFieldDecorator } = this.props.form;
      const count = showMore||attachedPersonListSrc.length>2 ? 4 : 2;
      const attachedPersonList = [{},{},{},{}];
      attachedPersonListSrc.forEach((v,i)=>{
        attachedPersonList[i] = v;
      });
      const children = [];
      for (let i = 0; i < attachedPersonList.length; i++) {
        children.push(
          <div className={styles.formRow} style={{ display: i < count ? 'block' : 'none' }} key={i}>
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
                {getFieldDecorator(`qualityValue-${i}`, {
                  initialValue: attachedPersonList[i].qualityValue || undefined,
                  rules: [{
                    validator(rule, value, callback) {
                      if (value&&isNaN(value)) {
                        callback({ message: '请输入合法数据' });
                      } else {
                        callback();
                      }
                    },
                  }],
                })(<BIInput placeholder="处罚力度" allowClear  addonAfter={form.getFieldValue(`punishType-${i}`)?form.getFieldValue(`punishType-${i}`)===2?'分':'元':'--'}/>)}
              </Form.Item>
            </BoxItem>
          </div>
        );
      }
      return children;
    };

    renderUpload = () => {
      return (
        <Upload
          {...uploadAttachment()}
          fileList={this.state.fileList}
          data={{ type: 1 }}
          onChange={this.uploadChange}
          beforeUpload={this.beforeUpload}
        >
          <BIButton type="primary"><Icon type="upload" />上传附件</BIButton>
          <span style={{ color: '#aaa', fontSize: 12 }}>（请上传10M以内的rar、zip格式文件）</span>
        </Upload>
      );
    };

    render() {
      const { form, params, orgList, orderNumData = {} } = this.props;
      const {
        mail, role, name, organize, orderNum, violationDate, reduceScoreDate, qualityType, familyType,
        dimensionId, dimension, violationLevel, punishType, ownQualityValue, attachedPersonList = [], desc, id
      } = params || {};

      const { getFieldDecorator } = form;

      const dimensionIdList = this.dimensionIdList();
      const dimensionTreeList = this.dimensionTreeList();
      const attachedRoleList = this.attachedRoleList();

      const punishTypeUnit = form.getFieldValue('punishType');
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
                  })(<BISelect allowClear placeholder="请选择"
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
                    initialValue: dimension, rules: [{ required: true, message: '请选择违规分类' }],
                  })(<BICascader placeholder="请选择" options={dimensionTreeList}
                                 notFoundContent="先选择质检类型和分维"
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
                  })(<BISelect allowClear placeholder="请选择" onChange={this.onChangeViolationLevel}>
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
                  {getFieldDecorator('ownQualityValue', {
                    initialValue: ownQualityValue || undefined, rules: [{
                      validator(rule, value, callback) {
                        if (isNaN(value)) {
                          callback({ message: '请输入合法数据' });
                        } else {
                          callback();
                        }
                      },
                    }],
                  })(<BIInput placeholder="处罚力度" addonAfter={punishTypeUnit?punishTypeUnit===2?'分':'元':'--'}/>)}
                </Form.Item>
              </BoxItem>
            </div>
            {this.renderAttachedPersonList(attachedPersonList, attachedRoleList, this.state.showMore)}
            {this.state.showMore ? <span onClick={this.changeShowMore} className={styles.more}>&lt;&lt;收起更多</span>:
              <span onClick={this.changeShowMore} className={styles.more}>&gt;&gt;填写更多</span>}
          </Box>
          {/*第四部分*/}
          <Box title="违规详情">
            <div className={styles.formRow} style={{}}>
              <BoxItem label="附件" oneRow>
                <div style={{ width: 500,display:'inline-flex'}} >{this.renderUpload()}</div>
              </BoxItem>
            </div>
            <div className={styles.formRow} style={{marginTop:20}}>
              <BoxItem label="违规详情" required oneRow>
                <Form.Item className={styles.textArea}>
                  {getFieldDecorator('desc', {
                    initialValue: desc, rules: [{ required: true, message: '请输入违规详情' }],
                  })(<TextArea maxLength={1000} rows="4" placeholder="请输入违规详情"/>)}
                </Form.Item>
              </BoxItem>
            </div>
          </Box>
          <div style={{textAlign:'right'}}>
            <BIButton onClick={this.onCancel} >取消</BIButton> &nbsp;&nbsp;
            <BIButton type="primary" htmlType="submit">提交</BIButton>
          </div>
        </Form>
      );
    };

    onCancel = () => {
      const {backType} = this.props;
      const that = this;
      confirm({
        className: 'BIConfirm',
        title: '此操作将不保存已录入内容，是否确认？',
        cancelText: '取消',
        okText: '确认',
        onOk() {
          if(backType==="closeModal"){
            that.props.onCancel();
          } else {
            router.goBack();
          }
        },
        onCancel() {},
      });
    };

    handleSubmit = e => {
      const { fileList, attUrl } = this.state;
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.onSubmit({ ...values, ...{ attUrl: fileList.length > 0 ? attUrl : null } });
        }
      });
    };

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

    uploadChange = info => {
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
            this.setState({ fileList,attUrl });
          } else {
            this.setState({ fileList: [] });
            message.error(msgF(response.msg, response.msgDetail));
          }
        }
      }
    };

    disabledDate = current => {
      return current && current > moment().endOf('day');
    };
  },
);


export default BaseForm;

