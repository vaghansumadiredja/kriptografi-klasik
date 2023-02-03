"use client";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/cipher");
  }, []);
  return (
    <>
      <Button>ehhe</Button>
    </>
  );
}
