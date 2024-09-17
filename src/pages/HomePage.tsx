import { useEffect, useState } from 'react';

import useAdData from '@hooks/useAdData';

import CampaignChart from '@components/CampaignChart';
import CampaignTable from '@components/CampaignTable';
import FilterSection from '@components/FilterSection';
import Loading from '@components/Loading';
import SectionBox from '@components/SectionBox';

import { Campaign, Chart, Option, SortConfig } from '@/types';
import { prepareData } from '@/utils';

const HomePage = () => {
    const [campaignData, setCampaignData] = useState<Campaign[]>([]);
    const [chartData, setChartData] = useState<Chart[]>([]);
    const [yearState, setYearState] = useState<number>(2018);
    const [monthState, setMonthState] = useState<number>(1);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: null,
        direction: 'ascending',
    });

    const { data, isPending } = useAdData({ yearState, monthState });

    const handleYearChange = (selectedOption: Option | null) => {
        if (!selectedOption) return;
        const year = selectedOption.value;
        setYearState(year);
    };

    const handleMonthChange = (selectedOption: Option | null) => {
        if (!selectedOption) return;
        const month = selectedOption.value;
        setMonthState(month);
    };

    useEffect(() => {
        if (data) {
            const preparedData = prepareData(data.Payment);
            setCampaignData(preparedData);
            const nivoChartData = preparedData.map((campaign, index) => ({
                id: `${campaign.CampaignName}-${index + 1}`,
                label: campaign.CampaignName,
                value: campaign.Revenue,
            }));

            setChartData(nivoChartData);
        }
    }, [data]);

    useEffect(() => {
        if (data && sortConfig.key) {
            const sortedData = prepareData(data.Payment).sort((a, b) => {
                const valueA = a[sortConfig.key as keyof Campaign];
                const valueB = b[sortConfig.key as keyof Campaign];

                if (typeof valueA === 'string' && typeof valueB === 'string') {
                    return sortConfig.direction === 'ascending'
                        ? valueA.localeCompare(valueB)
                        : valueB.localeCompare(valueA);
                }

                if (typeof valueA === 'number' && typeof valueB === 'number') {
                    return sortConfig.direction === 'ascending' ? valueA - valueB : valueB - valueA;
                }

                return 0;
            });

            setCampaignData(sortedData);
        }
    }, [sortConfig]);

    useEffect(() => {
        setSortConfig({
            key: null,
            direction: 'ascending',
        });
    }, [data]);

    return (
        <>
            <FilterSection
                title="캠페인별 성과"
                yearState={yearState}
                monthState={monthState}
                onYearChange={handleYearChange}
                onMonthChange={handleMonthChange}
                showMonth={true}
            />
            {isPending && !data && <Loading />}
            {data && (
                <>
                    <SectionBox title="캠페인별 수익 비율">
                        <CampaignChart chartData={chartData} />
                    </SectionBox>
                    <SectionBox title="캠페인별 완료 건수 & 수익">
                        <CampaignTable
                            campaignData={campaignData}
                            sortConfig={sortConfig}
                            setSortConfig={setSortConfig}
                        />
                    </SectionBox>
                </>
            )}
        </>
    );
};

export default HomePage;
