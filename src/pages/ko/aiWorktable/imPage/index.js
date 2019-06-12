import React from 'react';
import AiForm from '@/pages/ko/aiWorktable/components/AiForm';
import AiList from '@/pages/ko/aiWorktable/components/AiList';
import { Spin } from 'antd';

class imPage extends React.Component {
  constructor(props) {
    super(props);
  }
  filterActionParams() {}
  changeFilterAction() {}
  isLoadEnumData() {}
  render() {
    return (
      <div>
        <AiForm {...this.props} originParams={{}} onChange={this.changeFilterAction} loading={true}></AiForm>
        <Spin spinning={false}>
          <AiList></AiList>
        </Spin>
      </div>
    );
  }
}

export default imPage;
