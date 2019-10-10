import React from 'react';
import { Input, Select, Form } from 'antd';
import Box from './box';
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
            })(<Input disabled style={{ width: 230, marginRight: '6px' }}/>)}
          </Form.Item>
          {/*第一部分*/}
          <Box title="质检归属人信息">
            <div className={styles.formRow}>
              <div className={styles.formColLeft}>
                *<span className={styles.formLabel}>邮箱</span>：
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </div>
              <div className={styles.formColRight}>
                *<span className={styles.formLabel}>角色</span>：
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={styles.formColLeft}>
                <span className={styles.formLabel}>邮箱：</span>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </div>
              <div className={styles.formColRight}>
                <span className={styles.formLabel}>角色：</span>
                <Form.Item className={styles.formItem}>
                  {getFieldDecorator('orderId', {
                    initialValue: orderId,
                  })(<Input style={{ width: 230, marginRight: '6px' }}/>)}
                </Form.Item>
              </div>
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
