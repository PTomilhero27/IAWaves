// app/components/Sidebar.tsx
"use client";

import { Home, Calendar } from "lucide-react";
import { Button } from "../ui/button";
import logo from "../../assets/svg/logo.svg";
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="h-full w-64 bg-[#1C2434] p-5 text-white">
      <div className="flex items-center mb-8 gap-4">
        <Image alt="teste" src={logo} width={30} height={30} />

        <p className="text-2xl font-bold text-center">IAWaves</p>
      </div>
      <nav className="space-y-4">
        <div className="flex items-center space-x-2 ">
          <Button
            variant="ghost"
            className="w-full text-white justify-start gap-4 items-center"
          >
            <Calendar className="w-5 h-5" />
            Agendamento
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            disabled
            variant="ghost"
            className="w-full text-white justify-start gap-4"
          >
            <Home className="w-5 h-5" />
            Dashboard
            <span className="text-red-500">Em breve</span>
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
