import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import { RecoilRoot } from "recoil"



const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
}

const theme = extendTheme({ config })


ReactDOM.createRoot(document.getElementById('root')).render(
  <ChakraProvider theme={theme}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ChakraProvider>
)
