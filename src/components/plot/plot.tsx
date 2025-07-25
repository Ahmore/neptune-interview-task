import React from 'react';
import uPlot, {type AlignedData} from 'uplot';
import "uplot/dist/uPlot.min.css";
import UplotReact from 'uplot-react';

export function Plot({ data }: { data: AlignedData }){
    const options = {
        title: "Chart",
            width: 400,
            height: 300,
            legend: {
                show: false,
            },
            series: [
                {},
                {
                    label: "",
                    points: { show: false },
                    stroke: "darkblue",
                },
                {
                    label: "",
                    points: { show: false },
                },
                {
                    label: "",
                    points: { show: false },
                }
            ],
            bands: [
                {
                    series: [3, 2],
                    fill: "rgba(0,0,139,.1)",
                },
            ],
            scales: { x: { time: false } },
    };

    console.log("PLOT DATA", data);

    return (
        <UplotReact
            options={options}
            data={data}
            onDelete={(/* chart: uPlot */) => console.log("Deleted")}
            onCreate={(/* chart: uPlot */) => console.log("Created")}
        />
    );
}