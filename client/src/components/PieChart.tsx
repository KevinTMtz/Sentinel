import React from "react";
import {VictoryLegend, VictoryPie} from "victory";
import {TweetProps} from "./TweetRow";

interface PieChartProps {
    tweets: [TweetProps] | undefined
}
export function PieChart(props: PieChartProps) {

    let resultsDict : {[sentiment: string] : number} = {}
    let categoryColors: {[sentiment: string]: string} = {'Negative': '#f73d34', 'Neutral': "Black", 'Positive': "#4ed965"}
    if(props.tweets) {
        props.tweets.map((tweet: TweetProps) => {
                tweet.sentiment === 0
                    ? 'Neutral' in resultsDict ? resultsDict['Neutral'] += 1 : resultsDict['Neutral'] = 1
                    : tweet.sentiment > 0
                        ? 'Positive' in resultsDict ?  resultsDict['Positive'] += 1 :  resultsDict['Positive'] = 1
                        : 'Negative' in resultsDict ? resultsDict['Negative'] += 1 : resultsDict['Negative'] = 1
        })

    }
    const pieData = Object.entries(resultsDict).map(([key, value]) => {
        var total;
        props.tweets?.length ? total = props.tweets.length : total = 1;
        let label_val = (value / total) * 100 + "%";
        return {x: key, y: value, label: label_val};
    })

    const legendData = Object.entries(categoryColors).map(([key, value]) => {

        return {name: key, symbol: {fill: value}}
    })

    return (
        <>

            <VictoryPie data={pieData} style={{
            data: {fill: ({datum}) => categoryColors[datum.x]}
        }}/>
            <VictoryLegend orientation="horizontal" data={legendData}/>
        </>
    );
}

