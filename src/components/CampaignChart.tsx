import styled from '@emotion/styled';

import PieChart from '@components/Pie';

const CampaignChart = ({ chartData }) => {
    return (
        <ChartWrapper>
            <PieChart data={chartData} />
        </ChartWrapper>
    );
};

const ChartWrapper = styled.div`
    width: 100%;
    height: 20rem;
    margin-top: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default CampaignChart;
