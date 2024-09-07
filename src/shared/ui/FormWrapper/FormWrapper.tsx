import { ElementType, FC, FormEvent, memo, PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'
import FormControl from '@mui/material/FormControl'
import FormGroup from '@mui/material/FormGroup'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { LinkWrapper } from '../LinkWrapper'
import Grid from '@mui/material/Grid2'

type FormType = {
  as?: ElementType
  description?: string //  Описание формы (description), если оно задано
  link?: {
    // Ссылка, которая будет отображена внизу формы если она задана
    title: string // Заголовок формы
    to: string
  }
  onClick?: () => void
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void // Обработчик события отправки формы.
  title?: string // Заголовок формы если он задан
  buttonText?: string // Текст на кнопке формы
}
/**
 - LinkWrapper (обёртка для ссылки router-dom_a), обеспечивает определенные стили для ссылки.
 - FormGroup: обеспечивает компактное расположение строк "детей" формы.
 */
export const FormWrapper: FC<FormType & PropsWithChildren> = memo((props) => {
  const { as, children, description, link, onClick, onSubmit, title, buttonText } = props

  const Component = as || 'form' // по дефолту используется form

  return (
    <Grid container justifyContent="center">
      <Paper sx={{ padding: '40px 33px', marginTop: '20px' }}>
        <Component onSubmit={onSubmit} style={{ minWidth: 347 }}>
          <Typography
            component={'h1'}
            sx={{
              fontSize: '26px',
              fontWeight: 700,
              textAlign: 'center',
            }}>
            {title}
          </Typography>
          <FormControl sx={{ width: '100%' }}>
            <FormGroup sx={{ display: 'flex', marginBottom: '20px', rowGap: '24px' }}>
              {children}
            </FormGroup>
            {description && (
              <Typography sx={{ marginBottom: '20px', textAlign: 'center' }}>
                {description}
              </Typography>
            )}
            {link && (
              <LinkWrapper>
                <Link to={link.to}>{link.title}</Link>
              </LinkWrapper>
            )}
          </FormControl>
        </Component>
      </Paper>
    </Grid>
  )
})
