import type {Aggregates} from "../../model/output.model.ts";
import "./aggregates.css";

export function Aggregates({data}: { data: Aggregates }) {
    return <table className="aggregates">
        <thead>
            <tr>
                <td colSpan={2}>Aggregates</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Min</td>
                <td>{data.min}</td>
            </tr>
            <tr>
                <td>Max</td>
                <td>{data.max}</td>
            </tr>
            <tr>
                <td>Average</td>
                <td>{data.average}</td>
            </tr>
            <tr>
                <td>Variance</td>
                <td>{data.variance}</td>
            </tr>
        </tbody>
    </table>;
}