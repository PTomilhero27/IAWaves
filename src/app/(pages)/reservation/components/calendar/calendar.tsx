"use client";

import React, { useEffect } from "react";
import { format, isToday, isPast, setDefaultOptions } from "date-fns";
import { CircleArrowLeft, CircleArrowRight } from "lucide-react";
import { useCalendar } from "@/app/hook/useCalendar";
import { ReservationSummary } from "@/app/types/Reservation";
import { ptBR } from "date-fns/locale";

interface CalendarProps {
  reservations: ReservationSummary[];
  onMonthClick: (date: Date) => void; // Callback ao mudar de mes
  onDayClick: (date: Date) => void; // Callback ao mudar de dia
  selectedDay: Date; // Dia atualmente selecionado
}
setDefaultOptions({ locale: ptBR });

const Calendar: React.FC<CalendarProps> = ({ reservations, onDayClick, onMonthClick, selectedDay }) => {
  const {
    currentDate,
    goToPreviousMonth,
    goToNextMonth,
    daysInMonth,
    previousMonthDays,
    nextMonthDays,
  } = useCalendar(new Date());

  const getReservationData = (day: number) => {
    const date = format(
      new Date(currentDate.getFullYear(), currentDate.getMonth(), day),
      "yyyy-MM-dd"
    );
    return reservations.find((res) => res.date === date);
  };

  // Executa o callback onMonthClick sempre que currentDate mudar
  useEffect(() => {
    if (onMonthClick) {
      onMonthClick(currentDate);
    }
  }, [currentDate, onMonthClick]);

  return (
    <div className="max-w-lg bg-gray-100 p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={goToPreviousMonth}
          className="text-gray-600 hover:text-gray-800 text-2xl"
        >
          <CircleArrowLeft width={30} height={30} />
        </button>
        <h2 className="text-2xl font-bold capitalize">
          {format(currentDate, "MMMM yyyy")}
        </h2>
        <button
          onClick={goToNextMonth}
          className="text-gray-600 hover:text-gray-800"
        >
          <CircleArrowRight width={30} height={30} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 items-center text-center">
        {/* Cabeçalho dos dias da semana */}
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
          <div key={day} className="text-sm font-semibold text-gray-600">
            {day}
          </div>
        ))}

        {/* Dias "vazios" do início do mês */}
        {previousMonthDays.map((day, index) => (
          <div
            key={`start-empty-${index}`}
            className="h-16 w-full flex flex-col justify-start items-start p-2 bg-gray-200 opacity-50 rounded-lg"
          >
            <span className="text-xs font-semibold">{day}</span>
          </div>
        ))}

        {/* Dias do mês atual */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const reservationData = getReservationData(day);
          const currentDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isSelectedDay = currentDay.toDateString() === selectedDay.toDateString();
          const isCurrentDay = isToday(currentDay);
          const hasReservation = reservationData && reservationData.count > 0;

          const isClickable = isCurrentDay || hasReservation;

          return (
            <button
              key={day}
              className={`h-16 w-full flex flex-col justify-start items-start p-2 rounded-lg ${
                isSelectedDay
                  ? "bg-gradient-login text-white"
                  : isPast(currentDay) && !isToday(currentDay)
                  ? "bg-gray-200 text-gray-500"
                  : "bg-white text-black border border-gray-300"
              } ${!isClickable ? "cursor-default" : "cursor-pointer"}`}
              onClick={() => {
                if (isClickable) {
                  onDayClick(currentDay);
                }
              }}
            >
              <span className="text-xs font-semibold text-black">{day}</span>
              {hasReservation && (
                <span className="text-xl font-bold text-center w-full mt-1">
                  {reservationData.count}
                </span>
              )}
            </button>
          );
        })}

        {/* Dias "vazios" do final do mês */}
        {nextMonthDays.map((day, index) => (
          <div
            key={`end-empty-${index}`}
            className="h-16 w-full flex flex-col justify-start items-start p-2 bg-gray-200 opacity-50 rounded-lg"
          >
            <span className="text-xs font-semibold">{day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
