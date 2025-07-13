import type { NextPage } from 'next'
import Header from '../components/Header'
import Footer from '../components/Footer'

import Head from 'next/head'
import { Box, Flex, Text, Image, Stack } from '@chakra-ui/react'

import { useContext } from 'react'
import { LanguageContext } from '../context/LanguageContext'

const Home: NextPage = () => {
  const valor = useContext(LanguageContext)

  return (
    <>

      <Head>
        <title>João Paulo | Home</title>
      </Head>

      <Box>
        <Header />

        <Flex justifyContent='center' m='70px 30px'>
        <Stack direction={{base: 'column', md: 'row'}} spacing='30px'  w='100%' maxW='1062px' justifyContent='space-between' align='center'>
          <Flex direction='column'>
            <Text fontSize={{base: '40px', md: '60px'}} fontWeight='700' lineHeight={{base: '50px', md: '70px'}} color='purple.500' maxW='600px' textAlign={{base: 'center', md: 'left'}}>
              {valor?.language =='PT-BR' ? 'Olá! Eu sou o João, um desenvolvedor.' : 'Hi! I am João, a developer.'}
            </Text>

            <Text fontSize={{base: '20px', md: '25px'}}  fontWeight='400' mt='15px' textAlign={{base: 'center', md: 'left'}}>
              {valor?.language =='PT-BR' ? 'Em busca de novos desafios e experiências.' : 'Looking for new challenges and experiences.'}
            </Text>
          </Flex>

          <Image src='/images/perfil.png' alt={"imagem"} w={{base: '200px', md:'300px', lg: '500px'}} mr='30px' border='4px solid #572CBB' borderRadius='10px' bgColor='#000000'/>
          
        </Stack >
        </Flex>
        
        <Footer />
      </Box>
    </>
  )
}

export default Home
