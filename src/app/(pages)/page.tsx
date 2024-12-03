'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getToken } from "@/app/lib/token";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const token = getToken();

    if (token) {
      router.replace("/reservation");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null; 
}
