import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface DropdownProps {
  callback: any;
  value: any;
  name: string;
}

export const Dropdown = (props: DropdownProps) => {
  const stateShortNames: { [stateName: string]: string } = {
    Todos: 'ALL',
    Aguascalientes: 'AG',
    'Baja California': 'BC',
    'Baja California Sur': 'BS',
    Campeche: 'CM',
    Chiapas: 'CS',
    Chihuahua: 'CH',
    Coahuila: 'CO',
    Colima: 'CL',
    'Ciudad de Mexico': 'CX',
    Durango: 'DG',
    Guanajuato: 'GT',
    Guerrero: 'GR',
    Hidalgo: 'HG',
    Jalisco: 'JC',
    'Estado de Mexico': 'EM',
    Michoacan: 'MI',
    Morelos: 'MO',
    Nayarit: 'NA',
    'Nuevo Leon': 'NL',
    Oaxaca: 'OA',
    Puebla: 'PU',
    Queretaro: 'QT',
    'Quintana Roo': 'QR',
    'San Luis Potosi': 'SL',
    Sinaloa: 'SI',
    Sonora: 'SO',
    Tabasco: 'TB',
    Tamaulipas: 'TM',
    Tlaxcala: 'TL',
    Veracruz: 'VE',
    Yucatan: 'YU',
    Zacatecas: 'ZA',
  };

  return (
    <FormControl sx={{ m: 1, width: 300 }}>
      <InputLabel>{props.name}</InputLabel>
      <Select
        value={props.value}
        label='State'
        onChange={(event) => {
          props.callback(event.target.value);
        }}
      >
        {Object.keys(stateShortNames).map((state) => (
          <MenuItem key={state} value={stateShortNames[state]}>
            {state}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
