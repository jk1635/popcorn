import Select from '@components/Select.tsx';
import { yearOptions } from '@/constants';
import styled from '@emotion/styled';
import { useState } from 'react';
import { Option } from '@/types';

const TablePage = () => {
    const [yearState, setYearState] = useState<number>(2021);

    const handleYearChange = (selectedOption: Option | null) => {
        if (!selectedOption) return;
        const year = selectedOption.value;
        setYearState(year);
    };

    return (
        <>
            <TopWrapper>
                <SubTitle>Report</SubTitle>
                <SelectWrapper>
                    <Select
                        options={yearOptions}
                        value={yearOptions.find(option => option.value === yearState) || null}
                        onChange={handleYearChange}
                        placeholder="Select Year"
                    />
                </SelectWrapper>
            </TopWrapper>
        </>
    );
};

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

export default TablePage;
