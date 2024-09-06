import { FC } from 'react'
import { RequestStatus } from '@/app/model/appReducer'

type PropsType = {
  status: RequestStatus
  value: string
}

export const NotFindAnything: FC<PropsType> = ({ status, value }) => {
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
