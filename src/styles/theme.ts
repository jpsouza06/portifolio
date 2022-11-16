import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
  colors: {
    purple: {
      "500": '#572CBB',
    },
    gray: {
      "100": '#0E0E0E',
    }
  },
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'white',
      }
    }
  },
})