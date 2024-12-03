import { useEffect, useState } from "react";

export const useCurrentDate = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Atualiza a cada segundo para garantir precisão

    return () => clearInterval(interval);
  }, []);

  return currentDate;
};
