//IMAGES
import { Outlet } from 'react-router-dom';
import { logo } from '../../images/other';

//UTILS
import { ThemeProvider, createTheme } from '@mui/material';
import BgGradient from '../Auth/bgGradient';

export default function AuthLayout(): JSX.Element {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
    typography: {
      fontFamily: 'Poppins, sans-serif !important',
      fontWeightBold: '400 !important',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="flex h-screen items-start flex-col bg-black text-white p-4 gap-16 relative" style={{ zIndex: 0 }}>
        <div className="absolute top-0 left-0 w-full h-full" style={{ zIndex: -1 }}>
          <BgGradient />
        </div>
        <div className="flex justify-center w-full">
          <div className="relative">
            <img src={logo} alt="Pulse World" className="w-80 h-72 object-contain" />
            <div className="absolute bottom-28 right-0 text-xs">ADMIN PANEL</div>
          </div>
        </div>
        <div className="w-full h-screen flex justify-center items-center">
          <Outlet />
        </div>
      </div>
    </ThemeProvider>
  );
}
