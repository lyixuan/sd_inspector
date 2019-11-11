import React from 'react';
import { connect } from 'dva';
import Container from '@/components/BIContainer';
import Appeal from './components/appeal';

// @connect(({ xdFamilyModal, loading }) => ({
//   familyAppeal: xdFamilyModal.familyAppeal || {},
//   loading: loading.effects['xdFamilyModal/getFamilyRecord'],
// }))
class AppalCom extends React.Component {
  render() {
    return (
      <Container title="本期申诉" style={{ width: '60%' }} propStyle={{ paddingLeft: '16px' }}>
        <Appeal />
      </Container>
    );
  }
}

export default AppalCom;
