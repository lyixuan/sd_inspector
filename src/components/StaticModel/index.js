// import Model from '../../ant_components/BIModal';
import { Modal } from 'antd';


class StaticModel {
    constructor() {
        StaticModel.show = this.show;
    }
    show = () => {
        Modal.info({
            title: '<div>fjsdjfshfsh</div>',
            content: (
                <div>
                    <p>some messages...some messages...</p>
                    <p>some messages...some messages...</p>
                </div>
            ),
        })
    }
}


// StaticModel.show = function () {

// }
export default StaticModel
