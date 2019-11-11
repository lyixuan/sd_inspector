import React from 'react';
import {connect} from 'dva';
import styles from '../style.less';
import {
  Button,
  Popover,
  Modal,
  Icon} from 'antd';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import InputComponent from '@/pages/configWords/components/inputComponent';
import ConfigModal from '@/pages/configWords/components/configModal';
import {
  getCombineWordsList,
  saveCombineConfig,
  deleteCombineConfig} from '@/pages/configWords/services';
import {formatTime} from '@/pages/configWords/utils/util';

class CombineWords extends React.Component{
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'number',
        key: 'number',
        width: 98,
        align: 'center'
      },
      {
        title: '组合词',
        dataIndex: 'combine',
        key: 'combine',
        render: (combine) => {
          return <div>
            <span style={{marginRight: 8}}>{combine.word1}</span>
            <span>{combine.word2}</span>
          </div>
        }
      },
      {
        title: '引导问题数量',
        dataIndex: 'questionList',
        key: 'questionList',
        render: (count) => {
          return (
            <Popover
              className={styles['form-pop']}
              placement="bottomLeft"
              content={(
                <ul className={styles["pop-panel"]}>
                  {
                    count.map(item => {
                      return <li
                        className={styles["pop-item"]}>
                        {item.question}
                      </li>;
                    })
                  }
                </ul>
              )}
              trigger="hover">
              <span className={styles['default-color']}>{count.length}</span>
            </Popover>
          );
        },
      },
      {
        title: '修改时间',
        dataIndex: 'updateTime',
        key: 'updateTime'
      },
      {
        title: '操作人',
        dataIndex: 'operatorName',
        key: 'operatorName'
      },
      {
        title: '操作',
        key: 'action',
        render: (data) => {
          return (
            <div>
          <span
            style={{ marginRight: 10 }}
            className={styles['default-color']}
            onClick={this.editForm.bind(this, data)}>编辑</span>
              <span
                className={styles['default-color']}
                onClick={this.deleteForm.bind(this, data.id)}>删除</span>
            </div>
          );
        },
      },
    ];
    this.state = {
      searchWords: '',
      formData: [],
      tableLoading: true,
      total: 0,
      page: 1,
      pageSize: 30,
      showDeleteModal: false,
      showConfigModal: false,
      deleteId: null
    }
  }

  render() {
    const {
      searchWords,
      formData,
      tableLoading,
      total,
      page,
      pageSize,
      showDeleteModal,
      showConfigModal
    } = this.state;

    return (
      <div className={styles.keywords}>
        {/*输入框和配置按钮部分*/}
        <div className={styles['input-part']}>
          <InputComponent
            defaultValue={searchWords}
            resultCount={total}
            onSearch={this.handleSearch}
            onReset={this.handleSearchReset}/>
          <Button
            className={styles.config}
            icon='plus'
            onClick={this.AddConfigWords}>配置组合词</Button>
        </div>
        {/*表格部分*/}
        <div className={styles['form-part']}>
          <BITable
            loading={tableLoading}
            dataSource={formData}
            columns={this.columns}
            pagination={false}
            rowKey={record => record.id}>
          </BITable>
        </div>
        {/*分页器部分*/}
        <div className={styles['pagination-part']}>
          <BIPagination
            current={page}
            total={total}
            showTotal={total => `共 ${total} 条`}
            pageSize={pageSize}
            pageSizeOptions={['30', '50', '100']}
            showSizeChanger={true}
            showQuickJumper={true}
            onChange={this.handlePageChange}
            onShowSizeChange={this.handleSizeChange} />
        </div>
        {/*删除二次确认弹框*/}
        <Modal
          getContainer={false}
          visible={showDeleteModal}
          closable={false}
          title={
            <p className={styles['modal-title']}>
              <Icon
                type="exclamation-circle"
                className={styles['icon']}
                theme="filled" />
              <span>删除组合词</span>
            </p>
          }
          width={432}
          footer={
            <div className={styles['modal-footer']}>
              <Button
                className={styles['modal-btn-cancel']}
                onClick={this.handleDeleteModalCancel}>取消</Button>
              <Button
                className={styles['modal-btn-delete']}
                type="danger"
                onClick={this.handleDeleteModalOk}>删除</Button>
            </div>
          }
          wrapClassName={styles['delete-modal']}
          onCancel={this.handleDeleteModalCancel}>
          <p style={{marginBottom: 0}}>是否要删除，该组合词及引导问题</p>
        </Modal>
        {/*新增或编辑配置词弹框*/}
        <ConfigModal
          isShow={showConfigModal}
          title="配置组合词"
          onSave={this.handleConfigModalSave}
          onCancel={this.handleConfigModalClose}
          key={Math.random()} />
      </div>
    )
  }

  componentDidMount() {
    const {searchWords, page, pageSize} = this.state;
    this._getCombineWordsList(searchWords, page, pageSize);
  }

  //当搜索框搜索时
  handleSearch = (value) => {
    this.setState({
      searchWords: value
    });
    const {page, pageSize} = this.state;
    this._getCombineWordsList(value, page, pageSize)
  };

  // 当搜索框重置时
  handleSearchReset = () => {
    this.setState({
      searchWords: ''
    });
    const {page, pageSize} = this.state;
    this._getCombineWordsList('', page, pageSize)
  };

  // 添加配置词
  AddConfigWords = () => {
    this.props.dispatch({
      type: 'configWords/changeConfigData',
      payload: {
        id: 0,
        word1Id: 0,
        word2Id: 0,
        word1Type: 0,
        word2Type: 0,
        questionList: [
          {
            sort: 1,
            knowledgeId: 264,
            questionTypeName: '',
            questionTypeId: 0,
            questionId: 0,
            question: ''
          }
        ]
      }
    });
    this.setState({
      showConfigModal: true
    })
  };

  // 当编辑某一行的内容时
  editForm = (item) => {
    this.props.dispatch({
      type: 'configWords/changeConfigData',
      payload: item
    });
    this.setState({
      showConfigModal: true
    })
  };

  // 当删除某一行的内容时
  deleteForm = (id) => {
    this.setState({
      deleteId: id,
      showDeleteModal: true
    })
  };

  // 当分页器页码变化时
  handlePageChange = (page, pageSize) => {
    const {searchWords} = this.state;
    this._getCombineWordsList(searchWords, page, pageSize);
    this.setState({
      page: page,
      pageSize: pageSize
    });
  };

  // 当分页器pagesize变化时
  handleSizeChange = (current, size) => {
    const {searchWords} = this.state;
    this._getCombineWordsList(searchWords, current, size);
    this.setState({
      page: current,
      pageSize: size
    })
  };

  // 点击删除弹框的确认按钮
  handleDeleteModalOk = () => {
    let {deleteId} = this.state;
    this._deleteConfig(deleteId).then(() => {
      const {searchWords, page, pageSize} = this.state;
      this._getCombineWordsList(searchWords, page, pageSize);
    });
  };

  // 点击删除弹框的取消按钮
  handleDeleteModalCancel = () => {
    this.setState({
      showDeleteModal: false,
      deleteId: null
    })
  };

  // 监听配置弹框保存事件
  handleConfigModalSave = (configData) => {
    let {
      id,
      word1Id,
      word2Id,
      word1Type,
      word2Type,
      questionList} = configData;
    let data = {word1Id, word2Id, word1Type, word2Type, questionList};
    if (id) {
      data.id = id;
    }
    this._saveConfig(data).then(() => {
      const {searchWords, page, pageSize} = this.state;
      this._getCombineWordsList(searchWords, page, pageSize);
    });
  };

  // 点击配置弹框的关闭按钮或者蒙层
  handleConfigModalClose = () => {
    this.setState({
      showConfigModal: false
    });
  };

  // 获取组合词列表
  _getCombineWordsList = async (searchWords, page, pageSize) => {
    let res = await getCombineWordsList(searchWords, page, pageSize);
    if (res.code === 200) {
      res.data.items = this._formatFormData(res.data.items);
      this.setState({
        tableLoading: false,
        formData: res.data.items,
        total: res.data.totalCount
      })
    }
  };

  // 保存组合词配置
  _saveConfig = async (data) => {
    this.setState({
      showConfigModal: false
    });
    let res = await saveCombineConfig(data);
    if (res.code === 200) {}
  };

  // 删除组合词配置
  _deleteConfig = async (id) => {
    let res = await deleteCombineConfig(id);
    if (res.code === 200) {
      this.setState({
        showDeleteModal: false
      })
    }
  };

  // 给列表数据增加序号，处理时间戳，添加组合词对象
  _formatFormData = (data) => {
    const {page, pageSize} = this.state;
    let start = (page - 1 ) * pageSize + 1;
    data.forEach(item => {
      item.number = start;
      item.combine = {
        word1: item.word1,
        word2: item.word2
      };
      item.updateTime = formatTime(item.updateTime);
      start ++;
    });
    return data;
  };

}

export default connect(() => ({}))(CombineWords);
