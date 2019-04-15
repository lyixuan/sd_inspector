import React from 'react';
import BIDatePicker from '@/ant_components/BIDatePicker';
import BISelect from '@/ant_components/BISelect';
import { BiFilter } from '@/utils/utils';
import styles from './style.less';
import formStyles from '../formCommon.less';
const { BIRangePicker } = BIDatePicker;
const dateFormat = 'YYYY.MM.DD';
const { Option } = BISelect;

export default class KoForm extends React.Component {
  constructor(props) {
    super(props);
    this.init = {
      appVer: '1',
      beginDate: undefined,
      endDate: undefined,
    };
    this.state = {...this.init};
  }
  onFormChange = (value,vname)=>{
    // todo
    // 1、选择页面为商城列表或KO计划页面时，详情页面展示，否则隐藏，清除选中值
    // 2、所有的change都触发请求
    // 选择页面默认值：首页，详情页面默认值:无
    if ('dateRange' === vname ) {
      this.setState({
        beginDate:value[0],
        endDate:value[1],
      });
    } else {
      this.setState({
        [vname]:value
      });
    }
  };
  render() {
    const {appVer} = this.state;
    const {appPage,appPageList=[]} = this.props;
    return (
      <div>
        <div className={`${styles.searchBlock} ${formStyles.formStyle}`}>
          {/*第一行*/}
          <div className={styles.rowWrap}>
            <div className={styles.itemCls}>
              <span className={styles.gutterLabel}>选择时间:</span>
              <span className={styles.gutterForm}>
                <BIRangePicker style={{width:'140px'}} placeholder={["起始时间","截止时间"]} format={dateFormat}/>
              </span>
            </div>
            <div className={styles.itemCls}>
              <span className={styles.gutterLabel}>选择应用:</span>
              <span className={styles.gutterForm}>
                <BISelect style={{width:'140px'}} placeholder="请选择"  value={appVer} onChange={(val)=>this.onFormChange(val,'appVer')}>
                  {BiFilter('APP_LIST').map(item => (
                    <Option key={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </BISelect>
              </span>
            </div>
            <div className={styles.itemCls}>
              <span className={styles.gutterLabel}>选择页面:</span>
              <span className={styles.gutterForm}>
                <BISelect style={{width:'140px'}} placeholder="请选择"  value={appPage} onChange={(val)=>this.onFormChange(val,'appPage')}>
                   {appPageList.map(item => (
                     <Option key={item.id}>
                       {item.name}
                     </Option>
                   ))}
                </BISelect>
              </span>
            </div>
            <div className={styles.itemCls}>
              <span className={styles.gutterLabel}>详情页面:</span>
              <span className={styles.gutterForm}>
                <BISelect style={{width:'140px'}} allowClear placeholder="请选择" />
              </span>
            </div>
            <div className={styles.itemCls}>
              &nbsp;
            </div>
          </div>
        </div>
      </div>
    );
  }
}
