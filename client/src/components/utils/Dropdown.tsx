import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface DropdownProps {
  name: string;
  values: { [key: string]: string };
  value: string;
  updateValue: (value: string) => void;
}

export const Dropdown = (props: DropdownProps) => (
  <FormControl sx={{ minWidth: '236px' }}>
    <InputLabel>{props.name}</InputLabel>
    <Select
      value={props.value}
      label={props.name}
      onChange={(event) => props.updateValue(event.target.value)}
    >
      {Object.keys(props.values).map((abv) => (
        <MenuItem key={props.values[abv]} value={abv}>
          {props.values[abv]}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);
