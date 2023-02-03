"use client";

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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useState } from "react";
import { Enigma } from "@/function/enigma";

export default function EnigmaPage() {
  const [inputState, setInputState] = useState({
    plaintext: "",
    key: { ring1: 0, ring2: 0, ring3: 0 },
    ciphertext: "",
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
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      setInputState({ ...inputState, [key]: e.target.value });
    };

  const handleEncryptText = () => (e: FormEvent<HTMLButtonElement>) => {
    let { ct, ring1, ring2, ring3 } = Enigma(
      inputState.plaintext,
      inputState.key.ring1,
      inputState.key.ring2,
      inputState.key.ring3
    );
    setInputState({
      ...inputState,
      ciphertext: ct,
      key: {
        ...inputState.key,
        ring1,
        ring2,
        ring3,
      },
    });
  };

  const handleDecryptText = () => (e: FormEvent<HTMLButtonElement>) => {
    let { ct, ring1, ring2, ring3 } = Enigma(
      inputState.ciphertext,
      inputState.key.ring1,
      inputState.key.ring2,
      inputState.key.ring3
    );
    setInputState({
      ...inputState,
      plaintext: ct,
      key: {
        ...inputState.key,
        ring1,
        ring2,
        ring3,
      },
    });
  };

  return (
    <>
      <Center>
        <Text fontWeight="bold" fontSize="2xl">
          Enigma Cipher
        </Text>
      </Center>
      <Container maxW="6xl">
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
                <FormLabel opacity={1}>Rotor Position</FormLabel>
                <Grid templateColumns="repeat(3, 1fr)">
                  <GridItem>
                    <NumberInput
                      value={inputState.key.ring1}
                      onChange={(e) => {
                        setInputState({
                          ...inputState,
                          key: { ...inputState.key, ring1: Number(e) },
                        });
                      }}
                      min={0}
                      max={25}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </GridItem>

                  <GridItem>
                    <NumberInput
                      value={inputState.key.ring2}
                      onChange={(e) => {
                        setInputState({
                          ...inputState,
                          key: { ...inputState.key, ring2: Number(e) },
                        });
                      }}
                      min={0}
                      max={25}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </GridItem>

                  <GridItem>
                    <NumberInput
                      value={inputState.key.ring3}
                      onChange={(e) => {
                        setInputState({
                          ...inputState,
                          key: { ...inputState.key, ring3: Number(e) },
                        });
                      }}
                      min={0}
                      max={25}
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </GridItem>
                </Grid>
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
