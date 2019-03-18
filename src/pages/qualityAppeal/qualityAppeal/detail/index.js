import React from 'react';
import styles from './style.less';
import { connect } from 'dva';
import AppealInfo from './../component/appealInfo';
import SOPCheckResult from './../component/sopCheckResult';
import SuperiorCheck from './../component/superiorCheck';
import PersonInfo from './../../qualityNewSheet/detail/components/personInfo';
// import IllegalInfo from './components/illegalInfo';
// import CheckInfo from './components/checkInfo';
import { Form, Icon, Row, Col, TreeSelect, Input, Upload, message } from 'antd';
import BIButton from '@/ant_components/BIButton';

class AppealDetail extends React.Component {
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
      },
    };
  }
  render() {
    return (
      <div className={styles.detailContainer}>
        <section>
          {/* 质检违规人员信息 */}
          <PersonInfo data={this.state.qualityData} />
        </section>
        <section>
          <AppealInfo data={this.state.qualityData} />
        </section>
        <section>
          <SOPCheckResult data={this.state.qualityData.sopCheckDetail} />
        </section>
        <section>
          <SuperiorCheck data={this.state.qualityData.sopCheckDetail} />
        </section>
        <section style={{ textAlign: "right" }}>
          <BIButton>返回</BIButton>
        </section>
      </div>
    );
  }
}

export default AppealDetail;
