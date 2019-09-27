import React from 'react';
import { Cascader } from 'antd';
import styles from './style.less';

/*
* Cascader 组件
*
* 基于原 ant Cascader
* 只扩展自定义样式
* */

class BICascader extends React.Component {

    render() {
        return (
            <div className={styles.BICascader}>
                <Cascader {...this.props} />
            </div>
        );
    }
}

export default BICascader;