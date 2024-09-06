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
import { AddRecordModal } from '@/entities/ui/AddRecordModal'

export const DataTable: FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const tableData = useSelector(selectDataTable)
  const status = useSelector(selectAppStatus)

  const [isAddModalOpen, setAddModalOpen] = useState(false)
  const [newRecord, setNewRecord] = useState<TableData>({
    id: `${Math.random()}`, // временный ID, генерируется локально
    documentStatus: '',
    employeeNumber: '',
    documentType: '',
    documentName: '',
    companySignatureName: '',
    employeeSignatureName: '',
    employeeSigDate: new Date().toISOString().slice(0, 16),
    companySigDate: new Date().toISOString().slice(0, 16),
  })

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(tablesThunks.fetchTableData())
    }
  }, [isLoggedIn, dispatch])

  useEffect(() => {
    if (status === 'succeeded') {
      dispatch(tablesThunks.fetchTableData())
    }
  }, [status, dispatch])

  const handleDelete = (id: string) => {
    // dispatch(tablesThunks.deleteRecord(id))
  }

  const handleAdd = () => {
    setAddModalOpen(true)
  }

  const handleModalClose = () => {
    setAddModalOpen(false)
  }

  const handleSaveRecord = async (record: TableData) => {
    try {
      await dispatch(tablesThunks.createRecord(record))
      dispatch(tablesThunks.fetchTableData()) // Перезагружаем данные
    } catch (error) {
    } finally {
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

      <AddRecordModal
        open={isAddModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveRecord}
        newRecord={newRecord}
        setNewRecord={setNewRecord}
      />
    </>
  )
}
