/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { FormProvider as RHFFormProvider, useForm } from "react-hook-form";

const FormProvider = ({ children }: any) => {
  const methods = useForm();

  return <RHFFormProvider {...methods}>{children}</RHFFormProvider>;
};

export default FormProvider;