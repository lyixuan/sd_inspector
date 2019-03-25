import React from 'react';
import { connect } from 'dva';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import styles from './style.less';
import CommonForm from '../../components/commonForm';


@connect(({ loading }) => ({
  loading
}))

class EditQualityNewSheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
  componentDidMount() {

  }

  onSubmit = (params) => {
    console.log(params)
  }

  render() {
    return (
      <div className={styles.qualityContainter}>
        <div className={styles.title}>质检违规详情</div>

        {/* form区域 */}
        <CommonForm onSubmit={this.onSubmit} />

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

export default EditQualityNewSheet;
