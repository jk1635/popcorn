import { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

import styled from '@emotion/styled';
import useAdData from '@hooks/useAdData';
import { ArcElement, CategoryScale, Chart as ChartJS, ChartData, Legend, registerables, Tooltip } from 'chart.js';

import { chartColors } from '@/constants';
import { Campaign } from '@/types';
import { calculateTotal, calculateUnitCost, formatNumber, prepareData } from '@/utils';

ChartJS.register(CategoryScale, Tooltip, Legend, ArcElement, ...registerables);

const initialChartData = {
    labels: [],
    datasets: [],
};

const options = {
    responsive: true,
    maintainAspectRatio: false,
};

const Content = () => {
    const { data, mutate } = useAdData();
    const [campaignData, setCampaignData] = useState<Campaign[]>([]);
    const [chartData, setChartData] = useState<ChartData<'pie', number[], string>>(initialChartData);

    useEffect(() => {
        if (data) {
            const preparedData = prepareData(data);
            setCampaignData(preparedData);
        }
    }, [data]);

    useEffect(() => {
        if (campaignData.length > 0) {
            const campaignNames = campaignData.map(campaign => campaign.CampaignName);
            const revenues = campaignData.map(campaign => campaign.Revenue);

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
    }, [campaignData]);

    useEffect(() => {
        const params = {
            search_year: 2021,
            search_month: 7,
        };
        mutate(params);
    }, [mutate]);

    return (
        <ContentContainer>
            <SubTitle>Report</SubTitle>
            <GraphBox>
                <span>캠페인별 수익 비율</span>
                <ChartWrapper>
                    <Pie options={options} data={chartData} />
                </ChartWrapper>
            </GraphBox>
            <TableBox>
                <span>캠페인별 완료 건수 & 수익</span>
                <table>
                    <thead>
                        <tr>
                            <th>캠페인명</th>
                            <th>단가</th>
                            <th>완료수</th>
                            <th>수익</th>
                        </tr>
                        <tr>
                            <th>전체</th>
                            <th>-</th>
                            <th>{formatNumber(calculateTotal(campaignData, 'Complete'))}</th>
                            <th>{formatNumber(calculateTotal(campaignData, 'Revenue'))}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campaignData.map((data, index) => (
                            <tr key={index}>
                                <td>{data.CampaignName}</td>
                                <td>{calculateUnitCost(data.Revenue, data.Complete)}</td>
                                <td>{formatNumber(data.Complete)}</td>
                                <td>{formatNumber(data.Revenue)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

const GraphBox = styled.section`
    margin-top: 2.25rem;
    padding: 1.25rem;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 1.25rem;
    overflow: hidden;

    & > span {
        font-size: 1.5rem;
        font-weight: 700;
    }
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

    & > span {
        font-size: 1.5rem;
        font-weight: 700;
    }
`;

export default Content;
