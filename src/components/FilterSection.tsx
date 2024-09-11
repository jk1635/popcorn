import styled from '@emotion/styled';

import Select from '@components/Select';

import { monthOptions, yearOptions } from '@/constants';
import { Option } from '@/types';

interface FilterSectionProps {
    title: string;
    yearState: number;
    onYearChange: (selectedOption: Option | null) => void;
    monthState?: number;
    onMonthChange?: (selectedOption: Option | null) => void;
    showMonth?: boolean;
}

const FilterSection = ({
    title,
    yearState,
    monthState,
    onYearChange,
    onMonthChange,
    showMonth = false,
}: FilterSectionProps) => {
    return (
        <FilterContainer>
            <Title>{title}</Title>
            <SelectWrapper>
                <Select
                    options={yearOptions}
                    value={yearOptions.find(option => option.value === yearState) || null}
                    onChange={onYearChange}
                    placeholder="Select Year"
                />
                {showMonth && onMonthChange && (
                    <Select
                        options={monthOptions}
                        value={monthOptions.find(option => option.value === monthState) || null}
                        onChange={onMonthChange}
                        placeholder="Select Month"
                    />
                )}
            </SelectWrapper>
        </FilterContainer>
    );
};

const FilterContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Title = styled.span`
    font-size: 1.375rem;
    font-weight: 600;
`;

const SelectWrapper = styled.div`
    display: flex;
    gap: 1rem;
`;

export default FilterSection;
