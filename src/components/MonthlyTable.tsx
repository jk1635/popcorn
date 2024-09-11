import styled from '@emotion/styled';

import Badge from '@components/Badge';

import ArrowDownIcon from '@assets/circle-arrow-down.svg?react';
import ArrowUpIcon from '@assets/circle-arrow-up.svg?react';
import { calculateMonth, calculateTotal, convertDate, formatNumber } from '@utils/';

const MonthlyTable = ({ monthlyData, rowState, toggleMonthlyRow, toggleAppRow }) => {
    return (
        <Table>
            <Thead>
                <Tr>
                    <LeftAlignHeaderTh>개요</LeftAlignHeaderTh>
                    <RightAlignHeaderTh></RightAlignHeaderTh>
                    <RightAlignHeaderTh>광고 수익</RightAlignHeaderTh>
                    <RightAlignHeaderTh>플랫폼 수수료</RightAlignHeaderTh>
                    <RightAlignHeaderTh>세금계산서 발행금액</RightAlignHeaderTh>
                    <CenterAlignHeaderTh>상태</CenterAlignHeaderTh>
                </Tr>
                <Tr>
                    <LeftAlignTh>총합</LeftAlignTh>
                    <Th></Th>
                    <RightAlignTh>{formatNumber(calculateTotal(monthlyData, 'Revenue'))}</RightAlignTh>
                    <RightAlignTh>{formatNumber(calculateTotal(monthlyData, 'Commission'))}</RightAlignTh>
                    <RightAlignTh>
                        {formatNumber(
                            calculateTotal(monthlyData, 'Revenue') - calculateTotal(monthlyData, 'Commission')
                        )}
                    </RightAlignTh>
                    <CenterAlignTh></CenterAlignTh>
                </Tr>
            </Thead>
            <Tbody>
                {monthlyData.map((monthly, monthlyIndex) => (
                    <>
                        <Tr key={monthly.AppKey}>
                            <Td>
                                <DropdownButton onClick={() => toggleMonthlyRow(monthlyIndex)}>
                                    {rowState[monthlyIndex]?.isOpen ? <ArrowUpIcon /> : <ArrowDownIcon />}
                                </DropdownButton>
                                {`${convertDate(monthly.Datetime)}.${calculateMonth(monthlyIndex)}`}
                            </Td>
                            <Td></Td>
                            <RightAlignTd>{formatNumber(monthly.Revenue)}</RightAlignTd>
                            <RightAlignTd>{formatNumber(monthly.Commission)}</RightAlignTd>
                            <RightAlignTd>{formatNumber(monthly.Revenue - monthly.Commission)}</RightAlignTd>
                            <CenterAlignTd>
                                <Badge status={monthly.Status} />
                            </CenterAlignTd>
                        </Tr>
                        {rowState[monthlyIndex]?.isOpen &&
                            monthly.App.map((app, appIndex) => (
                                <>
                                    <CampaignBg key={app.AppName}>
                                        <Td style={{ paddingLeft: '2rem' }}>
                                            <DropdownButton onClick={() => toggleAppRow(monthlyIndex, appIndex)}>
                                                {rowState[monthlyIndex]?.apps?.[appIndex] ? (
                                                    <ArrowUpIcon />
                                                ) : (
                                                    <ArrowDownIcon />
                                                )}
                                            </DropdownButton>
                                            {app.AppName}
                                        </Td>
                                        <Td></Td>
                                        <RightAlignTd>{formatNumber(app.Revenue)}</RightAlignTd>
                                        <RightAlignTd>{formatNumber(app.Commission)}</RightAlignTd>
                                        <RightAlignTd>{formatNumber(app.Revenue - app.Commission)}</RightAlignTd>
                                        <Td></Td>
                                    </CampaignBg>
                                    {rowState[monthlyIndex]?.apps?.[appIndex] && (
                                        <>
                                            <SubTableHeader>
                                                <Td style={{ paddingLeft: '4rem' }}>캠페인</Td>
                                                <RightAlignTd>건수</RightAlignTd>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                                <Td></Td>
                                            </SubTableHeader>
                                            {app.Campaign.map(campaign => (
                                                <Tr key={campaign.CampaignKey}>
                                                    <Td style={{ paddingLeft: '4rem' }}>{campaign.CampaignName}</Td>
                                                    <RightAlignTd>{formatNumber(campaign.Complete)}</RightAlignTd>
                                                    <RightAlignTd>{formatNumber(campaign.Revenue)}</RightAlignTd>
                                                    <RightAlignTd>{formatNumber(campaign.Commission)}</RightAlignTd>
                                                    <RightAlignTd>
                                                        {formatNumber(campaign.Revenue - campaign.Commission)}
                                                    </RightAlignTd>
                                                    <Td></Td>
                                                </Tr>
                                            ))}
                                        </>
                                    )}
                                </>
                            ))}
                    </>
                ))}
            </Tbody>
        </Table>
    );
};

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

const CampaignBg = styled(Tr)`
    background-color: ${({ theme }) => theme.colors.gray100};
`;

const Th = styled.th`
    height: 2.5rem;
    padding: 0 0.5rem;
    vertical-align: middle;
    white-space: nowrap;
`;

const HeaderTh = styled(Th)`
    color: ${({ theme }) => theme.colors.lightBlue};
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const RightAlignHeaderTh = styled(HeaderTh)`
    text-align: right;
`;

const LeftAlignHeaderTh = styled(HeaderTh)`
    min-width: 18rem;
    text-align: left;
`;

const CenterAlignHeaderTh = styled(HeaderTh)`
    text-align: center;
`;

const RightAlignTh = styled(Th)`
    text-align: right;
`;

const LeftAlignTh = styled(Th)`
    text-align: left;
`;

const CenterAlignTh = styled(Th)`
    text-align: center;
`;

const Tbody = styled.tbody``;

const Td = styled.td`
    padding: 1.5rem 0.5rem;
    border-top: 1px solid ${({ theme }) => theme.colors.gray100};
    text-align: left;
    vertical-align: middle;
    white-space: nowrap;
`;

const SubTableHeader = styled(Tr)`
    font-weight: 700;
    color: ${({ theme }) => theme.colors.lightBlue};
`;

const RightAlignTd = styled(Td)`
    text-align: right;
`;

const CenterAlignTd = styled(Td)`
    text-align: center;
`;

const DropdownButton = styled.button`
    cursor: pointer;
    margin-right: 8px;
    vertical-align: middle;
`;

export default MonthlyTable;
