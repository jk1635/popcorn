import { useMutation } from '@tanstack/react-query';

import apiClient from '@libs/apiClient';

import { DateInfo, Response } from '@/types';

const useAdData = () => {
    const mutation = useMutation({
        mutationFn: async (payload: DateInfo) => {
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
    return {
        ...mutation,
        isLoading: mutation.isLoading,
    };
};

export default useAdData;
