import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

let data = require('../assets/data/calendar.json');

export default function MyResponsiveCalendar(props) {
  return (
      <ResponsiveCalendar
        data={data}
        from="2020-01-03"
        to="2020-07-24"
        emptyColor="#eeeeee"
        colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
        margin={props.margin}
        yearSpacing={0}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        align={props.align}
        legends={[
          {
            anchor: 'bottom-right',
            direction: 'row',
            translateY: props.translateY,
            itemCount: props.itemCount
            
            ,
            itemWidth: 42,
            itemHeight: 36,
            itemsSpacing: 14,
            itemDirection: 'right-to-left',
            itemTextColor: props.itemTextColor,
          }
        ]}
      />
  );
}