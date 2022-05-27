import { Dispatch } from 'react';
import { Box } from '@mui/system';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Dropdown } from '../utils/Dropdown';
import { ReportSearchQuery } from '../../types/types';
import { statesAbvs } from '../../values/states';

const searchBarContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
};

interface SearchBarProps {
  search: () => void;
  query: ReportSearchQuery;
  setQuery: Dispatch<ReportSearchQuery>;
}

const SearchBar = (props: SearchBarProps) => (
  <Box sx={searchBarContainer}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label='Date'
        disableFuture
        value={props.query.until}
        onChange={(value) =>
          value && props.setQuery({ ...props.query, until: value })
        }
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

    <Dropdown
      name='State'
      values={statesAbvs}
      value={props.query.location}
      updateValue={(value) =>
        props.setQuery({ ...props.query, location: value })
      }
    />

    <TextField
      label='Search Topic'
      value={props.query.topic}
      fullWidth
      onChange={(event) =>
        props.setQuery({ ...props.query, topic: event.target.value })
      }
      onKeyUp={(event) => {
        event.key === 'Enter' && props.search();
      }}
    />

    <IconButton onClick={props.search}>
      <SearchIcon color='primary' />
    </IconButton>
  </Box>
);

export default SearchBar;
