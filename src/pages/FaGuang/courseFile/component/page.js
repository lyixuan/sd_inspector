import React from 'react';
import { Row, Col,Upload ,message} from 'antd';
import BIInput from '@/ant_components/BIInput';
import BIButton from '@/ant_components/BIButton';
import BIModal from '@/ant_components/BIModal';
import BIButtonGreen from '@/components/BIButtonGreen';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import {SERVER_HOST} from '@/utils/constants';
import storage from '@/utils/storage';
import styles from '../../style.less';
import { msgF } from '@/utils/utils';

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.init = {
      videoName: undefined,
    };
    const obj = {
      loading2:false,
      visible:false,
      failList:[],
      }
    this.state = {...this.init,...obj};
  }
  onFormChange = (value,vname)=>{
    this.setState({
      [vname]:value
    });
  };

  reset = ()=>{
    this.setState(this.init,()=>{
      this.props.queryData(this.state,{page:1});
    });
  };

  search = ()=>{
    this.props.queryData(this.state,{page:1});
  };

  onPageChange = (currentPage)=>{
    this.props.queryData(this.state,{page:currentPage});
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  render() {
    const {videoName,loading2,failList=[]} = this.state;
    const {dataSource,page,columns,loading} = this.props;
    const that = this;
    const props = {
      name: 'file',
      action:`${SERVER_HOST}/shinecollege/courseware/import`,
      headers: {
        authorization: storage.getToken(),
      },
      showUploadList:false,
      onChange(info) {
        if (info.file.status === 'uploading') {
          that.setState({ loading2:true });
        }
        const {response={}} = info.file||{};
        if (info.file.status === 'done') {
          that.setState({ loading2:false });
          if(response.code ===20000){
            message.success('上传完成');
            that.search();
          } else if(response.code===20003) {
            that.setState({ visible:true,failList: response.data.failList});
          } else {
            message.error(msgF(response.msg,response.msgDetail));
          }
        }
      },
      beforeUpload(file) {
        const isJpgOrPng = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isJpgOrPng) {
          message.error('请上传 excel 类型的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 20;
        if (!isLt2M) {
          message.error('文件大小不能超过 20MB!');
        }
        return isJpgOrPng && isLt2M;
      },
    };

    return (
      <div className={styles.newSheetWrap}>

        {/*form*/}
        <div className={styles.searchBlock}>
          {/*第一行*/}
          <Row className={styles.gutterRow}>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox1}>
                <span className={styles.gutterLabel1}>课程名称</span>：
                <span className={styles.gutterForm}><BIInput placeholder="请输入" value={videoName} onChange={(e)=>this.onFormChange(e.target.value,'videoName')}/></span>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              &nbsp;
            </Col>
            <Col className={styles.gutterCol}  span={8}>
              <div className={styles.gutterBox3}>
                <span className={styles.gutterBtn1}><BIButton onClick={this.search} type='primary'>搜索</BIButton></span>
                <span className={styles.gutterBtn2}><BIButton onClick={this.reset}>重置</BIButton></span>
              </div>
            </Col>
          </Row>
        </div>

        {/*table*/}
        <div className={styles.tableBlock}>
          <Row className={styles.gutterRow1}>
            <Col className={styles.gutterCol} span={12}>
              <div className={styles.gutterBox1}>
                <Upload {...props}>
                  <span className={styles.gutterBtn1}><BIButtonGreen loading={loading2} type='primary'>+ 批量添加</BIButtonGreen></span>
                </Upload>
              </div>
            </Col>
            <Col className={styles.gutterCol}  span={12}>
              <div className={styles.gutterBox3}>
                总条数：{page.total}
              </div>
            </Col>
          </Row>
          <BITable rowKey={record=>record.id + Math.random()*1000} dataSource={dataSource} columns={columns} pagination={false} loading={loading} />
          <br/>
          <BIPagination showQuickJumper defaultPageSize={page.pageSize?page.pageSize:30} onChange={this.onPageChange} current={page.pageNum} total={page.total} />
        </div>

        <BIModal
          title="批量导入失败"
          width={440}
          visible={this.state.visible}
          onCancel={this.handleOk}
          onOk={this.handleOk}
          footer={[
            <BIButton type="primary" onClick={this.handleOk}>
              确定
            </BIButton>,
          ]}
        >
          {failList.map((v,i)=>(
            <div key={i}>
              <span>行数：{v.rowIndex}&nbsp;&nbsp;&nbsp; </span>
              <span>问题：{v.videoIdResult}， </span>
              <span>{v.pptUrlResult} </span>
            </div>
          ))}

        </BIModal>
      </div>
    );
  }
}

export default NewQualitySheet;
