import { OptionInterface } from './interface';
export declare const condition: any[];
export declare const unitData: any[];
export declare const handleDateValue: (option: OptionInterface) => {
    type: number;
    value: number | null | undefined;
    minValue: number | null | undefined;
    maxValue: number | null | undefined;
    unit?: string | undefined;
    unitName?: string | undefined;
};
export declare const handleOptionsName: (option: OptionInterface, unitOptions: any) => {
    name: string;
    type: number;
    value: number | null | undefined;
    minValue: number | null | undefined;
    maxValue: number | null | undefined;
    unit?: string | undefined;
    unitName?: string | undefined;
} | undefined;
