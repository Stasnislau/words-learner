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
        <div className="h-full">
            <Bar
                width={100}
                height={100}
                options={{
                    plugins: {
                        legend: {
                            display: true
                        }
                    },
                    responsive: true,
                    interaction: {
                        intersect: false,
                    },
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            stacked: true,
                            beginAtZero: true,
                            ticks: {
                                stepSize: 1,
                                precision: 0
                            }
                        }
                    }
                }}
                data={{
                    labels: items.map((item) => {
                        return item.topic.name;
                    }),
                    datasets: [{
                        
                        label: 'Correct',
                        data: items.map((item) => {
                            return item.correct;
                        }),
                        backgroundColor: '#4CAF50',
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Incorrect',
                        data: items.map((item) => {
                            return item.incorrect;
                        }),
                        backgroundColor: '#F44336',
                        stack: 'Stack 0'
                    },
                    {
                        label: 'Skipped',
                        data: items.map((item) => {
                            return item.skipped;
                        }),
                        backgroundColor: '#D3D3D3',
                        stack: 'Stack 0'
                    }]
                }}
            />
        </div>

    );

}

export default BarChart;
