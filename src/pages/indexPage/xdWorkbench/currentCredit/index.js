import React from 'react';
import { connect } from 'dva';
import styles from './style.less'
import Container from '../../components/container'
import CurrentCreditLeft from './currentCreditLeft'
import CurrentCreditRight from './currentCreditRight';
import BIContrastCell from '@/components/BIContrastCell';

@connect(({ xdWorkModal, loading }) => ({
  xdWorkModal,
}))
class currentCredit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      PkName: '',
      PkSelfId: 1,
      groupId: "",
      selfName: '',
      selfSource: '',
      pkGroupSource: ''
    }
  }
  componentDidMount() {
    const pkGroup = JSON.parse(localStorage.getItem('pkGroup'))
    this.setState({
      PkName: pkGroup && pkGroup.groupName,
      groupId: pkGroup ? pkGroup.groupId : 0,
      pkGroupSource: pkGroup && pkGroup.credit
    })
  }
  componentWillMount() {
    const pkGroup = JSON.parse(localStorage.getItem('pkGroup'))
    this.setState({
      PkName: pkGroup && pkGroup.groupName,
      groupId: pkGroup ? pkGroup.groupId : 0,
      pkGroupSource: pkGroup && pkGroup.credit
    })
  }
  clickRow = (data) => {
    this.setState({
      groupId: data && data.groupId ? data.groupId : 0,
    })

    if (data && data.groupId) {
      localStorage.setItem('pkGroup', JSON.stringify(data))
    }
  }

  render() {
    const { PkSelfId, groupId, selfName, selfSource } = this.state
    return (
      <Container
        title='本期学分'
        style={{ width: '100%', marginBottom: '16px' }}
      >
      {BIContrastCell.colorContrast({nums:[1,1,1,2,3,4,5,5,0,9] })}
      {BIContrastCell.colorContrast({nums:[-0.55, -4.50, -1.10, -1.62, 0, -5.23], isReversed: true })}
      <BIContrastCell nums={[-0.55, -4.50, -1.10, -1.62, 0, -5.23]}  text={-5.23}/>
        <div className={styles.creditContainer}>
          <CurrentCreditLeft groupId={groupId} selfName={selfName} selfSource={selfSource} userData={this.userData} />
          <CurrentCreditRight PkSelfId={PkSelfId} clickRow={this.clickRow} />
        </div>
      </Container>
    );
  }
}

export default currentCredit;
