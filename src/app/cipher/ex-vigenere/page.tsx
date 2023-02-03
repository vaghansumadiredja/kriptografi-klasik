"use client";

import {
  DecryptExtendedVigenere,
  EncryptExtendedVigenere,
} from "@/function/ex-vigenere";
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
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import fileDownload from "js-file-download";

export default function ExtendedVigenerePage() {
  const [inputState, setInputState] = useState({
    plaintext: "",
    key: "",
    ciphertext: "",
    plaintext_file: "",
    ciphertext_file: "",
  });
  const [filename, setFilename] = useState({
    plaintext: "",
    ciphertext: "",
  });

  const onFileUpload =
    (type: "plaintext" | "ciphertext") =>
    (e: ChangeEvent<HTMLInputElement>) => {
      const reader = new FileReader();
      reader.onload = async (e: ProgressEvent<FileReader>) => {
        if (e.target) {
          const text = e.target.result;
          console.log(text);
          setInputState({ ...inputState, [type + "_file"]: text });
          // fileDownload(text, "hehe");
        }
      };
      if (e.target.files) {
        setFilename({ ...filename, [type]: e.target.files[0].name });
        reader.readAsText(e.target.files[0]);
        // if (type === "plaintext") {
        //   reader.readAsDataURL(e.target.files[0]);
        // } else {
        // }
      }
    };
  // console.log(inputState);

  const handleInputChange =
    (key: "plaintext" | "key" | "ciphertext") =>
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setInputState({ ...inputState, [key]: e.target.value });
    };

  const handleEncryptText = () => (e: FormEvent<HTMLButtonElement>) => {
    setInputState({
      ...inputState,
      ciphertext: EncryptExtendedVigenere(inputState.key, inputState.plaintext),
    });
  };

  const handleEncryptFile = () => (e: FormEvent<HTMLButtonElement>) => {
    let hehe = inputState.plaintext_file.split(";base64,")[0];

    fileDownload(
      EncryptExtendedVigenere(inputState.key, inputState.plaintext_file),
      "encrypted_" + filename.plaintext
    );
  };

  const handleDecryptFile = () => (e: FormEvent<HTMLButtonElement>) => {
    // console.log(inputState.ciphertext_file);
    let pt = DecryptExtendedVigenere(
      inputState.key,
      inputState.ciphertext_file
    );
    console.log(pt);
    // const pt1 = pt.split("base64,");
    // // const buf = Buffer.from(pt1[1], "base64").toString("ascii");
    // const blob = new Blob([pt], {
    //   type: pt1[0].replace(";", ""),
    // });
    // console.log(blob);

    fileDownload(pt, "decrypted_" + filename.ciphertext);
  };

  const handleDecryptText = () => (e: FormEvent<HTMLButtonElement>) => {
    setInputState({
      ...inputState,
      plaintext: DecryptExtendedVigenere(inputState.key, inputState.ciphertext),
    });
  };
  return (
    <>
      <Center>
        <Text fontWeight="bold" fontSize="2xl">
          Extended Vigenere Cipher
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
              />
              <Input
                type="file"
                opacity="1"
                aria-hidden="true"
                accept="*"
                onChange={onFileUpload("plaintext")}
              />
            </GridItem>
            <GridItem colSpan={1}>
              <FormControl>
                <FormLabel>Key</FormLabel>
                <Input
                  placeholder="Key"
                  onChange={handleInputChange("key")}
                  value={inputState.key}
                ></Input>
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
              />
              <Input
                type="file"
                opacity="1"
                aria-hidden="true"
                accept="*"
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
            <GridItem alignItems="center" display="flex">
              <Button
                variant="outline"
                colorScheme="blue"
                w="100%"
                onClick={handleEncryptFile()}
                rightIcon={<ArrowForwardIcon />}
              >
                Enkripsi File
              </Button>
            </GridItem>
            <GridItem alignItems="center" display="flex">
              <Button
                variant="outline"
                colorScheme="blue"
                w="100%"
                onClick={handleDecryptFile()}
                leftIcon={<ArrowBackIcon />}
              >
                Dekripsi File
              </Button>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
