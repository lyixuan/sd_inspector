import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';
import CSForm from '@/pages/scoreAppeal/components/Form';
class OnAppealOrder extends React.Component {
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
        <CSTab currentIndex={3}  currentMenu={'onAppeal'} />
        <CSForm {...this.props} menuType={2} tabType={2}></CSForm>
      </>
    );
  }
}

export default OnAppealOrder;
