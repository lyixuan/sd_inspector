import * as React from 'react';
const styles = require('./styles/index.less');

export interface Props {
    name?: string,
    enthus?: number,
}
class Greeter<T> {
    greeting: T;
    constructor(message: T) {
        this.greeting = message;
    }
    greet(arg: T): T {
        return this.greeting;
    }
}

export default class CommonForm extends React.Component<Props, object>{
    constructor(props: Props) {
        super(props);
    }
    render() {
        return (
            <div className={styles.formCotainer}>form区域</div>
        )
    }
}