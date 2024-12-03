"use client";
import {
  useSidebar,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./sidebarConfig";
import Image from "next/image";
import logo from "../../assets/svg/logo.svg";
import { Calendar, Home, Package } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown/dropDownMenu";
import { Badge } from "../ui/badge";
import { useRouter } from "next/navigation";
import { removeToken } from "@/app/lib/token";

export function SidebarApp() {
  const { state, toggleSidebar } = useSidebar();
  const router = useRouter();

  const handleLogout = () => {
    removeToken();
    router.replace("/login");
  };

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Sidebar className="bg-[#1C2434] text-white" collapsible="icon">
      {/* Sidebar Header */}
      <SidebarHeader>
        <div className="flex items-center justify-between mb-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="flex items-center cursor-pointer gap-4 bg-transparent border-none p-0"
                onClick={toggleSidebar}
              >
                <Image alt="Logo" src={logo} width={30} height={30} />
                {state === "expanded" && (
                  <p className="text-2xl font-bold text-center">IAWaves</p>
                )}
              </button>
            </TooltipTrigger>
            {state === "collapsed" && <TooltipContent>IAWaves</TooltipContent>}
          </Tooltip>
        </div>
      </SidebarHeader>

      {/* Sidebar Content */}
      <SidebarContent>
        {/* Agendamento */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full text-white justify-start gap-4 items-center"
              onClick={() => handleNavigation("/reservation")}
            >
              <Calendar className="w-5 h-5" />
              {state === "expanded" && <span className="">Agendamento</span>}
            </Button>
          </TooltipTrigger>
          {state === "collapsed" && (
            <TooltipContent>Agendamento</TooltipContent>
          )}
        </Tooltip>

        {/* Dashboard */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-4"
              onClick={() => handleNavigation("/dashboard")}
              disabled
            >
              <Home className="w-5 h-5" />
              {state === "expanded" && (
                <div className="flex items-center gap-2">
                  <span className="sidebar-text">Dashboard</span>
                  <Badge className="text-white h-4" variant="destructive">
                    Em breve
                  </Badge>
                </div>
              )}
            </Button>
          </TooltipTrigger>
          {state === "collapsed" && <TooltipContent>Dashboard</TooltipContent>}
        </Tooltip>

        {/* Controle de Estoque */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-start gap-4"
              disabled
            >
              <Package className="w-5 h-5" />
              {state === "expanded" && (
                <div className="flex items-center gap-2">
                  <span className="sidebar-text">Estoque</span>
                  <Badge className="text-white h-4" variant="destructive">
                    Em breve
                  </Badge>
                </div>
              )}
            </Button>
          </TooltipTrigger>
          {state === "collapsed" && (
            <TooltipContent>Controle de Estoque</TooltipContent>
          )}
        </Tooltip>
      </SidebarContent>

      {/* Sidebar Footer */}
      <SidebarFooter>
        <Tooltip>
          <TooltipTrigger asChild>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-4 cursor-pointer">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  {state === "expanded" && (
                    <span className="text-white">Tomilhero TI</span>
                  )}
                </div>
              </DropdownMenuTrigger>

              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel className="">Minha conta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </TooltipTrigger>
          {state === "collapsed" && (
            <TooltipContent>Minha Conta</TooltipContent>
          )}
        </Tooltip>
      </SidebarFooter>
    </Sidebar>
  );
}
