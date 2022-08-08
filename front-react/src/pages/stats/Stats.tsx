import { useContext } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { metricsContext } from "../../App";
import './stats.scss';

function Stats() {
    const { state } = useContext(metricsContext);

    const metrics = state.metrics.map((metric: string[]) => {
        return {
            date: metric[0],
            wh: +metric[1],
            varh: +metric[2],
        };
    });
    return (
        <div  className="stats">
            { state.serial !== '' ? 
                (
                    <div>
                        <h2 className="">Metrics for serial number: {state.serial}</h2>
                        <div className="stats__chart">
                            <ResponsiveContainer>
                                <LineChart

                                    data={metrics}
                                    margin={{
                                        top: 5,
                                        right: 30,
                                        left: 30,
                                        bottom: 5,
                                    }}
                                    className="stats__charts"
                                    >
                                    <XAxis dataKey="date" />
                                    <YAxis domain={['dataMin', 'dataMax']} yAxisId="left" />
                                    <YAxis domain={['dataMin', 'dataMax']} yAxisId="right" orientation="right"/>
                                    <Tooltip />
                                    <Legend />
                                    <Line yAxisId="left" type="monotone" dataKey="wh" stroke="#01E094"  />
                                    <Line yAxisId="right" type="monotone" dataKey="varh" stroke="#243F35" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                ) : <h2>Please enter a serial number in the search bar</h2>
            }
        </div>
    )
}

export default Stats;