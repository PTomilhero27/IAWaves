/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoginSchema } from "./schema";
import { Create } from "@/app/service/query";
import { toast } from "@/app/components/ui/toast/use-toast";
import { saveToken } from "../../../lib/token";
import { useRouter } from "next/navigation"; // Importar o hook para redirecionamento

type LoginFormData = z.infer<typeof LoginSchema>;

export const useLoginForm = () => {
  const router = useRouter(); // Inicializa o hook do Next.js
  const { mutate } = Create({ url: "auth/login" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    mutate(data, {
      onSuccess: async (response: { accessToken: string }) => {
        const { accessToken } = response;

        // Salva o token
        saveToken(accessToken);

        // Exibe uma notificação de sucesso
        toast({
          variant: "success",
          title: "Logado com sucesso",
        });

        // Redireciona para a rota de reservas
        router.push("/reservation");
      },
      onError: (error: any) => {
        console.error("Erro ao fazer login:", error);

        // Exibe uma notificação de erro
        toast({
          variant: "error",
          title: "Erro ao Logar",
          description:
            "Usuário ou senha inválidos. Por favor, tente novamente!",
        });
      },
    });
  };

  return { register, handleSubmit, errors, isSubmitting, onSubmit };
};
