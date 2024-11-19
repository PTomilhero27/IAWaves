/* eslint-disable @typescript-eslint/no-unused-expressions */
import { iaWaves } from "./http";
import { CreateProps, GetAllProps } from "./types";

export const apiService = {
  async getAll<T>({ url, params }: GetAllProps): Promise<T> {
    const response = await iaWaves.get(url, {
      searchParams: {
        ...params,
      },
    });

    const data: T = await response.json();

    return data;
  },

  // async getById({ url, id }: GetByIdProps) {
  //   const response = await iaWaves.get(`${url}/${id}`, {

  //   });

  //   const data = await response.json();

  //   return data;
  // },

  async create<T>({ url, json }: CreateProps): Promise<T> {
    const response = await iaWaves.post(url, {
      json,
    });
    const data: T = await response.json();
    return data;
  },

  // async edit({ url, service, json, id }: EditProps) {
  //   const response = await http[service].patch(`${url}/${id}`, {
  //     json,
  //   });
  //   const data = await response.json();
  //   return data;
  // },

  // async delete({ url, service, id }: DeleteProps) {
  //   const response = await http[service].delete(`${url}/${id}`);
  //   return response;
  // },
};
