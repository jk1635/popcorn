import Select, { StylesConfig } from 'react-select';

import styled from '@emotion/styled';

import { Option } from '@/types';
import theme from '@styles/theme';

interface SelectOptionProps {
    options: Option[];
    value: Option | null;
    onChange: (selectedOption: Option | null) => void;
    styles?: StylesConfig<Option, false>;
    placeholder?: string;
}

const SelectOption = ({ options, value, onChange, placeholder }: SelectOptionProps) => {
    return (
        <SelectWrapper>
            <Select
                options={options}
                value={value}
                onChange={onChange}
                styles={SelectStyle}
                placeholder={placeholder}
                menuPortalTarget={document.body}
            />
        </SelectWrapper>
    );
};

const SelectWrapper = styled.div`
    width: 10rem;
`;

const SelectStyle: StylesConfig<Option, false> = {
    control: baseStyles => ({
        ...baseStyles,
        paddingLeft: '0.25rem',
        height: '2.5rem',
        borderRadius: '0.75rem',
        borderColor: 'transparent',
        boxShadow: 'none',
        cursor: 'pointer',
        '&:hover': {
            borderColor: 'transparent',
            boxShadow: 'none',
        },
    }),
    option: baseStyles => ({
        ...baseStyles,
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '1rem',
        height: '2.5rem',
        color: theme.colors.secondary,
        backgroundColor: theme.colors.white,
        borderColor: 'transparent',
        boxShadow: 'none',
        cursor: 'pointer',

        '&:active': {
            borderColor: 'none',
            boxShadow: 'none',
        },
        '&:focus': {
            boxShadow: 'none',
        },
        '&:hover': {
            borderColor: theme.colors.gray300,
            backgroundColor: theme.colors.gray300,
            boxShadow: 'none',
        },
    }),
    indicatorSeparator: () => ({
        display: 'none',
    }),
    menuPortal: baseStyles => ({
        ...baseStyles,
        zIndex: 9999,
    }),
};

export default SelectOption;
