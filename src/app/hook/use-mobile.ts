import { useEffect, useState } from "react";

// Hook para detectar se a tela é "móvel"
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    // Adiciona um listener ao redimensionamento
    window.addEventListener("resize", handleResize);

    // Executa ao carregar a página
    handleResize();

    // Remove o listener no cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
