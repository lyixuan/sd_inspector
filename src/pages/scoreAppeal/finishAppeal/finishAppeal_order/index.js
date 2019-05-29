import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';
import CSForm from '@/pages/scoreAppeal/awaitAppeal/components/Form';
class FinishAppealOrder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
  }

  render() {
    return (
      <>
        <CSTab currentIndex={3} currentMenu={'finishAppeal'} />
        <CSForm {...this.props} menuType={2} tabType={3}></CSForm>
      </>
    );
  }
}

export default FinishAppealOrder;
