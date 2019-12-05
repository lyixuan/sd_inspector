import React from 'react';
import { connect } from 'dva';
import styles from '../style.less'
import ColorBlock from '../components/colorBlock'
import BIWrapperTable from '../../../components/BIWrapperTable';
import Star from '../components/star'
import BILoading from '@/components/BILoading'
import { Tooltip } from 'antd';
import moment from 'moment';
import Container from '@/components/BIContainer';


@connect(({xdManagementBench,loading}) => ({
  xdManagementBench,
  loading: loading.effects['xdManagementBench/getNpsAutonomousEvaluation'],
}))
class NPSLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  clickStudentName = (record) =>{
    let params={
      userId:record.stuId,//record,
      target:'userName'
    }
    const { BI = {} } = window;
    BI.traceV && BI.traceV({ widgetName: '管理层首页nps进学员档案', traceName: '管理层工作台/nps/列表/学员档案' });
    window.open(`/inspector/ko/behaviorPath?params=${JSON.stringify(params)}`);
  }
  columnsRight = () =>{
    const columns = [
      {
        ellipsis: true,
        title: '后端归属',
        dataIndex: 'backend',
        key: 'backend',
        width:'20%',
        render: text => <Tooltip trigger="hover" title={text}>{text}</Tooltip>
      }, {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        width:"100px",
        ellipsis: true,
        render: (stuName,record) => {
          return <Tooltip trigger="hover" title={stuName}><div className={styles.studentColor} onClick={()=>this.clickStudentName(record)}>{stuName}</div></Tooltip>
        },
      }, {
        title: '时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width:"180px",
        render: (createTime) => {
          const dateTimes = moment(createTime).format("YYYY-MM-DD HH:mm:ss")
          return <div>{dateTimes}</div>
        },
      }, {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
        width:"120px",
        render: (star) => {
          return <Star star={star} />
        },
      },
      {
        ellipsis: true,
        title: '内容',
        dataIndex: 'opinion',
        key: 'opinion',
        ellipsis: true,
        // w idth:'210px',
        render: (opinion,) => {
          return <Tooltip placement="right" title={opinion}>
            <div className={styles.contentMain}>{opinion}<div/></div>
          </Tooltip>
        },
      },
    ]
    return columns || [];
  }
  render() {
    // const { dataSource} = this.state;
    const {NPSleftParams} = this.props
    let dataSource = NPSleftParams && NPSleftParams.npsStarOpinionDtoListMap && NPSleftParams.npsStarOpinionDtoListMap.data.length>0 ? NPSleftParams.npsStarOpinionDtoListMap.data:[];
    if(dataSource.length >=7){
      dataSource = dataSource.splice(0,8);
    }
    let { reasonTypeDtoList = [] } = NPSleftParams;
    if (reasonTypeDtoList.length >= 5) {
      reasonTypeDtoList = reasonTypeDtoList.splice(0, 5);
    }

    return (
      <Container
        title="创收学院对比"
        style={{width: 'calc(100% - 350px)',}}
        head="none"
        propStyle={{padding:0}}
      >
      {/*<div className={styles.NPALeftMain} >*/}
      <div className={styles.NPALeftMain}  style={{width:'100%',height:'30px'}}>
        {reasonTypeDtoList && reasonTypeDtoList.map((item,index)=><ColorBlock data={{...item}} key={index} className={`colorStyle${index}`}/>)}
      </div>
        {
          this.props.loading?<BILoading isLoading={this.props.loading} height='336px' />
            : <BIWrapperTable  columns={this.columnsRight()}
                  dataSource={dataSource}
                  pagination={false}
                  rowKey={(record,idx) => idx}
                  style={{marginTop:'10px',height:'336px'}}
                  scroll={{ y: 288 }}
                  className={styles.NPALeftMain}
                  name="NPALeftMain"
          />
        }
      {/*</div>*/}
      </Container>
    );
  }
}

export default NPSLeft;
