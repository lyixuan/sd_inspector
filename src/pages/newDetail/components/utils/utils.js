import BIWrapperProgress from '@/pages/indexPage/components/BIWrapperProgress';
import { companyThousandsIncome } from '@/utils/utils';

export function getProText(val, maxVal) {
    const percent = val/maxVal * 100 + '%';
    const money = companyThousandsIncome(val);
    return <BIWrapperProgress text={money} percent={percent} />
}