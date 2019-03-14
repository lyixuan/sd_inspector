import React from 'react';
import { connect } from 'dva';
import BIInput from '@/ant_components/BIInput';
import BISelect from '@/ant_components/BISelect';
import BIButton from '@/ant_components/BIButton';
import BIButtonYellow from '@/components/BIButtonYellow';
import BIButtonBlue from '@/components/BIButtonBlue';
import BITable from '@/ant_components/BITable';
import { BiFilter, DeepCopy } from '@/utils/utils';
import { Row, Col } from 'antd';
import styles from './style.less'
const { Option } = BISelect;

@connect(({ newQuality }) => ({
  newQuality,
}))

class NewQualitySheet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    // 获取数据
    this.props.dispatch({
      type: 'dataDetail/getExamList',
      payload: { params: {} },
    });
  }
  render() {
    return (
      <div className={styles.newSheetWrap}>
        <div className={styles.searchBlock}>
          <Row gutter={0}>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">col-6</div>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">col-6</div>
            </Col>
          </Row>
          <Row gutter={0}>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">col-6</div>
            </Col>
            <Col className="gutter-row" span={8}>
              <div className="gutter-box">col-6</div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default NewQualitySheet;
