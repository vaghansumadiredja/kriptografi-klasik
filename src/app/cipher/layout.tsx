"use client";

import {
  Box,
  Flex,
  HStack,
  useColorModeValue,
  Link,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cipherPages } from "../../constant/nav";

export default function CipherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box h={"64px"} bg={useColorModeValue("#f8f9fc", "gray.900")} px={4}>
        <Flex alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={8} alignItems={"center"}>
            <Box
              boxSize="60px"
              alignItems="center"
              justifyItems="center"
              display="flex"
            >
              <Image width={60} height={40} alt="Logo" src="/cld.png" />
            </Box>
            <HStack spacing={4}>
              {cipherPages.map((value, idx) => {
                return (
                  <button key={value.name}>
                    <NavLink url={value.url}>{value.name}</NavLink>
                  </button>
                );
              })}
            </HStack>
          </HStack>
        </Flex>
      </Box>
      {children}
    </>
  );
}

const NavLink = (props: { url: string; children: React.ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    fontWeight={
      window.location.href.split("/")[4] === props.url ? "bold" : "normal"
    }
    href={props.url}
  >
    {props.children}
  </Link>
);
