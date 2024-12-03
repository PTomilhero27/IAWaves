/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { LockKeyhole, Mail } from "lucide-react";
import { useLoginForm } from "./utils/useLoginForm";
import { Button } from "@/app/components/ui/button";
import LogoLogin from "../../assets/login/logo_login.svg";
import Image from "next/image";

export default function Login() {
  const { register, handleSubmit, errors, onSubmit } = useLoginForm();


  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="flex w-full h-full">
        {/* Lado Branco */}
        <div className="w-full md:w-3/5 bg-white flex items-center justify-center">
          <Form>
            <div className="w-full max-w-[364px]">
              <div className="text-center mb-6">
                <h1 className="text-3xl font-extrabold uppercase">Login</h1>
                <span>Transforme sua gestão com IA avançada.</span>
              </div>
              <div>
                <FormField className="mb-4">
                  <FormControl>
                    <Input
                      icon={Mail}
                      placeholder="Email"
                      id="email"
                      {...register("email")}
                      error={!!errors.email}
                    />
                  </FormControl>
                  {errors.email && (
                    <FormMessage>{errors.email.message}</FormMessage>
                  )}
                </FormField>

                <FormField className="mb-4">
                  <FormControl>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Senha"
                      className="pl-10 text-black"
                      error={!!errors.password}
                      icon={LockKeyhole}
                      classIcon="text-black"
                      {...register("password")}
                    />
                  </FormControl>
                  {errors.password && (
                    <FormMessage>{errors.password.message}</FormMessage>
                  )}
                </FormField>
              </div>
              <Button
                className="w-full text-white"
                onClick={handleSubmit(onSubmit)}
              >
                Entrar
              </Button>
            </div>
          </Form>
        </div>
        {/* Lado Azul */}
        <div className="hidden md:flex w-2/5 bg-gradient-login  items-center justify-center">
          <div className="bg-login w-full h-full flex justify-center ">
            <div className="text-white">
              <div className="flex items-end h-full m-auto">
                <Image alt="teste" src={LogoLogin} width={500} height={500} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
