import '@emotion/react';
import { ColorsTypes } from '@styles/theme';

declare module '@emotion/react' {
    export interface Theme {
        colors: ColorsTypes;
    }
}
