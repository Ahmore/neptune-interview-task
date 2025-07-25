import React from 'react';
import uPlot, {type AlignedData} from 'uplot';
import "uplot/dist/uPlot.min.css";
import UplotReact from 'uplot-react';

export function Plot({ data }: { data: AlignedData }){
    const options = {
        title: "Chart",
            width: 400,
            height: 300,
            series: [
            {
                label: "Date"
            },
            {
                label: "",
                points: { show: false },
                stroke: "blue",
                // fill: "blue"
            }
        ],
            scales: { x: { time: false } },
        // plugins: [dummyPlugin()]
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