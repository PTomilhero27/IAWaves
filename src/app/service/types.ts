/* eslint-disable @typescript-eslint/no-explicit-any */
export type GetAllProps = {
  url: string;
  params?: any; // os parametros, são os query params que é enviado no serviços
  enabled?: boolean;
};

export type CreateProps = {
  url: string; // Qual rota vai ser chamada o serviço
  json?: any; // é o conteudo que é enviado no post
  subRoute?: any; // é caso queira invalidar outra rota que não seja a do post
};
