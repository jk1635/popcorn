import styled from '@emotion/styled';

import { Campaign, SortConfig } from '@/types';
import { calculateTotal, formatNumber } from '@/utils';
import ArrowDownIcon from '@assets/arrow-down.svg?react';
import ArrowUpIcon from '@assets/arrow-up.svg?react';

const CampaignTable = ({
    campaignData,
    sortConfig,
    setSortConfig,
}: {
    campaignData: Campaign[];
    sortConfig: SortConfig;
    setSortConfig: React.Dispatch<React.SetStateAction<SortConfig>>;
}) => {
    const handleSort = (key: keyof Campaign) => {
        setSortConfig(prev => {
            const isAscending = prev.key === key && prev.direction === 'ascending';
            return {
                key,
                direction: isAscending ? 'descending' : 'ascending',
            };
        });
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <HeaderTh onClick={() => handleSort('CampaignName')}>
                        <div className="title">
                            캠페인명
                            {sortConfig.key === 'CampaignName' && sortConfig.direction === 'ascending' ? (
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
                    <RightAlignTh>{formatNumber(calculateTotal(campaignData, 'Complete'))}</RightAlignTh>
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

export default CampaignTable;
