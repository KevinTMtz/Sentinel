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

const getReport = (tweets: [any]) => {
  return {
    generalSentiment: getGeneralSentiment(tweets),
    // TODO: Add more functions per chart or statistic
  };
};

export default getReport;
