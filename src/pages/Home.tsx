import styled from '@emotion/styled';

import Content from '@components/Content';
import Header from '@components/Header';
import Sidebar from '@components/Sidebar';

const Home = () => {
    return (
        <Container>
            <Sidebar />
            <ContentWrapper>
                <Header />
                <Content />
            </ContentWrapper>
        </Container>
    );
};

const Container = styled.div`
    display: flex;
    height: 100vh;
`;

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - 15.625rem);
`;

export default Home;
