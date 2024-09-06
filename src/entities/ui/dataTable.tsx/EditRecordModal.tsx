import { FC } from 'react'
import { Modal, Box, TextField, Button } from '@mui/material'
import { TableData } from '../../api/dataTableApi'
import { formatDateISO } from '../../model/utils/formatDateISO'

interface EditRecordModalProps {
  open: boolean
  onClose: () => void
  onSave: (record: TableData) => void
  record: TableData
  setRecord: React.Dispatch<React.SetStateAction<TableData>>
}

export const EditRecordModal: FC<EditRecordModalProps> = ({
  open,
  onClose,
  onSave,
  record,
  setRecord,
}) => {
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
          value={record.documentName}
          onChange={(e) => setRecord({ ...record, documentName: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Номер сотрудника"
          value={record.employeeNumber}
          onChange={(e) => setRecord({ ...record, employeeNumber: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Тип документа"
          value={record.documentType}
          onChange={(e) => setRecord({ ...record, documentType: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Статус документа"
          value={record.documentStatus}
          onChange={(e) => setRecord({ ...record, documentStatus: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Имя подписи сотрудника"
          value={record.employeeSignatureName}
          onChange={(e) => setRecord({ ...record, employeeSignatureName: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Имя подписи компании"
          value={record.companySignatureName}
          onChange={(e) => setRecord({ ...record, companySignatureName: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Дата подписи сотрудника"
          type="datetime-local"
          value={formatDateISO(record.employeeSigDate)}
          onChange={(e) => setRecord({ ...record, employeeSigDate: e.target.value })}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Дата подписи компании"
          type="datetime-local"
          value={formatDateISO(record.companySigDate)}
          onChange={(e) => setRecord({ ...record, companySigDate: e.target.value })}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" onClick={() => onSave(record)}>
          Сохранить
        </Button>
        <Button variant="outlined" color="secondary" onClick={onClose} sx={{ ml: 2 }}>
          Отмена
        </Button>
      </Box>
    </Modal>
  )
}
