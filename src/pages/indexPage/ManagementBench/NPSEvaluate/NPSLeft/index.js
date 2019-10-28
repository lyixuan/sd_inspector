import React from 'react';
import { connect } from 'dva';
import styles from '../style.less'
import ColorBlock from '../components/colorBlock'
import BIWrapperTable from '../../../components/BIWrapperTable';
import Star from '../components/star'


@connect((xdWorkModal) => ({
  xdWorkModal,
}))
class NPSLeft extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colorParams:[
        {
          id:1,
          label:'退费申请',
          num:20
        }, {
          id:2,
          label:'登陆不上',
          num:100
        }, {
          id:3,
          label:'APP使用',
          num:10
        },{
          id:4,
          label:'退费申请',
          num:20
        },{
          id:5,
          label:'登陆不上',
          num:100
        },{
          id:6,
          label:'APP使用',
          num:10
        }
      ],
      // dataSource:[{
      //   id:1,
      //   collegeName:"芝士学院 | 能源管理 | 运营1组",
      //   studentName:"张三",
      //   starClass:1,
      //   content:"我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉",
      // },{
      //   id:2,
      //   collegeName:"芝士学院 | 能源管理 | 运营1组",
      //   studentName:"张三",
      //   starClass:2,
      //   content:"我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉",
      // },{
      //   id:3,
      //   collegeName:"芝士学院 | 能源管理 | 运营1组",
      //   studentName:"张三",
      //   starClass:3,
      //   content:"我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉",
      // },{
      //   id:4,
      //   collegeName:"芝士学院 | 能源管理 | 运营1组",
      //   studentName:"张三",
      //   starClass:4,
      //   content:"我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉",
      // },{
      //   id:5,
      //   collegeName:"芝士学院 | 能源管理 | 运营1组",
      //   studentName:"张三",
      //   starClass:5,
      //   content:"我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉",
      // }],

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
  handleOnScroll = () => {
    let flag = false
    if (this.dom) {
      const contentScrollTop = this.dom.scrollTop
      console.log(115,this.dom.scrollTop)
      if (contentScrollTop >= 500) {
        flag = true
      }
      this.setState({
        flag
      }, () => {

      })
    }
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
   <div id="scroll1">
      <BIWrapperTable  columns={this.columnsRight()}
                       dataSource={dataSource}
                       pagination={false}
                       loading={this.props.loading}
                       onRow={this.onClickRow}
                       rowKey={record => record.id}
                       style={{marginTop:'10px'}}
                       scroll={{ y: 288 }}
      />
    </div>
      </div>
    );
  }
}

export default NPSLeft;
