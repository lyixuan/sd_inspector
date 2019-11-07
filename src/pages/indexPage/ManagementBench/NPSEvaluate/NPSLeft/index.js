import React from 'react';
import { connect } from 'dva';
import styles from '../style.less'
import ColorBlock from '../components/colorBlock'
import BIWrapperTable from '../../../components/BIWrapperTable';
import Star from '../components/star'
import BILoading from '@/components/BILoading'
import { Tooltip } from 'antd';
import moment from 'moment';


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
    window.open(`/inspector/ko/behaviorPath?params=${JSON.stringify(params)}`);
  }
  columnsRight = () =>{
    const columns = [
      {
        title: '后端归属',
        dataIndex: 'backend',
        key: 'backend',
        width:'20%'
      }, {
        title: '学员姓名',
        dataIndex: 'stuName',
        key: 'stuName',
        width:"20%",
        render: (stuName,record) => {
          return <div className={styles.studentColor} onClick={()=>this.clickStudentName(record)}>{stuName}</div>
        },
      }, {
        title: '时间',
        dataIndex: 'createTime',
        key: 'createTime',
        width:"20%",
        render: (createTime) => {
          const dateTimes = moment(createTime).format("YYYY-MM-DD hh:mm:ss")
          return <div>{dateTimes}</div>
        },
      }, {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
        width:"20%",
        render: (star) => {
          return <Star  star={star} />
        },
      },
      {
        title: '内容',
        dataIndex: 'opinion',
        key: 'opinion',
        width:100,
        render: (opinion,) => {
          return <Tooltip placement="right" title={opinion}>
            <div className={styles.contentMain}>{opinion}</div>
          </Tooltip>
        },
      },
    ]
    return columns || [];
  }
  render() {
    // const { dataSource} = this.state;
    const {NPSleftParams} = this.props
    const dataSource = NPSleftParams && NPSleftParams.npsStarOpinionDtoListMap && NPSleftParams.npsStarOpinionDtoListMap.data.length>0 ? NPSleftParams.npsStarOpinionDtoListMap.data:[]
    return (
      <div className={styles.NPALeftMain} style={{width: 'calc(100% - 366px)'}}>
      <div style={{width:'100%',height:'30px'}}>
        {NPSleftParams && NPSleftParams.reasonTypeDtoList && NPSleftParams.reasonTypeDtoList.map((item,index)=><ColorBlock data={{...item}} key={index} className={`colorStyle${index}`}/>)}
      </div>
        {
          this.props.loading?<BILoading isLoading={this.props.loading}/>
            : <BIWrapperTable  columns={this.columnsRight()}
                  dataSource={dataSource}
                  pagination={false}
                  loading={this.props.loading}
                  onRow={this.onClickRow}
                  rowKey={record => record.id}
                  style={{marginTop:'10px',height:'336px'}}
                  scroll={{ y: 288 }}
          />
        }
      </div>
    );
  }
}

export default NPSLeft;
