import React from "react";
import {VictoryPie} from "victory";
import {TweetProps} from "./TweetRow";

interface PieChartProps {
    tweets: [TweetProps] | undefined
}
export function PieChart(props: PieChartProps) {

    let resultsDict : {[sentiment: string] : number} = {}
    if(props.tweets) {
        props.tweets.map((tweet: TweetProps) => {
            if (!(tweet.sentiment in resultsDict)) {
                tweet.sentiment === 0
                    ? resultsDict['Neutral'] = 0
                    : tweet.sentiment > 0
                        ? resultsDict['Positive'] = 0
                        : resultsDict['Negative'] = 0

            }
            tweet.sentiment === 0
                ? resultsDict['Neutral'] += 1
                : tweet.sentiment > 0
                    ? resultsDict['Positive'] += 1
                    : resultsDict['Negative'] += 1
        })
    }
    const pieData = Object.entries(resultsDict).map(([key, value]) => {
        return {x: key, y: value};
    })
    return <VictoryPie data={pieData}/>;
}

