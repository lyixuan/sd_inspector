import React from 'react';
import { connect } from 'dva';
import { message } from 'antd';
import BIButton from '@/ant_components/BIButton';
import StepLayout from '../userGroupAdd/component/stepLayout';
import StepInput from '../userGroupAdd/component/stepInput';
import StepSucess from '../userGroupAdd/component/stepSucess';
import StepEdit from '../userGroupAdd/component/stepEdit1';
import BIModal from '@/ant_components/BIModal';
import PageHead from '@/components/PageHead/pageHead';
import styles from '../userGroupAdd/style.less';

@connect(({ userGroupAdd, userGroupEdit }) => ({
  userGroupAdd,
  userGroupEdit
}))
class userGroupEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userGroupName: '',
      isDisabled: true,
      params: {},
      deleteData: true
    }
  }
  componentDidMount() {
    // init current
    this.editCurrent(0);
  }
  // 离开页面的时候，把disableDel，nums恢复默认值null
  componentWillUnmount() {
    this.initParamsFn(null, 'clear');
  }
  // 初始化一些值
  initParamsFn = (disableDel, nums) => {
    return;
    const num = !nums ? this.props.quality.nums : '';
    this.props.dispatch({
      type: 'userGroupEdit/initParams',
      payload: { disableDel, nums: num },
    });
  };
  // 回调
  onChildChange = (bol, checkParams) => {
    if (bol) {
      this.setState({
        isDisabled: bol
      });
    } else {
      this.setState({
        isDisabled: bol,
      });
    }
  };
  getParams = params => {
    this.setState({
      params: params
    })
  };
  fetchPreDel = () => {
    console.log(45, this.state.params)
    if (this.state.params.userIdStr.split(" ").length > 1000) {
      message.warning('不能超过1000个id');
      this.editLoading(false)
      return;
    }
    this.setState({
      deleteData: this.state.params.updateType == 1 ? true : false
    })
    this.props.dispatch({
      type: 'userGroupEdit/userGroupInput',
      payload: { params: this.state.params },
    });
  };
  fetchCheck = () => {
    this.showPop();
    this.editLoading(false)
  };
  showPop = () => {
    this.setState({
      visible: true
    })
  }
  handleCancel = () => {
    this.setState({
      visible: false
    })
  }
  handleOk = () => {
    let checkResult = this.props.userGroupEdit.checkResult
    let params = {
      uniqueKey: checkResult.uniqueKey
    }
    this.editLoading(false)
    if (checkResult.checkResult.successCount > 0) {
      this.props.dispatch({
        type: 'userGroupEdit/userGroupCheck',
        payload: { params: params },
      });
      this.setState({
        visible: false
      })
    }
  };
  editCurrent = current => {
    this.props.dispatch({
      type: 'userGroupEdit/editCurrent',
      payload: { current },
    });
  };
  editLoading = isLoading => {
    console.log(61, isLoading);
    this.props.dispatch({
      type: 'userGroupEdit/editLoading',
      payload: { isLoading },
    });
  };
  onChildChange = bol => {
    this.setState({
      isDisabled: bol,
    });
  };



  render() {
    const { isDisabled } = this.state;
    const { current, checkResult, isLoading } = this.props.userGroupEdit;
    const data = checkResult ? checkResult.checkResult : null;
    const failNums = data ? data.failList : [];

    // console.log(115, checkResult.checkResult.failList)
    let notice = null
    if (this.state.deleteData) {
      notice = <div>
        <p>正在删除数据，预计需要<span style={{ color: "#52C9C2" }}>5-10</span>分钟。</p>
        <p>请在用户运营页查看最新的更新状态。</p>
      </div>
    } else {
      notice = <div>
        <p>正在添加数据，预计需要<span style={{ color: "#52C9C2" }}>5-10</span>分钟。</p>
        <p>请在用户运营页查看最新的更新状态。</p>
      </div>

    }
    const steps = [
      {
        title: '输入编号',
        content: (
          <StepEdit
            queryParam={this.props.location.query}
            getParams={param => {
              this.getParams(param);
            }}
            callBackParent={(bol, params) => {
              this.onChildChange(bol, params);
            }}
            updateType={this.state.params.updateType}
            faileData={failNums}
          />
        ),
      },
      {
        title: '校验编号',
        content: (
          <StepInput
            inputTitle="搜索失败的编号："
            inputContent="true"
            inputTip="true"
            inputInfo={checkResult}
            callBackParent={bol => {
              this.onChildChange(bol);
            }}
          />
        ),
      },
      {
        title: '操作成功',
        content: (
          <StepSucess isDelImg={this.state.deleteData} tipSucess={notice} />
        ),
      },

    ];
    const routerData = { name: "编辑用户组", bread: { name: "用户运营", path: "/koUserOperation/userOperation" }, path: "/koUserOperation/userGroupAdd" }
    return (
      <div style={{ marginTop: '-28px' }}>
        <PageHead routerData={routerData}></PageHead>
        <div className={styles.userGroup}>
          <div className={styles.headBar}>编辑用户组</div>
          <StepLayout
            step1Fetch={() => {
              this.fetchPreDel();
            }}
            step2Fetch={() => {
              this.fetchCheck();
            }}
            current={current}
            isLoading={isLoading}
            steps={steps}
            isDisabled={isDisabled}
            disableDel={false}
            initParamsFn={dis => {
              this.initParamsFn(dis);
            }}
            callBackParent={bol => {
              this.onChildChange(bol);
            }}
            editLoading={loading => {
              this.editLoading(loading);
            }}
            editCurrent={param => {
              this.editCurrent(param);
            }}
          />
          <BIModal
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <BIButton key="back" style={{ marginRight: 10 }} onClick={this.handleCancel}>
                取消
            </BIButton>,
              <BIButton key="submit" type="primary" onClick={this.handleOk}>
                确定
            </BIButton>,
            ]}>
            <div className={styles.modalWrap}>
              <p>是否确定更新用户组？</p>

            </div>
          </BIModal>
        </div>
      </div>
    );
  }
}

export default userGroupEdit;
