import styled from '@emotion/styled';

import Dashboard from '@assets/home.svg';

import Popcorn from '/popcorn.svg';

const Sidebar = () => {
    return (
        <SidebarContainer>
            <LogoWrapper>
                <LogoIcon src={Popcorn} alt="logo" />
            </LogoWrapper>
            <LinkList>
                <Item>
                    <DashboardIcon src={Dashboard} alt="home" />
                    <Title>Dashboard</Title>
                </Item>
            </LinkList>
        </SidebarContainer>
    );
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

const LogoIcon = styled.img`
    width: 2rem;
    height: 2rem;
`;

const LinkList = styled.ul`
    padding: 1rem 0 1rem 3rem;
`;

const Item = styled.li`
    display: flex;
    align-items: center;
`;

const DashboardIcon = styled.img`
    width: 1.5rem;
    height: 1.5rem;
`;

const Title = styled.span`
    margin-left: 0.5rem;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: pointer;
`;

export default Sidebar;
