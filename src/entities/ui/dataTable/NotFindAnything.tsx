import { RequestStatus } from '@/app/model/appSlice'
import { ReturnComponent } from '@/shared/types'

type Props = {
  status: RequestStatus
  value: string
}

export const NotFindAnything = ({ status, value }: Props): ReturnComponent => {
  return (
    <div style={{ marginBottom: '25px' }}>
      {status !== 'loading' && (
        <div>
          <div style={{ marginBottom: '25px' }}>
            We could not find anything for{' '}
            <span style={{ marginBottom: '25px' }}>{`"${value}"`}</span>
          </div>
          <div>Try different or less specific keywords.</div>
        </div>
      )}
    </div>
  )
}
