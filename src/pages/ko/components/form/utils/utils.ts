import { runInThisContext } from "vm";

interface ChooseType {
    type: string,
    value: number,
    minValue: number,
    maxValue: number,
}
interface FrontBelong {
    businessId: number | null | undefined,
    legionId: number | null | undefined,
}
interface BackBelong {
    collegeId: number | null | undefined,
    familyId: number | null | undefined,
    groupId: number | null | undefined,
}
interface ParamsType {
    fromDevice?: number[] | null | undefined,
    fromApp?: number[] | null | undefined,
    registerTime?: number[] | null | undefined,
    choiceLessonStatus?: number | null | undefined,
    publicLesson?: number | null | undefined,
    publicChoiceLessonTime?: string[] | null | undefined,
    certificateChoiceLesson?: string | null | undefined,
    certificateChoiceLessonTime?: string[] | null | undefined,
    attendanceStatus?: number | null | undefined,
    attendanceNum?: ChooseType | null | undefined,
    listenLessonTime?: ChooseType | null | undefined,
    payOrder?: number | null | undefined,
    orderMoney?: ChooseType | null | undefined,
    koOrderGap?: ChooseType | null | undefined,
    frontBelong?: FrontBelong | null | undefined,
    backBelong?: BackBelong | null | undefined,
}
export class FormParams {
    public initParams: ParamsType = {
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
    }
}