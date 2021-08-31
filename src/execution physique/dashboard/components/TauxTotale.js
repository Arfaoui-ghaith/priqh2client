import React, { PureComponent } from 'react';
import { RadialBarChart, RadialBar, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Projet',
    uv: 100,
    fill: '#8884d8',
  },
  {
    name: 'Voirie',
    uv: 50,
    fill: '#83a6ed',
  },
  {
    name: 'Eau potable',
    uv: 50,
    fill: '#83a6ed',
  },
  {
    name: 'Eclairage',
    uv: 15.69,
    fill: '#8dd1e1',
  },
  {
    name: 'Drainage',
    uv: 8.22,
    fill: '#82ca9d',
  },
  {
    name: 'Assainissement',
    uv: 8.63,
    fill: '#a4de6c',
  },
];

const style = {
  top: '50%',
  right: 0,
  transform: 'translate(0, -50%)',
  lineHeight: '24px',
};

export default class TauxTotale extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={data}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey="uv"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      </ResponsiveContainer>
    );
  }
}