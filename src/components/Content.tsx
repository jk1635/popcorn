import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

import styled from '@emotion/styled';
import useAdData from '@hooks/useAdData';
import { ArcElement, CategoryScale, Chart as ChartJS, ChartData, Legend, registerables, Tooltip } from 'chart.js';

import Select from '@components/Select';

import { chartColors, initialChartData, monthOptions, options, yearOptions } from '@/constants';
import { Campaign, Option, SortConfig } from '@/types';
import { calculateTotal, formatNumber, prepareData } from '@/utils';
import Arrow from '@assets/arrow-down.svg';

ChartJS.register(CategoryScale, Tooltip, Legend, ArcElement, ...registerables);

const Content = () => {
    const { data, mutate } = useAdData();
    const [campaignData, setCampaignData] = useState<Campaign[]>([]);
    const [chartData, setChartData] = useState<ChartData<'pie', number[], string>>(initialChartData);
    const [yearState, setYearState] = useState<number>(2021);
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

            const campaignNames = preparedData.map(campaign => campaign.CampaignName);
            const revenues = preparedData.map(campaign => campaign.Revenue);

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
    }, [yearState, monthState, mutate]);

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

    return (
        <ContentContainer>
            <TopWrapper>
                <SubTitle>Report</SubTitle>
                <SelectWrapper>
                    <Select
                        options={yearOptions}
                        value={yearOptions.find(option => option.value === yearState) || null}
                        onChange={handleYearChange}
                        placeholder="Select Year"
                    />
                    <Select
                        options={monthOptions}
                        value={monthOptions.find(option => option.value === monthState) || null}
                        onChange={handleMonthChange}
                        placeholder="Select Month"
                    />
                </SelectWrapper>
            </TopWrapper>

            <GraphBox>
                <BoxTitle>캠페인별 수익 비율</BoxTitle>
                <ChartWrapper>
                    <Pie options={options} data={chartData} />
                </ChartWrapper>
            </GraphBox>
            <TableBox>
                <BoxTitle>캠페인별 완료 건수 & 수익</BoxTitle>
                <Table>
                    <Thead>
                        <Tr>
                            <HeaderTh onClick={() => handleSort('CampaignName')}>
                                <div className="title">
                                    캠페인명
                                    <ArrowIcon src={Arrow} />
                                </div>
                            </HeaderTh>
                            <HeaderTh onClick={() => handleSort('UnitCost')}>
                                <div className="title right">
                                    단가
                                    <ArrowIcon src={Arrow} />
                                </div>
                            </HeaderTh>
                            <HeaderTh onClick={() => handleSort('Complete')}>
                                <div className="title right">
                                    완료수
                                    <ArrowIcon src={Arrow} />
                                </div>
                            </HeaderTh>
                            <HeaderTh onClick={() => handleSort('Revenue')}>
                                <div className="title right">
                                    수익
                                    <ArrowIcon src={Arrow} />
                                </div>
                            </HeaderTh>
                        </Tr>
                        <Tr>
                            <Th>전체</Th>
                            <RightAlignedTh>-</RightAlignedTh>
                            <RightAlignedTh>{formatNumber(calculateTotal(campaignData, 'Complete'))}</RightAlignedTh>
                            <RightAlignedTh>{formatNumber(calculateTotal(campaignData, 'Revenue'))}</RightAlignedTh>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {campaignData.map((data, index) => (
                            <Tr key={index}>
                                <Td>{data.CampaignName}</Td>
                                <RightAlignedTd>{formatNumber(data.UnitCost)}</RightAlignedTd>
                                <RightAlignedTd>{formatNumber(data.Complete)}</RightAlignedTd>
                                <RightAlignedTd>{formatNumber(data.Revenue)}</RightAlignedTd>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableBox>
        </ContentContainer>
    );
};

const ContentContainer = styled.main`
    margin-top: 4.25rem;
    padding: 2.5rem;
    overflow: auto;
`;

const SubTitle = styled.span`
    font-size: 1.375rem;
    font-weight: 600;
`;

const TopWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const SelectWrapper = styled.div`
    display: flex;
    gap: 1rem;
`;

const GraphBox = styled.section`
    margin-top: 2.25rem;
    padding: 1.25rem;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 1.25rem;
    overflow: hidden;
`;

const BoxTitle = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
`;

const ChartWrapper = styled.div`
    width: 100%;
    height: 35rem;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TableBox = styled.section`
    margin-top: 2.25rem;
    padding: 1.25rem;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 1.25rem;
    overflow: hidden;
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
    }

    & > .right {
        justify-content: flex-end;
    }
`;

const HeaderTh = styled(Th)`
    color: ${({ theme }) => theme.colors.lightBlue};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const RightAlignedTh = styled(Th)`
    text-align: right;
`;

const Tbody = styled.tbody``;

const Td = styled.td`
    display: table-cell;
    padding: 1.5rem 0.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
`;

const RightAlignedTd = styled(Td)`
    text-align: right;
`;

const ArrowIcon = styled.img``;

export default Content;
