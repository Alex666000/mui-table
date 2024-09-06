import { AppRootState } from '../providers/store/store'

export const selectAppStatus = (state: AppRootState) => state.app?.status
export const selectAppError = (state: AppRootState) => state.app?.error
export const selectIsInitialized = (state: AppRootState) => state.app?.isInitialized
