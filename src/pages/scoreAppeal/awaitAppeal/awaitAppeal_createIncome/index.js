import React from 'react';
import CSTab from '@/pages/scoreAppeal/components/CSTab';
import CSForm from '@/pages/scoreAppeal/components/Form';
class AwaitAppealCreateIncome extends React.Component {
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
        <CSTab currentIndex={5}  currentMenu={'awaitAppeal'}/>
        <CSForm {...this.props} menuType={1} tabType={4}></CSForm>
      </>
    );
  }
}

export default AwaitAppealCreateIncome;
