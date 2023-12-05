import React, { ReactNode } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
    aprovar?: number,
    reprovar?: number,
    abster?: number
}

export default function CircleChart({ aprovar, reprovar, abster }: Props) {
    const data = {
        datasets: [
            {
                label: 'Votos',
                data: [aprovar, reprovar, abster],
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
