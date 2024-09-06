import { AppRootState } from '@/app/providers/store/store'

export const selectDataTable = (state: AppRootState) => state.tableData?.data
