import React from 'react';
import { Input, Select, Form } from 'antd';
import Box from './box';
import BoxItem from './boxItem';
import styles from './form.less';

const { Option } = Select;

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

    render() {
      const { form, params } = this.props;
      const {
        orderId,
        id,
      } = params;

      const { getFieldDecorator } = form;
      return (
        <Form className="baseForm"  onSubmit={this.handleSubmit}>
          {/*非编辑字段*/}
          <Form.Item style={{ display: 'none' }}>
            {getFieldDecorator('id', {
              initialValue: id,
            })(<Input disabled/>)}
          </Form.Item>
          {/*第一部分*/}
          <Box title="质检归属人信息">
            <div className={styles.formRow}>
              <BoxItem label="邮箱" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input/>)}
                </Form.Item>
              </BoxItem>
              <BoxItem label="角色" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="姓名" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
              <BoxItem label="组织架构" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
            </div>
          </Box>
          {/*第二部分*/}
          <Box title="子订单信息">
            <Form.Item style={{ display: 'none' }}>
              {getFieldDecorator('id', {
                initialValue: id,
              })(<Input disabled style={{ width: 230, marginRight: '6px' }}/>)}
            </Form.Item>
            <span className={styles.left}>子订单ID:</span>
            <Form.Item>
              {getFieldDecorator('orderId', {
                initialValue: orderId,
              })(<Input disabled style={{ width: 230, marginRight: '6px' }}/>)}
            </Form.Item>
          </Box>
          {/*第三部分*/}
          <Box title="违规基础信息">
            <div className={styles.formRow}>
              <BoxItem label="违规日期" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="扣分日期" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="直接类型" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
              <BoxItem label="学院类型" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="分维" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.formRow}>
              <BoxItem label="违规分类" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
              <BoxItem label="违规等级" required>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </BoxItem>
            </div>
            <div className={styles.line} />
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
              <BoxItem label="连带责任人处罚"  oneRow>
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
              <BoxItem label="附件"  oneRow>
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


// class EditModal extends Component {
//   onMailChange = mail => {
//     this.props.onMailChange(mail);
//   };
//   handleCancel = () => {
//     this.props.onCancel();
//   };
//   handleCreate = val => {
//     this.props.onSubmit(val);
//   };
//
//   saveFormRef = formRef => {
//     this.formRef = formRef;
//   };
//
//   render() {
//     const {
//       editData = {},
//       visible = false,
//       confirmLoading = false,
//       orgList = [],
//       mailName,
//     } = this.props;
//     const params = {
//       orderId: editData.orderId || '未获取到',
//       stuId: editData.stuId || '未获取到',
//       collegeId: editData.collegeId || undefined,
//       familyId: editData.familyId || undefined,
//       groupId: editData.groupId || undefined,
//       teacherName: editData.teacherName || undefined,
//       recommendedTeacher: editData.recommendedTeacher || undefined,
//       logicJudge: editData.logicJudge,
//       replayLecturesTime: editData.replayLecturesTime,
//       liveLecturesTime: editData.liveLecturesTime,
//       engageType: editData.engageType,
//       recommendType: editData.recommendType,
//       id: editData.id,
//       competitionRatio:
//         editData.competitionRatio === null ||
//         editData.competitionRatio === undefined ||
//         editData.competitionRatio === ''
//           ? 100
//           : editData.competitionRatio,
//     };
//     return (
//       <CollectionCreateForm
//         visible={visible}
//         confirmLoading={confirmLoading}
//         title="编辑创收订单信息"
//         orgList={orgList}
//         params={params}
//         mailName={mailName}
//         onCancel={this.handleCancel}
//         onCreate={this.handleCreate}
//         onMailChange={mail => this.onMailChange(mail)}
//         wrappedComponentRef={this.saveFormRef}
//       />
//     );
//   }
// }
//
// export default EditModal;
