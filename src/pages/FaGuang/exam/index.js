import React from 'react';
import { connect } from 'dva';
import { Upload,message ,Icon} from 'antd';
import { DeepCopy } from '@/utils/utils';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import Page from './component/page';
import BIButton from '@/ant_components/BIButton';
import styles from './style.less';
import BIModal from '@/ant_components/BIModal';
import {SERVER_HOST} from '@/utils/constants';
const { Option } = BISelect;

const confirm = BIModal.confirm;
const columns = [
  {
    title: '编号',
    dataIndex: 'id',
  },
  {
    title: '学院',
    dataIndex: 'collegeName',
  },
  {
    title: '练习通道名称',
    dataIndex: 'practiceName',
  },
  {
    title: '练习通道地址',
    dataIndex: 'practiceUrl',
  },
  {
    title: '适用组织',
    dataIndex: 'familys',
  },
];

function dealQuarys(pm) {
  const p = DeepCopy(pm);
  return p;
};


@connect(({ faguang, exam, loading }) => ({
  faguang,
  exam,
  loading: loading.effects['exam/getList'],
  loading3: loading.effects['exam/sortData'],
  loading2: loading.effects['exam/addData']||loading.effects['exam/updateData']
}))

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      loading:false,
      disableSubmit:true,
      pagination:{
        page:1,
        pageSize:30
      },
      params:{},
      formParams:{},
      modalTitle:'',
      imgUrl:undefined
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
      type: 'exam/getList',
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
          type: 'exam/delelte',
          payload: { params: { practiceId: record.id } },
        }).then(() => {
          that.queryData()
        });
      },
      onCancel() { },
    });
  };
  showModal = (record) => {
    // 添加、编辑
    let formView = {};
    if(record){
      if(record.collegeId){
        this.props.dispatch({
          type: 'exam/getFamilyList',
          payload: { collegeId:record.collegeId },
        });
      }
      formView.family =record.familyIds.split(',');
      formView.collegeId = record.collegeId.toString();
      formView.practiceUrl = record.practiceUrl;
      formView.practiceName = record.practiceName;
    }
    this.setState({
      visible: true,
      disableSubmit:record?false:true,
      formParams:record?formView:{},
      imgUrl:record?record.imgUrl:undefined,
      id:record?record.id:undefined
    });
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleSubmit = () => {
    const that = this;
    const {formParams,imgUrl,id} = this.state;
    if(!imgUrl) {
      message.warn('请上传练习通道图标');
      return
    }
    const params = {
      collegeId:Number(formParams.collegeId),
      collegeName:this.getOrgName(formParams.collegeId),
      familys:this.getFamilyName(formParams.family),
      imgUrl,
      practiceName:formParams.practiceName,
      practiceUrl:formParams.practiceUrl,
      id
    };

    let type = 'exam/addData';
    if(id) {
      type='exam/updateData'
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
  getFamilyName = (ids)=>{
    const { familyList=[] } = this.props.exam;
    const arr = [];
    familyList.forEach((v1)=>{
      ids.forEach((v2)=>{
        if(Number(v1.id)===Number(v2)){
          arr.push({id:v1.id,name:v1.name})
        }
      })
    });
    return arr;
  };
  getOrgName = (id)=>{
    const { collegeList = [] } = this.props.faguang||{};
    let name = '';
    collegeList.forEach((v1)=>{
      if(Number(id) === Number(v1.collegeId)){
        name = v1.collegeName;
      }
    });
    return name;
  };
  onFormChange = (value,vname)=>{
    let obj = {...this.state.formParams,...{[vname]:value}};
    if(vname==='collegeId'){
      this.props.dispatch({
        type: 'exam/getFamilyList',
        payload: { collegeId:value },
      });
      obj.family=[]
    }
    let disableSubmit = true;
    if(Object.keys(obj).length===4){
      let conut = 0;
      for(const key in obj ){
        if (obj[key] && (typeof obj[key]==='string' || typeof obj[key]==='object'&& obj[key].length>0)){
          conut++
        }
      }
      if(conut===4){
        disableSubmit=false;
      }
    }
    this.setState({
      disableSubmit
    });
    this.setState({formParams:obj});
  };
  columnsAction = () => {
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
    return [...columns, ...actionObj];
  };
  beforeUpload=(file) =>{
    const isJpgOrPng = file.type === 'image/jpg' ||file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('请上传 JPG/PNG/JPEG 类型的文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('文件大小不能超过 2MB!');
    }
    return isJpgOrPng && isLt2M;
  };
  handleChange = info => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        imgUrl:info.file.response.data,
        loading: false,
      })
    }
  };
  render() {
    const { collegeList = [] } = this.props.faguang||{};
    const { dataList = [], page,familyList=[] } = this.props.exam||{};
    const {formParams,disableSubmit,imgUrl} = this.state;
    const {collegeId,practiceUrl,practiceName,family} = formParams||{};
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const ModalContent = (
      <div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*学院:</span>
            <span className={styles.gutterForm}>
              <BISelect style={{ width: 320 }} placeholder="请选择"
                        value={collegeId}
                        onChange={(val) => this.onFormChange(val, 'collegeId')}>
                  {collegeList.map(item => (
                    <Option key={item.collegeId}>
                      {item.collegeName}
                    </Option>
                  ))}
                </BISelect></span>
          </div>
        </div>
        <div className={styles.gutterRow} style={{height: 110}}>
          <div className={styles.gutterBox} >
            <span className={styles.gutterLabel} style={{verticalAlign:'top'}}>*联系通道图标:</span>
            <span className={styles.gutterForm}>
              <Upload
                name="file"
                listType="picture-card"
                showUploadList={false}
                action={`${SERVER_HOST}/shinecollege/practice/uploadIcon`}
                beforeUpload={this.beforeUpload}
                onChange={this.handleChange}
              >
              {imgUrl ? <img src={imgUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>
            </span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*练习通道名称:</span>
            <span className={styles.gutterForm}>
              <BIInput placeholder="请输入"
                       style={{ width: 320 }}
                       value={practiceName}
                       onChange={(e) => this.onFormChange(e.target.value, 'practiceName')}/></span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*练习通道地址:</span>
            <span className={styles.gutterForm}>
              <BIInput placeholder="请输入"
                       style={{ width: 320 }}
                       value={practiceUrl}
                       onChange={(e) => this.onFormChange(e.target.value, 'practiceUrl')}/></span>
          </div>
        </div>
        <div className={styles.gutterRow}>
          <div className={styles.gutterBox}>
            <span className={styles.gutterLabel}>*适用组织:</span>
            <span className={styles.gutterForm}>
              <BISelect style={{width:320}} allowClear placeholder="请选择"  mode="multiple" showArrow maxTagCount={1}  value={family} onChange={(val)=>this.onFormChange(val,'family')}>
                  {familyList.map(item => (
                    <Option key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                    </BISelect></span>
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
          collegeList={collegeList}
          onAdd={this.showModal}
          queryData={(params, page) => this.queryData(params, page)}/>

        <BIModal
          title={this.state.formParams.id?"编辑练习通道":"添加练习通道"}
          width={540}
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
      </>
    );
  }
}

export default Course;
