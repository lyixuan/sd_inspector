import React from 'react';
import { connect } from 'dva';
import { DeepCopy } from '@/utils/utils';
import Page from './component/page';
import BIModal from '@/ant_components/BIModal';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import styles from './style.less';
import { message } from 'antd/lib/index';
const { Option } = BISelect;
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
      visible:false
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
      title: '是否删除当前记录?',
      cancelText: '取消',
      okText: '确定',
      onOk() {
        that.props.dispatch({
          type: 'classTest/delelte',
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
      },
      {
        title: '操作',
        dataIndex: 'operation',
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
    const {formParams=[]} = this.state;
    const param = DeepCopy(formParams);
    this.props.dispatch({
      type:'classTest/updateData',
      payload: { list: param },
    }).then((res)=>{
      if(res) {
        this.setState({
          visible: false,
        });
        this.queryData();
      }
    });
  };
  onFormChange=(val,vname,idx)=>{
    const {formParams=[]} = this.state;
    const arr = [...formParams];
    if(vname==='examSubjects') {
      arr[idx][vname] = val.join(',');
    } else {
      arr[idx][vname] = val;
    }
    this.setState({
      formParams: arr,
    });
  };
  render() {
    const { dataList = [],page } = this.props.classTest;
    const {formParams=[],examTypeName} = this.state;

    // const ModalContent = (
    //   <div  className={styles.wrap}>
    //     <div className={styles.line}>
    //       <span className={styles.titleLeft}>考试类型：</span><span className={styles.rightCon}>{examTypeName}</span>
    //     </div>
    //     {formParams.map((v,idx)=>{
    //       const examSubjects = v.examSubjects?v.examSubjects.split(',').map((v)=>String(v)):[];
    //       return (
    //         <div  className={styles.line2} key={idx}>
    //           <span className={styles.titleLeft}>{idx===0?'考试信息：':(<span>&nbsp;</span>)}</span>
    //           <div className={styles.rightCon}>
    //             <BIInput placeholder="请输入考卷名称" style={{ width: 180 }} value={v.examName} onChange={(e) => this.onFormChange(e.target.value, 'examName',idx)}/>&nbsp;&nbsp;
    //             <BIInput placeholder="请输入考卷地址，必填项" style={{ width: 300 }} value={v.examUrl} onChange={(e) => this.onFormChange(e.target.value, 'examUrl',idx)}/>&nbsp;&nbsp;
    //             <BISelect style={{width:250}} allowClear placeholder="请选择"  mode="multiple" showArrow maxTagCount={1}  value={examSubjects} onChange={(val)=>this.onFormChange(val,'examSubjects',idx)}>
    //               {roleList.map(item => (
    //                 <Option key={item.name}>
    //                   {item.name}
    //                 </Option>
    //               ))}
    //             </BISelect>
    //             <span className={styles.sortRtIcon} onClick={()=>this.plus(v,idx)}><Icon type="plus-circle" className={styles.icon}/></span>
    //             {formParams.length===1?
    //             <span className={styles.sortRtIcon}><Icon style={{color:'#ccc'}} type="minus-circle"/></span>:
    //             <span className={styles.sortRtIcon} onClick={()=>this.minus(v,idx)}><Icon type="minus-circle" className={styles.icon}/></span>}
    //           </div>
    //         </div>
    //       )
    //     })}
    //   </div>
    // );
    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction()}
          dataSource={dataList}
          page={page}
          queryData={(params, page) => this.queryData(params, page)}/>

        <BIModal
          title='编辑考卷'
          width={940}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" loading={this.props.loading2} onClick={this.handleSubmit}>
              保存
            </BIButton>,
          ]}
        >
          {/*{ModalContent}*/}
        </BIModal>
      </>
    );
  }
}

export default Evaluate;
