import React from 'react';
import { connect } from 'dva';
import { uploadFile } from './services';
import BIButton from '@/ant_components/BIButton';
import StepLayout from './component/stepLayout';
import StepUpload from './component/stepUpload';
import StepInput from './component/stepInput';
import StepSucess from './component/stepSucess';
import BIModal from '@/ant_components/BIModal';
import PageHead from '@/components/PageHead/pageHead';
import styles from './style.less';

@connect(({ userGroupAdd }) => ({
  userGroupAdd
}))

class userGroupAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      userGroupName: '',
      isDisabled: true,
      params: {}
    }
  }
  componentDidMount() {
    this.editCurrent(0);
  }

  componentWillUnmount() {
    // this.initParamsFn(null);
    // 点击添加的时候清除文件
    this.saveFileList([]);
  }
  onChildChange = (bol, checkParams) => {
    if (checkParams) {
      this.setState({
        isDisabled: bol,
        checkParams,
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
  // 校验excel文件
  fetchCheckData = () => {
    this.props.dispatch({
      type: 'userGroupAdd/selectFile',
      payload: { params: this.state.params },
    });
  };
  // 保存excel数据
  saveExcelData = params => {
    this.props.dispatch({
      type: 'userGroupAdd/saveExcel',
      payload: { params },
    });
  };

  saveFileList = fileList => {
    this.props.dispatch({
      type: 'userGroupAdd/saveFileList',
      payload: { fileList },
    });
  };
  editCurrent = current => {
    this.props.dispatch({
      type: 'userGroupAdd/editCurrent',
      payload: { current },
    });
  };
  editLoading = isLoading => {
    this.props.dispatch({
      type: 'userGroupAdd/editLoading',
      payload: { isLoading },
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
    let checkResult = this.props.userGroupAdd.checkResult;
    let params = {
      uniqueKey: this.state.params.uniqueKey
    }
    this.editLoading(false)
    if (checkResult.successCount >= 0) {
      this.props.dispatch({
        type: 'userGroupAdd/checkFile',
        payload: { params: params },
      });
      this.setState({
        visible: false
      })
    }
  };


  render() {
    const { isDisabled } = this.state;
    const { current, checkList, fileList, disableDel, checkResult, isLoading } = this.props.userGroupAdd;
    const notice = <div>
      <p>正在创建用户组，预计需要<span style={{ color: "#52C9C2" }}>5-10</span>分钟。</p>
      <p>请在用户运营页查看最新的更新状态。</p>
    </div>
    const groupName = this.state.params.groupName
    const uniqueKey = this.state.params.uniqueKey
    const steps = [
      {
        title: '选择Excel',
        content: (
          <StepUpload
            uploadUrl={uploadFile()}
            fileList={fileList}
            getParams={param => {
              this.getParams(param);
            }}
            groupName={groupName}
            uniqueKey={uniqueKey}
            callBackParent={(bol, params) => {
              this.onChildChange(bol, params);
            }}
            saveFileList={param => {
              this.saveFileList(param);
            }}
          />
        ),
      },
      {
        title: '校验文件',
        content: (
          <StepInput
            inputInfo={checkResult}
            inputTitle="搜索失败的编号："
            inputContent="true"
            inputTip="true" />
        ),
      },
      {
        title: '操作成功',
        content: (
          <StepSucess tipSucess={notice} />
        ),
      },

    ];
    const routerData = { name: "创建用户组", bread: { name: "用户运营", path: "/ko/userOperation" }, path: "/ko/userGroupAdd" }
    return (
      <>
        <PageHead routerData={routerData}></PageHead>
        <div className={styles.userGroup}>
          <div className={styles.headBar}>创建用户组</div>
          <StepLayout
            callBackParent={bol => {
              this.onChildChange(bol);
            }}
            step1Fetch={() => {
              this.fetchCheckData();
            }}
            step2Fetch={() => {
              this.fetchCheck();
            }}
            current={current}
            steps={steps}
            isLoading={isLoading}
            editLoading={loading => {
              this.editLoading(loading);
            }}
            editCurrent={param => {
              this.editCurrent(param);
            }}
            isDisabled={isDisabled}
            disableDel={false}
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
      </>
    );
  }
}

export default userGroupAdd;
