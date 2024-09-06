// В DataTable.tsx
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
import Button from '@mui/material/Button'
import { selectAppStatus } from '@/app/model/appSelectors'
import { TableData } from '@/entities/api/dataTableApi'
import { EnhancedTableContent } from '@/entities/ui/dataTable.tsx/EnhancedTableContent'
import { RequestStatus } from '@/app/model/appReducer'
import { NotFindAnything } from '@/entities/ui/dataTable.tsx/NotFindAnything'
import { EmptyIcon } from '@/shared/assets/icons/EmptyIcon'
import { formatDateISO } from '@/entities/model/utils/formatDateISO'
import { AddRecordModal } from '@/entities/ui/AddRecordModal'
import { headCells } from '@/entities/model/const/headCells'
import { EditRecordModal } from '@/entities/ui/dataTable.tsx/EditRecordModal'

export const DataTable: FC = () => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const tableData = useSelector(selectDataTable)
  const status = useSelector(selectAppStatus)

  const [isAddModalOpen, setAddModalOpen] = useState(false) // Состояние для модального окна добавления
  const [isEditModalOpen, setEditModalOpen] = useState(false) // Состояние для модального окна редактирования
  const [newRecord, setNewRecord] = useState<TableData>({
    id: `${Math.random()}`, // временный ID, генерируем локально
    documentStatus: '',
    employeeNumber: '',
    documentType: '',
    documentName: '',
    companySignatureName: '',
    employeeSignatureName: '',
    employeeSigDate: new Date().toISOString().slice(0, 16),
    companySigDate: new Date().toISOString().slice(0, 16),
  })
  const [editRecord, setEditRecord] = useState<TableData | null>(null) // Состояние для записи, которую редактируем

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

  const handleDelete = async (id: string) => {
    try {
      await dispatch(tablesThunks.deleteRecord(id))
      dispatch(tablesThunks.fetchTableData()) // Обновляем таблицу после удаления
    } catch (error) {
      // console.error('Failed to delete the record:', error)
    }
  }

  const handleAdd = () => {
    setAddModalOpen(true)
  }

  const handleEdit = (record: TableData) => {
    setEditRecord(record) // Устанавливаем запись для редактирования
    setEditModalOpen(true) // Открываем модальное окно редактирования
  }

  const handleModalClose = () => {
    setAddModalOpen(false)
    setEditModalOpen(false)
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

  const handleUpdateRecord = async (record: TableData) => {
    try {
      if (editRecord?.id) {
        await dispatch(tablesThunks.updateRecord({ id: editRecord.id, data: record }))
        dispatch(tablesThunks.fetchTableData()) // Перезагружаем данные
      }
    } catch (error) {
    } finally {
      setEditModalOpen(false)
      setEditRecord(null)
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
        <IconButton onClick={() => handleEdit(row)} sx={{ padding: '6px' }}>
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
      <EnhancedTableContent headCells={headCells} pageCount={20} status={status as RequestStatus}>
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
      {editRecord && (
        <EditRecordModal
          open={isEditModalOpen}
          onClose={handleModalClose}
          onSave={handleUpdateRecord}
          record={editRecord}
          setRecord={setEditRecord}
        />
      )}
    </>
  )
}
