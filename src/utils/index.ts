const formatNumber = (number): string => {
    return number.toLocaleString();
};

const calculateUnitCost = (revenue, complete) => {
    return complete ? revenue / complete : 0;
};

const calculateTotal = (number, key) => {
    return number.reduce((acc, cur) => acc + (cur[key] || 0), 0);
};

const prepareData = data => {
    return data?.Monthly.flatMap(month => month.App.flatMap(app => app.Campaign)) || [];
};

export { formatNumber, calculateUnitCost, calculateTotal, prepareData };
