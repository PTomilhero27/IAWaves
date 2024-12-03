/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import Calendar from "./components/calendar/calendar";
import DateBanner from "./components/dateBaner/dateBanner";
import { useRouter } from "next/navigation";
import { toast } from "@/app/components/ui/toast/use-toast";
import ReservationList from "./components/ReservationList/ReservationList";
import { ReservationsResponse, ReservationSummaryResponse, ReservationStatus } from "@/app/types/Reservation";
import { getToken } from "@/app/lib/token";
import { format, startOfMonth } from "date-fns";
import { GetAll } from "@/app/service/query";

const token = getToken();
const parsedToken = token ? JSON.parse(atob(token.split(".")[1])) : undefined;
const companyId = parsedToken?.taxId;

export default function ReservationPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(new Date());

  const router = useRouter();

  // Fetch reservation monthly summary data
  const { data: reservationSummary } = GetAll<ReservationSummaryResponse>({
    url: "reservations/monthly-summary",
    params: {
      companyId: companyId || "",
      startDate: format(startOfMonth(selectedMonth), "yyyy-MM-dd"),
      showPeopleCount: true,
    },
  });

  // Fetch reservation data for a specific day
  const { data: reservations } = GetAll<ReservationsResponse>({
    url: "reservations/by-date",
    params: {
      companyId,
      date: format(selectedDay, "yyyy-MM-dd"),
    },
  });

  // Handle month change
  const handleMonthClick = (date: Date) => {
    if (
      date.getMonth() !== selectedMonth.getMonth() ||
      date.getFullYear() !== selectedMonth.getFullYear()
    ) {
      setSelectedMonth(new Date(date.getFullYear(), date.getMonth(), 1));
      setSelectedDay(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  };

  // Handle day click
  const handleDayClick = (date: Date) => setSelectedDay(date);

  // Handle reservation click
  const handleReservationClick = (reservationId: number, status: ReservationStatus) => {
    if (status === ReservationStatus.EmAndamento) {
      router.push(`/reservation/${reservationId}`);
    } else {
      toast({
        variant: "warning",
        title: "Acesso restrito",
        description: "Você só pode acessar reservas com status 'Em andamento'.",
      });
    }
  };

  return (
    <div className="flex w-full justify-between">
      {/* Calendário */}
      <div className="w-[70%] p-4">
        <Calendar
          reservations={reservationSummary?.data || []}
          onMonthClick={handleMonthClick}
          onDayClick={handleDayClick}
          selectedDay={selectedDay}
        />
      </div>

      {/* Conteúdo principal */}
      <div className="w-full flex flex-col">
        {/* Faixa com a data selecionada */}
        <div className="p-4">
          <DateBanner selectedDay={selectedDay} />
        </div>

        {/* Botão de nova reserva */}
        <div className="p-4 flex justify-between items-center">
          <button className="bg-orange-500 text-white px-4 py-2 rounded-lg font-bold">
            + Nova Reserva
          </button>
        </div>

        {/* Lista de Reservas */}
        <ReservationList
          reservations={reservations?.data || []}
          onReservationClick={handleReservationClick}
        />
      </div>
    </div>
  );
}
