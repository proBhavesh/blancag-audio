import { useLocation } from 'react-router-dom';

const useTheme = () => {
  const location = useLocation();
  const bgColor = location.pathname === '/' ? '#bada55' : '#000';

  return {
    bgBlack: '#000',
    textWhite: '#f5f5f5',
    mainGreen: '#bada55',
    textGrey: '#a6a6a6',
    lighterGrey: '#a0a0a0',
    bgColor,
  };
};

export default useTheme;
