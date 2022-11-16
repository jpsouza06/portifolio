import { Box, Flex, HStack, Text, UnorderedList, ListItem } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

import { useContext } from 'react';
import {LanguageContext} from '../../context/LanguageContext';

const Skills: NextPage = () => {
  const valor = useContext(LanguageContext)
  return (
    <>
      <Head>
        <title>João Paulo | Competências</title>
      </Head>

      <Box>
        <Header />

          <Flex alignItems='center' m='100px auto' maxW='1062px' direction='column'>
            <Text fontSize='60px' fontWeight='700' lineHeight='70px' color='purple.500' mb='43px'>
              
              {valor?.language == 'PT-BR' 
              ? 'Competências e Experiências' 
              : 'Skills and Experiences'
              }
            </Text>

            <HStack spacing='62px'>
              <Box w='486px' h='463px' bgColor='#000000' borderRadius='10px'>
                <Text fontSize='40px' fontWeight='500' lineHeight='46px' color='purple.500' textAlign='center' mb='18px'>
                  {valor?.language == 'PT-BR' ? 'Competências' : 'Skills'}
                </Text>
                <UnorderedList fontSize='35px' fontWeight='500' lineHeight='50px' pl='56px'>
                  <ListItem>HTML/CSS/JS;</ListItem>
                  <ListItem>React;</ListItem>
                  <ListItem>TypeScript;</ListItem>
                  <ListItem>Delphi;</ListItem>
                  <ListItem>SQL;</ListItem>
                  <ListItem>Azure DevOps;</ListItem>
                  <ListItem>Git/GitHub.</ListItem>
                </UnorderedList>
              </Box>
              <Box w='486px' h='463px' bgColor='#000000' borderRadius='10px'>
                <Text fontSize='40px' fontWeight='500' lineHeight='46px' color='purple.500' textAlign='center' mb='18px'>
                  {valor?.language == 'PT-BR' ? 'Experiências' : 'Experiences'}
                </Text>
                <UnorderedList fontSize='35px' fontWeight='500' lineHeight='40px' pl='56px'>
                  <ListItem>   
                    {valor?.language == 'PT-BR' 
                      ? <>Estágio - ATS.<br/> <span style={{'color': '#4a4848'}}>2022 - Atualmente</span></>
                      : <>Internship - ATS.<br/> <span style={{'color': '#4a4848'}}>2022 - Present</span></>
                    }
                  </ListItem>
                </UnorderedList>
                <Text fontSize='40px' fontWeight='500' lineHeight='46px' color='purple.500' textAlign='center' mb='18px' mt='33px'>Formação</Text>
                <UnorderedList fontSize='35px' fontWeight='500' lineHeight='40px' pl='56px'>
                  <ListItem>
                    {valor?.language == 'PT-BR' ? 'Sistemas de Informação' : 'Information System'} - UFVJM;<br/>
                    <span style={{'color': '#4a4848'}}>2019 - 2024</span>
                  </ListItem>
                  <ListItem>Ignite - Rocketseat. <br/> <span style={{'color': '#4a4848'}}>2021</span></ListItem>
                </UnorderedList>
              </Box>
            </HStack>
          </Flex>

        <Footer />
      </Box>
    </>
  )
}

export default Skills
