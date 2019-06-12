import React from 'react';
import AiForm from '@/pages/ko/aiWorktable/components/AiForm';

class imPage extends React.Component {
  filterActionParams() {}
  changeFilterAction() {}
  isLoadEnumData() {}
  render() {
    return (
      <div>
        <AiForm {...this.props} originParams={{}} onChange={this.changeFilterAction} loading={true}></AiForm>
      </div>
    );
  }
}

export default imPage;
