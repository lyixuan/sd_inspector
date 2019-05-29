import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';
import CSForm from '@/pages/scoreAppeal/awaitAppeal/components/Form';
class OnAppealBaseLine extends React.Component {
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
        <CSTab currentIndex={4}  currentMenu={'onAppeal'}/>
        <CSForm {...this.props} menuType={2} tabType={4}></CSForm>
      </>
    );
  }
}

export default OnAppealBaseLine;
