import type { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EmailForm from '../components/EmailForm';

const Email: NextPage = () => {
  return (
    <>
      <Head>
        <title>João Paulo | Enviar E-mail</title>
        <meta name="description" content="Formulário para envio de e-mails" />
      </Head>

      <Box>
        <Header />
        
        <Box minH="calc(100vh - 188px)" py={8}>
          <EmailForm />
        </Box>
        
        <Footer />
      </Box>
    </>
  );
};

export default Email;