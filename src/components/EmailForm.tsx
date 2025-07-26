import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  Alert,
  AlertIcon,
  Badge,
  IconButton,
  Divider,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, AttachmentIcon } from '@chakra-ui/icons';
import { EmailData, EmailFormState, EmailValidationErrors, EmailAttachment } from '../types/email';

interface EmailFormProps {
  onSubmit?: (emailData: EmailData) => Promise<void>;
}

const EmailForm: React.FC<EmailFormProps> = ({ onSubmit }) => {
  const toast = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isClient, setIsClient] = useState(false);

  const [formState, setFormState] = useState<EmailFormState>({
    to: '',
    from: '',
    subject: '',
    body: '',
    html: '',
    cc: [],
    bcc: [],
    attachments: [],
    isLoading: false,
    sendStatus: 'idle',
  });

  const [errors, setErrors] = useState<EmailValidationErrors>({});
  const [ccInput, setCcInput] = useState('');
  const [bccInput, setBccInput] = useState('');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: EmailValidationErrors = {};

    if (!formState.to.trim()) {
      newErrors.to = 'Campo obrigatório';
    } else if (!validateEmail(formState.to)) {
      newErrors.to = 'E-mail inválido';
    }

    if (!formState.from.trim()) {
      newErrors.from = 'Campo obrigatório';
    } else if (!validateEmail(formState.from)) {
      newErrors.from = 'E-mail inválido';
    }

    if (!formState.subject.trim()) {
      newErrors.subject = 'Campo obrigatório';
    }

    if (!formState.body.trim()) {
      newErrors.body = 'Campo obrigatório';
    }

    // Validate CC emails
    const invalidCc = formState.cc.find(email => !validateEmail(email));
    if (invalidCc) {
      newErrors.cc = `E-mail inválido em CC: ${invalidCc}`;
    }

    // Validate BCC emails
    const invalidBcc = formState.bcc.find(email => !validateEmail(email));
    if (invalidBcc) {
      newErrors.bcc = `E-mail inválido em BCC: ${invalidBcc}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof EmailData, value: string) => {
    setFormState(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when user starts typing
    if (field in errors && errors[field as keyof EmailValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const addEmailToList = (email: string, type: 'cc' | 'bcc') => {
    if (!email.trim()) return;
    
    if (!validateEmail(email)) {
      toast({
        title: 'E-mail inválido',
        description: 'Por favor, insira um e-mail válido',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const currentList = formState[type];
    if (!currentList.includes(email)) {
      setFormState(prev => ({
        ...prev,
        [type]: [...currentList, email],
      }));
      
      if (type === 'cc') setCcInput('');
      if (type === 'bcc') setBccInput('');
    } else {
      toast({
        title: 'E-mail duplicado',
        description: 'Este e-mail já foi adicionado',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const removeEmailFromList = (email: string, type: 'cc' | 'bcc') => {
    setFormState(prev => ({
      ...prev,
      [type]: prev[type].filter(e => e !== email),
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast({
          title: 'Arquivo muito grande',
          description: `${file.name} é maior que 10MB`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Content = e.target?.result as string;
        const base64Data = base64Content.split(',')[1]; // Remove data:... prefix

        const newAttachment: EmailAttachment = {
          filename: file.name,
          content: base64Data,
        };

        setFormState(prev => ({
          ...prev,
          attachments: [...prev.attachments, newAttachment],
        }));
      };
      reader.readAsDataURL(file);
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachment = (index: number) => {
    setFormState(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }));
  };

  const simulateEmailSend = async (emailData: EmailData): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simulate random success/failure for demonstration
    if (Math.random() < 0.8) {
      console.log('Email enviado com sucesso:', emailData);
    } else {
      throw new Error('Falha na simulação do envio');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setFormState(prev => ({
      ...prev,
      isLoading: true,
      sendStatus: 'sending',
      errorMessage: undefined,
    }));

    try {
      const emailData: EmailData = {
        to: formState.to,
        from: formState.from,
        subject: formState.subject,
        body: formState.body,
        html: formState.html,
        cc: formState.cc,
        bcc: formState.bcc,
        attachments: formState.attachments,
      };

      if (onSubmit) {
        await onSubmit(emailData);
      } else {
        await simulateEmailSend(emailData);
      }

      setFormState(prev => ({
        ...prev,
        isLoading: false,
        sendStatus: 'success',
      }));

      toast({
        title: 'E-mail enviado!',
        description: 'Seu e-mail foi enviado com sucesso',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Reset form after successful send
      setTimeout(() => {
        setFormState({
          to: '',
          from: '',
          subject: '',
          body: '',
          html: '',
          cc: [],
          bcc: [],
          attachments: [],
          isLoading: false,
          sendStatus: 'idle',
        });
      }, 2000);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        sendStatus: 'error',
        errorMessage,
      }));

      toast({
        title: 'Erro ao enviar e-mail',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={6}>
      <Text fontSize="2xl" fontWeight="bold" mb={6} color="purple.500">
        Enviar E-mail
      </Text>

      {isClient && formState.sendStatus === 'success' && (
        <Alert status="success" mb={4}>
          <AlertIcon />
          E-mail enviado com sucesso!
        </Alert>
      )}

      {isClient && formState.sendStatus === 'error' && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {formState.errorMessage || 'Erro ao enviar e-mail'}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch">
          <FormControl isRequired isInvalid={!!errors.to}>
            <FormLabel>Para</FormLabel>
            <Input
              type="email"
              value={formState.to}
              onChange={(e) => handleInputChange('to', e.target.value)}
              placeholder="destinatario@email.com"
            />
            {errors.to && <Text color="red.500" fontSize="sm">{errors.to}</Text>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.from}>
            <FormLabel>De</FormLabel>
            <Input
              type="email"
              value={formState.from}
              onChange={(e) => handleInputChange('from', e.target.value)}
              placeholder="remetente@email.com"
            />
            {errors.from && <Text color="red.500" fontSize="sm">{errors.from}</Text>}
          </FormControl>

          <FormControl>
            <FormLabel>CC</FormLabel>
            <HStack>
              <Input
                type="email"
                value={ccInput}
                onChange={(e) => setCcInput(e.target.value)}
                placeholder="copiado@email.com"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addEmailToList(ccInput, 'cc');
                  }
                }}
              />
              <IconButton
                aria-label="Adicionar CC"
                icon={<AddIcon />}
                onClick={() => addEmailToList(ccInput, 'cc')}
                size="sm"
              />
            </HStack>
            {formState.cc.length > 0 && (
              <HStack mt={2} flexWrap="wrap">
                {formState.cc.map((email, index) => (
                  <Badge key={index} colorScheme="blue" px={2} py={1}>
                    {email}
                    <IconButton
                      aria-label="Remover"
                      icon={<DeleteIcon />}
                      size="xs"
                      ml={1}
                      onClick={() => removeEmailFromList(email, 'cc')}
                      variant="ghost"
                    />
                  </Badge>
                ))}
              </HStack>
            )}
            {errors.cc && <Text color="red.500" fontSize="sm">{errors.cc}</Text>}
          </FormControl>

          <FormControl>
            <FormLabel>BCC</FormLabel>
            <HStack>
              <Input
                type="email"
                value={bccInput}
                onChange={(e) => setBccInput(e.target.value)}
                placeholder="oculto@email.com"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addEmailToList(bccInput, 'bcc');
                  }
                }}
              />
              <IconButton
                aria-label="Adicionar BCC"
                icon={<AddIcon />}
                onClick={() => addEmailToList(bccInput, 'bcc')}
                size="sm"
              />
            </HStack>
            {formState.bcc.length > 0 && (
              <HStack mt={2} flexWrap="wrap">
                {formState.bcc.map((email, index) => (
                  <Badge key={index} colorScheme="purple" px={2} py={1}>
                    {email}
                    <IconButton
                      aria-label="Remover"
                      icon={<DeleteIcon />}
                      size="xs"
                      ml={1}
                      onClick={() => removeEmailFromList(email, 'bcc')}
                      variant="ghost"
                    />
                  </Badge>
                ))}
              </HStack>
            )}
            {errors.bcc && <Text color="red.500" fontSize="sm">{errors.bcc}</Text>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.subject}>
            <FormLabel>Assunto</FormLabel>
            <Input
              value={formState.subject}
              onChange={(e) => handleInputChange('subject', e.target.value)}
              placeholder="Assunto do Email"
            />
            {errors.subject && <Text color="red.500" fontSize="sm">{errors.subject}</Text>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.body}>
            <FormLabel>Mensagem (Texto)</FormLabel>
            <Textarea
              value={formState.body}
              onChange={(e) => handleInputChange('body', e.target.value)}
              placeholder="Conteúdo do email em texto simples."
              rows={4}
            />
            {errors.body && <Text color="red.500" fontSize="sm">{errors.body}</Text>}
          </FormControl>

          <FormControl>
            <FormLabel>Mensagem (HTML)</FormLabel>
            <Textarea
              value={formState.html}
              onChange={(e) => handleInputChange('html', e.target.value)}
              placeholder="<p>Conteúdo do email em <strong>HTML</strong>.</p>"
              rows={4}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Anexos</FormLabel>
            {isClient && (
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
            )}
            <Button
              leftIcon={<AttachmentIcon />}
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              size="sm"
              disabled={!isClient}
            >
              Adicionar Anexos
            </Button>
            {formState.attachments.length > 0 && (
              <VStack mt={3} align="stretch" spacing={2}>
                {formState.attachments.map((attachment, index) => (
                  <HStack key={index} p={2} border="1px solid" borderColor="gray.200" borderRadius="md">
                    <AttachmentIcon />
                    <Text flex={1}>{attachment.filename}</Text>
                    <Text fontSize="sm" color="gray.500">
                      {(attachment.content.length * 0.75 / 1024).toFixed(1)} KB
                    </Text>
                    <IconButton
                      aria-label="Remover anexo"
                      icon={<DeleteIcon />}
                      size="sm"
                      onClick={() => removeAttachment(index)}
                      variant="ghost"
                      colorScheme="red"
                    />
                  </HStack>
                ))}
              </VStack>
            )}
          </FormControl>

          <Divider />

          <Button
            type="submit"
            colorScheme="purple"
            size="lg"
            isLoading={formState.isLoading}
            loadingText="Enviando..."
            disabled={formState.isLoading}
          >
            Enviar E-mail
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default EmailForm;