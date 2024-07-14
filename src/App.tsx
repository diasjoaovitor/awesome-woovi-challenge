import { QueryProvider, ThemeProvider } from './providers'
import { Router } from './Router'

export const App = () => {
  return (
    <ThemeProvider>
      <QueryProvider>
        <Router />
      </QueryProvider>
    </ThemeProvider>
  )
}

export default App
