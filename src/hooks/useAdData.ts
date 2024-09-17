import { useQuery } from '@tanstack/react-query';

import apiClient from '@libs/apiClient';

import { DateInfo, Response } from '@/types';

type Params = {
    yearState: number;
    monthState?: number;
};

const useAdData = ({ yearState, monthState }: Params) => {
    return useQuery<Response, Error>({
        queryKey: ['adData', yearState, monthState ?? 'all'],
        queryFn: async () => {
            const request: DateInfo = {
                search_year: yearState,
                search_month: monthState,
            };
            return await apiClient.post<Response>('/v1/report/demo/GetDemoData', request);
        },
    });
};

export default useAdData;
