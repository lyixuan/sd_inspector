import React from 'react';
import ReactDOM from 'react-dom';
import { Tag, Icon, Divider } from 'antd';
import moment from 'moment';
import styles from './index.less';

const dateFormat = 'YYYY.MM.DD';
export default class ButtonGroup extends React.Component {
    state = {
        isShowFiexd: false,
        expand: false,

    }
    componentDidMount() {
        window.addEventListener('scroll', this.pageOnscroll);
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
            this.setState({ isShowFiexd: !isShowFiexd, expand: false });
        } else if (pageTop <= top && isShowFiexd) {
            this.setState({ isShowFiexd: !isShowFiexd, expand: false });
        }
    }
    onClose = (keyName, data) => {
        const { params } = this.props;
        let value = undefined;
        switch (keyName) {
            case 'fromDevice':
                value = params['fromDevice'].filter(item => item.value !== data.value)
                break;
            case 'fromApp':
                value = params['fromApp'].filter(item => item.value !== data.value)
                break;
            default:
                value = undefined;
                break;
        }
        if (this.props.onDelete) {
            this.props.onDelete(keyName, value)
        }
    }
    renderDateTags = (date, key, name) => {
        const { isShowFiexd } = this.state;
        let [startTime, endTime] = date;
        startTime = moment(startTime).format(dateFormat);
        endTime = moment(endTime).format(dateFormat);
        return (<span key={name} className={styles.tags} ><Tag closable={!isShowFiexd} onClose={() => !isShowFiexd ? this.onClose(key, date) : null}>{name}:{`${startTime}~${endTime}`}</Tag></span>)
    }
    renderGrouptags = (item, key) => {
        const { isShowFiexd } = this.state;
        const orgName = item.map(item => item.name).join('/');
        return (<span key={orgName} className={styles.tags}><Tag closable={!isShowFiexd} onClose={() => !isShowFiexd ? this.onClose(key, item) : null}>{orgName}</Tag></span>)

    }
    renderTypeTage = (obj, key, color = '#F4F4F4') => {
        const { isShowFiexd } = this.state;
        if (obj.value === null || obj.value === undefined) return null;
        return (<span key={obj.name + obj.value} className={styles.tags}><Tag closable={!isShowFiexd} color={color} onClose={() => !isShowFiexd ? this.onClose(key, obj) : null}>{obj.name}</Tag></span>)
    }
    checkoutTypeTage = (key, item) => {
        let returnDom = null;
        switch (key) {
            case 'fromDevice':
                returnDom = (Array.isArray(item) && item.length > 0) ? item.map(ls => this.renderTypeTage(ls, 'fromDevice', '#E9F4FF')) : null
                break;
            case 'fromApp':
                returnDom = (Array.isArray(item) && item.length > 0) ? item.map(ls => this.renderTypeTage(ls, 'fromApp', '#FFF9E9')) : null
                break;
            case 'registerTime':
                returnDom = (Array.isArray(item) && item.length > 0) ? this.renderDateTags(item, 'registerTime', '注册时间') : null
                break;
            case 'choiceLessonStatus':
                returnDom = item ? this.renderTypeTage(item, 'choiceLessonStatus') : null
                break;
            case 'publicLesson':
                returnDom = item ? this.renderTypeTage(item, 'publicLesson') : null
                break;
            case 'publicChoiceLessonTime':
                returnDom = (Array.isArray(item) && item.length > 0) ? this.renderDateTags(item, 'publicChoiceLessonTime', '选课时间') : null
                break;
            case 'certificateChoiceLesson':
                returnDom = item ? this.renderTypeTage(item, 'certificateChoiceLesson') : null
                break;
            case 'certificateChoiceLessonTime':
                returnDom = (Array.isArray(item) && item.length > 0) ? this.renderDateTags(item, 'certificateChoiceLessonTime', '选课时间') : null
                break;
            case 'attendanceStatus':
                returnDom = item ? this.renderTypeTage(item, 'attendanceStatus') : null
                break;
            case 'attendanceNum':
                returnDom = item ? this.renderTypeTage(item, 'attendanceNum') : null
                break;
            case 'listenLessonTime':
                returnDom = item ? this.renderTypeTage(item, 'listenLessonTime') : null
                break;
            case 'payOrder':
                returnDom = item ? this.renderTypeTage(item, 'payOrder') : null
                break;
            case 'orderMoney':
                returnDom = item ? this.renderTypeTage(item, 'orderMoney') : null
                break;
            case 'koOrderGap':
                returnDom = item ? this.renderTypeTage(item, 'koOrderGap') : null
                break;
            case 'frontBelong':
                returnDom = item ? this.renderGrouptags(item, 'frontBelong') : null
                break;
            case 'backBelong':
                returnDom = item ? this.renderGrouptags(item, 'backBelong') : null
                break;
            default:
                returnDom = null;
                break
        }
        return returnDom;

    }
    renderChooseTags = () => {
        const { params = {} } = this.props;
        const returnNode = Object.keys(params).map(item => {
            return (params[item] !== null || params[item] !== undefined) && this.checkoutTypeTage(item, params[item]);
        });
        return returnNode;
    }
    renderFixedBox = () => {
        const { expand } = this.state;
        return (
            <>
                <div className={`${styles.buttonGroup} ${expand ? styles.buttonGroupFixed1 : styles.buttonGroupFixed}`}>
                    {this.renderChooseTags()}
                </div>
            </>
        )
    }
    renderTag = () => {
        return (
            <div className={styles.tags}>

            </div>
        )
    }
    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    };
    render() {
        const { isShowFiexd, expand, is2Lines } = this.state;
        const children = this.renderChooseTags();
        const isHasChoose = children.filter(item => item).length > 0;



        return (
            !isHasChoose ? null :
                <div className={styles.fixedStyle} ref={dom => this.tagsDom = dom}>
                    <div className={`${styles.groupContainer} ${isShowFiexd ? styles.groupContainerFixed : ''}`}>
                        <div className={styles.tagContent} ref={dom => this.tagsContent = dom}>
                            <span className={styles.gropLabel}>已选条件:</span>
                            {isShowFiexd ? this.renderFixedBox() : (<div className={`${styles.buttonGroup}`}>
                                {children}
                            </div>)}
                        </div>
                        {isShowFiexd ? <Divider className={styles.collapCls} dashed onClick={this.toggle}>{expand ? '收起' : '展开'} <Icon type={expand ? 'up' : 'down'} /></Divider> : null}

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
