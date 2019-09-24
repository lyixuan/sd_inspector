import React from 'react';
import { connect } from 'dva';
import BITable from '@/ant_components/BITable';
import creditImg from '@/assets/xdcredit/credit.gif'
import styles from './style.less';
import {
  pathImUrl,
  getSubStringValue,
  linkRoute, linkImgRouteBul,
} from '@/pages/ko/utils/utils';
import avatarTeacher from '@/assets/avatarTeacher.png';
import avatarStudent from '@/assets/avatarStudent.png';



function Layout(props) {
  const layout = <section>
    <ul className={styles.behavior}>
      {props.dataMark.contentList.map((item, index) => <ListItem item={item} dataMark={props.dataMark} key={index} />)}
    </ul>
  </section>;
  return layout;
}

//对话区域行
function ListItem(props) {
  if (!props.item) {
    return null;
  } else {
    return <TeacherOrStudent {...props} />;
  }
}

// 判断是老师还是学员
function TeacherOrStudent(props) {
  console.log(36, props)
  if (props.item.type == 1) {
    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.time ? props.item.time : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot} />
          </div>
          <div className={styles.chatLeft}>
            <div className={styles.avatar}>
              <img src={props.dataMark.stuHeadUrl ? (pathImUrl + props.dataMark.stuHeadUrl) : avatarStudent} />
              <p>{getSubStringValue(props.dataMark.stuName, 3)}</p>
            </div>
            <div className={linkImgRouteBul(props.item.content) ? styles.chatContentImg : styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {/*{props.item.content}*/}
              <span dangerouslySetInnerHTML={{ __html: linkRoute(props.item.content, styles.linkRoute) }}></span>
            </div>
          </div>
        </div>
      </li>
    );
  } else {
    return (
      <li className={styles.step}>
        <div className={styles.time}>
          {props.item.time ? props.item.time : ''}
        </div>
        <div className={styles.content}>
          <div className={styles.bigDot}>
            <span className={styles.dot} />
          </div>
          <div className={styles.chatRight}>
            <div className={linkImgRouteBul(props.item.content) ? styles.chatContentImg : styles.chatContent}>
              <span className={styles.triangle}>
                <em />
              </span>
              {/*{props.item.content}*/}
              <span dangerouslySetInnerHTML={{ __html: linkRoute(props.item.content, styles.linkRoute) }}></span>
            </div>
            <div className={styles.avatar}>
              <img src={props.dataMark.teacherHeadUrl ? (pathImUrl + props.dataMark.teacherHeadUrl) : avatarTeacher} />
              <p>{getSubStringValue(props.dataMark.teacherName, 3)}</p>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
const datas = {
  contentList: [{
    appletFlag: false,
    time: "2019-09-10 10:36:31",
    id: null,
    imageUrl: "http://static.sunlands.com/user_center/newUserImagePath/1904764/1904764.jpg",
    message: "http://wx.sunlands.com/bonus/indexPage",
    userId: null,
    userName: null,
    type: 1
  },
  {
    appletFlag: false,
    time: "2019-09-10 10:36:39",
    id: null,
    imageUrl: "http://static.sunlands.com/user_center/newUserImagePath/1904764/1904764.jpg",
    message: "[咖啡]",
    userId: null,
    userName: "袁延锋",
    type: 2
  }]
}





@connect(({ loading }) => ({
  loading: loading.effects['xdCreditModal/getDimensionDetail'],
}))
class CreditDetials extends React.Component {
  columns = () => {
    const { detailsData } = this.props;
    const columns = [
      {
        title: '序号',
        dataIndex: 'numOrder',
        key: 'numOrder',
        render: (text, r, i) => i + 1
      }, {
        title: detailsData.titleOne,
        dataIndex: 'valOne',
        key: 'valOne',
      }, {
        title: detailsData.titleTwo,
        dataIndex: 'valTwo',
        key: 'valTwo',
      }, {
        title: detailsData.titleThree,
        dataIndex: 'valThree',
        key: 'valThree',
      }, {
        title: detailsData.titleFour,
        dataIndex: 'valFour',
        key: 'valFour',
        render: (text, r, i) => {
          console.log(147, text, r)
        }
      },
    ];
    // if (detailsData.status === 1) {
    //   columns.push({
    //     title: '操作',
    //     dataIndex: 'action',
    //     key: 'action',
    //     render: () => 1
    //   })
    // }
    return columns || [];
  };
  setRowClassName = (r, c, b) => {
    if (this.props.dementionId === r.id) {
      return styles.selectedRow;
    } else if (r.level === 4 && r.num) {
      return styles.clickRow;
    }
    return styles['rowBg' + b]
  }
  onChangeSize = (currentPage) => {
    const { onPageChange } = this.props;
    if (onPageChange) {
      onPageChange(currentPage);
    }
  };

  render() {
    const { dementionId, detailsData, pageSize = 10, currentPage } = this.props;
    const dataSource = detailsData.data || [];
    const totalCount = detailsData.total || 0;
    return (
      <div className={`${styles.detials} ${dementionId ? '' : styles.noneData}`}>
        {
          dementionId ? <BITable
            columns={this.columns()}
            dataSource={dataSource}
            rowClassName={this.setRowClassName}
            pagination={{
              onChange: this.onChangeSize,
              defaultPageSize: pageSize,
              current: currentPage,
              total: totalCount,
              showQuickJumper: true,
            }}
            rowKey={(record, index) => record.id + '' + index}
            loading={this.props.loading}
            smalled={true}
          /> : <img src={creditImg} alt='权限' />
        }
        {/* <Layout dataMark={datas}></Layout> */}
      </div>
    );
  }
}

export default CreditDetials;
