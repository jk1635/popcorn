import { ReactNode } from 'react';

import styled from '@emotion/styled';

interface SectionBoxProps {
    children: ReactNode;
    title: string;
}

const SectionBox = ({ children, title }: SectionBoxProps) => {
    return (
        <SectionContainer>
            <BoxTitle>{title}</BoxTitle>
            {children}
        </SectionContainer>
    );
};

const SectionContainer = styled.section`
    margin-top: 2.25rem;
    padding: 1.5rem;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 1.25rem;
    overflow: hidden;
`;

const BoxTitle = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
`;

export default SectionBox;
