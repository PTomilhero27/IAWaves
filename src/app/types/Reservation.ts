export interface Participant {
  id: number;
  name: string;
  phone: string;
  hasArrived: boolean;
  reservationId: number;
}

export interface Reservation {
  id: number;
  reservantName: string;
  reservantEmail: string;
  reservantPhone: string;
  numberOfPeople: number;
  reservationDate: string; // ISO String (ex.: "2024-12-14T00:00:00.000Z")
  reservationTime: string; // Formato de hora (ex.: "16:00")
  reason: string; // Motivo da reserva (ex.: "aniversário")
  status: number; // Status da reserva (ex.: "0")
  actualAttendance: number; // Número de pessoas que realmente compareceram
  createdAt: string; // Data de criação da reserva
  companyId: string; // CNPJ da empresa
  participants: Participant[]; // Array de participantes
}

export enum ReservationStatus {
  Agendado = 0,
  EmAndamento = 1,
  Finalizado = 2,
  Cancelado = 3,
}

export interface ReservationsResponse {
  message: string;
  statusCode: number;
  data: Reservation[];
}

export interface ReservationSummary {
  date: string; // Formato YYYY-MM-DD
  count: number; // Número de reservas
}

export interface ReservationSummaryResponse {
  message: string;
  statusCode: number;
  data: ReservationSummary[];
}
