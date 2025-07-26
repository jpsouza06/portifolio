import { Box, Image, Spinner, ImageProps } from '@chakra-ui/react'
import { useState } from 'react'

interface ImageWithSpinnerProps extends ImageProps {
  spinnerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  spinnerColor?: string
}

const ImageWithSpinner: React.FC<ImageWithSpinnerProps> = ({
  spinnerSize = 'md',
  spinnerColor = 'purple.500',
  ...imageProps
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = () => {
    setIsLoading(false)
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  return (
    <Box position="relative" display="inline-block" w="100%" h="100%">
      {isLoading && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={2}
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="100%"
          bg="gray.50"
          borderRadius="md"
        >
          <Spinner
            size={spinnerSize}
            color={spinnerColor}
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            aria-label="Loading image"
          />
        </Box>
      )}
      
      {!hasError && (
        <Image
          {...imageProps}
          onLoad={handleLoad}
          onError={handleError}
          opacity={isLoading ? 0 : 1}
          transition="opacity 0.3s ease-in-out"
          w="100%"
          h="auto"
          alt={imageProps.alt || "Image"} // Ensure alt prop is always provided
        />
      )}
      
      {hasError && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="100%"
          h="200px"
          bg="gray.100"
          color="gray.500"
          fontSize="sm"
          borderRadius="md"
          border="1px solid"
          borderColor="gray.200"
        >
          Failed to load image
        </Box>
      )}
    </Box>
  )
}

export default ImageWithSpinner