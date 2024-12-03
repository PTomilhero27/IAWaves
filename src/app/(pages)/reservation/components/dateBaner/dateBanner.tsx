"use client";

import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Clock } from "lucide-react";

interface DateBannerProps {
  selectedDay: Date; // Data selecionada que deve ser exibida
}

const DateBanner: React.FC<DateBannerProps> = ({ selectedDay }) => {
  // Formatar a data selecionada
  const formattedDate = format(selectedDay, "EEEE, d 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  // Usar a hora atual para o horário exibido
  const formattedTime = new Date().toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex items-center justify-between bg-teal-500 text-white px-6 py-4 rounded-lg shadow-md">
      {/* Data */}
      <div className="flex items-center space-x-2">
        <Calendar className="w-6 h-6" />
        <span className="text-lg font-semibold text-white">{formattedDate}</span>
      </div>

      {/* Hora */}
      <div className="flex items-center space-x-2">
        <Clock className="w-6 h-6" />
        <span className="text-lg font-semibold text-white">{formattedTime}</span>
      </div>

      {/* Texto "Reservas" */}
      <div className="text-lg font-bold uppercase tracking-wide">Reservas</div>
    </div>
  );
};

export default DateBanner;
