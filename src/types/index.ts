export interface Response {
    IsTest: boolean;
    Payment: Payment;
    Result: boolean;
    ResultCode: number;
    ResultMsg: string;
}

export interface Payment {
    Commission: number;
    Complete: number;
    Monthly: Monthly[];
    Revenue: number;
}

export interface Monthly {
    App: App[];
    AppKey: number;
    Commission: number;
    Complete: number;
    Datetime: string;
    Revenue: number;
    Status: number;
}

export interface App {
    AppKey: number;
    AppName: string;
    Campaign: Campaign[];
    Commission: number;
    Complete: number;
    Revenue: number;
}

export interface Campaign {
    AppKey: number;
    CampaignKey: string;
    CampaignName: string;
    Commission: number;
    Complete: number;
    Datetime: string;
    Revenue: number;
    UnitCost?: number;
}

export interface Option {
    value: number;
    label: string;
}

export type DateInfo = {
    search_year: number;
    search_month?: number;
};

export type SortConfig = {
    key: keyof Campaign | null;
    direction: 'ascending' | 'descending';
};

export type RowState = {
    [monthlyIndex: number]: {
        isOpen: boolean;
        apps: { [appIndex: number]: boolean };
    };
};
