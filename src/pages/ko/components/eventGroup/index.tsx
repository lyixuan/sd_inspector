import React from 'react';
import { Tag } from 'antd';
import styles from './styles.less';

interface Item {
    id: string, name: string
}
interface Props {
    data: Item[],
    visible?: boolean,
    onChange: (item: Item) => void,
}
export default class EventGroup extends React.Component<Props> {
    onClose = (item: Item): void => {
        this.props.onChange && this.props.onChange(item);
    }
    renderTypeTage = (data: Item[]) => {
        return data.map(item => <span key={item.id} className={styles.tags}><Tag onClose={this.onClose.bind(this, item)} closable>{item.name}</Tag></span>)
    }
    render() {
        const { visible = true, data = [] } = this.props;
        return (
            !visible || data.length === 0 ? null :
                <span className={styles.eventCotainer}>{this.renderTypeTage(data)}</span>
        )
    }
}