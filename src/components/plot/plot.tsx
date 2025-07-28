import {type AlignedData, type Options} from 'uplot';
import "uplot/dist/uPlot.min.css";
import UplotReact from 'uplot-react';

export function Plot({data}: { data: AlignedData }) {
    const options: Options = {
        width: 800,
        height: 300,
        legend: {
            show: false,
        },
        series: [
            {},
            {
                label: "",
                points: {show: false},
                stroke: "darkblue",
            },
            {
                label: "",
                points: {show: false},
            }
        ],
        bands: [
            {
                series: [3, 2],
                fill: "rgba(0,0,139,.1)",
            },
        ],
        scales: {x: {time: false}},
    };

    return (
        <UplotReact
            options={options}
            data={data}
        />
    );
}