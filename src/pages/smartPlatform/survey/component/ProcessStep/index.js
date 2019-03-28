import { PureComponent } from 'react';
import styles from './style.less';
import { PROVINCE_STEP } from '@/utils/constants';
import moment from 'moment';

function StepStatusHover(props){
    console.log(props.isVisible)
    let obj = {read:10000,unread:3000}
    let num1 = (obj.read/(obj.read+obj.unread)).toFixed(2)
    let num2 = (obj.unread/(obj.read+obj.unread)).toFixed(2)
    // return <div className={props.isVisible?styles.showToolTips:styles.hideToolTips}>{props.isVisible}33</div>
    let readStyle = {width:num1*157+'px'}
    let unReadStyle = {width:num2*157+'px'}
    console.log(styles.msgRead)
    return (<div className={props.isVisible?styles.showToolTips:styles.hideToolTips}>
        <span className={styles.msgRead} style={readStyle}></span>
        <span className={styles.msgUnRead}  style={unReadStyle}></span>
        <div className={styles.percentNum}><span>{num1*100}%</span><span>{num2*100}%</span></div>
        <div className={styles.countNum}><span>已读{obj.read}</span><span>未读{obj.unread}</span></div>
    </div>)
}

export default class ProcessStep extends PureComponent {
    constructor(props) {
        super(props);
        this.initObj = this.initData();
        let examStep = PROVINCE_STEP.map((item) => {item.isVisible=false;return item}).slice()
        this.state={
            initObj:examStep
        }
    }
    initData = () => {
        const returnObj = {};
        PROVINCE_STEP.forEach(item => {
            returnObj[item.id] = {
                stepStatus: item.id,
                name: item.name,
            }
        })
        return returnObj;
    }
    stepStatusHover(index){
        if(!this.state.initObj[index].isVisible){
            this.state.initObj[index].isVisible = true
            this.setState({initObj:this.state.initObj.slice()})
        }
        
    }
    stepStatusLeave(index){
        if(this.state.initObj[index].isVisible){
            this.state.initObj[index].isVisible = false
            this.setState({initObj:this.state.initObj.slice()})
        }
       
    }
    handleData = (data = []) => {
        return PROVINCE_STEP.map((item,index) => {
            const obj = data.find(ls => ls.stepType === item.id) || {};
            const beginDate = obj.beginDate ? moment(obj.beginDate).format('MMMDo') : '';
            const endDate = obj.endDate ? moment(obj.endDate).format('MMMDo') : '';
            const dateTime = beginDate + endDate ? `${beginDate}-${endDate}` : '暂未公布';
            const { stepStatus } = obj;     // 报考状态
            const examNodeLightHight = stepStatus === 3 || stepStatus === 1 || stepStatus === -1
            const toolTips = examNodeLightHight ? <></>:<StepStatusHover isVisible={item.isVisible}></StepStatusHover>
            return (
                <li onMouseLeave={this.stepStatusLeave.bind(this,index)} onMouseOver={this.stepStatusHover.bind(this,index)}  className={examNodeLightHight? styles.stepItem2 : styles.stepItem1} key={item.id}>
                    {stepStatus === 3 ? <div className={styles.stepOver}>已结束</div> : null}
                    <h4 className={styles.processName} key={`${item.id}h4`}>{item.name}</h4>
                    <p className={styles.processDate} key={`${item.id}p`}>{dateTime}</p>
                    <span className={styles.symbal}>◀</span>
                    <span className={styles.circle}></span>
                    {toolTips}
                </li>
            )
        });

    }
    render() {
        const { data = [] } = this.props;
        const objList = this.handleData(data) || null;
        return (
            <ul className={styles.stateBox}>
                {objList}
                <li className={styles.line}></li>
            </ul>
        )
    }
}
