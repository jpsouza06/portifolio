import { Box, Flex, Grid, GridItem, Image, Text, Link } from '@chakra-ui/react'

import type { NextPage } from 'next'
import Head from 'next/head'

import { useEffect, useState } from 'react'
import { api } from "../../services/api";

import Footer from '../../components/Footer'
import Header from '../../components/Header'
import NextLink from 'next/link';

import { useContext } from 'react';
import {LanguageContext} from '../../context/LanguageContext';

interface Projects {
  id: string;
  image: string;
  name: string;
  url: string;
}

const Projects: NextPage = () => {
  const [projects, setProjects] = useState<Projects[]>([])

  const valor = useContext(LanguageContext)

  useEffect(() => {
    api.get('/projects')
    .then(response => setProjects(response.data))
}, []);
  return (
    <>
      <Head>
        <title>João Paulo | Competências</title>
      </Head>

      <Box>
        <Header />
        
        <Flex alignItems='center' m='100px auto' maxW='1062px' direction='column'>
        <Text fontSize='60px' fontWeight='700' lineHeight='70px' color='purple.500' mb='43px' textAlign='center'>
            {valor?.language == 'PT-BR' 
            ? 'Alguns projetos que já desenvolvi...' 
            : 'Some projects I\'ve already developed...'
            }
          </Text>
          <Grid templateColumns='repeat(3, 1fr)' gap='70px'>
            {projects.map(project => (
              <GridItem border='5px solid #000000'>
                <NextLink href={project.url} passHref> 
                  <Link target='_blank' position='relative' className='box'>
                    <Image src={project.image} transition={"0.2s ease-in-out"} className='imagem'/>
                    <Text 
                      fontSize='25px' 
                      fontWeight='700' 
                      position='absolute'
                      textAlign='center' 
                      top='50'
                      left='0'
                      right='0'
                      visibility='hidden'
                      className='imagemText'
                      transition={"0.1s ease-in-out"}
                    >
                      {project.name}<br/><br/> {valor?.language == 'PT-BR' ? 'Visitar site' : 'Visit website'}
                    </Text>
                  </Link>
                </NextLink>
              </GridItem>  
            ))}
          </Grid>
        </Flex>
        <Footer />
      </Box>
    </>
  )
}

export default Projects
