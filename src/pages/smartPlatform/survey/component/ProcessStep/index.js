import { PureComponent } from 'react';
import styles from './style.less';
import { PROVINCE_STEP } from '@/utils/constants';
import moment from 'moment';

export default class ProcessStep extends PureComponent {
    constructor(props) {
        super(props);
        this.initObj = this.initData();
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
    handleData = (data = []) => {
        return PROVINCE_STEP.map(item => {
            const obj = data.find(ls => ls.stepType === item.id) || {};
            const beginDate = obj.beginDate ? moment(obj.beginDate).format('MMMDo') : '';
            const endDate = obj.endDate ? moment(obj.endDate).format('MMMDo') : '';
            const dateTime = beginDate + endDate ? `${beginDate}-${endDate}` : '暂未公布';
            const { stepStatus } = obj;     // 报考状态
            return (
                <li className={stepStatus === 3 || stepStatus === 1 || stepStatus === -1 ? styles.stepItem2 : styles.stepItem1} key={item.id}>
                    {stepStatus === 3 ? <div className={styles.stepOver}>已结束</div> : null}
                    <h4 className={styles.processName} key={`${item.id}h4`}>{item.name}</h4>
                    <p className={styles.processDate} key={`${item.id}p`}>{dateTime}</p>
                    <span className={styles.symbal}>◀</span>
                    <span className={styles.circle}></span>
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
