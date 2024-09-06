import { AppRootState } from '@/app/providers/store/store'

export const selectIsLoggedIn = (state: AppRootState) => state.auth.isLoggedIn
