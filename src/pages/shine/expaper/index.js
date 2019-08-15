import React from 'react';
import { connect } from 'dva';
import { DeepCopy } from '@/utils/utils';
import Page from './component/page';
import BIModal from '@/ant_components/BIModal';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import { Tooltip,Icon } from 'antd';
import styles from './style.less';
import { message } from 'antd/lib/index';
const { Option } = BISelect;

function dealQuarys(pm) {
  const p = DeepCopy(pm);
  return p;
};

@connect(({ expaper, loading }) => ({
  expaper,
  loading: loading.effects['expaper/getList'],
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
    this.props.dispatch({
      type: 'expaper/getRoleList',
      payload: { },
    });
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
      type: 'expaper/getList',
      payload: { params },
    });
  };
  columnsAction = (rowGroup) => {
    const columns = [
      {
        title: '考试类型',
        dataIndex: 'examTypeName',
        render: (value, row, index) => {
          const obj = {
            children: value,
            props: {rowSpan: 0},
          };
          const arr = [0];
          rowGroup.forEach((v,i)=>{
            arr.push(arr[i]+v);
          });
          arr.forEach((v,i)=>{
            if (index === v) {
              obj.props.rowSpan = arr[i+1]-arr[i];
            }
          });
          return obj;
        },
      },
      {
        title: '考卷名称',
        dataIndex: 'examName',
      },
      {
        title: '考卷地址',
        dataIndex: 'examUrl',
      },
      {
        title: '考试对象',
        dataIndex: 'examSubjects',
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (value, record, index) => {
          const obj = {
            children: <>
              <span  className={styles.actionBtn} onClick={() => this.showModal(record)}>
              编辑
            </span>
            </>,
            props: {rowSpan: 0},
          };
          const arr = [0];
          rowGroup.forEach((v,i)=>{
            arr.push(arr[i]+v);
          });
          arr.forEach((v,i)=>{
            if (index === v) {
              obj.props.rowSpan = arr[i+1]-arr[i];
            }
          });
          return obj;
        },
      }
    ];
    return columns;
  };

  showModal = (record) => {
    const { srcData } = this.props.expaper;
    this.setState({
      visible: true,
      formParams:DeepCopy(srcData[record.examTypeName])||[],
      examTypeName:record.examTypeName
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
    let role = [];
    if(param.length<1){
      message.warn('至少添加一个考卷信息');
      return;
    }
    for(let i = 0; i < param.length; i++){
      param[i].examSubjects = param[i].examSubjects?param[i].examSubjects.split(','):[];
      role=role.concat(param[i].examSubjects)
      if(param[i].examUrl === undefined || param[i].examUrl === null||param[i].examUrl === '') {
        message.warn('请输入考卷地址');
        return;
      }
      if(param[i].examSubjects === undefined || param[i].examSubjects === null||param[i].examSubjects.length===0) {
        message.warn('请输入选择考试对象');
        return;
      }
    }
    if(new Set(role).size !== role.length){
      message.warn('同一考试对象只可参加一个考试');
      return;
    }
    this.props.dispatch({
      type:'expaper/updateData',
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
  minus=(v,i)=>{
    const {formParams=[]} = this.state;
    formParams.splice(i,1);
    this.setState({
      formParams,
    });
  };
  plus=(v,i)=>{
    const {formParams=[]} = this.state;
    const obj = {...formParams[0]};
    obj.examName = '';
    obj.examUrl = '';
    obj.examSubjects = '';
    const arr1 = formParams.slice(0,i+1);
    const arr2 = [obj];
    const arr3 = formParams.slice(i+1);
    this.setState({
      formParams:arr1.concat(arr2,arr3),
    });
  };
  render() {
    const { dataList = [],rowGroup=[],roleList=[] } = this.props.expaper;
    const {formParams=[],examTypeName} = this.state;

    const ModalContent = (
      <div  className={styles.wrap}>
        <div className={styles.line}>
          <span className={styles.titleLeft}>考试类型：</span><span className={styles.rightCon}>{examTypeName}</span>
        </div>
        {formParams.map((v,idx)=>{
          const examSubjects = v.examSubjects?v.examSubjects.split(',').map((v)=>String(v)):[];
          return (
            <div  className={styles.line2} key={idx}>
              <span className={styles.titleLeft}>{idx===0?'考试信息：':(<span>&nbsp;</span>)}</span>
              <div className={styles.rightCon}>
                <BIInput placeholder="请输入考卷名称" style={{ width: 180 }} value={v.examName} onChange={(e) => this.onFormChange(e.target.value, 'examName',idx)}/>&nbsp;&nbsp;
                <BIInput placeholder="请输入考卷地址，必填项" style={{ width: 300 }} value={v.examUrl} onChange={(e) => this.onFormChange(e.target.value, 'examUrl',idx)}/>&nbsp;&nbsp;
                <BISelect style={{width:250}} allowClear placeholder="请选择"  mode="multiple" showArrow maxTagCount={1}  value={examSubjects} onChange={(val)=>this.onFormChange(val,'examSubjects',idx)}>
                  {roleList.map(item => (
                    <Option key={item.name}>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>
                <span className={styles.sortRtIcon} onClick={()=>this.plus(v,idx)}><Icon type="plus-circle" className={styles.icon}/></span>
                {formParams.length===1?
                <span className={styles.sortRtIcon}><Icon style={{color:'#ccc'}} type="minus-circle"/></span>:
                <span className={styles.sortRtIcon} onClick={()=>this.minus(v,idx)}><Icon type="minus-circle" className={styles.icon}/></span>}
              </div>
            </div>
          )
        })}
      </div>
    );
    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction(rowGroup)}
          dataSource={dataList}
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
          {ModalContent}
        </BIModal>
      </>
    );
  }
}

export default Evaluate;
