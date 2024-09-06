import { createTheme } from '@mui/material'

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    radius: true
  }
}

// кастомные настройки для Материал UI
export const theme = createTheme({
  components: {
    // компонент "Кнопка"
    MuiButton: {
      // стили для кнопки ставим свои
      styleOverrides: {
        root: {
          '&:hover': {
            // при наведении меняем цвет кнопки
            backgroundColor: '#205eff',
          },
          // по дефолту такой цвет кнопки
          backgroundColor: '#366EFF',
          boxShadow: '0 4px 18px rgba(54, 110, 255, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          color: '#fff',
          fontSize: '1rem', // 16px
          textTransform: 'initial',
        },
      },
      variants: [
        {
          // меняем значение пропса size: 'large' на новый размер: maxWidth: 347
          props: { size: 'large' },
          style: {
            maxWidth: 347,
          },
        },
        {
          // меняем значение пропса
          props: { color: 'error' },
          style: {
            '&:hover': {
              background: '#ff1616',
            },
            background: '#FF3636',
          },
        },
        {
          props: { size: 'medium' },
          style: {
            maxWidth: 174,
            minWidth: 175,
          },
        },
        {
          props: { size: 'small' },
          style: {
            maxWidth: 113,
            minWidth: 113,
          },
        },
        {
          props: { variant: 'radius' },
          style: {
            borderRadius: 30,
          },
        },
      ],
    },
    // компонент контейнер всего Арр - применяем в Header см.
    MuiContainer: {
      styleOverrides: {
        root: {
          maxWidth: 1100,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '& .MuiSlider-thumb': {
            '& .airbnb-bar': {
              backgroundColor: 'currentColor',
              height: 9,
              marginLeft: 1,
              marginRight: 1,
              width: 1,
            },
            '&:hover': {
              boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
            },
            height: 16,
            width: 16,
          },
          '& .MuiSlider-thumb:after': {
            backgroundColor: '#fff',
            height: '8px',
            left: '50%',
            top: '50%',
            width: '8px',
          },
          '& .MuiSlider-track': {
            height: 3,
          },
          height: 5,
          margin: '0 10px',
          padding: '13px 0',
        },
      },
    },
    MuiTextField: {
      variants: [
        {
          props: { color: 'primary', variant: 'standard' },
          style: {
            color: '#000000',
          },
        },
      ],
    },
  },
  palette: {
    // меняем цвет основного текста
    primary: {
      main: '#366EFF',
    },
  },
  typography: {
    fontFamily: 'Montserrat',
  },
} as any)
