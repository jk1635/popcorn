import styled from '@emotion/styled';

import { getStatusLabel } from '@/constants';

type StatusBadgeProps = {
    status: number | null;
};

type BadgeProps = {
    color: string;
    backgroundColor: string;
};

const StatusBadge = ({ status }: StatusBadgeProps) => {
    const { label, color, backgroundColor } = getStatusLabel(status);

    return (
        <Badge color={color} backgroundColor={backgroundColor}>
            {label}
        </Badge>
    );
};

const Badge = styled.span<BadgeProps>`
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
