import React from 'react';
import Edit from './_edit';
import Info from './_info';
import styles from './style.less';


class QualityAppeal extends React.Component {
    render() {
        return (
            <>
                <div className={styles.resultWrap}>
                    <div className={styles.s2_title}>质检审核</div>
                    <Info data={this.props.data} />
                </div>
                <Edit hideDate {...this.props} />
            </>
        )
    }
}
export default QualityAppeal