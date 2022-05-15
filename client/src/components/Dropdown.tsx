import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

interface DropdownProps {
  callback: any;
  value: any;
  name: string;
}

export const Dropdown = (props: DropdownProps) => {
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
        {Object.keys(statesAbvs).map((abv) => (
          <MenuItem key={statesAbvs[abv]} value={abv}>
            {statesAbvs[abv]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
