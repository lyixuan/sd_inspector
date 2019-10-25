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
      dataSource:[{
        id:1,
        collegeName:"芝士学院 | 能源管理 | 运营1组",
        studentName:"张三",
        starClass:1,
        content:"我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉",
      },{
        id:2,
        collegeName:"芝士学院 | 能源管理 | 运营1组",
        studentName:"张三",
        starClass:2,
        content:"我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉",
      },{
        id:3,
        collegeName:"芝士学院 | 能源管理 | 运营1组",
        studentName:"张三",
        starClass:3,
        content:"我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉",
      },{
        id:4,
        collegeName:"芝士学院 | 能源管理 | 运营1组",
        studentName:"张三",
        starClass:4,
        content:"我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉",
      },{
        id:5,
        collegeName:"芝士学院 | 能源管理 | 运营1组",
        studentName:"张三",
        starClass:5,
        content:"我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉",
      }],

    }
  }
  componentDidMount() {
  }
  columnsRight = () =>{
    const columns = [
      {
        title: '后端归属',
        dataIndex: 'collegeName',
        key: 'collegeName',
      }, {
        title: '学员姓名',
        dataIndex: 'studentName',
        key: 'studentName',
      }, {
        title: '星级',
        dataIndex: 'starClass',
        key: 'starClass',
        render: (starClass) => {
          return <Star  star={starClass} />
        },
      }, {
        title: '内容',
        dataIndex: 'content',
        key: 'content',
        // render: (Unanswered, record) => {
        //   const percent = Unanswered/500 * 100 + '%';
        //   return <BIWrapperProgress text={Unanswered} percent={percent}  propsStyle={{flex: 'inherit',width: '60px',textAlign:"center"}}/>
        // },
      },
    ]
    return columns || [];
  }
  render() {
    const { colorParams,dataSource} = this.state;
    return (
      <div className={styles.NPALeftMain} style={{width: 'calc(100% - 350px)'}}>
      <div className={styles.colorPart}>
        {colorParams.map((item,index)=><ColorBlock data={{...item}} key={index} className={`colorStyle${index}`}/>)}
      </div>

      <BIWrapperTable  columns={this.columnsRight()}
                       dataSource={dataSource}
                       pagination={false}
                       loading={this.props.loading}
                       onRow={this.onClickRow}
                       rowKey={record => record.id}
                       style={{marginTop:'10px'}}
      />
      </div>
    );
  }
}

export default NPSLeft;
