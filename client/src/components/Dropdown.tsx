import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface DropdownProps {
  callback: any;
  value: any;
  name: string;
}

export const Dropdown = (props: DropdownProps) => {
  const mexicanStates = [
    'Todos',
    'Aguascalientes',
    'Baja California',
    'Baja California Sur',
    'Campeche',
    'Chiapas',
    'Chihuahua',
    'Coahuila',
    'Colima',
    'Ciudad de Mexico',
    'Durango',
    'Guanajuato',
    'Guerrero',
    'Hidalgo',
    'Jalisco',
    'Estado de Mexico',
    'Michoacan',
    'Morelos',
    'Nayarit',
    'Nuevo Leon',
    'Oaxaca',
    'Puebla',
    'Queretaro',
    'Quintana Roo',
    'San Luis Potosi',
    'Sinaloa',
    'Sonora',
    'Tabasco',
    'Tamaulipas',
    'Tlaxcala',
    'Veracruz',
    'Yucatan',
    'Zacatecas',
  ];

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel id='demo-multiple-name-label'>{props.name}</InputLabel>
      <Select
        labelId='demo-controlled-open-select-label'
        id='demo-controlled-open-select'
        value={props.value}
        label='State'
        onChange={(event) => {
          props.callback(event.target.value);
        }}
      >
        {mexicanStates.map((state) => (
          <MenuItem key={state} value={state}>
            {state}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
