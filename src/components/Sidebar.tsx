import styled from '@emotion/styled';

import DashboardIcon from '@assets/home.svg?react';
import TableIcon from '@assets/table.svg?react';

import PopcornIcon from '/public/popcorn.svg?react';

import { Link, NavLink } from 'react-router-dom';

import theme from '@styles/theme';

const Sidebar = () => {
    return (
        <SidebarContainer>
            <LogoWrapper>
                <Link to={'/'}>
                    <PopcornIcon width="2rem" height="2rem" fill="#2B3674" />
                </Link>
            </LogoWrapper>
            <LinkList>
                <Item>
                    <NavLink to="/" style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}>
                        <DashboardIcon />
                        <Title>Dashboard</Title>
                    </NavLink>
                </Item>
                <Item>
                    <NavLink to="/table" style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}>
                        <TableIcon />
                        <Title>Table</Title>
                    </NavLink>
                </Item>
            </LinkList>
        </SidebarContainer>
    );
};

const defaultStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: '#A3AED0',
    fill: '#A3AED0',
};

const activeStyle = {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.colors.secondary,
    fill: '#4318FF',
};

const SidebarContainer = styled.nav`
    display: flex;
    flex-direction: column;
    min-width: 15.625rem;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.white};
    border-right: 1px solid ${({ theme }) => theme.colors.gray300};
`;

const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.125rem 0;
`;

const LinkList = styled.ul`
    margin-top: 1rem;
`;

const Item = styled.li`
    display: flex;
    align-items: center;
    padding: 0.75rem 0 0.75rem 3rem;
    font-family: 'Inter', sans-serif;
`;

const Title = styled.span`
    margin-left: 0.5rem;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: pointer;
`;

export default Sidebar;
