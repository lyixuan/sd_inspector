import React from 'react';
import { Table, Spin } from 'antd';
import styles from './style.less';
import BIPagination from '@/ant_components/BIPagination';
import { connect } from 'dva/index';

@connect(({ workTableModel, loading }) => ({
  workList: workTableModel.workList,
  pageSize: workTableModel.pageSize,
  totalCount: workTableModel.totalCount,
  loading: loading.effects['workTableModel/getTableList'],
}))
class AiList extends React.Component {
  constructor(props) {
    super(props);
  }

  onChangeSize = (currentPage) => {
    const { onPageChange } = this.props;
    if (onPageChange) {
      onPageChange(currentPage);
    }
  };

  render() {
    const { pageSize, totalCount, currentPage, loading, workList, idList } = this.props;
    // const workList = [
    //   {id: 1, evaluate: '1111', content: '1111', idList: [], contentList: [{
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:25:43",
    //   "id": null,
    //   "message": "你们尚德有没有什么路杰老师？？",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:33:43",
    //   "id": null,
    //   "message": "怎么啦同学？",
    //   "userId": null,
    //   "userName": "田志萍",
    //   "userType": 2
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:33:51",
    //   "id": null,
    //   "message": "我退款哦",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:34:06",
    //   "id": null,
    //   "message": "你帮我申请一下啊",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:34:13",
    //   "id": null,
    //   "message": "嗯嗯，这个老师就是办理退款的",
    //   "userId": null,
    //   "userName": "田志萍",
    //   "userType": 2
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:34:14",
    //   "id": null,
    //   "message": "退学不想学了。",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:34:21",
    //   "id": null,
    //   "message": "已经帮同学对接了呢",
    //   "userId": null,
    //   "userName": "田志萍",
    //   "userType": 2
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:34:22",
    //   "id": null,
    //   "message": "哦",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:34:30",
    //   "id": null,
    //   "message": "他态度好恶劣",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:34:33",
    //   "id": null,
    //   "message": "wxid_34kk52bypznu22:0:0:7e5ea28f90fd1a70aa5e2a50b94fd8ab:<msg><emoji fromusername = \"wxid_34kk52bypznu22\" tousername = \"wxid_mjpygp3chkf022\" type=\"2\" idbuffer=\"media*#*0_0\" md5=\"7e5ea28f90fd1a70aa5e2a50b94fd8ab\" len = \"13897\" productid=\"com.tencent.xin.emoticon.person.stiker_1472479870eb4c0b01db7a3e5a\" androidmd5=\"7e5ea28f90fd1a70aa5e2a50b94fd8ab\" androidlen=\"13897\" s60v3md5 = \"7e5ea28f90fd1a70aa5e2a50b94fd8ab\" s60v3len=\"13897\" s60v5md5 = \"7e5ea28f90fd1a70aa5e2a50b94fd8ab\" s60v5len=\"13897\" cdnurl = \"http*#*//mmbiz.qpic.cn/mmemoticon/ajNVdqHZLLCmxPqI7fND1hK1Z5yw3AtEgCYWuUtEWT3gINRfRnviam2jdiaxB9njHY/0\" designerid = \"\" thumburl = \"http*#*//mmbiz.qpic.cn/mmemoticon/Q3auHgzwzM5llZ8F17rYSibOuJ3yRWeGRLicSYzJKmdvuQANFPhPofu7n37GPhNwqh/0\" encrypturl = \"http*#*//emoji.qpic.cn/wx_emoji/8otpJLyqA9BsafoQlZ8Y5OaP1Fm2HRKXuicEGu0xkDAPs3q60SrMrLw/\" aeskey= \"21104a3a70b3d52c8f3e4484419c2cb1\" externurl = \"http*#*//emoji.qpic.cn/wx_emoji/sGwYuqSSHOQveYzpWxGcUnE0knmZVfEc7Z7qKIbXAb3pEsLB6TaaT8ibtSjiauPkT3/\" externmd5 = \"1d47d31284d60453ecc824cbe3f277ab\" width= \"240\" height= \"240\" tpurl= \"\" tpauthkey= \"\" attachedtext= \"\" attachedtextcolor= \"\" lensid= \"\" ></emoji> </msg>:0\n",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:34:33",
    //   "id": null,
    //   "message": "wxid_34kk52bypznu22:0:0:c50a05cc9c1954883f213a7eca90d070:<msg><emoji fromusername = \"wxid_34kk52bypznu22\" tousername = \"wxid_mjpygp3chkf022\" type=\"2\" idbuffer=\"media*#*0_0\" md5=\"c50a05cc9c1954883f213a7eca90d070\" len = \"13932\" productid=\"com.tencent.xin.emoticon.person.stiker_1472479870eb4c0b01db7a3e5a\" androidmd5=\"c50a05cc9c1954883f213a7eca90d070\" androidlen=\"13932\" s60v3md5 = \"c50a05cc9c1954883f213a7eca90d070\" s60v3len=\"13932\" s60v5md5 = \"c50a05cc9c1954883f213a7eca90d070\" s60v5len=\"13932\" cdnurl = \"http*#*//mmbiz.qpic.cn/mmemoticon/ajNVdqHZLLDOlsGtttOfyPFkQsKc3s9XZibRgdIjwkOYibonPclgKOUCYnMN5wpgvM/0\" designerid = \"\" thumburl = \"http*#*//mmbiz.qpic.cn/mmemoticon/ajNVdqHZLLDOlsGtttOfyIhJ1fFXwFxG1KKicABuueWzZicb8zA9m5cmnOTicZVukbh/0\" encrypturl = \"http*#*//emoji.qpic.cn/wx_emoji/aoa4L6jvtvCO5CB9KRLtWHVkIcTicSyL2DIkc7nZetZzE96DzxdeGGw/\" aeskey= \"9eedfec92ed560b53a89ff501a1acd40\" externurl = \"http*#*//emoji.qpic.cn/wx_emoji/wnxLQOUGNgnfW1SSjktu3QGmlFWSF5lw64wWCnR5AYDNW8ic9AjPz2LpGYu3MnmPC/\" externmd5 = \"7087f5c92545ec7fdb649d8b3dc67c63\" width= \"240\" height= \"240\" tpurl= \"\" tpauthkey= \"\" attachedtext= \"\" attachedtextcolor= \"\" lensid= \"\" ></emoji> </msg>:0\n",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:34:42",
    //   "id": null,
    //   "message": "想打他的节奏",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:36:27",
    //   "id": null,
    //   "message": "同学这边路杰老师没有给你打过电话呢",
    //   "userId": null,
    //   "userName": "田志萍",
    //   "userType": 2
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:36:38",
    //   "id": null,
    //   "message": "没有哦",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:37:19",
    //   "id": null,
    //   "message": "你们尚德这边是不是不想退款哦",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:37:43",
    //   "id": null,
    //   "message": "嗯嗯，同学你这边在app上面联系一下班主任老师哈",
    //   "userId": null,
    //   "userName": "田志萍",
    //   "userType": 2
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:38:52",
    //   "id": null,
    //   "message": "恩",
    //   "userId": null,
    //   "userName": "刘记陈",
    //   "userType": 1
    // }, {
    //   "appletFlag": false,
    //   "consultTime": "2019-04-29 15:39:48",
    //   "id": null,
    //   "message": "嗯嗯",
    //   "userId": null,
    //   "userName": "田志萍",
    //   "userType": 2
    // }],},
    //   {id: 3, evaluate: 'pppppp', content: '帖子详情帖子详情帖子详情帖子详情帖子详情帖子详情帖子详情'},
    //   {id: 4, evaluate: 'pppppp', content: '1111'},
    //   {id: 5, evaluate: 'pppppp', content: '1111'},
    //   {id: 6, evaluate: 'pppppp', content: '1111'},
    //   {id: 7, evaluate: 'pppppp', content: '1111'},
    //   {id: 8, evaluate: 'pppppp', content: '1111'},
    // ]
    return (
      <div className={styles.tableContent}>
        <div className={styles.contentTop}>
          {this.props.children}
          <span className={styles.listTotal}>总数：{totalCount} 条</span>
        </div>
        <Spin spinning={loading}>
          <Table rowKey={record => record.id} columns={this.props.columnsData()} dataSource={workList}
            pagination={false} />
          <div className={styles.pagination}>
            <BIPagination
              showQuickJumper
              defaultPageSize={pageSize ? pageSize : 15}
              current={currentPage}
              onChange={this.onChangeSize}
              total={totalCount}
            />
          </div>
        </Spin>
      </div>
    );
  }
}

export default AiList;
