import { Global, ThemeProvider } from '@emotion/react';

import global from '@styles/global';
import theme from '@styles/theme';

import Home from '@pages/Home';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Global styles={global} />
            <Home />
        </ThemeProvider>
    );
}

export default App;
