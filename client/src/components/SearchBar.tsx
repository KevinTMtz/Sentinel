import { Dispatch, useState } from 'react';
import { Box } from '@mui/system';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Dropdown } from './Dropdown';
import { searchAndGetReport } from '../functions/search/search';

const searchBarContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const wideSearchBar = {
  width: '60%',
};

interface SearchBarProps {
  setReport: Dispatch<any>;
}

const SearchBar = (props: SearchBarProps) => {
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState(new Date());
  const [location, setLocation] = useState<string>('Todos');

  const search = () => {
    searchAndGetReport({
      topic: topic,
      location: location,
      until: date,
    }).then(
      (res: any) => {
        props.setReport(res.data.report);
      },
      (err: any) => {
        console.log(err);
      },
    );
  };

  return (
    <Box sx={searchBarContainer}>
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

      <Dropdown callback={setLocation} value={location} name='State' />

      <TextField
        sx={wideSearchBar}
        label='Search Topic'
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
        onKeyUp={(event) => {
          event.key === 'Enter' && search();
        }}
      />
      <IconButton onClick={() => search()}>
        <SearchIcon color='primary' />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
