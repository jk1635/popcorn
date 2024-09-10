import { Option } from '@/types';

export const chartColors = [
    '#FEAEAE',
    '#FBE38E',
    '#AEC9FE',
    '#A9F4D0',
    '#9A89FF',
    '#FDD09F',
    '#FD9CFF',
    '#FED0EE',
    '#D0E8FF',
    '#DBAEFF',
];

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

export const initialChartData = {
    labels: [],
    datasets: [],
};

export const options = {
    responsive: true,
    maintainAspectRatio: false,
};
