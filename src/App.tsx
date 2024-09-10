import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Global, ThemeProvider } from '@emotion/react';

import Layout from '@components/Layout.tsx';
import NotFound from '@components/Notfound';

import global from '@styles/global';
import theme from '@styles/theme';

import HomePage from '@pages/HomePage.tsx';
import TablePage from '@pages/TablePage.tsx';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Global styles={global} />
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/table" element={<TablePage />} />
                    </Route>
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
