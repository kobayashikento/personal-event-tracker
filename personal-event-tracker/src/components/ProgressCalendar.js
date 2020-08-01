import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';

export default function MyResponsiveCalendar(props) {
  return (
      <ResponsiveCalendar
        data={props.data}
        from={"2020-05-01"}
        to={"2020-09-01"}
        granularity="month"
        emptyColor="#eeeeee"
        colors={props.colors}
        margin={props.margin}
        yearSpacing={0}
        monthBorderColor="grey"
        dayBorderWidth={2}
        dayBorderColor="#ffffff"
        align={props.align}
      />
  );
}