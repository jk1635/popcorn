export const formatNumber = (number): string => {
    return number.toLocaleString();
};

export const calculateUnitCost = (revenue, complete) => {
    return complete ? revenue / complete : 0;
};

export const calculateTotal = (number, key) => {
    return number.reduce((acc, cur) => acc + (cur[key] || 0), 0);
};

export const prepareData = data => {
    return data?.Monthly.flatMap(
        month =>
            month.App.flatMap(app =>
                app.Campaign.map(campaign => ({
                    ...campaign,
                    UnitCost: calculateUnitCost(campaign.Revenue, campaign.Complete),
                }))
            ) || []
    );
};

export const prepareCampaignData = app => {
    return app.Campaign.map(campaign => ({
        ...campaign,
    }));
};

export const prepareAppData = month => {
    return month.App.map(app => ({
        ...app,
        Campaign: prepareCampaignData(app),
    }));
};

export const prepareMonthlyData = data => {
    return (
        data?.Monthly.map(month => ({
            ...month,
            App: prepareAppData(month),
        })) || []
    );
};

export const convertDate = (dateTime: string): number => {
    const timestamp = parseInt(dateTime.replace(/[^0-9]/g, ''), 10);
    const date = new Date(timestamp);
    return date.getUTCFullYear();
};

export const calculateMonth = (index: number) => {
    const months = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
    return months[index];
};
