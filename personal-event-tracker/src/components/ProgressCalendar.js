import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

export default function MyResponsiveCalendar(props) {
  return (
      <ResponsiveCalendar
        data={props.data}
        from="2020-01-03"
        to="2020-07-24"
        emptyColor="#eeeeee"
        colors={props.colors}
        margin={props.margin}
        yearSpacing={0}
        monthBorderColor="#ffffff"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        align={props.align}
      />
  );
}