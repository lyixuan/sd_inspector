import React from 'react';
import { connect } from 'dva';
import { DeepCopy } from '@/utils/utils';
import { Tooltip,Icon,InputNumber } from 'antd';
import BIButtonInTable from '@/components/BIButtonInTable';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import Page from './component/page';
import BIButton from '@/ant_components/BIButton';
import styles from './style.less';
import BIModal from '@/ant_components/BIModal';
import BICascader from '@/ant_components/BICascader';
const { Option } = BISelect;

const confirm = BIModal.confirm;
const columns = [
  {
    title: '课程名称',
    dataIndex: 'videoName',
  },
  {
    title: '课程简介',
    dataIndex: 'videoDesc',
    render: (text, record) => {
      return (
        <>
          {/* Tooltip */}
          <Tooltip placement="top" title={text}>
            <BIButtonInTable>{text}</BIButtonInTable>
          </Tooltip>
        </>
      );
    },
  },
  {
    title: '讲师',
    dataIndex: 'videoRealName',
  },
  {
    title: '讲师组织',
    dataIndex: 'videoUserCollege',
  },
  {
    title: '讲师角色',
    dataIndex: 'videoUserRole',
  },
];

function dealQuarys(pm) {
  const p = DeepCopy(pm);
  if (p.videoType) {
    delete p.videoType
  }
  return p;
};

@connect(({ cubePlanDetail, course, loading }) => ({
  cubePlanDetail,
  course,
  loading: loading.effects['course/getList'],
  loading3: loading.effects['course/sortData'],
  loading2: loading.effects['course/addData']||loading.effects['course/updateData']
}))

