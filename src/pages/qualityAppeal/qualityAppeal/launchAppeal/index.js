import React from 'react';
import styles from './style.less';
import { Row, Col, Input } from 'antd';
import BIButton from '@/ant_components/BIButton';
import SubOrderDetail from './../../components/subOrderDetail';
import PersonInfo from './../../qualityNewSheet/detail/components/personInfo';
import IllegalInfo from './../../qualityNewSheet/detail/components/illegalInfo';
import { connect } from 'dva';
const { TextArea } = Input;
class Launch extends React.Component {
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
        qualityAudit: [
          {
            id: 1,
            checkResult: '已通过',
            verifyDate: '2019年02月01日 21：22：30',
            firstAppealEndDate: '2019年02月01日',
            secondAppealEndDate: '2019年02月01日',
            Desc:
              '违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述',
          },
          {
            id: 2,
            checkResult: '已通过',
            verifyDate: '2019年02月01日 21：22：30',
            firstAppealEndDate: '2019年02月01日',
            secondAppealEndDate: '2019年02月01日',
            Desc:
              '违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述违规描述',
          },
        ],
      },
    };
  }
  render() {
    return (
      <div className={styles.launchContainer}>
        <section>
          {/* 质检违规人员信息 */}
          <PersonInfo data={this.state.qualityData} />
        </section>
        <section>
          <div className={styles.subOrderNum}>子订单编号：{this.state.qualityData.orderNum}</div>
          <SubOrderDetail data={this.state.qualityData.orderDetail} />
        </section>
        <section>
          {/* 质检违规详情 */}
          <section>{/* 质检审核 */}</section>
          <div className={styles.divideLine} />
          <IllegalInfo data={this.state.qualityData} />
        </section>
        <div className={styles.info}>
          <div className={styles.title}>申诉信息</div>
          <div>
            <div class={styles.appealInfo}>
              一次申诉<span>一次申诉截止日期：3939393</span>
            </div>
            <div class={styles.originator}>
              申诉发起人
            </div>
            <div className={styles.flexStyle}>
              <div className={styles.label}>附件:</div>
              <div className={styles.intro}>附件1</div>
            </div>
            <div className={styles.flexStyle}>
              <div className={styles.label}>申诉说明:</div>
              <div className={styles.intro}>
                <TextArea rows={4} value="郭老师" />
              </div>
            </div>


          </div>
        </div>

        <Row className="gutter-row">
          <Col span={24}>
            <div className={styles.gutterBox1}>
              <span className={styles.gutterBtn2}>
                <BIButton>取消</BIButton>
              </span>
              <span className={styles.gutterBtn1}>
                <BIButton type="primary" htmlType="submit">提交申诉</BIButton>
              </span>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Launch;
