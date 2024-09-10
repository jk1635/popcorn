import styled from '@emotion/styled';

import theme from '@styles/theme';

type StatusBadgeProps = {
    status: number;
};

const getStatusLabel = status => {
    switch (status) {
        case 1:
            return { label: '출금 요청', color: '#965E00', backgroundColor: '#FFECCC' };
        case 2:
            return { label: '출금 거절', color: '#D30000', backgroundColor: '#FFE0E0' };
        case 3:
            return { label: '출금 완료', color: '#007F00', backgroundColor: '#CDFFCD' };
        case 4:
            return { label: '출금 취소', color: '#6E6893', backgroundColor: '#E6E6F2' };
        default:
            return {
                label: '출금 가능',
                color: `${theme.colors.secondary}`,
                backgroundColor: `${theme.colors.gray300}`,
            };
    }
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const { label, color, backgroundColor } = getStatusLabel(status);

    return (
        <Badge color={color} backgroundColor={backgroundColor}>
            {label}
        </Badge>
    );
};

const Badge = styled.span`
    display: inline-block;
    padding: 0.25rem 0.5rem;
    border-radius: 0.75rem;
    background-color: ${({ backgroundColor }) => backgroundColor};
    color: ${({ color }) => color};
    font-size: 0.75rem;
    font-weight: 500;
    text-align: center;
    white-space: nowrap;
`;

export default StatusBadge;
