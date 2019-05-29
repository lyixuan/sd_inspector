import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';
import CSForm from '@/pages/scoreAppeal/awaitAppeal/components/Form';
class FinishAppealSpecialNewer extends React.Component {
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
        <CSTab currentIndex={1} currentMenu={'finishAppeal'}/>
        <CSForm {...this.props} menuType={2} tabType={1}></CSForm>
      </>
    );
  }
}

export default FinishAppealSpecialNewer;
