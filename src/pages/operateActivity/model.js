export default {
  namespace: "operateActivity",
  state: {
    activityId: 0,
    relateQuestion: {
      sort: 0,
      question: '',
      questionShortName: '',
      answerText: ''
    }
  },
  reducers: {
    changeActivityId(state, {payload}) {
      return {
        ...state,
        activityId: payload
      }
    },

    changeRelateQuestion(state, {payload}) {
      return {
        ...state,
        relateQuestion: payload
      }
    }
  }
}
