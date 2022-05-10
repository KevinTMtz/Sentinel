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
  states: { [key: string]: { count: number } };
  max: number;
  label: string;
}

interface CompareMapProps {
  states: { [key: string]: { sentiment: number } };
  max: number;
  min: number;
  label: string;
}

const MapStyle: SxProps = {
  width: '40%',
  '.svg-map': {
    stroke: '#666',
    strokeWidth: 0.25,
  },
  '.svg-map__location': {
    fill: 'grey',
    fillOpacity: 0.1,
    outline: 0,
  },
};

const MexicoMap = React.memo((props: any) => {
  const [state, setState] = useState({ id: '', name: '' });

  const handleClick = (event: any) => {
    const loc = event.target.attributes;
    console.log(loc);
    setState({ id: loc.id.value, name: loc.name.value });
  };
  return (
    <>
      <Typography>State: {state.name}</Typography>
      {props.states[state.id] && (
        <Typography>
          {props.label}
          {props.states[state.id].count | props.states[state.id].sentiment}
        </Typography>
      )}
      <SVGMap map={Mexico} onLocationClick={handleClick} />
    </>
  );
});

const HeatMap = (props: HeatMapProps) => {
  const color = '#1976d2';

  const colors = Object.keys(props.states).reduce((acc: any, curr: any) => {
    const key = `#${curr}.svg-map__location`;
    acc[key] = {
      fill: color,
      fillOpacity: props.states[curr].count / props.max,
    };
    acc[key + ':focus,' + key + ':hover'] = {
      fill: '#C9C09B',
      fillOpacity: '0.75',
      outline: 0,
      cursor: 'pointer',
    };
    return acc;
  }, {});

  const style: SxProps = {
    ...MapStyle,
    ...colors,
  };

  return (
    <Container sx={style}>
      <MexicoMap states={props.states} label={props.label} />
      {/* TODO: Add Legend here */}
    </Container>
  );
};

const ComparisonMap = (props: CompareMapProps) => {
  const colorPositive = '#3fff35';
  const colorNeutral = 'grey';
  const colorNegative = '#ff353f';

  const colors = Object.keys(props.states).reduce((acc: any, curr: any) => {
    const key = `#${curr}.svg-map__location`;
    const { sentiment } = props.states[curr];
    acc[key] =
      sentiment > 0
        ? {
            fill: colorPositive,
            fillOpacity: sentiment / props.max,
          }
        : sentiment < 0
        ? {
            fill: colorNegative,
            fillOpacity: sentiment / props.min,
          }
        : {
            fill: colorNeutral,
            fillOpacity: 0.4,
          };

    acc[key + ':focus,' + key + ':hover'] = {
      fill: '#C9C09B',
      fillOpacity: '0.75',
      outline: 0,
      cursor: 'pointer',
    };
    return acc;
  }, {});

  const style: SxProps = {
    ...MapStyle,
    ...colors,
  };

  return (
    <Container sx={style}>
      <MexicoMap states={props.states} label={props.label} />
    </Container>
  );
};

const Map = (props: MapProps) => {
  return props.type === 'Heat' ? (
    <HeatMap {...(props.data as HeatMapProps)} />
  ) : (
    <ComparisonMap {...(props.data as CompareMapProps)} />
  );
};

export default Map;
