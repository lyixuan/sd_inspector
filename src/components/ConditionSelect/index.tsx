import React from 'react';
export interface Props {
    name?: string,
}
export class Condition extends React.Component<Props, object>{
    redurn() {
        return <div>2222</div>
    }
}