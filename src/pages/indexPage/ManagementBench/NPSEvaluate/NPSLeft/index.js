import React from 'react';
import { connect } from 'dva';
import styles from '../style.less'
import ColorBlock from '../components/colorBlock'
import BIWrapperTable from '../../../components/BIWrapperTable';
import Star from '../components/star'
import BILoading from '@/components/BILoading'


@connect(({xdWorkModal,loading}) => ({
  xdWorkModal,
  loading: loading.effects['xdWorkModal/getNpsAutonomousEvaluation'],
}))
class NPSLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
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
        width:"20%"
      }, {
        title: '星级',
        dataIndex: 'star',
        key: 'star',
        width:"20%",
        render: (star) => {
          return <Star  star={star} />
        },
      }, {
        title: '内容',
        dataIndex: 'opinion',
        key: 'opinion',
        width:351,
        render: (opinion,) => {
          return <div className={styles.contentMain}>{opinion}</div>
        },
      },
    ]
    return columns || [];
  }
  render() {
    // const { dataSource} = this.state;
    const {NPSleftParams} = this.props
    const dataSource = NPSleftParams && NPSleftParams.npsStarOpinionDtoListMap && NPSleftParams.npsStarOpinionDtoListMap.data.length>0 && NPSleftParams.npsStarOpinionDtoListMap.data
    console.log("NPSleftParams",NPSleftParams)
    return (
      <div className={styles.NPALeftMain} style={{width: 'calc(100% - 350px)'}}>
      <div>
        {NPSleftParams && NPSleftParams.reasonTypeDtoList && NPSleftParams.reasonTypeDtoList.map((item,index)=><ColorBlock data={{...item}} key={index} className={`colorStyle${index}`}/>)}
      </div>
        {
          this.props.loading?<BILoading/>: <BIWrapperTable  columns={this.columnsRight()}
                                                            dataSource={dataSource}
                                                            pagination={false}
                                                            loading={this.props.loading}
                                                            onRow={this.onClickRow}
                                                            rowKey={record => record.id}
                                                            style={{marginTop:'10px'}}
                                                            scroll={{ y: 288 }}
          />
        }
      </div>
    );
  }
}

export default NPSLeft;
