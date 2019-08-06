import React from 'react';
import { Row, Col } from 'antd';
import BIInput from '@/ant_components/BIInput';
import BICascader from '@/ant_components/BICascader';
import BIButton from '@/ant_components/BIButton';
import BIButtonGreen from '@/components/BIButtonGreen';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import styles from '../../style.less';

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.init = {
      videoName: undefined,
    };
    this.state = {...this.init};
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

  add = ()=>{
    this.props.onAdd();
  };

  render() {
    const {videoName} = this.state;
    const {dataSource,page,columns,loading} = this.props;
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
                <span className={styles.gutterBtn1}><BIButtonGreen type='primary' onClick={this.add} >+ 批量添加</BIButtonGreen></span>
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
      </div>
    );
  }
}

export default NewQualitySheet;
