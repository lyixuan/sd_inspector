import * as React from 'react';
const styles = require('./styles/index.less');

export interface Props {
    name?: string,
    enthus?: number,
}
export default class CommonForm extends React.Component<Props, object>{
    render() {
        return (
            <div className={styles.formCotainer}>form区域</div>
        )
    }
}