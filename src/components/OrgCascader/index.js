import React from 'react';
import BICascader from '@/ant_components/BICascader';
import './styles.less';


/*
*  @params options   组织列表可按照ant组件进行配置
*  @params level     根据组织过滤显示对应的层级
*/


//nodeList
function ergodicData(data, level, nodeListName = 'children', j = 1) {
    const returnData = [];
    if (!Array.isArray(data) || data.length === 0) return;
    for (let i = 0, len = data.length; i < len; i += 1) {
        const item = data[i];
        item.level = j;
        if (item[nodeListName] && item[nodeListName].length > 0) {
            const nextLevel = item.level + 1;
            item[nodeListName] = j < level ? ergodicData(item[nodeListName], level, nodeListName, nextLevel) : [];
        }
        returnData.push(item);
    }
    return returnData;
}

class OrgCascader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: props.options || [],
        }
    }
    componentDidMount() {
        const { level = 0, options = [] } = this.props;
        this.saveOptions(options, level);
    }
    componentWillReceiveProps(nextProps) {
        if (JSON.stringify(nextProps.level) !== JSON.stringify(this.props.level) || JSON.stringify(nextProps.options) !== JSON.stringify(this.props.options)) {
            const { level = 0, options } = nextProps || {};
            this.saveOptions(options, level);
        }
    }

    onChange = (...argu) => {
        if (this.props.onChange) {
            this.props.onChange(...argu)
        }
    }
    handleGroupLevel = (options, num) => {
        if (!num || !options) return options || [];
        const { fieldNames = {} } = this.props;
        const { children = 'children' } = fieldNames;
        const deepCopyData = JSON.parse(JSON.stringify(options));
        return ergodicData(deepCopyData, Number(num), children)
    }

    saveOptions = (options, level) => {
        const newOptions = this.handleGroupLevel(options, level);
        this.setState({ options: newOptions })
    }

    render() {
        const { options } = this.state;
        const { level } = this.props;
        return (
            <BICascader
                style={{ width: 280, height: 32 }}
                {...this.props}
                options={options}
                onChange={this.onChange}
                disabled={Number(level) === 0}
            />

        )
    }
}
export default OrgCascader;

