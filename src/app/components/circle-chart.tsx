import React, { ReactNode } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    aprovados?: number,
    reprovados?: number,
    abstencoes?: number
}

export default function CircleChart({ aprovados, reprovados, abstencoes }: Props) {
    const data = {
        datasets: [
            {
                label: 'Votos',
                data: [aprovados, reprovados, abstencoes],
                backgroundColor: [
                    'rgb(22 163 74)',
                    'rgb(220 38 38)',
                    '#FFDD1E'
                ],
                borderColor: [
                    'green',
                    'red',
                    'yellow'
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <div className='flex w-52'>
            <Doughnut data={data} />
        </div>
    )
}
