import { chartItem } from "../../types";
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from 'chart.js';


ChartJS.register(CategoryScale);
ChartJS.register(LinearScale);
ChartJS.register(BarElement);
const BarChart = ({ items }: {
    items: chartItem[];
}
) => {
    return (
        <div>
            <Bar
                width={100}
                height={100}
                options={{ maintainAspectRatio: false }}
                data={{
                    labels: items.map((item) => {
                        return item.topic.name;
                    }),
                    datasets: [{
                        label: 'Correct',
                        data: items.map((item) => {
                            return item.correct;
                        }),
                        backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                }}
            />
        </div>

    );

}

export default BarChart;
