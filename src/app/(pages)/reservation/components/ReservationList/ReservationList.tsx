/* eslint-disable @typescript-eslint/no-explicit-any */
// components/ReservationList.tsx
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select/select";
import { Reservation, ReservationStatus } from "@/app/types/Reservation";
import { Edit } from "@/app/service/query";

interface ReservationListProps {
  reservations: Reservation[];
  onReservationClick: (
    reservationId: number,
    status: ReservationStatus
  ) => void;
}

const ReservationList: React.FC<ReservationListProps> = ({
  reservations,
  onReservationClick,
}) => {
const { mutate } = Edit({
  url: "reservations/status",
  queryKeys: 'reservations/by-date',
});

  const handleStatusChange = (
    reservationId: number,
    newStatus: ReservationStatus
  ) => {
    mutate({
      id: reservationId,
      json: { status: newStatus },
    });
  };

  const getStatusColor = (status: ReservationStatus) => {
    switch (status) {
      case ReservationStatus.Finalizado:
        return "bg-green-500 text-white";
      case ReservationStatus.EmAndamento:
        return "bg-blue-400 text-white";
      case ReservationStatus.Agendado:
        return "bg-yellow-400 text-white";
      case ReservationStatus.Cancelado:
        return "bg-red-500 text-white";
      default:
        return "bg-gray-200 text-black";
    }
  };

  return (
    <div className="p-4 flex-1 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">
        Todas as Reservas ({reservations.length} reservas)
      </h2>
      {reservations.length === 0 ? (
        <p className="text-gray-500">Nenhuma reserva para este dia.</p>
      ) : (
        reservations.map((reservation) => (
          <div
            key={reservation.id}
            className={`flex justify-between items-center border-b border-gray-300 pb-4 mb-4 ${
              reservation.status === ReservationStatus.Finalizado
                ? ""
                : "cursor-pointer"
            }`}
            onClick={() =>
              reservation.status !== ReservationStatus.Finalizado &&
              onReservationClick(reservation.id, reservation.status)
            }
          >
            {/* Informações da reserva */}
            <div>
              <div className="flex gap-3 items-center">
                <p className="m-0">{reservation.reservantName}</p>
                <span> - </span>
                <span className="text-sm text-gray-600">
                  {reservation.numberOfPeople}{" "}
                  {reservation.numberOfPeople > 1 ? "Pessoas" : "Pessoa"}
                </span>
              </div>
              <div className="flex gap-3 items-center">
                <p className="text-sm text-gray-600">
                  Telefone: {reservation.reservantPhone}
                </p>
                <span> - </span>
                <span className="text-sm text-gray-600">
                  e-mail: {reservation.reservantEmail}
                </span>
              </div>
            </div>

            {/* Status */}
            <div className="text-right">
              <Select
                value={reservation.status.toString()}
                onValueChange={(newStatus) =>
                  reservation.status === ReservationStatus.Finalizado
                    ? null
                    : handleStatusChange(
                        reservation.id,
                        Number(newStatus) as ReservationStatus
                      )
                }
              >
                <SelectTrigger
                  className={`w-[180px] rounded-md ${
                    reservation.status === ReservationStatus.Finalizado
                      ? "bg-green-500 text-white pointer-events-none"
                      : getStatusColor(reservation.status)
                  }`}
                  disabled={reservation.status === ReservationStatus.Finalizado}
                >
                  <SelectValue placeholder="Status" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value={ReservationStatus.Finalizado.toString()}>
                    Finalizada
                  </SelectItem>
                  <SelectItem value={ReservationStatus.Agendado.toString()}>
                    Agendado
                  </SelectItem>
                  <SelectItem value={ReservationStatus.EmAndamento.toString()}>
                    Em andamento
                  </SelectItem>
                  <SelectItem value={ReservationStatus.Cancelado.toString()}>
                    Cancelado
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReservationList;
