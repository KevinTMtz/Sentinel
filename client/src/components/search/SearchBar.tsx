import { Dispatch } from 'react';
import { Box } from '@mui/system';
import { IconButton, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { Dropdown } from '../utils/Dropdown';
import { ReportSearchQuery } from '../../types/types';

const searchBarContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
};

const statesAbvs: { [key: string]: string } = {
  all: 'Todos',
  agu: 'Aguascalientes',
  bcn: 'Baja California',
  bcs: 'Baja California Sur',
  cam: 'Campeche',
  chp: 'Chiapas',
  chh: 'Chihuahua',
  cmx: 'Ciudad de Mexico',
  coa: 'Coahuila',
  col: 'Colima',
  dur: 'Durango',
  gua: 'Guanajuato',
  gro: 'Guerrero',
  hid: 'Hidalgo',
  jal: 'Jalisco',
  mex: 'Estado de Mexico',
  mic: 'Michoacan',
  mor: 'Morelos',
  nay: 'Nayarit',
  nle: 'Nuevo Leon',
  oax: 'Oaxaca',
  pue: 'Puebla',
  que: 'Queretaro',
  roo: 'Quintana Roo',
  slp: 'San Luis Potosi',
  sin: 'Sinaloa',
  son: 'Sonora',
  tab: 'Tabasco',
  tam: 'Tamaulipas',
  tla: 'Tlaxcala',
  ver: 'Veracruz',
  yuc: 'Yucatan',
  zac: 'Zacatecas',
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
        label='Search date'
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
