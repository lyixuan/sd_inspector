import React from 'react';
import { connect } from 'dva';
import styles from '../style.less'
import ColorBlock from '../components/colorBlock'
import BIWrapperTable from '../../../components/BIWrapperTable';

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
        collegeName:"自变量",
        badPostNum:"0.12",
        notInTime:400,
        Unanswered:500,
      },{
        id:2,
        collegeName:"π学院",
        badPostNum:"0.12",
        notInTime:400,
        Unanswered:500,
      },{
        id:3,
        collegeName:"芒格",
        badPostNum:"0.12",
        notInTime:400,
        Unanswered:500,
      },{
        id:4,
        collegeName:"狐逻泰罗",
        badPostNum:"0.12",
        notInTime:400,
        Unanswered:500,
      },{
        id:5,
        collegeName:"芝士",
        badPostNum:"0.12",
        notInTime:400,
        Unanswered:500,
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
        dataIndex: 'badPostNum',
        key: 'badPostNum',
        // render: (badPostNum, record) => {
        //   const percent = badPostNum * 100 + '%';
        //   return <BIWrapperProgress text={percent} percent={percent}  propsStyle={{flex: 'inherit',width: '60px',textAlign:"center"}}/>
        // },
      }, {
        title: '不及时次数',
        dataIndex: 'notInTime',
        key: 'notInTime',
        // render: (notInTime, record) => {
        //   const percent = notInTime/500 * 100 + '%';
        //   return <BIWrapperProgress text={notInTime} percent={percent}  propsStyle={{flex: 'inherit',width: '60px',textAlign:"center"}}/>
        // },
      }, {
        title: '未回复次数',
        dataIndex: 'Unanswered',
        key: 'Unanswered',
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
      <div className={styles.NPALeftMain}>
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