class Course extends React.Component {
  constructor(props) {
    super(props);
    console.log(123,props)
    this.state = {
      visible: false,
      visible2: false,
      disableSubmit:true,
      pagination:{
        page:1,
        pageSize:30
      },
      params:{},
      formParams:{},
      sortParams:[],
      sortParamsTitle:''
    };
  }
  componentDidMount() {
    this.queryData();
  }
  queryData = (pm, pg) => {
    const dealledPm = pm && dealQuarys(pm);
    let params = { ...this.state.pagination };
    if (dealledPm) {
      params = {...params,...dealledPm };
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
      type: 'course/getList',
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
          type: 'course/delelte',
          payload: { params: { id: record.id } },
        }).then(() => {
          that.queryData()
        });
      },
      onCancel() { },
    });
  };
  showModal = (record) => {
    // 添加、编辑
    let formView = {...record};
    if(record){
      formView.videoTypeId = [formView.parentId,formView.videoTypeId]
    }
    this.setState({
      visible: true,
      disableSubmit:record?false:true,
      formParams:formView
    });
  };
  showSortModal=(record)=>{
    this.props.dispatch({
      type: 'course/getCourseTypeChildren',
      payload: { videoTypeId:record.videoTypeId },
    }).then((sortList)=>{
      if (sortList) {
        this.setState({
          visible2: true,
          sortParams:sortList,
          sortParamsTitle:record.videoType
        });
      }
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleSortCancel = () => {
    this.setState({
      visible2: false,
    });
  };
  handleSubmitSort=()=>{
    const that = this;
    const {sortParams} = this.state;
    sortParams.forEach((v)=>{
      delete  v.parentId;
    });
    this.props.dispatch({
      type:'course/sortData',
      payload: { sortData:sortParams },
    }).then((res)=>{
      if(res) {
        that.setState({
          visible2: false,
        });
        that.queryData();
      }
    });
  };
  handleSubmit = () => {
    const that = this;
    const {formParams} = this.state;
    const params = DeepCopy(formParams);
    params.videoTypeId = formParams.videoTypeId[1];
    delete params.parentId;
    params.videoUserCollege = params.videoUserCollege?params.videoUserCollege:'';
    // this.delEmpty(params);
    let type = 'course/addData';
    if(params.id) {
      type='course/updateData'
    }
    this.props.dispatch({
      type,
      payload: { ...params },
    }).then((res)=>{
      if(res) {
        that.setState({
          visible: false,
        });
        that.queryData();
      }
    });
  };
  onFormChange = (value,vname)=>{
    let oldParams = {...this.state.formParams};
    let obj = {[vname]:value};
    const testObj = {...oldParams,...obj}
    if(testObj.videoTypeId&&testObj.videoName&&testObj.videoHeadImg&&testObj.coverPath&&testObj.videoUrl&&(testObj.videoSeconds||testObj.videoSeconds===0)){
      this.setState({
        disableSubmit:false
      })
    } else {
      this.setState({
        disableSubmit:true
      })
    }
    this.setState({formParams:{...oldParams,...obj}});
  };
  columnsAction = () => {
    const actionCol = [{
      title: '课程编号',
      dataIndex: 'id',
      width:80,
      },
      {
        title: '课程分类',
        dataIndex: 'videoType',
        render: (text, record) => {
          return (
            <>
              {<div style={{cursor: 'pointer'}} onClick={()=>this.showSortModal(record)}>{text}</div>}
            </>
          );
        },
      }];
    const actionObj = [{
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
    }];
    return [...actionCol,...columns, ...actionObj];
  };
  delEmpty = (params)=>{
    for (const key in params) {
      if (params[key]===''||params[key]===undefined||params[key]===null||params[key].length === 0) {
        delete  params[key];
      }
    }
  };
  up=(item)=>{
    const {sortParams}= this.state;
    sortParams.forEach((val,idx)=>{
      if(item.id === val.id){
        const vSort = val.sort;
        val.sort = sortParams[idx-1].sort;
        sortParams[idx-1].sort = vSort;
      }
    });
    this.setState({
      sortParams:sortParams.sort((a, b) => a.sort - b.sort)
    });
  };
  down=(item)=>{
    const {sortParams}= this.state;
    sortParams.forEach((val,idx)=>{
      if(item.id === val.id){
        const vSort = val.sort;
        val.sort = sortParams[idx+1].sort;
        sortParams[idx+1].sort = vSort;
      }
    });
    this.setState({
      sortParams:sortParams.sort((a, b) => a.sort - b.sort)
    });
  };
  render() {
    const { collegeList = [],courseList=[] } = this.props.faguang||{};

    const {formParams,disableSubmit,sortParams,sortParamsTitle} = this.state;
    const {videoTypeId,videoName,videoRealName,videoUserCollege,videoUserRole,videoDesc,videoHeadImg,coverPath,videoUrl,videoSeconds} = formParams||{};
    const ModalContent = (
      <div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*课程分类:</span>
            <span className={styles.gutterForm}>
                <BICascader
                  placeholder='请选择'
                  allowClear={false}
                  options={courseList}
                  value={videoTypeId}
                  fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                  style={{ width: 180 }}
                  onChange={(val)=>this.onFormChange(val,'videoTypeId')}
                />
              </span>
          </div>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*课程名称:</span>
            <span className={styles.gutterForm}>
              <BIInput placeholder="请输入"
                       style={{ width: 180 }}
                       maxLength={20}
                       value={videoName}
                       onChange={(e) => this.onFormChange(e.target.value, 'videoName')}/></span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>讲师名字:</span>
            <span className={styles.gutterForm}>
                <BIInput placeholder="请输入"
                         style={{ width: 180 }}
                         maxLength={10}
                         value={videoRealName}
                         onChange={(e) => this.onFormChange(e.target.value, 'videoRealName')}/></span>
          </div>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>讲师组织:</span>
            <span className={styles.gutterForm}>
              <BISelect allowClear style={{ width: 180 }} placeholder="请选择"
                        value={videoUserCollege}
                        onChange={(val) => this.onFormChange(val, 'videoUserCollege')}>
                  {collegeList.map(item => (
                    <Option key={item.collegeName}>
                      {item.collegeName}
                    </Option>
                  ))}
                </BISelect></span>
          </div>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>讲师角色:</span>
            <span className={styles.gutterForm}>
              <BIInput placeholder="请输入"
                       style={{ width: 180 }}
                       value={videoUserRole}
                       maxLength={10}
                       onChange={(e) => this.onFormChange(e.target.value, 'videoUserRole')}/></span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel} style={{verticalAlign: 'top'}}>*讲师头像:</span>
            <span className={styles.gutterForm} style={{width: 750}}>
              <BIInput placeholder="请输入讲师头像地址"
                       value={videoHeadImg}
                       onChange={(e) => this.onFormChange(e.target.value, 'videoHeadImg')}/>
            </span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel} style={{verticalAlign: 'top'}}>*封面地址:</span>
            <span className={styles.gutterForm} style={{width: 750}}>
              <BIInput placeholder="请输入课程封面地址"
                       value={coverPath}
                       onChange={(e) => this.onFormChange(e.target.value, 'coverPath')}/>
            </span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*课程地址:</span>
            <span className={styles.gutterForm2}>
                <BIInput placeholder="请输入课程地址"
                         style={{ width: 470 }}
                         value={videoUrl}
                         onChange={(e) => this.onFormChange(e.target.value, 'videoUrl')}/>
              </span>
          </div>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*课程时长:</span>
            <span className={styles.gutterForm}>
              <InputNumber className='agc' placeholder="请输入时长" min={0} max={100000} step={1} style={{ width: 160 }} value={videoSeconds} onChange={(value) => this.onFormChange(value, 'videoSeconds')} />
              &nbsp;秒 </span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel} style={{verticalAlign: 'top'}}>课程简介:</span>
            <span className={styles.gutterForm} style={{width: 750}}>
              <BIInput.TextArea maxLength={100} rows={2} value={videoDesc} placeholder={'请输入课程简介'} onChange={(e) => this.onFormChange(e.target.value, 'videoDesc')} />
            </span>
          </div>
        </div>
      </div>
    );
    const sortDiv = sortParams.map((v,idx)=>(
      <div className={styles.row} key={v.id}>
        <span className={styles.sortLf}>{idx+1} </span><span className={styles.sortRt}>{v.videoName}</span>
        {idx===0?
          <span className={styles.sortRtIcon}><Icon style={{color:'#ccc'}} type="up-circle"/></span>:
          <span className={styles.sortRtIcon} onClick={()=>this.up(v)}><Icon type="up-circle" className={styles.icon}/></span>}
        {idx===sortParams.length-1?
          <span className={styles.sortRtIcon}><Icon style={{color:'#ccc'}} type="down-circle"/></span>:
          <span className={styles.sortRtIcon} onClick={()=>this.down(v)}><Icon type="down-circle" className={styles.icon}/></span>
        }
      </div>
    ));
    const SortContent = (
      <div style={{height:400,overflow:'auto'}}>
        <div className={styles.sortTitle}>{sortParamsTitle}</div>
        <div className={styles.row}>
          <span className={styles.sortTitleLf}>顺序</span><span className={styles.sortTitleRt}>课程名称</span>
        </div>
        {sortDiv}
      </div>
    );
    const { dataList = [], page } = this.props.course;
    return (
      <>
        <Page
          {...this.props}
          columns={this.columnsAction()}
          dataSource={dataList}
          page={page}
          courseList={courseList}
          onAdd={this.showModal}
          queryData={(params, page) => this.queryData(params, page)}/>

        <BIModal
          title={this.state.formParams.id?"编辑课程":"添加课程"}
          width={940}
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" loading={this.props.loading2} onClick={this.handleSubmit} disabled={disableSubmit}>
              保存
            </BIButton>,
          ]}
        >
          {ModalContent}
        </BIModal>

        <BIModal
          title="调整课程顺序"
          width={560}
          visible={this.state.visible2}
          onOk={this.handleSubmitSort}
          onCancel={this.handleSortCancel}
          footer={[
            <BIButton style={{ marginRight: 10 }} onClick={this.handleSortCancel}>
              取消
            </BIButton>,
            <BIButton type="primary" loading={this.props.loading3} onClick={this.handleSubmitSort}>
              保存
            </BIButton>,
          ]}
        >
          {SortContent}
        </BIModal>
      </>
    );
  }
}

export default Course;
