import React from 'react';
import { connect } from 'dva';
import { Icon,Row,Col,InputNumber,Spin} from 'antd';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIButtonYellow from '@/components/BIButtonYellow'
import moment from 'moment';
import BIModal from '@/ant_components/BIModal';
import style from './style.less'
import { message } from 'antd/lib/index';

const { Option } = BISelect;


@connect(({ smallPro,loading }) => ({
  smallPro,
  loading1: loading.effects['smallPro/updateData'],
  loading2: loading.effects['smallPro/updateData2'],
  loading3: loading.effects['smallPro/getList1'],
  loading4: loading.effects['smallPro/getList2'],
}))

class Evaluate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img:'',
      visible:false,
      type:undefined,
      timer:0,
    };
    this.timesRun=null;
  }
  componentDidMount() {
    this.queryData();
  }
  queryData = () => {
    this.props.dispatch({
      type: 'smallPro/getList1',
      payload: { },
    });
    this.props.dispatch({
      type: 'smallPro/getList2',
      payload: { },
    });
  };
  minus=(v,i,list,listname)=>{
    list.splice(i,1);
    this.props.dispatch({
      type: 'smallPro/saveList',
      payload: { [listname]: list},
    });
  };
  plus=(v,i,list,listname)=>{
    const obj = {};
    obj.bannerImgUrl = '';
    obj.bannerLinkUrl = '';
    obj.sort = undefined;
    const arr1 = list.slice(0,i+1);
    const arr2 = [obj];
    const arr3 = list.slice(i+1);
    this.props.dispatch({
      type: 'smallPro/saveList',
      payload: { [listname]: arr1.concat(arr2,arr3)},
    });
  };
  onFormChange=(val,vname,idx,list,listname)=>{
    const arr = [...list];
    arr[idx][vname] = val;
    this.props.dispatch({
      type: 'smallPro/saveList',
      payload: { [listname]: arr},
    });
  };
  onSelChange=(val)=>{
    this.setState({
      type:val
    })
  };
  handleSubmit = (list,type) => {
    const param = list;
    if(param.length>6){
      message.warn('最多录入6条信息');
      return;
    }
    for(let i = 0; i < param.length; i++){
      if(!param[i].bannerImgUrl || !param[i].bannerLinkUrl ||param[i].sort === undefined||param[i].sort === null) {
        message.warn('请填写完整信息');
        return;
      }
      param[i]['bannerType'] = type;
    }
    this.props.dispatch({
      type:type===1?'smallPro/updateData':'smallPro/updateData2',
      payload: { list: param },
    }).then((res)=>{
      if(res) {
        this.queryData();
      }
    });
  };
  showModal = (img) => {
    this.setState({
      visible: true,
      img
    });
  };
  handleOk = () => {
    this.setState({
      visible: false,
    });
  };
  handleExport = () => {
    const {type} =  this.state;
    if(!type) {
      message.warn('请选择统计维度');
      return
    };
    this.setState({
      timer:60
    });
    const that = this;
    this.timesRun = setInterval(function() {
      if(that.state.timer>0){
        that.setState({
          timer:that.state.timer-1
        });
      } else {
        clearInterval(this.timesRun)
      }
    },1000);
    this.props.dispatch({
      type: 'smallPro/exportData',
      payload: { type: Number(type) },
    }).then((res)=>{
      if(res) {
      }
    });
  };
  render() {
    const { dataList1 = [],  dataList2 = [] } = this.props.smallPro;
    const {type,timer} = this.state;
    const sellist = [{ id:1,name:'学员' },{ id:2,name:'课程' }];
    return (
      <>
        <div className={style.box}>
          <div className={style.title}>学习数据导出</div>
          <div className={style.cont}>
            统计维度：<BISelect style={{ width: 180 }}
                           placeholder="请选择"
                           allowClear
                          value={type?String(type):type}
                          onChange={(val) => this.onSelChange(val)}>
              {sellist.map(item => (
                <Option key={item.id}>
                  {item.name}
                </Option>
              ))}
            </BISelect>
            <span style={{float:'right'}} >
              {timer===0?(
                <span>
                  <BIButtonYellow  type="primary" loading={this.props.loading2} onClick={this.handleExport}>
                  <Icon type="download" />导出
              </BIButtonYellow>
                </span>
              ):(
                <BIButtonYellow  type="primary">
                  <Icon type="download" />{`${timer}s`}
                </BIButtonYellow>
              )}
            </span>
          </div>
        </div>

        <Spin spinning={this.props.loading3}>
        <div className={style.box}>
          <div className={style.title}>首页Banner</div>
          <div className={style.cont}>
            {dataList1.map((item,idx)=>(
              <Row gutter={1} key={idx}>
                <Col span={2}>
                  <div>{idx===0?'Banner图信息:':''}</div>
                </Col>
                <Col span={9}>
                  <BIInput placeholder="Banner图地址"
                           style={{ width: '95%' }}
                           value={item.bannerImgUrl}
                           onChange={(e) => this.onFormChange(e.target.value, 'bannerImgUrl',idx,dataList1,'dataList1')}/>
                </Col>
                <Col span={10}>
                  <BIInput placeholder="点击跳转地址"
                           style={{ width: '95%' }}
                           value={item.bannerLinkUrl}
                           onChange={(e) => this.onFormChange(e.target.value, 'bannerLinkUrl',idx,dataList1,'dataList1')}/>
                </Col>
                <Col span={1}>
                  <InputNumber placeholder="顺序"
                           style={{ width: '100%' }}
                               min={1} max={10000} step={1}
                           value={item.sort}
                           onChange={(value) => this.onFormChange(value, 'sort',idx,dataList1,'dataList1')}/>
                </Col>
                <Col span={2}>
                  <span className={style.sortRtText} onClick={()=>this.showModal(item.bannerImgUrl)}>预览</span>
                  <span className={style.sortRtIcon} onClick={()=>this.plus(item,idx,dataList1,'dataList1')}><Icon type="plus-circle" className={style.icon}/></span>
                  {dataList1.length===1?
                    <span className={style.sortRtIcon}><Icon style={{color:'#ccc'}} type="minus-circle"/></span>:
                    <span className={style.sortRtIcon} onClick={()=>this.minus(item,idx,dataList1,'dataList1')}><Icon type="minus-circle" className={style.icon}/></span>}
                </Col>
              </Row>
            ))}
            <div style={{width:'100%',textAlign:'right'}}>
              <span className={style.text}>最近一次更新：{moment(dataList1[0]?dataList1[0].createTime:null).format('YYYY-MM-DD HH:mm:ss')} &nbsp;</span>
              <BIButton type="primary" loading={this.props.loading1} onClick={()=>this.handleSubmit(dataList1,1)}>
                保存
              </BIButton>
            </div>
          </div>
        </div>
        </Spin>
        <Spin spinning={this.props.loading4}>
        <div className={style.box}>
          <div className={style.title}>考试公告</div>
          <div className={style.cont}>
            {dataList2.map((item,idx)=>(
              <Row gutter={1} key={idx}>
                <Col span={2}>
                  <div>{idx===0?'Banner图信息:':''}</div>
                </Col>
                <Col span={9}>
                  <BIInput placeholder="Banner图地址"
                           style={{ width: '95%' }}
                           value={item.bannerImgUrl}
                           onChange={(e) => this.onFormChange(e.target.value, 'bannerImgUrl',idx,dataList2,'dataList2')}/>
                </Col>
                <Col span={10}>
                  <BIInput placeholder="点击跳转地址"
                           style={{ width: '95%' }}
                           value={item.bannerLinkUrl}
                           onChange={(e) => this.onFormChange(e.target.value, 'bannerLinkUrl',idx,dataList2,'dataList2')}/>
                </Col>
                <Col span={1}>
                  <InputNumber placeholder="顺序"
                               style={{ width: '100%' }}
                               min={1} max={10000} step={1}
                               value={item.sort}
                               onChange={(value) => this.onFormChange(value, 'sort',idx,dataList2,'dataList2')}/>
                </Col>
                <Col span={2}>
                  <span className={style.sortRtText} onClick={()=>this.showModal(item.bannerImgUrl)}>预览</span>
                  <span className={style.sortRtIcon} onClick={()=>this.plus(item,idx,dataList2,'dataList2')}><Icon type="plus-circle" className={style.icon}/></span>
                  {dataList2.length===1?
                    <span className={style.sortRtIcon}><Icon style={{color:'#ccc'}} type="minus-circle"/></span>:
                    <span className={style.sortRtIcon} onClick={()=>this.minus(item,idx,dataList2,'dataList2')}><Icon type="minus-circle" className={style.icon}/></span>}
                </Col>
              </Row>
            ))}
            <div style={{width:'100%',textAlign:'right'}}>
              <span className={style.text}>最近一次更新：{moment(dataList2[0]?dataList2[0].createTime:null).format('YYYY-MM-DD HH:mm:ss')} &nbsp;</span>
              <BIButton type="primary" loading={this.props.loading2} onClick={()=>this.handleSubmit(dataList2,2)}>
                保存
              </BIButton>
            </div>
          </div>
        </div>
        </Spin>
        <BIModal
          title="预览"
          width={740}
          visible={this.state.visible}
          onCancel={this.handleOk}
          onOk={this.handleOk}
          footer={[
            <BIButton type="primary" loading={this.props.loading2} onClick={this.handleOk}>
              关闭
            </BIButton>,
          ]}
        >
          <img alt="图片地址无效" style={{ width: '100%' }} src={this.state.img} />
        </BIModal>
      </>
    );
  }
}

export default Evaluate;
