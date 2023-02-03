"use client";
import { ChakraProvider, ColorModeScript, theme } from "@chakra-ui/react";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript />
      <ChakraProvider theme={theme}> {children} </ChakraProvider>
    </>
  );
}
