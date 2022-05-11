import { useState } from 'react';

import SearchBar from '../../components/SearchBar';
import Report from '../../components/report/Report';

const Search = () => {
  const [report, setReport] = useState<any>();

  return (
    <div>
      <SearchBar setReport={setReport} />
      <Report report={report} />
    </div>
  );
};

export default Search;
