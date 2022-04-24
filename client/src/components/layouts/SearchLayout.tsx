import { useState } from 'react';
import SearchBar from '../SearchBar';
import Report from '../report/Report';

const SearchLayout = () => {
  const [report, setReport] = useState<any>();

  return (
    <>
      <SearchBar callback={setReport} />
      <Report report={report} />
    </>
  );
};

export default SearchLayout;
