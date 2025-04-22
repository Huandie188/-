import * as React from 'react';

declare module "@/components/charts" {
  export function LineChart(): React.ReactElement;
  export function BarChart(): React.ReactElement;
  export function PieChart(): React.ReactElement;
  
  const Charts: {
    LineChart: () => React.ReactElement;
    BarChart: () => React.ReactElement;
    PieChart: () => React.ReactElement;
  };
  
  export default Charts;
} 