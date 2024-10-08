import { Dispatch, SetStateAction } from 'react'
import { Box, Button, Modal, TextField } from '@mui/material'
import { formatDateISO } from '../../model/utils'
import { Table } from '../../model/types'
import { ReturnComponent } from '@/shared/types'

type AddRecordModalProps = {
  open: boolean
  onClose: () => void
  onSave: (record: Table) => void
  newRecord: Table
  setNewRecord: Dispatch<SetStateAction<Table>>
}

export const AddRecordModal = ({
  open,
  onClose,
  onSave,
  newRecord,
  setNewRecord,
}: AddRecordModalProps): ReturnComponent => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          width: '400px',
        }}>
        <TextField
          label="Название документа"
          value={newRecord.documentName}
          onChange={(e) => setNewRecord({ ...newRecord, documentName: e.target.value })}
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
          label="Дата подписи компании"
          type="datetime-local"
          value={formatDateISO(newRecord.companySigDate, true)}
          onChange={(e) => setNewRecord({ ...newRecord, companySigDate: e.target.value })}
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
          label="Номер сотрудника"
          value={newRecord.employeeNumber}
          onChange={(e) => setNewRecord({ ...newRecord, employeeNumber: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Дата подписи сотрудника"
          type="datetime-local"
          value={formatDateISO(newRecord.employeeSigDate, true)}
          onChange={(e) => setNewRecord({ ...newRecord, employeeSigDate: e.target.value })}
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSave(newRecord)}
          sx={{ marginRight: '50px' }}>
          Сохранить
        </Button>
        <Button variant="contained" color="error" onClick={onClose}>
          Отмена
        </Button>
      </Box>
    </Modal>
  )
}
