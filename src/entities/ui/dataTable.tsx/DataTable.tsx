import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tablesThunks } from '@/entities/model/dataTableSlice'
import { selectDataTable } from '@/entities/model/dataTableSelectors'
import { selectIsLoggedIn } from '@/features/auth/model/selectors/auth.selectors'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useNavigate } from 'react-router-dom'
import { selectAppStatus } from '@/app/model/appSelectors'
import { TableData } from '@/entities/api/dataTableApi'
import Button from '@mui/material/Button'
import { EnhancedTableContent } from '@/entities/ui/dataTable.tsx/EnhancedTableContent'
import { RequestStatus } from '@/app/model/appReducer'
import { NotFindAnything } from '@/entities/ui/dataTable.tsx/NotFindAnything'
import { EmptyIcon } from '@/shared/assets/icons/EmptyIcon'

// Функция для форматирования даты в формате ISO 8601
const formatDateISO = (dateString: string) => {
  const date = new Date(dateString)
  return date.toISOString().split('T')[0] // Формат YYYY-MM-DD
}

export const DataTable: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const tableData = useSelector(selectDataTable)
  const status = useSelector(selectAppStatus)

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(tablesThunks.fetchTableData())
    }
  }, [isLoggedIn, dispatch])
  //
  const handleDelete = (id: string) => {
    // dispatch(tablesThunks.deleteRecord(id))
  }

  const tableItems = (tableData as TableData[]).map((row, index) => (
    <TableRow hover key={index}>
      <TableCell align={'left'}>{formatDateISO(row.companySigDate)}</TableCell>{' '}
      {/* Дата подписи компании */}
      <TableCell align={'left'}>{row.companySignatureName}</TableCell> {/* Подпись компании */}
      <TableCell align={'left'}>{row.documentName}</TableCell> {/* Название документа */}
      <TableCell align={'left'}>{row.documentStatus}</TableCell> {/* Статус документа */}
      <TableCell align={'left'}>{row.documentType}</TableCell> {/* Тип документа */}
      <TableCell align={'left'}>{row.employeeNumber}</TableCell> {/* Номер сотрудника */}
      <TableCell align={'left'}>{formatDateISO(row.employeeSigDate)}</TableCell>{' '}
      {/* Дата подписи сотрудника */}
      <TableCell align={'left'}>{row.employeeSignatureName}</TableCell> {/* Подпись сотрудника */}
      <TableCell align={'left'} sx={{ padding: '10px 16px' }}>
        <IconButton onClick={() => navigate(`/learn/${row.id}`)} sx={{ padding: '6px' }}>
          <BorderColorOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => handleDelete(row.id)} sx={{ padding: '6px' }}>
          <DeleteOutlinedIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ))

  return (
    <>
      <EnhancedTableContent
        headCells={[
          { id: 'companySigDate', label: 'Дата подписи компании' },
          { id: 'companySignatureName', label: 'Подпись компании' },
          { id: 'documentName', label: 'Название документа' },
          { id: 'documentStatus', label: 'Статус документа' },
          { id: 'documentType', label: 'Тип документа' },
          { id: 'employeeNumber', label: 'Номер сотрудника' },
          { id: 'employeeSigDate', label: 'Дата подписи сотрудника' },
          { id: 'employeeSignatureName', label: 'Подпись сотрудника' },
          { id: 'actions', label: 'Действия' },
        ]}
        pageCount={20}
        status={status as RequestStatus}>
        {tableItems}
      </EnhancedTableContent>
      {!(tableData as TableData[]).length && (
        <NotFindAnything status={status as RequestStatus} value="Данные" />
      )}
      {status === 'succeeded' && <EmptyIcon />}
    </>
  )
}
