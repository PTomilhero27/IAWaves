// hooks/useCalendar.ts
import { useState } from "react";
import {
  getDaysInMonth,
  startOfMonth,
  endOfMonth,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";

export const useCalendar = (initialDate: Date) => {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const daysInMonth = getDaysInMonth(currentDate);
  const startDay = getDay(startOfMonth(currentDate));
  const endDay = getDay(endOfMonth(currentDate));

  // Calcula os dias "vazios" do início do mês anterior
  const previousMonthDays = Array.from(
    { length: startDay },
    (_, index) =>
      getDaysInMonth(subMonths(currentDate, 1)) - startDay + index + 1
  );

  // Calcula os dias "vazios" do início do próximo mês
  const nextMonthDays = Array.from(
    { length: 6 - endDay },
    (_, index) => index + 1
  );

  return {
    currentDate,
    setCurrentDate,
    goToPreviousMonth,
    goToNextMonth,
    daysInMonth,
    previousMonthDays,
    nextMonthDays,
  };
};
