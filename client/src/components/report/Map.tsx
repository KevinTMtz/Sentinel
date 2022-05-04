import React, { useState } from 'react';
import Mexico from '@svg-maps/mexico';
import { SVGMap } from 'react-svg-map';
import { Container, SxProps, Typography } from '@mui/material';

export interface MapProps {
  type: 'Heat' | 'Comparison';
  title: string;
  data: HeatMapProps | CompareMapProps;
}

interface HeatMapProps {
  states: [{ id: string; count: number }];
  max: number;
}

interface CompareMapProps {
  states: [{ id: string; sentiment: number }];
  max: number;
  min: number;
}

const MapStyle: SxProps = {
  width: '40%',
  '.svg-map': {
    stroke: '#666',
    strokeWidth: 0.25,
  },
  '.svg-map__location:focus, .svg-map__location:hover': {
    fill: '#b8e2b3 !important',
    fillOpacity: '1 !important',
    outline: 0,
  },
};

const MexicoMap = React.memo(() => {
  const [state, setState] = useState({ id: '', name: '' });

  const handleClick = (event: any) => {
    const loc = event.target.attributes;
    console.log(loc);
    setState({ id: loc.id.value, name: loc.name.value });
  };
  return (
    <>
      <Typography>State: {state.name}</Typography>
      <SVGMap map={Mexico} onLocationClick={handleClick} />
    </>
  );
});

const HeatMap = () => {
  const color = '#1976d2';

  // TODO: Add properties needed in props.data
  const customMX = {
    label: 'Custom Mexico Map',
    states: Mexico.locations.map((location: any) => {
      return { ...location, fillOpacity: Math.random() };
    }),
  };

  // TODO: Process props.data
  const colors = customMX.states.reduce((acc: any, curr: any) => {
    const key = `#${curr.id}.svg-map__location`;
    acc[key] = {
      fill: color,
      fillOpacity: curr.fillOpacity,
    };
    return acc;
  }, {});

  // TODO: Change focus color
  const style: SxProps = {
    ...MapStyle,
    ...colors,
  };

  return (
    <Container sx={style}>
      <MexicoMap />
    </Container>
  );
};

const ComparisonMap = () => {
  const colors = ['#1976d2', 'grey', 'red'];
  //TODO: Add style const that depends on props.type
  const style = {};
  return (
    <Container sx={style}>
      <MexicoMap />
    </Container>
  );
};

// TODO: Add props
const Map = (props: MapProps) => {
  return props.type === 'Heat' ? <HeatMap /> : <ComparisonMap />;
};

export default Map;
