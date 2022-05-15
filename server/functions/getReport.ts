const getGeneralSentiment = async (tweets: [any]) => {
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

const getAccumulatedSentiment = async (tweets: [any]) => {
  const ocurrances = tweets.reduce((acc, curr) => {
    const s = curr.sentiment;
    acc[s] ? acc[s]++ : (acc[s] = 1), acc;
    return acc;
  }, {});
  const keys = Object.keys(ocurrances).sort().map(Number);
  const categories: string[] = [];
  const data: number[] = [];
  for (var i: number = Math.min(...keys); i <= Math.max(...keys); i++) {
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
const getTotalTweetsMap = async (tweets: any[]) => {
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
const getAverageSentimentMap = async (tweets: any[]) => {
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

const getReport = async (tweetsByState: any[]) => {
  const allTweets = tweetsByState.reduce((arr, curr) => {
    return arr.concat(...Object.values(curr));
  }, []);

  const promises = [
    getGeneralSentiment(allTweets),
    getAccumulatedSentiment(allTweets),
    getTotalTweetsMap(tweetsByState),
    getAverageSentimentMap(tweetsByState),
  ];

  const [
    generalSentiment,
    accumulatedSentiment,
    totalTweets,
    averageSentiment,
  ] = await Promise.all(promises);

  return {
    charts: {
      generalSentiment,
      accumulatedSentiment,
      // TODO: Add more functions per chart or statistic
    },
    statistics: {
      // TODO: Add useful statistics
      total: allTweets.length,
    },
    maps: {
      // TODO: Add useful maps
      totalTweets,
      averageSentiment,
    },
  };
};

export default getReport;
