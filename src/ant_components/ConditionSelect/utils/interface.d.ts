export interface OptionInterface {
    type: number;
    value: number | null | undefined;
    minValue: number | null | undefined;
    maxValue: number | null | undefined;
    unit?: string;
    unitName?: string;
}
export interface unitInterface {
    id: number | string | null | undefined;
    name: number | string | null | undefined;
}
