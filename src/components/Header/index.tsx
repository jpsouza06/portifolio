import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Divider,
  IconButton,
} from '@chakra-ui/react';

import {ChevronDownIcon, ChevronUpIcon, HamburgerIcon} from '@chakra-ui/icons';

import { useContext } from 'react';
import {LanguageContext} from '../../context/LanguageContext';

import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Header() {
  const valor = useContext(LanguageContext)

  const { pathname } = useRouter();
  
  return (
    <Box minW='max-content' bgColor='#000000'>
      <Flex maxW='1440px' h='94px' alignItems='Center' m='0 auto' justifyContent='space-between' p={{base: '0 4.31rem', lg: '0 12.31rem'}} >
        
        <HStack spacing={{base: '30px', md: '67px'}} h='94px' position='relative' display={{base: 'none', md: 'flex'}}>
          <Flex direction='column' alignItems='center'>
            <Link href='/'>
              <Text fontSize='20px' fontWeight='700'>{valor?.language =='PT-BR' ? 'Início' : 'Home'}</Text>
            </Link>
            { pathname === '/' && 
                <Divider w='93px' position='absolute' bottom='0' orientation='horizontal' borderColor='purple.500' borderBottomWidth='10px' opacity='1' borderRadius='20px 20px 0 0'/>
            }
          </Flex>

          <Flex direction='column' alignItems='center'>
            <Link href='/about'>
              <Text fontSize='20px' fontWeight='700'>{valor?.language =='PT-BR' ? 'Sobre' : 'About'}</Text>
            </Link>
            { pathname === '/about' && 
                <Divider w='93px' position='absolute' bottom='0' orientation='horizontal' borderColor='purple.500' borderBottomWidth='10px' opacity='1' borderRadius='20px 20px 0 0'/>
            }
          </Flex>
          <Flex direction='column' alignItems='center'>
            <Link href='/skills'>
              <Text fontSize='20px' fontWeight='700'>{valor?.language =='PT-BR' ? 'Competências' : 'Skills'}</Text>
            </Link>
            { pathname === '/skills' && 
                <Divider w='93px' position='absolute' bottom='0' orientation='horizontal' borderColor='purple.500' borderBottomWidth='10px' opacity='1' borderRadius='20px 20px 0 0'/>
            }
          </Flex>
          <Flex direction='column' alignItems='center'>
            <Link href='/projects'>
              <Text fontSize='20px' fontWeight='700'>{valor?.language =='PT-BR' ? 'Projetos' : 'Projects'}</Text>
            </Link>
            { pathname === '/projects' && 
                <Divider w='93px' position='absolute' bottom='0' orientation='horizontal' borderColor='purple.500' borderBottomWidth='10px' opacity='1' borderRadius='20px 20px 0 0'/>
            }
          </Flex>
          <Flex direction='column' alignItems='center' pr='10px'>
            <Link href='/email'>
              <Text fontSize='20px' fontWeight='700'>{valor?.language =='PT-BR' ? 'E-mail' : 'Email'}</Text>
            </Link>
            { pathname === '/email' && 
                <Divider w='93px' position='absolute' bottom='0' orientation='horizontal' borderColor='purple.500' borderBottomWidth='10px' opacity='1' borderRadius='20px 20px 0 0'/>
            }
          </Flex>
        </HStack>

        <Menu >
          <MenuButton
            as={IconButton}
            aria-label='Options'
            icon={<HamburgerIcon color='white'/>}
            variant='ghost'
            bgColor='#000000'
            display={{base: 'flex', md: 'none'}}
            _hover={{}}
            _expanded={{ bgColor: 'black'}}
            _active={{ bg : 0}}
          />
          <MenuList 
            bgColor='#000000'
            border={'0'}
          >
            <MenuItem>
              <Link href='/'>
                <Text fontSize='20px' fontWeight='700'>
                  {valor?.language =='PT-BR' ? 'Início' : 'Home'}
                </Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/about'>
                <Text fontSize='20px' fontWeight='700'>
                  {valor?.language =='PT-BR' ? 'Sobre' : 'About'}
                </Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/skills'>
                <Text fontSize='20px' fontWeight='700'>
                  {valor?.language =='PT-BR' ? 'Competências' : 'Skills'}
                </Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/projects'>
                <Text fontSize='20px' fontWeight='700'>
                  {valor?.language =='PT-BR' ? 'Projetos' : 'Projects'}
                </Text>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href='/email'>
                <Text fontSize='20px' fontWeight='700'>
                  {valor?.language =='PT-BR' ? 'E-mail' : 'Email'}
                </Text>
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>

        <Menu>
          {({isOpen}) => (
            <>
              <MenuButton
                isActive={isOpen}  
                as={Button}
                rightIcon={isOpen ? <ChevronUpIcon/>  : <ChevronDownIcon/> }
                bgColor='#000000'
                fontSize='20px' 
                fontWeight='700'
                color='white'
                _hover={{}}
                _expanded={{ bg: '#000000'}}
                _active={{ bg : 0}}
              >
                {valor?.language === 'PT-BR'? 'PT-BR' : 'EN-US'}
              </MenuButton>
              <MenuList
                bgColor='#000000'
                border={'0'}
                ml='4px'    
              >
                <MenuItem
                  fontSize='20px' 
                  fontWeight='700'
                  marginLeft='0px'
                  width='90px'
                  m='0'
                  onClick={() => {valor?.language === 'PT-BR'? valor?.updateLanguage('EN-US') : valor?.updateLanguage('PT-BR')}}
                  _active={{ bg : 0}}
                  _hover={{}}
                  _focus={{}}
                > 
                  {valor?.language === 'PT-BR'? 'EN-US' : 'PT-BR'}
                </MenuItem>
              </MenuList>
            </>
          )}
        </Menu>

      </Flex>
    </Box>
  )
}