import { Box, Flex, HStack, Stack, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import { useContext, useEffect, useState } from 'react';
import {LanguageContext} from '../../context/LanguageContext';


const About: NextPage = () => {
  const valor = useContext(LanguageContext)

  const [age, setAge] = useState<number | null>(null);

  useEffect(() => {
    const birthDate = new Date(2000, 10, 21); // mês começa do zero (novembro = 10)
    const today = new Date();
    let calculatedAge = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      calculatedAge--;
    }
    setAge(calculatedAge);
  }, []);

  return (
    <>
      <Head>
        <title>João Paulo | Sobre</title>
      </Head>

      <Box>
        <Header />

        {valor?.language === 'PT-BR' ?  
          <Flex alignItems='center' m='100px auto' maxW='1062px' direction='column'>
          <Text fontSize={{base: '40px', md: '60px'}} fontWeight='700' lineHeight='70px' color='purple.500' mb='43px' textAlign='center'>Um pouco sobre mim...</Text>

            <Stack direction={{base: 'column', lg: 'row'}} spacing={{base: '32px', md: '62px'}}>
              <Box w={{base: '400px', md: '486px'}} h={{base: '330px', md: '463px'}}  bgColor='#000000' borderRadius='10px'>
                <Text fontSize={{base: '24px', md: '35px'}} fontWeight='500' lineHeight='40px' p={{base: '30px 10px 0 5px', md: '70px 36px 0 36px'}}>
                  Meu nome é <span style={{'color': '#572CBB'}}>João Paulo</span>, tenho {age} anos e moro em Uberlândia.<br/><br/>Sou uma pessoa <span style={{'color': '#572CBB'}}>calma
                    </span> e <span style={{'color': '#572CBB'}}>responsável</span>, que gosta de trabalhar em equipe.
                </Text>
              </Box>
              <Box w={{base: '400px', md: '486px'}} h={{base: '330px', md: '463px'}} bgColor='#000000' borderRadius='10px'>
                <Text fontSize={{base: '24px', md: '35px'}} fontWeight='500' lineHeight='40px' p={{base: '30px 10px 0 5px', md: '70px 36px 0 36px'}}>
                Estou atrás de novas <span style={{'color': '#572CBB'}}>experiências</span> e <span style={{'color': '#572CBB'}}>desafios</span> para me 
                tornar uma <span style={{'color': '#572CBB'}}>pessoa</span> e um <span style={{'color': '#572CBB'}}>profissional</span> melhor.<br/><br/>
                Sempre tentando extrair o máximo das <span style={{'color': '#572CBB'}}>pessoas</span>.
                </Text>
              </Box>
            </Stack>
          </Flex>
          
          : 

          <Flex alignItems='center' m='100px auto' maxW='1062px' direction='column'>
          <Text fontSize={{base: '40px', md: '60px'}} fontWeight='700' lineHeight='70px' color='purple.500' mb='43px'>A little about myself...</Text>

            <HStack spacing='62px'>
              <Box w='486px' h='463px' bgColor='#000000' borderRadius='10px'>
                <Text fontSize={{base: '24px', lg: '35px'}} fontWeight='500' lineHeight='40px' pl='36px ' pr='36px' pt='70px'>
                 My name is <span style={{'color': '#572CBB'}}>João Paulo</span>, I&apos;m {age} years old and I live in Uberlândia.<br/><br/>I am a <span style={{'color': '#572CBB'}}>calm 
                    </span> and <span style={{'color': '#572CBB'}}>responsible </span>person who likes to work in a team.
                </Text>
              </Box>
              <Box w={{base: '24px', lg: '486px'}} h='463px' bgColor='#000000' borderRadius='10px'>
                <Text fontSize={{base: '24px', lg: '35px'}} fontWeight='500' lineHeight='40px' pl='36px ' pr='36px' pt='70px'>
                I&apos;m looking for new <span style={{'color': '#572CBB'}}>experiences </span> and  <span style={{'color': '#572CBB'}}>challenges </span> to become 
                a better <span style={{'color': '#572CBB'}}>person </span> and <span style={{'color': '#572CBB'}}>professional</span>.<br/><br/>
                Always trying to get the most out of <span style={{'color': '#572CBB'}}>people</span>.
                </Text>
              </Box>
            </HStack>
          </Flex>



        }

        <Footer />
      </Box>
    </>
  )
}

export default About
