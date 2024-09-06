import { instance } from '@/shared/api'

const token = localStorage.getItem('authToken')

export const dataTableAPI = {
  fetchTableData() {
    return instance.get<FetchTableResponse<TableData>>(
      '/ru/data/v3/testmethods/docs/userdocs/get',
      {
        headers: { 'x-auth': token },
      } as ReturnType<typeof instance.get>
    )
  },
  createRecord(data: Record<string, any>) {
    // console.log('Отправляемые данные на сервер:', data)

    return instance.post('/ru/data/v3/testmethods/docs/userdocs/create', data, {
      headers: { 'x-auth': token },
    } as ReturnType<typeof instance.post>)
  },
  updateRecord(id: string, data: Record<string, any>, token: string) {
    return instance.post(`/userdocs/set/${id}`, data, {
      headers: { 'x-auth': token },
    } as ReturnType<typeof instance.post>)
  },
  deleteRecord(id: string, token: string) {
    return instance.post(`/userdocs/delete/${id}`, null, {
      headers: { 'x-auth': token },
    } as ReturnType<typeof instance.post>)
  },
}

// types
export type FetchTableResponse<D = {}> = {
  error_code: number
  error_message: string
  data: D[]
  profiling: string
  timings?: any
}
export type TableData = {
  id: string
  documentStatus: string
  employeeNumber: string
  documentType: string
  documentName: string
  companySignatureName: string
  employeeSignatureName: string
  employeeSigDate: string
  companySigDate: string
}
// import { useDispatch, useSelector } from 'react-redux'
// import Table from '@mui/material/Table'
// import TableBody from '@mui/material/TableBody'
// import TableCell from '@mui/material/TableCell'
// import TableContainer from '@mui/material/TableContainer'
// import TableHead from '@mui/material/TableHead'
// import TableRow from '@mui/material/TableRow'
// import Paper from '@mui/material/Paper'
// import { memo, useEffect } from 'react'
// import { tablesThunks } from '@/entities/model/dataTableSlice'
// import { selectDataTable } from '@/entities/model/dataTableSelectors'
// import { selectIsLoggedIn } from '@/features/auth/model/selectors/auth.selectors'
// import Button from '@mui/material/Button'
// import {
//   actionCellStyle,
//   buttonStyle,
//   containerStyle,
//   headerCellStyle,
//   tableStyle,
// } from '../../model/const/classes'
//
// export const DataTable = memo(() => {
//   const dispatch = useDispatch()
//   const isLoggedIn = useSelector(selectIsLoggedIn)
//   const tableData = useSelector(selectDataTable)
//
//   useEffect(() => {
//     if (isLoggedIn) {
//       dispatch(tablesThunks.fetchTableData())
//     }
//   }, [isLoggedIn, dispatch])
//
//   return (
//     <TableContainer component={Paper} sx={containerStyle}>
//       <Button variant="contained" color="primary" sx={buttonStyle}>
//         Добавить запись
//       </Button>
//       <Table sx={tableStyle}>
//         <TableHead>
//           <TableRow>
//             <TableCell sx={headerCellStyle}>Название документа</TableCell>
//             <TableCell sx={headerCellStyle}>Статус документа</TableCell>
//             <TableCell sx={headerCellStyle}>Номер сотрудника</TableCell>
//             <TableCell sx={headerCellStyle}>Тип документа</TableCell>
//             <TableCell sx={headerCellStyle}>Имя подписи компании</TableCell>
//             <TableCell sx={headerCellStyle}>Имя подписи сотрудника</TableCell>
//             <TableCell sx={headerCellStyle}>Дата подписи сотрудника</TableCell>
//             <TableCell sx={headerCellStyle}>Дата подписи компании</TableCell>
//             <TableCell sx={headerCellStyle}>Действия</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {tableData?.map((row, index) => (
//             <TableRow key={index}>
//               <TableCell>{row?.documentName}</TableCell>
//               <TableCell>{row?.documentStatus}</TableCell>
//               <TableCell>{row?.employeeNumber}</TableCell>
//               <TableCell>{row?.documentType}</TableCell>
//               <TableCell>{row?.companySignatureName}</TableCell>
//               <TableCell>{row?.employeeSignatureName}</TableCell>
//               <TableCell>
//                 {row?.employeeSigDate
//                   ? new Date(row.employeeSigDate).toLocaleDateString('ru-RU')
//                   : 'Дата не указана'}
//               </TableCell>
//               <TableCell>
//                 {row?.companySigDate
//                   ? new Date(row.companySigDate).toLocaleDateString('ru-RU')
//                   : 'Дата не указана'}
//               </TableCell>
//               <TableCell sx={actionCellStyle}>
//                 <Button
//                   onClick={() => handleEdit(row.id, { ...row, documentName: 'Updated Name' })}
//                   variant="contained"
//                   color="secondary"
//                   sx={buttonStyle}>
//                   Изменить
//                 </Button>
//                 <Button
//                   onClick={() => handleDelete(row.id)}
//                   variant="contained"
//                   color="error"
//                   sx={buttonStyle}>
//                   Удалить
//                 </Button>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   )
// })
