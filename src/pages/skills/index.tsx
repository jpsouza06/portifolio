import { Box, Flex, Text, UnorderedList, ListItem, Stack } from '@chakra-ui/react'
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
            <Text fontSize={{base: '40px', md: '60px'}} fontWeight='700' textAlign='center' lineHeight='70px' color='purple.500' mb='43px'>
              
              {valor?.language == 'PT-BR' 
              ? 'Competências e Experiências' 
              : 'Skills and Experiences'
              }
            </Text>

            <Stack direction={{base: 'column', lg: 'row'}} spacing={{base: '32px', md: '62px'}}>
              <Box w={{base: '400px', md: '500px'}} p={{base: '10px 0 10px 0', md: '20px 0 20px 0'}} bgColor='#000000' borderRadius='10px'>
                <Text fontSize={{base: '24px', md: '40px'}} fontWeight='500' lineHeight='46px' color='purple.500' textAlign='center' mb={{base: '0px', md: '18px'}}>
                  {valor?.language == 'PT-BR' ? 'Competências' : 'Skills'}
                </Text>
                <UnorderedList fontSize={{base: '24px', md: '35px'}} fontWeight='500' lineHeight='50px' pl={{base: '30px', md: '56px'}}>
                  <ListItem>Delphi;</ListItem>
                  <ListItem>Node;</ListItem>
                  <ListItem>TypeScript;</ListItem>
                  <ListItem>React;</ListItem>
                  <ListItem>Flutter;</ListItem>
                  <ListItem>SQL;</ListItem>
                  <ListItem>Git/GitHub;</ListItem>
                  <ListItem>Scrum.</ListItem>
                </UnorderedList>
              </Box>
              
              <Box w={{base: '400px', md: '500px'}} p={{base: '10px 0 10px 0', md: '20px 0 20px 0'}} bgColor='#000000' borderRadius='10px'>
                <Text fontSize={{base: '24px', md: '40px'}} fontWeight='500' lineHeight='46px' color='purple.500' textAlign='center' mb={{base: '0px', md: '18px'}}>
                  {valor?.language == 'PT-BR' ? 'Experiências' : 'Experiences'}
                </Text>
                <UnorderedList fontSize={{base: '24px', md: '35px'}} fontWeight='500' lineHeight='40px' pl={{base: '30px', md: '56px'}}>
                  <ListItem>   
                    {valor?.language == 'PT-BR' 
                      ? <>Desenvolvedor Pleno- ATS.<br/> <span style={{'color': '#4a4848'}}>2022 - Atualmente</span></>
                      : <>Mid-level Developer - ATS.<br/> <span style={{'color': '#4a4848'}}>2022 - Present</span></>
                    }
                  </ListItem>
                  <ListItem>   
                    {valor?.language == 'PT-BR' 
                      ? <>Estágio - ATS.<br/> <span style={{'color': '#4a4848'}}>2022 - 2023</span></>
                      : <>Internship - ATS.<br/> <span style={{'color': '#4a4848'}}>2022 - 2023</span></>
                    }
                  </ListItem>

                </UnorderedList>
                <Text fontSize={{base: '24px', md: '40px'}} fontWeight='500' lineHeight='46px' color='purple.500' textAlign='center' mb={{base: '0px', md: '18px'}} mt={{base: '15px', md: '33px'}}>{valor?.language == 'PT-BR' ? 'Formação' : 'Formation'}</Text>
                <UnorderedList fontSize={{base: '24px', md: '35px'}} fontWeight='500' lineHeight='40px' pl={{base: '30px', md: '56px'}}>
                  <ListItem>
                    {valor?.language == 'PT-BR' 
                      ? <>Análise e desenvolvimento de sistemas - Estácio<br/><span style={{'color': '#4a4848'}}>2022 - 2025</span></>
                      : <>Systems Analysis and Development - Estácio<br/><span style={{'color': '#4a4848'}}>2022 - 2025</span></>
                    }
                  </ListItem>
                  <ListItem>Ignite - Rocketseat. <br/> <span style={{'color': '#4a4848'}}>2021</span></ListItem>
                </UnorderedList>
              </Box>
            </Stack>
          </Flex>

        <Footer />
      </Box>
    </>
  )
}

export default Skills
