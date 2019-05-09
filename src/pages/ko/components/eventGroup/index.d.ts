import React from 'react';
interface Item {
    id: string;
    name: string;
}
interface Props {
    data: Item[];
    visible?: boolean;
    onChange: (item: Item) => void;
}
export default class EventGroup extends React.Component<Props> {
    onClose: (item: Item) => void;
    renderTypeTage: (data: Item[]) => JSX.Element[];
    render(): JSX.Element | null;
}
export {};
