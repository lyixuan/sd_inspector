"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FormParams {
    constructor() {
        this.initParams = {
            fromDevice: [],
            fromApp: [],
            registerTime: [],
            choiceLessonStatus: undefined,
            publicLesson: undefined,
            publicChoiceLessonTime: [],
            certificateChoiceLesson: undefined,
            certificateChoiceLessonTime: [],
            attendanceStatus: undefined,
            attendanceNum: undefined,
            listenLessonTime: undefined,
            payOrder: undefined,
            orderMoney: undefined,
            koOrderGap: undefined,
            frontBelong: undefined,
            backBelong: undefined,
        };
    }
}
exports.FormParams = FormParams;
