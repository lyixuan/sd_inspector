import { STATIC_HOST } from '@/utils/constants';
import AuthorizedButton from './AuthorizedButton';
import { formatDate } from '../utils/util';
import { BOTTOM_TABLE_STATUS } from '../constants/constant';
import packSucess from '@/assets/downloadCenter/packSucess.svg';
import packError from '@/assets/downloadCenter/packError.svg';
import compress from '@/assets/downloadCenter/compress.svg';
import packing from '@/assets/downloadCenter/packing.svg';
import DownLoad from './downLoad';

function postTraceData(type) {
  let obj;
  if (type === 0) {
    obj = {widgetName:"学分明细页督学表下载",traceName:"学分明细/学分底表下载"};
  } else if (type === 2) {
    obj = {widgetName:"下载中心督学表下载",traceName:"学分明细/督学底表下载"};
  } else {

  }
  const {BI = {}} = window;
  BI.traceV && BI.traceV(obj)
}

// 获取table列表头
export function columnsFn() {
  const imgArr = [packing, packSucess, packError];
  const columns = [
    {
      title: '底表名称',
      dataIndex: 'taskName',
      render: text => {
        return (
          <>
            <img src={compress} alt="compress" style={{ marginRight: '8px' }} />
            {text}
          </>
        );
      },
    },
    // {
    //   title: '底表类型',
    //   dataIndex: 'type',
    //   render: text =>
    //     BOTTOM_TABLE_LIST.map(item => {
    //       if (item.id !== '' && Number(item.id) === text) {
    //         return item.name;
    //       }
    //       return null;
    //     }),
    // },
    {
      title: '底表时间',
      dataIndex: 'bottomTime',
      // render: text => formatDate(text).substr(0, 10),
      render: text => text,
    },
    {
      title: '添加时间',
      dataIndex: 'createTime',
      render: text => formatDate(text),
    },
    {
      title: '任务状态',
      dataIndex: 'status',
      render: text => {
        return (
          <>
            <img src={imgArr[text]} alt="packError" style={{ marginRight: '8px' }} />
            {BOTTOM_TABLE_STATUS.map(item => {
              if (Number(item.id) === text) {
                return item.name;
              }
              return null;
            })}
          </>
        );
      },
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (text, record) => {
        return (
          <>
            {Number(record.status) !== 1 ? null : (
              <AuthorizedButton authority="/bottomTable/downloadBottomTable">
                <div
                  style={{
                    color: '#52C9C2',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-around',
                  }}
                >
                  <div onClick={postTraceData.bind(null, record.type)}>
                    <DownLoad
                      loadUrl={`${STATIC_HOST}${record.zipPath}`}
                      fileName={() => record.taskName}
                    />
                  </div>
                  {/* <span style={{ marginRight: '8px' }}>下载</span> */}
                  {/* <div style={{ width: '32px' }}> */}
                  {/* <Progress percent={percent} showInfo={false} /> */}
                  {/* </div> */}
                </div>
              </AuthorizedButton>
            )}
          </>
        );
      },
    },
  ];
  return columns || [];
}
