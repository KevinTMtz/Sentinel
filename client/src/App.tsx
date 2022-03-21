import React from 'react';
import TweetList from './components/TweetList';

const appStyle = {
  padding: '16px 32px',
};

const App = () => {
  return (
    <div style={appStyle}>
      <header>
        <h1>Sentinel</h1>
      </header>
      <TweetList />
    </div>
  );
};

export default App;
