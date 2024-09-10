import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

import styled from '@emotion/styled';
import useAdData from '@hooks/useAdData';
import { ArcElement, CategoryScale, Chart as ChartJS, ChartData, Legend, registerables, Tooltip } from 'chart.js';

import FilterSection from '@components/FilterSection';
import Loading from '@components/Loading';
import SectionBox from '@components/SectionBox';

import { Campaign, Option, SortConfig } from '@/types';
import ArrowDownIcon from '@assets/arrow-down.svg?react';
import ArrowUpIcon from '@assets/arrow-up.svg?react';
import { chartColors, initialChartData, options } from '@constants/';
import { calculateTotal, formatNumber, prepareData } from '@utils/';

ChartJS.register(CategoryScale, Tooltip, Legend, ArcElement, ...registerables);

const HomePage = () => {
    const { data, mutate } = useAdData();

    const [campaignData, setCampaignData] = useState<Campaign[]>([]);
    const [chartData, setChartData] = useState<ChartData<'pie', number[], string>>(initialChartData);
    const [yearState, setYearState] = useState<number>(2018);
    const [monthState, setMonthState] = useState<number>(1);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: null,
        direction: 'ascending',
    });

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
            const preparedData = prepareData(data);
            setCampaignData(preparedData);

            const campaignNames = preparedData.map((campaign: Campaign) => campaign.CampaignName);
            const revenues = preparedData.map((campaign: Campaign) => campaign.Revenue);

            setChartData({
                labels: campaignNames,
                datasets: [
                    {
                        data: revenues,
                        backgroundColor: chartColors,
                        hoverOffset: 4,
                    },
                ],
            });
        }
    }, [data]);

    useEffect(() => {
        if (yearState && monthState) {
            const params = {
                search_year: yearState,
                search_month: monthState,
            };
            mutate(params);
        }
    }, [yearState, monthState]);

    const handleSort = (key: keyof Campaign) => {
        setSortConfig(prev => {
            const isAscending = prev.key === key && prev.direction === 'ascending';
            return {
                key,
                direction: isAscending ? 'descending' : 'ascending',
            };
        });
    };

    useEffect(() => {
        if (data && sortConfig.key) {
            const sortedData = prepareData(data).sort((a, b) => {
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
            {!data && <Loading />}
            {data && (
                <>
                    <SectionBox title="캠페인별 수익 비율">
                        <ChartWrapper>
                            <Pie options={options} data={chartData} />
                        </ChartWrapper>
                    </SectionBox>
                    <SectionBox title="캠페인별 완료 건수 & 수익">
                        <Table>
                            <Thead>
                                <Tr>
                                    <HeaderTh onClick={() => handleSort('CampaignName')}>
                                        <div className="title">
                                            캠페인명
                                            {sortConfig.key === 'CampaignName' &&
                                            sortConfig.direction === 'ascending' ? (
                                                <ArrowUpIcon />
                                            ) : (
                                                <ArrowDownIcon />
                                            )}
                                        </div>
                                    </HeaderTh>
                                    <HeaderTh onClick={() => handleSort('UnitCost')}>
                                        <div className="title right">
                                            단가
                                            {sortConfig.key === 'UnitCost' && sortConfig.direction === 'ascending' ? (
                                                <ArrowUpIcon />
                                            ) : (
                                                <ArrowDownIcon />
                                            )}
                                        </div>
                                    </HeaderTh>
                                    <HeaderTh onClick={() => handleSort('Complete')}>
                                        <div className="title right">
                                            완료수
                                            {sortConfig.key === 'Complete' && sortConfig.direction === 'ascending' ? (
                                                <ArrowUpIcon />
                                            ) : (
                                                <ArrowDownIcon />
                                            )}
                                        </div>
                                    </HeaderTh>
                                    <HeaderTh onClick={() => handleSort('Revenue')}>
                                        <div className="title right">
                                            수익
                                            {sortConfig.key === 'Revenue' && sortConfig.direction === 'ascending' ? (
                                                <ArrowUpIcon />
                                            ) : (
                                                <ArrowDownIcon />
                                            )}
                                        </div>
                                    </HeaderTh>
                                </Tr>
                                <Tr>
                                    <Th>전체</Th>
                                    <RightAlignTh>-</RightAlignTh>
                                    <RightAlignTh>
                                        {formatNumber(calculateTotal(campaignData, 'Complete'))}
                                    </RightAlignTh>
                                    <RightAlignTh>{formatNumber(calculateTotal(campaignData, 'Revenue'))}</RightAlignTh>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {campaignData.map((data, index) => (
                                    <Tr key={index}>
                                        <Td>{data.CampaignName}</Td>
                                        <RightAlignTd>{formatNumber(data.UnitCost)}</RightAlignTd>
                                        <RightAlignTd>{formatNumber(data.Complete)}</RightAlignTd>
                                        <RightAlignTd>{formatNumber(data.Revenue)}</RightAlignTd>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </SectionBox>
                </>
            )}
        </>
    );
};

const ChartWrapper = styled.div`
    width: 100%;
    height: 35rem;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Table = styled.table`
    width: 100%;
    margin-top: 1.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
    font-size: 1rem;
    font-weight: 500;
`;

const Thead = styled.thead`
    font-weight: 700;

    & > :last-of-type > th {
        padding: 1.5rem 0.5rem;
    }
`;

const Tr = styled.tr``;

const Th = styled.th`
    height: 2.5rem;
    padding: 0 0.5rem;
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;

    & > .title {
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    & > .right {
        justify-content: flex-end;
    }
`;

const HeaderTh = styled(Th)`
    color: ${({ theme }) => theme.colors.lightBlue};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const RightAlignTh = styled(Th)`
    text-align: right;
`;

const Tbody = styled.tbody``;

const Td = styled.td`
    padding: 1.5rem 0.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
`;

const RightAlignTd = styled(Td)`
    text-align: right;
`;

export default HomePage;
