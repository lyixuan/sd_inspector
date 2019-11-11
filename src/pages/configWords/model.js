export default {
  namespace: 'configWords',
  state: {
    configData: {
      id: 0,
      keyWord: '',
      questionList: [
        {
          sort: 1,
          knowledgeId: 264,
          questionTypeId: 0,
          questionTypeName: '',
          questionId: 0,
          question: ''
        }
      ]
    },
    radioId: -1
  },
  reducers: {
    // 更改配置面板数据
    changeConfigData(state, {payload}) {
      return {
        ...state,
        configData: payload
      }
    },

    // 更改配置数据的keyword或者entityWord
    updateConfigKeywords(state, {payload}) {
      let data = JSON.parse(JSON.stringify(state)).configData;
      if (data.keyWord !== undefined) {
        data.keyWord = payload;
      }
      if (data.entityWordId !== undefined) {
        data.entityWordId = payload;
      }
      return {
        ...state,
        configData: data
      }
    },

    // 更改配置数据的word1 word2 wordType1 wordType2
    updateWords(state, {payload}) {
      let {id, flag} = payload;
      let data = JSON.parse(JSON.stringify(state)).configData;
      switch (flag) {
        case 1:
          data.word1Id = id;
          break;
        case 2:
          data.word2Id = id;
          break;
        case 3:
          data.word1Type = id;
          data.word1Id = 0;
          break;
        case 4:
          data.word2Type = id;
          data.word2Id = 0;
          break;
        default :
          break;
      }
      return {
        ...state,
        configData: data
      }
    },

    // 更改配置数据的引导问题列表的某一项的knowledgeId
    updateKnowledgeId(state, {payload}) {
      let {sort, value} = payload;
      let data = JSON.parse(JSON.stringify(state)).configData;
      data.questionList.forEach(item => {
        if (item.sort === sort) {
          item.knowledgeId = value;
          item.questionTypeId = 0;
          item.questionId = 0;
        }
      });
      return {
        ...state,
        configData: data
      }
    },

    // 更改配置数据的引导问题列表的某一项的questionTypeId
    updateQuestionTypeId(state, {payload}) {
      let {sort, value} = payload;
      let data = JSON.parse(JSON.stringify(state)).configData;
      console.log(value);
      data.questionList.forEach(item => {
        if (item.sort === sort) {
          item.questionTypeId = value;
          item.questionId = 0;
          item.question = '';
        }
      });
      return {
        ...state,
        configData: data
      }
    },

    // 更改配置数据的引导问题列表的某一项的questionId
    updateQuestionId(state, {payload}) {
      let {sort, value, question, questionTypeId} = payload;
      let data = JSON.parse(JSON.stringify(state)).configData;
      data.questionList.forEach(item => {
        if (item.sort === sort) {
          // item.questionTypeId = questionTypeId;
          item.questionId = value;
          item.question = question;
        }
      });
      return {
        ...state,
        configData: data
      }
    },

    // 给配置面板数据增加新的一条
    addConfigData(state, {payload}) {
      let length = state.configData.questionList.length;
      let newData = JSON.parse(JSON.stringify(state.configData));
      newData.questionList.push({
            sort: length + 1,
            knowledgeId: 264,
            questionTypeId: 0,
            questionId: 0,
            question: ''
          });
      return {
        ...state,
        configData: newData
      }
    },

    // 改变选中要调整顺序的引导问题ID
    changeRadioId(state, {payload}) {
      let {radioId} = state;
      payload = payload === radioId ? -1 : payload;
      return {
        ...state,
        radioId: payload
      }
    },

    // 恢复默认的radioId
    resetRadioId(state) {
      return {
        ...state,
        radioId: -1
      }
    },

    // 删除某一条引导问题
    deleteGuideQuestion(state, {payload}) {
      let data = JSON.parse(JSON.stringify(state)).configData;
      data.questionList = data.questionList.filter((item) => {
        return item.sort !== Number(payload)
      });
      data.questionList.forEach((item, index) => {
        item.sort = index + 1
      });
      return {
        ...state,
        configData: data
      }
    },

    // 将选中的引导问题上移一位
    moveUpQuestion(state) {
      let {radioId, configData} = JSON.parse(JSON.stringify(state));
      let {questionList} = configData;
      for (let i = 0; i < questionList.length; i++) {
        if (questionList[i].questionId === radioId) {
          let cur = questionList[i];
          questionList[i] = questionList[i-1];
          questionList[i].sort = questionList[i].sort + 1;
          questionList[i-1] = cur;
          questionList[i-1].sort = questionList[i-1].sort - 1;
        }
      }
      return {
        ...state,
        configData: configData
      }
    },

    // 将选中的引导问题下移一位
    moveDownQuestion(state) {
      let {radioId, configData} = JSON.parse(JSON.stringify(state));
      let {questionList} = configData;
      for (let i = 0; i < questionList.length; i++) {
        if (questionList[i].questionId === radioId) {
          let cur = questionList[i];
          questionList[i] = questionList[i+1];
          questionList[i].sort = questionList[i].sort - 1;
          questionList[i+1] = cur;
          questionList[i+1].sort = questionList[i+1].sort + 1;
          break;
        }
      }
      return {
        ...state,
        configData: configData
      }
    }

  }
};
