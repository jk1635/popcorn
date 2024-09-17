import { useEffect, useState } from 'react';

import useAdData from '@hooks/useAdData';

import FilterSection from '@components/FilterSection';
import Loading from '@components/Loading';
import MonthlyTable from '@components/MonthlyTable';
import SectionBox from '@components/SectionBox';

import { Monthly, Option, RowState } from '@/types';
import { prepareMonthlyData } from '@/utils';

const TablePage = () => {
    const [yearState, setYearState] = useState<number>(2018);
    const [monthlyData, setMonthlyData] = useState<Monthly[]>([]);
    const [rowState, setRowState] = useState<RowState>({});

    const { data, isPending } = useAdData({ yearState });

    const handleYearChange = (selectedOption: Option | null) => {
        if (!selectedOption) return;
        const year = selectedOption.value;
        setYearState(year);
    };

    const toggleMonthlyRow = (monthlyIndex: number) => {
        setRowState(prev => ({
            ...prev,
            [monthlyIndex]: {
                isOpen: !prev[monthlyIndex]?.isOpen,
                apps: prev[monthlyIndex]?.apps || {},
            },
        }));
    };

    const toggleAppRow = (monthlyIndex: number, appIndex: number) => {
        setRowState(prev => ({
            ...prev,
            [monthlyIndex]: {
                ...prev[monthlyIndex],
                apps: {
                    ...prev[monthlyIndex]?.apps,
                    [appIndex]: !prev[monthlyIndex]?.apps?.[appIndex],
                },
            },
        }));
    };

    useEffect(() => {
        if (data) {
            const processedData = prepareMonthlyData(data.Payment);
            setMonthlyData(processedData);
            setRowState({});
        }
    }, [data]);

    return (
        <>
            <FilterSection title="월별 성과" yearState={yearState} onYearChange={handleYearChange} />
            {isPending && !data && <Loading />}
            {data && (
                <SectionBox title="월별 성과">
                    <MonthlyTable
                        monthlyData={monthlyData}
                        rowState={rowState}
                        toggleMonthlyRow={toggleMonthlyRow}
                        toggleAppRow={toggleAppRow}
                    />
                </SectionBox>
            )}
        </>
    );
};

export default TablePage;
