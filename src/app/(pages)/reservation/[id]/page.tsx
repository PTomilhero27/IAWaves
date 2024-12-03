/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Input } from "@/app/components/ui/input";
import { Toggle } from "@/app/components/ui/toggle";
import { useState } from "react";

export default function ReservationDetails({
  params,
}: {
  params: { id: string };
}) {
  // Dados fictícios
  const [reservation, setReservation] = useState({
    name: "Fulano de Tal",
    phone: "(11) 99999-9999",
    email: "fulano@email.com",
    people: 3,
    peopleDetails: [
      { id: 1, name: "Pessoa 1", phone: "(11) 88888-8888", present: false },
      { id: 2, name: "Pessoa 2", phone: "(11) 77777-7777", present: false },
      { id: 3, name: "Pessoa 3", phone: "(11) 66666-6666", present: false },
    ],
  });

  const [searchPhone, setSearchPhone] = useState(""); // Estado para o telefone pesquisado

  // Filtra pessoas com base no telefone pesquisado
  const filteredPeople = reservation.peopleDetails.filter((person) =>
    person.phone.includes(searchPhone)
  );

  // Função para marcar presença
  const handleTogglePresence = (personId: number, isPresent: boolean) => {
    setReservation((prev) => ({
      ...prev,
      peopleDetails: prev.peopleDetails.map((person) =>
        person.id === personId ? { ...person, present: isPresent } : person
      ),
    }));
  };

  // Função para formatar o número de telefone
  const handlePhoneInput = (value: string) => {
    const numericValue = value.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
    const formattedPhone = numericValue
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15); // Limita o tamanho máximo
    setSearchPhone(formattedPhone);
  };

  return (
    <div className="p-6">
      {/* Cabeçalho */}
      <div className="p-4 border rounded-lg shadow-md flex justify-between items-center border-green-500 bg-green-100">
        <div>
          <h3 className="font-semibold">{reservation.name}</h3>
          <p className="text-sm text-gray-500">Telefone: {reservation.phone}</p>
          <p className="text-sm text-gray-500">E-mail: {reservation.email}</p>
        </div>
      </div>

      {/* Lista de pessoas */}
      <div>
        <div className="flex items-center justify-between w-full my-4">
          <h2 className="text-xl w-1/2 font-bold">Pessoas na Reserva</h2>

          <div className="flex space-x-4">
            <Input
              type="text"
              value={searchPhone}
              onChange={(e) => handlePhoneInput(e.target.value)}
              placeholder="Digite o telefone"
              className=" border bg-white border-gray-300 rounded-lg px-4 py-2 w-56"
            />
          </div>
        </div>
        <div className="space-y-4">
          {filteredPeople.length === 0 ? (
            <p className="text-gray-500">Nenhuma pessoa encontrada.</p>
          ) : (
            filteredPeople.map((person) => (
              <div
                key={person.id}
                className={`p-4 border rounded-lg shadow-md flex justify-between items-center ${
                  person.present
                    ? "bg-green-100 border-green-500"
                    : "bg-white border-gray-300"
                }`}
              >
                <div>
                  <h3 className="font-semibold">{person.name}</h3>
                  <p className="text-sm text-gray-500">
                    Telefone: {person.phone}
                  </p>
                </div>
                <Toggle
                  pressed={person.present}
                  onPressedChange={(value) =>
                    handleTogglePresence(person.id, value)
                  }
                  className={`${
                    person.present ? "bg-green-500 text-white" : "bg-red-500"
                  }`}
                >
                </Toggle>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
