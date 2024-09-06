import { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { tablesThunks } from '@/entities/model/dataTableSlice'
import { selectDataTable } from '@/entities/model/dataTableSelectors'
import { selectIsLoggedIn } from '@/features/auth/model/selectors/auth.selectors'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import IconButton from '@mui/material/IconButton'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import { useNavigate } from 'react-router-dom'
import { selectAppStatus } from '@/app/model/appSelectors'
import { TableData } from '@/entities/api/dataTableApi'
import { EnhancedTableContent } from '@/entities/ui/dataTable.tsx/EnhancedTableContent'
import { RequestStatus } from '@/app/model/appReducer'
import { NotFindAnything } from '@/entities/ui/dataTable.tsx/NotFindAnything'
import { EmptyIcon } from '@/shared/assets/icons/EmptyIcon'
import { formatDateISO } from '@/entities/model/utils/formatDateISO'
import Button from '@mui/material/Button'
import { Modal, Box, TextField } from '@mui/material'

export const DataTable: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const tableData = useSelector(selectDataTable)
  const status = useSelector(selectAppStatus)

  // Модальное окно для добавления записи
  const [isAddModalOpen, setAddModalOpen] = useState(false)

  const [newRecord, setNewRecord] = useState<TableData>({
    id: `${Math.random()}`, // временный ID, генерируется локально
    documentStatus: '',
    employeeNumber: '',
    documentType: '',
    documentName: '',
    companySignatureName: '',
    employeeSignatureName: '',
    employeeSigDate: new Date().toISOString().slice(0, 16), // Обеспечиваем корректный формат
    companySigDate: new Date().toISOString().slice(0, 16), // Обеспечиваем корректный формат
  })

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(tablesThunks.fetchTableData())
    }
  }, [isLoggedIn, dispatch])

  const handleDelete = (id: string) => {
    // dispatch(tablesThunks.deleteRecord(id))
  }

  const handleAdd = () => {
    setAddModalOpen(true)
  }

  const handleModalClose = () => {
    setAddModalOpen(false)
  }

  const handleSaveRecord = () => {
    dispatch(tablesThunks.createRecord(newRecord))
    setAddModalOpen(false)
    setNewRecord({
      id: `${Math.random()}`,
      documentStatus: '',
      employeeNumber: '',
      documentType: '',
      documentName: '',
      companySignatureName: '',
      employeeSignatureName: '',
      employeeSigDate: new Date().toISOString(),
      companySigDate: new Date().toISOString(),
    })
  }

  const tableItems = (tableData as TableData[]).map((row, index) => (
    <TableRow hover key={index}>
      <TableCell align={'left'}>{formatDateISO(row.companySigDate)}</TableCell>
      <TableCell align={'left'}>{row.companySignatureName}</TableCell>
      <TableCell align={'left'}>{row.documentName}</TableCell>
      <TableCell align={'left'}>{row.documentStatus}</TableCell>
      <TableCell align={'left'}>{row.documentType}</TableCell>
      <TableCell align={'left'}>{row.employeeNumber}</TableCell>
      <TableCell align={'left'}>{formatDateISO(row.employeeSigDate)}</TableCell>
      <TableCell align={'left'}>{row.employeeSignatureName}</TableCell>
      <TableCell align={'left'}>
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
      <Button variant="contained" color="primary" onClick={handleAdd}>
        Добавить запись
      </Button>
      {status === 'failed' && <EmptyIcon />}

      {/* Модальное окно для добавления записи */}
      <Modal open={isAddModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: '400px', // Ширина модального окна
          }}>
          <TextField
            label="Название документа"
            value={newRecord.documentName}
            onChange={(e) => setNewRecord({ ...newRecord, documentName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Номер сотрудника"
            value={newRecord.employeeNumber}
            onChange={(e) => setNewRecord({ ...newRecord, employeeNumber: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Тип документа"
            value={newRecord.documentType}
            onChange={(e) => setNewRecord({ ...newRecord, documentType: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Статус документа"
            value={newRecord.documentStatus}
            onChange={(e) => setNewRecord({ ...newRecord, documentStatus: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Подпись компании"
            value={newRecord.companySignatureName}
            onChange={(e) => setNewRecord({ ...newRecord, companySignatureName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Подпись сотрудника"
            value={newRecord.employeeSignatureName}
            onChange={(e) => setNewRecord({ ...newRecord, employeeSignatureName: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Дата подписи компании"
            type="datetime-local"
            value={formatDateISO(newRecord.companySigDate)}
            onChange={(e) => setNewRecord({ ...newRecord, companySigDate: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Дата подписи сотрудника"
            type="datetime-local"
            value={formatDateISO(newRecord.employeeSigDate)}
            onChange={(e) => setNewRecord({ ...newRecord, employeeSigDate: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleSaveRecord}>
              Сохранить
            </Button>
            <Button variant="contained" color="error" onClick={handleModalClose}>
              Отмена
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
