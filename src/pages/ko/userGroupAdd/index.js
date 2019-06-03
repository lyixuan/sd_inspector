import React from 'react';
import { connect } from 'dva';
import { uploadFile } from './services';
import BIButton from '@/ant_components/BIButton';
import StepLayout from './component/stepLayout';
import StepUpload from './component/stepUpload';
import StepInput from './component/stepInput';
import StepSucess from './component/stepSucess';
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
    // console.log(47, this.state.params);
    // return;
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
    console.log(isLoading);
    this.props.dispatch({
      type: 'userGroupAdd/editLoading',
      payload: { isLoading },
    });
  };


  render() {
    const { isDisabled } = this.state;
    const { current, checkList, fileList, disableDel, isLoading } = this.props.userGroupAdd;
    const notice = <div>
      <p>正在创建用户组，预计需要<span style={{ color: "#52C9C2" }}>5-10</span>分钟。</p>
      <p>请在用户运营页查看最新的更新状态。</p>
    </div>
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

    return (
      <div className={styles.userGroup}>
        <div className={styles.headBar}>创建用户组</div>
        <StepLayout
          callBackParent={bol => {
            this.onChildChange(bol);
          }}
          step1Fetch={() => {
            this.fetchCheckData();
          }}
          current={current}
          steps={steps}
          editLoading={loading => {
            this.editLoading(loading);
          }}
          isLoading={isLoading}
          isDisabled={isDisabled}
          disableDel={false}
        />
      </div>

    );
  }
}

export default userGroupAdd;
