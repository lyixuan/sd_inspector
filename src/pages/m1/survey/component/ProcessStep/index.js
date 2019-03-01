import {PureComponent} from 'react';
import styles from './style.less';
export default class ProcessStep extends PureComponent{
    render(){
        return(
        <ul className={styles.stateBox}>
            <li className={styles.stepItem1}>222</li>
            <li className={styles.stepItem2}>222</li>
            <li className={styles.stepItem1}>222</li>
            <li className={styles.stepItem2}>222</li>
        </ul>
        )
    }
}
