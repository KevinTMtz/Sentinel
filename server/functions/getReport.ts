const getGeneralSentiment = (tweets: [any]) => {
  const series = tweets.reduce(
    (arr, curr) => {
      const s = curr.sentiment;
      s > 0 ? arr[0]++ : s < 0 ? arr[1]++ : arr[2]++;
      return arr;
    },
    // TODO: Check range of values for sentiment
    [0, 0, 0],
  );
  return {
    id: 'General Sentiment',
    series,
    labels: ['Positive', 'Negative', 'Neutral'],
    type: 'pie',
  };
};

const getAccumulatedSentiment = (tweets: [any]) => {
  const ocurrances = tweets.reduce((acc, curr) => {
    const s = curr.sentiment;
    acc[s] ? acc[s]++ : (acc[s] = 1), acc;
    return acc;
  }, {});
  const keys = Object.keys(ocurrances).sort().map(Number);
  const categories: string[] = [];
  const data: number[] = [];
  for (var i: number = keys[0]; i <= keys[keys.length - 1]; i++) {
    categories.push(i.toString());
    data.push(ocurrances[i] ? ocurrances[i] : 0);
  }
  return {
    id: 'Accumulated Sentiment',
    series: [{ name: 'Total amount:', data }],
    categories,
    type: 'bar',
  };
};

// TODO: Add dynamic information
const getTotalTweetsMap = () => {
  return {
    type: 'Heat',
    data: {
      title: 'Total tweets count per state',
      states: {
        son: { count: 50 },
        chh: { count: 100 },
      },
      max: 100,
      label: 'Tweets count',
    },
  };
};

// TODO: Add dynamic information
const getAverageSentimentMap = () => {
  return {
    type: 'Comparison',
    data: {
      title: 'Average sentiment per state ',
      states: {
        son: { sentiment: 5 },
        chh: { sentiment: 2 },
        dur: { sentiment: -3 },
        coa: { sentiment: 0 },
        gua: { sentiment: -1 },
      },
      max: 5,
      min: -5,
      label: 'Average sentiment',
    },
  };
};

const getReport = (tweets: [any]) => {
  return {
    charts: {
      generalSentiment: getGeneralSentiment(tweets),
      accumulatedSentiment: getAccumulatedSentiment(tweets),
      // TODO: Add more functions per chart or statistic
    },
    statistics: {
      // TODO: Add useful statistics
      total: tweets.length,
    },
    maps: {
      // TODO: Add useful maps
      totalTweets: getTotalTweetsMap(),
      averageSentiment: getAverageSentimentMap(),
    },
  };
};

export default getReport;
