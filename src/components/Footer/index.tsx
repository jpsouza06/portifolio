import { Box, Flex, Image, Stack, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

import { useContext } from 'react';
import {LanguageContext} from '../../context/LanguageContext';

export default function Footer() {
  const valor = useContext(LanguageContext)
  return (
    <Box bgColor='#000000' p='55px 30px'>
      <Flex maxW='1062px' margin='0 auto'>
        <Stack justifyContent='space-between' w='100%' align='center' direction={{base: 'column', md: 'row'}}>
          <VStack alignItems='flex-start'>

            <Text fontSize={{base: '15px', md: '20px'}} fontWeight='700' mb={{base: '10px', md: '18px'}} w='100%' textAlign={{base: 'center', md: 'left'}}>{valor?.language == 'PT-BR' ? 'Contatos:' : 'Contacts:'}</Text>
            
            <Link href='https://www.linkedin.com/in/jpsouza21/' passHref>
              <Flex as="a" target='_blank'>
                <Image src='/images/linkedin.png' width='25px' height='25px' mr='9px'/>
                <Text fontSize={{base: '15px', md: '20px'}} fontWeight='700'>Linkedin: linkedin.com/in/jpsouza06</Text>
              </Flex>
            </Link>

            <Link href='https://github.com/jpsouza06' passHref>
              <Flex as="a" target='_blank'>
                <Image src='/images/github.png' width='25px' height='25px' mr='9px'/>
                <Text fontSize={{base: '15px', md: '20px'}} fontWeight='700'>GitHub: github.com/jpsouza06</Text>
              </Flex>
            </Link>
            
            <Flex >
              <Image src='/images/gmail.png' width='25px' height='25px' mr='9px'/>
              <Text fontSize={{base: '15px', md: '20px'}} fontWeight='700' mb='10px'>Gmail: joaopaulosc06@gmail.com</Text>
            </Flex>
          </VStack>

          <Text fontSize={{base: '15px', md: '20px'}} fontWeight='700' textAlign='center' maxW='260px' w='100%'>João Paulo de Souza Costa, Uberlândia MG.</Text>
        </Stack>
      </Flex>
    </Box>
  )
}