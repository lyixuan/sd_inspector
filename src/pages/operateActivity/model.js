export default {
  namespace: "operateActivity",
  state: {
    relateQuestion: {
      question: '',
      simple: '',
      content: ''
    }
  },
  reducers: {
    changeRelateQuestion(state, {payload}) {
      return {
        ...state,
        relateQuestion: payload
      }
    }
  }
}
