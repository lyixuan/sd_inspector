import * as React from 'react';
export interface Props {
    name?: string;
    enthus?: number;
}
export default class CommonForm extends React.Component<Props, object> {
    render(): JSX.Element;
}
