import { Option } from '@/types';
import theme from '@styles/theme.ts';

export const yearOptions: Option[] = [
    { value: 2018, label: '2018' },
    { value: 2019, label: '2019' },
    { value: 2020, label: '2020' },
    { value: 2021, label: '2021' },
];

export const monthOptions: Option[] = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
    { value: 11, label: '11' },
    { value: 12, label: '12' },
];

export const getStatusLabel = status => {
    switch (status) {
        case 1:
            return { label: '출금 요청', color: '#965E00', backgroundColor: '#FFECCC' };
        case 2:
            return { label: '출금 거절', color: '#D30000', backgroundColor: '#FFE0E0' };
        case 3:
            return { label: '출금 완료', color: '#007F00', backgroundColor: '#CDFFCD' };
        case 4:
            return { label: '출금 취소', color: '#6E6893', backgroundColor: '#E6E6F2' };
        case 5:
            return {
                label: '출금 가능',
                color: `${theme.colors.secondary}`,
                backgroundColor: `${theme.colors.gray300}`,
            };
        default:
            throw new Error(`status 에러 : ${status}`);
    }
};
