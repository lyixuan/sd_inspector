import React from 'react';
import { connect } from 'dva';
import { DeepCopy } from '@/utils/utils';
import Page from './component/page';
import BIModal from '@/ant_components/BIModal';
import BIInput from '@/ant_components/BIInput';
import BIRadio from '@/ant_components/BIRadio';
import BIButton from '@/ant_components/BIButton';
import styles from './style.less';
const confirm = BIModal.confirm;
function dealQuarys(pm) {
  const p = DeepCopy(pm);
  return p;
};

@connect(({ classTest, loading }) => ({
  classTest,
  loading: loading.effects['classTest/getList'],
}))

class Evaluate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination:{
        page:1,
        pageSize:30
      },
      params:{},
      visible:false,
      disableSubmit:false
    };
  }
  componentDidMount() {
    this.queryData();
  }
  queryData = (pm, pg) => {
    const dealledPm = pm && dealQuarys(pm);
    let params = { ...this.state.pagination };
    if (dealledPm) {
      params = { ...params, ...dealledPm };
    } else {
      params = {...params,...this.state.params}
    }
    if (pg) {
      params = { ...params, ...pg };
    }
    this.setState({
      params
    });
    this.props.dispatch({
      type: 'classTest/getList',
      payload: { params },
    });
  };
  onDel = (record) => {
    const that = this;
    confirm({
      className: 'BIConfirm',
      okType: 'danger',
      title: '此操作将删除该随堂考，是否确认?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        that.props.dispatch({
          type: 'classTest/del',
          payload: { params: { questionId: record.questionId } },
        }).then(() => {
          that.queryData()
        });
      },
      onCancel() { },
    });
  };
  columnsAction = () => {
    const columns = [
      {
        title: '课程编号',
        dataIndex: 'id',
        width:85
      },
      {
        title: '课程名称',
        dataIndex: 'videoName',
      },
      {
        title: '题目',
        dataIndex: 'question',
      },
      {
        title: '选项',
        dataIndex: 'examSubjects',
        render: (text, record) => {
          return (
            <div style={{margin:'-12px'}}>
              <div className={styles.btmline}>{record.aOption} {record.aContent}</div>
              <div className={styles.btmline}>{record.bOption} {record.bContent}</div>
              <div className={styles.btmline}>{record.cOption} {record.cContent}</div>
              <div className={styles.btmlinelast}>{record.dOption} {record.dContent}</div>
            </div>
          );
        },
      },
      {
        title: '正确选项',
        dataIndex: 'correctOptionValue',
        width:85
      },
      {
        title: '操作',
        dataIndex: 'operation',
        width:60,
        render: (text, record) => {
          return (
            <>
              <span className={styles.actionBtn} onClick={() => this.showModal(record)}>
              编辑
            </span>
              <span className={styles.actionBtn} onClick={() => this.onDel(record)}>
              删除
            </span>
            </>
          );
        },
      }
    ];
    return columns;
  };

  showModal = (record) => {
    this.setState({
      visible: true,
      formParams:DeepCopy(record)||[],
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleSubmit = () => {
    const {formParams={}} = this.state;
    let current = {};
    if(formParams.correctOptionValue === 'A') {
      current.Content=formParams.aContent;
      current.correctOptionId=formParams.aId
    }
    if(formParams.correctOptionValue === 'B') {
      current.Content=formParams.bContent;
      current.correctOptionId=formParams.bId
    }
    if(formParams.correctOptionValue === 'C') {
      current.Content=formParams.cContent;
      current.correctOptionId=formParams.cId
    }
    if(formParams.correctOptionValue === 'D') {
      current.Content=formParams.dContent;
      current.correctOptionId=formParams.dId
    }
    const aiShinecollegeQuestion ={
      id:formParams.questionId,
      question:formParams.question,
      videoId:formParams.videoId,
      correctOptionValue:formParams.correctOptionValue,
      correctOptionText:current.Content,
      correctOptionId:current.correctOptionId,
      correctExplain:formParams.correctExplain,
    };
    const aiShinecollegeQuestionOptions=[{
      questionId:formParams.questionId,
      id:formParams.aId,
      optionValue:formParams.aOption,
      content:formParams.aContent,
    },{
      questionId:formParams.questionId,
      id:formParams.bId,
      optionValue:formParams.bOption,
      content:formParams.bContent,
    },{
      questionId:formParams.questionId,
      id:formParams.cId,
      optionValue:formParams.cOption,
      content:formParams.cContent,
    },{
      questionId:formParams.questionId,
      id:formParams.dId,
      optionValue:formParams.dOption,
      content:formParams.dContent,
    }];
    this.props.dispatch({
      type:'classTest/updateData',
      payload: { aiShinecollegeQuestion,aiShinecollegeQuestionOptions },
    }).then((res)=>{
      if(res) {
        this.setState({
          visible: false,
        });
        this.queryData();
      }
    });
  };
  onFormChange=(val,vname)=>{
    const {formParams={}} = this.state;
    const obj = {...formParams};
    obj[vname] = val;

    let disableSubmit = true;
    if (obj.question!==''&&obj.aContent!==''&&obj.bContent!==''&&obj.cContent!==''&&obj.dContent!==''){
      disableSubmit=false;
    }
    this.setState({
      formParams: obj,
      disableSubmit
    });
  };
  onChange=(e)=>{
    const {formParams={}} = this.state;
    formParams.correctOptionValue=e.target.value;
    this.setState({
      formParams,
    });
  };
  render() {
    const { dataList = [],page } = this.props.classTest;
    const {formParams={},disableSubmit} = this.state;
    const {videoName,question,aContent,bContent,cContent,dContent,aOption,bOption,cOption,dOption,correctOptionValue,correctExplain} = formParams||{};

    const ModalContent = (
      <div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>课&nbsp;&nbsp;程:</span>
            <span className={styles.gutterForm}>
              {videoName}</span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*题&nbsp;&nbsp;目:</span>
            <span className={styles.gutterForm}>
              <BIInput placeholder="请输入"
                       style={{ width: 550 }}
                       value={question}
                       maxLength={100}
                       onChange={(e) => this.onFormChange(e.target.value, 'question')}/></span>
            <span className={styles.gutterEx}>
              正确选项
            </span>
          </div>
        </div>
        <BIRadio value={correctOptionValue} onChange={this.onChange} >
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*选项A:</span>
            <span className={styles.gutterForm}>
              <BIInput placeholder="请输入"
                       style={{ width: 550 }}
                       value={aContent}
                       maxLength={100}
                       onChange={(e) => this.onFormChange(e.target.value, 'aContent')}/></span>
            <span className={styles.gutterEx}>
              <BIRadio.Radio value={aOption}/>
            </span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*选项B:</span>
            <span className={styles.gutterForm}>
              <BIInput placeholder="请输入"
                       style={{ width: 550 }}
                       value={bContent}
                       maxLength={100}
                       onChange={(e) => this.onFormChange(e.target.value, 'bContent')}/></span>
            <span className={styles.gutterEx}>
              <BIRadio.Radio value={bOption}/>
            </span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*选项C:</span>
            <span className={styles.gutterForm}>
              <BIInput placeholder="请输入"
                       style={{ width: 550 }}
                       value={cContent}
                       maxLength={100}
                       onChange={(e) => this.onFormChange(e.target.value, 'cContent')}/></span>
            <span className={styles.gutterEx}>
              <BIRadio.Radio value={cOption}/>
            </span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*选项D:</span>
            <span className={styles.gutterForm}>
              <BIInput placeholder="请输入"
                       style={{ width: 550 }}
                       value={dContent}
                       maxLength={100}
                       onChange={(e) => this.onFormChange(e.target.value, 'dContent')}/></span>
            <span className={styles.gutterEx}>
              <BIRadio.Radio value={dOption}/>
            </span>
          </div>
        </div>
        </BIRadio>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>解&nbsp;&nbsp;析:</span>
            <span className={styles.gutterForm}>
              <BIInput placeholder="请输入"
                       style={{ width: 550 }}
                       value={correctExplain}
                       onChange={(e) => this.onFormChange(e.target.value, 'correctExplain')}/></span>
          </div>
        </div>
      </div>
    );

    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction()}
          dataSource={dataList}
          page={page}
          queryData={(params, page) => this.queryData(params, page)}/>

        <BIModal
          title='编辑随堂考'
          width={800}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" loading={this.props.loading2} onClick={this.handleSubmit}  disabled={disableSubmit}>
              保存
            </BIButton>,
          ]}
        >
          {ModalContent}
        </BIModal>
      </>
    );
  }
}

export default Evaluate;
