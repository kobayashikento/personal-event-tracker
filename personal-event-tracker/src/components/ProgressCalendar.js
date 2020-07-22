import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

let data = require('../assets/data/calendar.json');

export default function MyResponsiveCalendar() {
  return (
      <ResponsiveCalendar
        data={data}
        from="2020-01-03"
        to="2020-05-11"
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        minValue={-8}
        margin={{ top:60, right: 40, bottom: 40, left: 40 }}
        yearSpacing={0}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        align="top"
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: -40,
            itemCount: 4,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left'
          }
        ]}
      />
  );
}