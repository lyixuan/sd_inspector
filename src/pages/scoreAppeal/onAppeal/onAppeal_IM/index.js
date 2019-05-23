import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';
import CSForm from '@/pages/scoreAppeal/components/Form';
class OnAppealIM extends React.Component {
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
        <CSTab currentIndex={2} currentMenu={'onAppeal'}/>
        <CSForm {...this.props} menuType={2} tabType={3}></CSForm>
      </>
    );
  }
}

export default OnAppealIM;
