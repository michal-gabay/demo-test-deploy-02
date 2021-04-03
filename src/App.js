import './App.scss';
import Header from "./components/Header/Header"
import Body from "./components/Body/Body"
import Fotter from "./components/Footer/Footer"
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4e85c7',
      main: '#035996',
      dark: '#003168',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#e8f4fd',
      main: '#E3F2FD',
      dark: '#9ea9b1',
      contrastText: '#035996',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="main-container">
        <Header />
        <Body />
        <Fotter />
      </div>
    </ThemeProvider>
  )
}

export default App;
