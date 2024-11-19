/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateProps, GetAllProps } from "./types";
import { apiService } from ".";

export const GetAll = <T>({ url, params, enabled = true }: GetAllProps) => {
  return useQuery<T>({
    queryKey: [url],
    queryFn: async () => {
      const res = await apiService.getAll<T>({ url, params });
      return res;
    },
    enabled,
  });
};

export const Create = <T>({ url }: CreateProps): any => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (json: any) => {
      const res = await apiService.create<T>({ url, json });
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [url] });
    },
  });
};

// const edit = <T>({ url, queryKey }: CreateProps) => {
//   const toast = useToast();

//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: async ({ data, id }: any) => {
//       const res = await transactionService.edit<T>({ url, data, id });

//       return res;
//     },
//     onError: (error) => {
//       toast.error(`Erro ao editar um registro: ${error}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey });
//       toast.success("Registro editado com sucesso!");
//     },
//   });
// };

// const remove = ({ url, queryKey }: DeleteProps) => {
//   const queryClient = useQueryClient();
//   const toast = useToast();

//   return useMutation({
//     mutationFn: async (id: number) => {
//       const res = await transactionService.delete({ url, id });

//       return res;
//     },
//     onError: async (error) => {
//       toast.error(`Erro ao deletar o registro: ${error.message}`);
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey });
//       toast.success("Registro deletado com sucesso!");
//     },
//   });
// };
