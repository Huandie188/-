import { DateRange } from "react-day-picker";
import { HTMLAttributes } from "react";

interface DatePickerWithRangeProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  dateRange?: DateRange;
  onDateRangeChange?: (range: DateRange | undefined) => void;
}

declare module "@/components/date-range-picker" {
  export const DatePickerWithRange: React.FC<DatePickerWithRangeProps>;
  export default DatePickerWithRange;
} 