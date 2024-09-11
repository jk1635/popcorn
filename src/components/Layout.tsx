import { Outlet } from 'react-router-dom';

import styled from '@emotion/styled';

import Header from '@components/Header';
import Sidebar from '@components/Sidebar';

const Layout = () => (
    <LayoutContainer>
        <Sidebar />
        <ContentWrapper>
            <Header />
            <Content>
                <Outlet />
            </Content>
        </ContentWrapper>
    </LayoutContainer>
);

const LayoutContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 15.625rem);
`;

const Content = styled.main`
    margin-top: 4.25rem;
    padding: 2.5rem;
    overflow: auto;
`;

export default Layout;
