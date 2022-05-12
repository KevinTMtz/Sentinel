import React, { useState } from 'react';
import Mexico from '@svg-maps/mexico';
import { SVGMap } from 'react-svg-map';
import { Container, Grid, Paper, SxProps, Typography } from '@mui/material';

export interface MapProps {
  type: 'Heat' | 'Comparison';
  data: HeatMapProps | CompareMapProps;
}

interface MapLegendProps {
  title: string;
  colors: { color: string; label: string; gradient: boolean }[];
}

interface HeatMapProps {
  states: { [key: string]: { count: number } };
  max: number;
  label: string;
  title: string;
}

interface CompareMapProps {
  states: { [key: string]: { sentiment: number } };
  max: number;
  min: number;
  label: string;
  title: string;
}

const MapStyle: SxProps = {
  width: '40%',
  padding: '10px',
  margin: '10px auto',
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
    setState({ id: loc.id.value, name: loc.name.value });
  };
  return (
    <>
      <Typography align='center' fontWeight='bold'>
        {props.states[state.id]
          ? `${state.name.toUpperCase()}'s ${props.label.toLowerCase()}: ${
              props.states[state.id].count | props.states[state.id].sentiment
            }`
          : "Click a state to view it's data"}
      </Typography>
      <SVGMap map={Mexico} onLocationClick={handleClick} />
    </>
  );
});

const Legend = (props: MapLegendProps) => {
  const colors = [
    ...props.colors,
    {
      color: 'rgba(128,128,128,0.1)',
      label: 'State not considered',
      gradient: false,
    },
  ];
  return (
    <Paper sx={{ padding: '10px' }}>
      <Grid container direction='column' alignItems='center'>
        <Typography variant='h6' marginBottom='10px'>
          {props.title}
        </Typography>
        {colors.map(({ color, label, gradient }) => (
          <Grid
            container
            alignItems='center'
            justifyContent='space-between'
            width='75%'
            key={props.title.trim() + color}
          >
            <Paper
              sx={{
                width: '40%',
                height: '10px',
                background: gradient
                  ? `linear-gradient(90deg, white, ${color})`
                  : color,
              }}
            ></Paper>
            <Typography variant='body2' fontStyle='italic'>
              {label}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

const HeatMap = (props: HeatMapProps) => {
  const color = '#1976d2';

  const statesColors = Object.keys(props.states).reduce(
    (acc: any, curr: any) => {
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
    },
    {},
  );

  const style: SxProps = {
    ...MapStyle,
    ...statesColors,
  };

  const legendColors = [{ color: color, label: props.label, gradient: true }];

  return (
    <Container sx={style}>
      <MexicoMap states={props.states} label={props.label} />
      <Legend colors={legendColors} title={props.title} />
    </Container>
  );
};

const ComparisonMap = (props: CompareMapProps) => {
  const colorPositive = '#3fff35';
  const colorNeutral = 'rgba(128,128,128,0.4)';
  const colorNegative = '#ff353f';

  const statesColors = Object.keys(props.states).reduce(
    (acc: any, curr: any) => {
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
              fillOpacity: 1,
            };

      acc[key + ':focus,' + key + ':hover'] = {
        fill: '#C9C09B',
        fillOpacity: '0.75',
        outline: 0,
        cursor: 'pointer',
      };
      return acc;
    },
    {},
  );

  const style: SxProps = {
    ...MapStyle,
    ...statesColors,
  };

  const legendColors = [
    {
      color: colorPositive,
      label: 'Positive ' + props.label.toLowerCase(),
      gradient: true,
    },
    {
      color: colorNegative,
      label: 'Negative ' + props.label.toLowerCase(),
      gradient: true,
    },
    {
      color: colorNeutral,
      label: 'Neutral ' + props.label.toLowerCase(),
      gradient: false,
    },
  ];

  return (
    <Container sx={style}>
      <MexicoMap states={props.states} label={props.label} />
      <Legend colors={legendColors} title={props.title} />
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
