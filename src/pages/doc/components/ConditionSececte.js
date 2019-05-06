import React, { Component } from 'react';
import { Divider, Input } from 'antd';

import Box from '../Box';
import Left from '../Left';
import Right from '../Right';

import ConditionSelect from '@/ant_components/ConditionSelect';
import { UNIT_DATE } from '@/utils/constants';

const optionsData = [{ type: 2, value: 60, minValue: null, maxValue: null, unit: 'hh', unitType: 'date' }, { type: 3, value: 60, minValue: null, maxValue: null, unit: 'hh', unitType: 'date' }, { type: 5, value: 60, minValue: 60, maxValue: null, unit: 'hh', unitType: 'date' }]
const { TextArea } = Input;

class DocSelect extends Component {

    handleChange = (value) => {
        console.log(`selected ${value}`);
    };


    render() {
        const val =
            `import BISelect from '@/ant_components/BISelect';

<BISelect defaultValue="lucy" style={{ width: 200 }} onChange={this.handleChange}>
  <BISelect.Option value="jack">Jack</BISelect.Option>
  <BISelect.Option value="lucy">Lucy</BISelect.Option>
</BISelect>`;

        return (
            <Box title="BISelect 选择器">
                <Left>
                    {/* <BISelect defaultValue="lucy" style={{ width: 200 }} onChange={this.handleChange}>
                        <BISelect.Option value="jack">Jack</BISelect.Option>
                        <BISelect.Option value="lucy">Lucy</BISelect.Option>
                    </BISelect> */}
                    <ConditionSelect options={optionsData} unitData={UNIT_DATE} defaultUnit={{ id: 'hh', name: '小时' }} />

                    <Divider orientation="left"> 组件说明 </Divider>

                    <div>
                        API 同 <a href="https://ant.design/components/select-cn/" target="view_window">Ant Select</a>
                    </div>

                </Left>
                <Right>
                    <TextArea rows={5} defaultValue={val} />
                </Right>
            </Box>
        )
    }
}

export default DocSelect;

