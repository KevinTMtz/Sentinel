// TODO: Rename to chart label
const getPieChart = (tweets: [any]) => {
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
    series,
    labels: ['Positive', 'Negative', 'Neutral'],
  };
};

const getReport = (tweets: [any]) => {
  return {
    pieChart: getPieChart(tweets),
    // TODO: Add more functions per chart or statistic
  };
};

export default getReport;
