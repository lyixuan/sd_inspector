import React from 'react';
import styles from '../style.less';
import { Button, Popover, Modal, Icon} from 'antd';
import BITable from '@/ant_components/BITable';
import BIPagination from '@/ant_components/BIPagination';
import InputComponent from '@/pages/configWords/components/inputComponent';

class Keywords extends React.Component{
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '序号',
        dataIndex: 'sort',
        key: 'sort',
        width: 98,
        align: 'center'
      },
      {
        title: '关键词',
        dataIndex: 'keyWords',
        key: 'keyWords'
      },
      {
        title: '引导问题数量',
        dataIndex: 'count',
        key: 'count',
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
                        className={styles["pop-item"]} key={item.sort}>
                        {item}
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
        dataIndex: 'time',
        key: 'time'
      },
      {
        title: '操作人',
        dataIndex: 'who',
        key: 'who'
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
            onClick={this.handleFormEdit.bind(this, data)}>编辑</span>
              <span
                className={styles['default-color']}
                onClick={this.handleFormDelete.bind(this, data.sort)}>删除</span>
            </div>
          );
        },
      },
    ];
    this.modalTitle = (
      <p style={{marginBottom: 0, height: 24, lineHeight: "24px"}}>
        <Icon
          type="exclamation-circle"
          style={{color: "#FFBC00", fontSize: 24, marginRight: 9}}
          theme="filled" />
        <span>删除关键词</span>
      </p>
    );
    this.modelFooter = (
      <div className={styles['modal-footer']}>
        <Button
          className={styles['modal-btn-cancel']}
          onClick={this.handleModalCancel}>取消</Button>
        <Button
          className={styles['modal-btn-delete']}
          type="danger"
          onClick={this.handleModalOk}>删除</Button>
      </div>
    );
    this.state = {
      pageSize: 30,
      showModal: false,
      deleteId: null
    }
  }

  render() {
    const {formData, total} = this.props;
    const {pageSize, showModal} = this.state;

    return (
      <div className={styles.keywords}>
        {/*输入框和配置按钮部分*/}
        <div className={styles['input-part']}>
          <InputComponent
            resultCount={formData.length}
            onChange={this.handleSearchChange}
            onSearch={this.handleSearch}
            onReset={this.handleSearchReset}/>
          <Button className={styles.config} icon='plus'>配置关键词</Button>
        </div>
        {/*表格部分*/}
        <div className={styles['form-part']}>
          <BITable dataSource={formData} columns={this.columns} pagination={false}>
          </BITable>
        </div>
        {/*分页器部分*/}
        <div className={styles['pagination-part']}>
          <BIPagination
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
          visible={showModal}
          closable={false}
          title={this.modalTitle}
          width={432}
          footer={this.modelFooter}
          wrapClassName={styles['my-modal']}
          onCancel={this.handleModalCancel}>
          <p style={{marginBottom: 0}}>是否要删除，该关键词及引导问题</p>
        </Modal>
      </div>
    )
  }

  // 当搜索框内容变化时
  handleSearchChange = (value) => {
    console.log(value)
  };

  //当搜索框搜索时
  handleSearch = (value) => {
    console.log(value)
  };

  // 当搜索框重置时
  handleSearchReset = () => {
    console.log('reset')
  };

  // 当编辑某一行的内容时
  handleFormEdit = (item) => {
    console.log(item)
  };

  // 当删除某一行的内容时
  handleFormDelete = (id) => {
    this.setState({
      deleteId: id,
      showModal: true
    })
  };

  // 当分页器页码变化时
  handlePageChange = (page, pageSize) => {
    console.log(page, pageSize)
  };

  // 当分页器pagesize变化时
  handleSizeChange = (current, size) => {
    console.log(current, size)
    this.setState({
      pageSize: size
    })
  };

  // 点击删除弹框的确认按钮
  handleModalOk = () => {
    let {deleteId} = this.state;
    this.setState({
      showModal: false
    })
  };

  // 点击删除弹框的取消按钮
  handleModalCancel = () => {
    this.setState({
      showModal: false,
      deleteId: null
    })
  };
}

export default Keywords;
