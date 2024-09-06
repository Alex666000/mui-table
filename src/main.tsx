import { createRoot } from 'react-dom/client'

import { Provider } from 'react-redux'
import { store } from '@/app/providers/store'
import App from '@/app/App'
import { BrowserRouter } from 'react-router-dom'
import { theme } from '@/shared/constants'
import { ThemeProvider } from '@mui/material'

createRoot(document.getElementById('root') as HTMLElement)!.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </Provider>
)
