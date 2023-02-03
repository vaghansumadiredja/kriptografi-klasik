"use client";

import { DecryptVigenere, EncryptVigenere } from "@/function/vigenere";
import { GenerateOTPKey } from "@/function/otp";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function OTPPage() {
  const toast = useToast();
  const [inputState, setInputState] = useState({
    plaintext: "",
    key: { encKey: "", decKey: "" },
    ciphertext: "",
  });

  useEffect(() => {
    let encKey = localStorage.getItem("encKey");
    let decKey = localStorage.getItem("decKey");
    if (encKey && decKey) {
      setInputState({ ...inputState, key: { encKey, decKey } });
    }
  }, []);

  const onFileUpload =
    (type: "plaintext" | "ciphertext") =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const text = e.target.result;
        console.log(text);
        setInputState({ ...inputState, [type]: text });
      };
      if (e.target.files) {
        reader.readAsText(e.target.files[0]);
      }
    };

  const handleInputChange =
    (key: "plaintext" | "key" | "ciphertext") =>
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setInputState({ ...inputState, [key]: e.target.value });
    };

  const handleEncryptText = () => (e: FormEvent<HTMLButtonElement>) => {
    if (inputState.key.encKey === "") {
      toast({
        title: "Key Tidak Ditemukan.",
        description: "Silahkan generate key anda.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    let encKey = inputState.key.encKey.slice(0, inputState.plaintext.length);
    setInputState({
      ...inputState,
      ciphertext: EncryptVigenere(encKey, inputState.plaintext),
      key: {
        ...inputState.key,
        encKey: inputState.key.encKey.slice(inputState.plaintext.length),
      },
    });
    localStorage.setItem(
      "encKey",
      inputState.key.encKey.slice(inputState.plaintext.length)
    );
  };

  const handleDecryptText = () => (e: FormEvent<HTMLButtonElement>) => {
    if (inputState.key.decKey === "") {
      toast({
        title: "Key Tidak Ditemukan.",
        description: "Silahkan generate key anda.",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    let decKey = inputState.key.decKey.slice(0, inputState.plaintext.length);
    setInputState({
      ...inputState,
      plaintext: DecryptVigenere(decKey, inputState.ciphertext),
      key: {
        ...inputState.key,
        decKey: inputState.key.decKey.slice(inputState.plaintext.length),
      },
    });
    localStorage.setItem(
      "decKey",
      inputState.key.decKey.slice(inputState.plaintext.length)
    );
  };

  const handleGenerateKey = () => (e: FormEvent<HTMLButtonElement>) => {
    if (inputState.key.encKey === "") {
      let key = GenerateOTPKey();
      setInputState({
        ...inputState,
        key,
      });
      localStorage.setItem("encKey", key.encKey);
      localStorage.setItem("decKey", key.decKey);
      toast({
        title: "Key Generated.",
        description: "Key untuk OTP telah disimpan.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    toast({
      title: "Key Sudah Ada.",
      description: "Key yang sudah ada akan digunakan.",
      status: "info",
      duration: 9000,
      isClosable: true,
    });
  };

  return (
    <>
      <Center>
        <Text fontWeight="bold" fontSize="2xl">
          One-Time Pad
        </Text>
      </Center>
      <Container maxW="5xl">
        <Box mt={7} bg="gray.100" rounded="md" p={4} mb={5}>
          <Grid
            templateRows="repeat(4, 1fr)"
            templateColumns="repeat(5, 1fr)"
            gap={4}
          >
            <GridItem colSpan={2} rowSpan={4}>
              <Text>Plaintext</Text>
              <Textarea
                value={inputState.plaintext}
                onChange={handleInputChange("plaintext")}
                w="100%"
                h="80%"
                border="2px"
                borderColor="blue.200"
                mb={2}
              />
              <Input
                type="file"
                opacity="1"
                aria-hidden="true"
                accept=".txt"
                onChange={onFileUpload("plaintext")}
              />
            </GridItem>

            <GridItem colSpan={1} alignItems="center" display="flex">
              <FormControl>
                <FormLabel opacity={0}>Halo</FormLabel>
                <Button
                  variant="outline"
                  colorScheme="blue"
                  w="100%"
                  onClick={handleGenerateKey()}
                  mb="5"
                >
                  Generate Key
                </Button>
              </FormControl>
            </GridItem>
            <GridItem colSpan={2} rowSpan={4}>
              <Text>Ciphertext</Text>
              <Textarea
                value={inputState.ciphertext}
                onChange={handleInputChange("ciphertext")}
                w="100%"
                h="80%"
                border="2px"
                borderColor="blue.200"
                mb={2}
              />
              <Input
                type="file"
                opacity="1"
                aria-hidden="true"
                accept=".txt"
                onChange={onFileUpload("ciphertext")}
              />
            </GridItem>

            <GridItem alignItems="center" display="flex">
              <Button
                variant="outline"
                colorScheme="blue"
                w="100%"
                onClick={handleEncryptText()}
                rightIcon={<ArrowForwardIcon />}
              >
                Enkripsi Text
              </Button>
            </GridItem>
            <GridItem alignItems="center" display="flex">
              <Button
                variant="outline"
                colorScheme="blue"
                w="100%"
                onClick={handleDecryptText()}
                leftIcon={<ArrowBackIcon />}
              >
                Dekripsi Text
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
