import React from 'react';
import reactDom from 'react-dom';
import { Tag } from 'antd';
import styles from './index.less';

export default class ButtonGroup extends React.Component {
    state = {
        isShowFiexd: false,
        width: 0,
    }
    componentDidMount() {
        window.addEventListener('scroll', this.pageOnscroll);
        this.setState({ width: reactDom.findDOMNode(this.tagsDom).clientWidth })
        console.log(reactDom.findDOMNode(this.tagsDom).clientWidth)
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.pageOnscroll)
    }
    pageOnscroll = (e) => {
        const pageTop = document.documentElement.scrollTop;
        const { top } = this.props;
        const { isShowFiexd } = this.state;
        // 此处应增加防抖操作
        if (pageTop > top && !isShowFiexd) {
            this.setState({ isShowFiexd: !isShowFiexd });
        } else if (pageTop <= top && isShowFiexd) {
            this.setState({ isShowFiexd: !isShowFiexd });
        }
    }
    renderTypeTage = (obj) => {
        return (<span key={obj.name + obj.id} className={styles.tags}><Tag closable>{obj.name}</Tag></span>)

    }
    checkoutTypeTage = (key, obj) => {
        let returnDom = null;
        switch (key) {
            case 'fromDevice':
                returnDom = (<>{this.renderTypeTage(obj)}</>)

                break;
            default:
                returnDom = null;
                break
        }
        return returnDom;

    }
    renderChooseTags = () => {
        const { params = {} } = this.props;
        Object.keys(params).map(item => {
            return this.checkoutTypeTage(item, params[item]);
        });
    }
    renderFixedBox = () => {
        const tags = ['抖音', '华为', 'wo', '主app', '小程序', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2',
            '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2', '抖音', '华为', 'wo',
            '主app', '小程序', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2',
            '注册时间:2013.01.03-2013.1.2', '抖音', '华为', 'wo', '主app', '小程序', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2',
            '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2', '抖音', '华为', 'wo',
            '主app', '小程序', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2',
            '注册时间:2013.01.03-2013.1.2']
        return (
            <>
                <div className={`${styles.buttonGroup} ${styles.buttonGroupFixed}`}>
                    {tags.map((item, index) => <span key={item + index} className={styles.tags}><Tag closable>{item}</Tag></span>)}
                </div>
            </>
        )

    }
    render() {
        const { top, params } = this.props;
        console.log(params)
        const { isShowFiexd, width } = this.state;
        console.log(width)
        const tags = ['抖音', '华为', 'wo', '主app', '小程序', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2',
            '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2', '抖音', '华为', 'wo',
            '主app', '小程序', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2',
            '注册时间:2013.01.03-2013.1.2', '抖音', '华为', 'wo', '主app', '小程序', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2',
            '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2', '抖音', '华为', 'wo',
            '主app', '小程序', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2', '注册时间:2013.01.03-2013.1.2',
            '注册时间:2013.01.03-2013.1.2']
        return (
            <div className={styles.fixedStyle} ref={dom => this.tagsDom = dom}>
                <div className={`${styles.groupContainer} ${isShowFiexd ? styles.groupContainerFixed : ''}`} style={{ minHeight: '100px', width: '83%', marginLeft: '-1.5%' }}>
                    <span className={styles.gropLabel}>已选条件:</span>
                    {isShowFiexd ? this.renderFixedBox() : (<div className={`${styles.buttonGroup}`}>
                        {tags.map((item, index) => <span key={item + index} className={styles.tags}><Tag closable>{item}</Tag></span>)}
                    </div>)}
                </div>
                <div className={styles.shrink}></div>
            </div>


        )
    }

}
// export default function ButtonGroup(props) {

//     return (
//         <div className={styles.groupContainer}>悬浮</div>
//     )
// }