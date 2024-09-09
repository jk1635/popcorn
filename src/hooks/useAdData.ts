import { useMutation } from '@tanstack/react-query';

import apiClient from '@libs/apiClient';

import { Response } from '@/types';

export type AdParams = {
    search_year: number;
    search_month?: number;
};

const useAdData = () => {
    return useMutation({
        mutationFn: async (payload: AdParams) => {
            const data = await apiClient.post<Response>('/v1/report/demo/GetDemoData', payload);
            return data?.Payment;
        },
        onSuccess: () => {
            console.log('데이터 불러오기 성공');
        },
        onError: error => {
            console.error(error);
        },
    });
};

export default useAdData;
