import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '../styles/theme';

import LanguageProvider from '../context/LanguageContext';

import '../styles/style.css';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <LanguageProvider>
        <Component {...pageProps} />
      </LanguageProvider>
    </ChakraProvider>
  );
}

export default MyApp
