import { Container, IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
import { searchTweets } from '../api/reports/TweetSearch';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { Dropdown } from './Dropdown';

interface searchProps {
  searchText: string;
  location: string | undefined;
  date: Date | undefined;
}

const searchBarContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const wideSearchBar = {
  width: '60vw',
};

interface SearchBarProps {
  callback: any;
}

const SearchBar = (searchBarProps: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState<string>('Todos');

  const search = (props: searchProps) => {
    searchTweets(
      { keyword: props.searchText, location: props.location, date: props.date },
      searchBarProps.callback,
    );
    clearSearchField();
  };

  const clearSearchField = () => {
    setSearchText('');
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    search({ searchText: searchText, date: date, location: location });
  };

  return (
    <>
      <Container sx={searchBarContainer}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            disableFuture
            value={date}
            onChange={(value) => {
              value && setDate(value);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>

        <Dropdown callback={setLocation} value={location} />

        <TextField
          sx={wideSearchBar}
          label='Search Topic'
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
          onKeyUp={(event) => {
            event.key === 'Enter' &&
              search({
                searchText: searchText,
                date: date,
                location: location,
              });
          }}
        />
        <IconButton onClick={handleClick}>
          <SearchIcon color='primary' />
        </IconButton>
      </Container>
    </>
  );
};

export default SearchBar;
