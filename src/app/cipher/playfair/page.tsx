"use client";

import {
  createMatrix,
  DecryptPlayfair,
  EncryptPlayfair,
  formatPlaintext,
  prepareKey,
} from "@/function/playfair";
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

export default function PlayfairPage() {
  const [inputState, setInputState] = useState({
    plaintext: "",
    key: "",
    ciphertext: "",
  });
  const [playfair, setPlayfair] = useState<{
    bigram: string;
    matrix: string[][];
  }>({
    bigram: "",
    matrix: [[]],
  });

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
    setInputState({
      ...inputState,
      ciphertext: EncryptPlayfair(inputState.plaintext, inputState.key),
    });
    setPlayfair({
      bigram: formatPlaintext(inputState.plaintext),
      matrix: createMatrix(prepareKey(inputState.key)),
    });
  };

  const handleDecryptText = () => (e: FormEvent<HTMLButtonElement>) => {
    setInputState({
      ...inputState,
      plaintext: DecryptPlayfair(inputState.ciphertext, inputState.key),
    });
    setPlayfair({
      bigram: formatPlaintext(inputState.ciphertext),
      matrix: createMatrix(prepareKey(inputState.key)),
    });
  };
  return (
    <>
      <Center>
        <Text fontWeight="bold" fontSize="2xl">
          Playfair Cipher
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
            <GridItem colSpan={2}>
              <Text>Bigram</Text>
              <Text fontWeight="bold">{playfair.bigram}</Text>
            </GridItem>
            <GridItem colSpan={3}>
              <Text>Matriks</Text>
              <MatPlayfair mat={playfair.matrix}></MatPlayfair>
            </GridItem>
          </Grid>
        </Box>
      </Container>
    </>
  );
}

function MatPlayfair(props: { mat: string[][] }) {
  return (
    <Grid templateColumns="repeat(5, 1fr)">
      {props.mat.map((row) => {
        return (
          <>
            {row.map((col) => {
              return (
                <GridItem
                  key={col}
                  border="1px"
                  borderColor="blue.400"
                  textAlign="center"
                >
                  <Text fontWeight="bold">{col}</Text>
                </GridItem>
              );
            })}
          </>
        );
      })}
    </Grid>
  );
}
