import { ResponsivePie } from '@nivo/pie';

import { calculateTotal, formatNumber } from '@/utils';

const PieChart = ({ data }: any) => (
    <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        arcLinkLabel={e => {
            const total = calculateTotal(data, 'value');
            const percentage = ((e.value / total) * 100).toFixed(2);
            return `${e.label} (${formatNumber(e.value)}) : ${percentage}%`;
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#2B3674"
        arcLinkLabelsColor={{ from: 'color' }}
        enableArcLabels={false}
        arcLabel="id"
        arcLabelsSkipAngle={10}
        motionConfig="stiff"
        legends={[]}
    />
);

export default PieChart;
