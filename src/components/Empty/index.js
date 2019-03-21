import { Empty } from 'antd';

export default function EmptyComponty(props) {
    const { isEmpty } = props;
    return isEmpty ? (<Empty />) : null;
}