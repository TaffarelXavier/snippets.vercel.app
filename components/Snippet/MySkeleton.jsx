import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
const SKELETON_HEIGHT = 20
const MARGIM_RIGHT = 10

const MySkeleton = () => {
  return (
    <div
      style={{
        borderBottom: '1px solid #ccc',
        marginBottom: 30
      }}
    >
      <div style={{ marginBottom: SKELETON_HEIGHT }}>
        <Skeleton variant="rect" height={SKELETON_HEIGHT} width={400} />
      </div>
      <div style={{ marginBottom: SKELETON_HEIGHT }}>
        <Skeleton variant="rect" height={SKELETON_HEIGHT} width={600} />
      </div>
      <div style={{ marginBottom: SKELETON_HEIGHT }}>
        <Skeleton variant="rect" height={180} />
      </div>
      <div style={{ marginBottom: SKELETON_HEIGHT }}>
        <Skeleton variant="rect" height={SKELETON_HEIGHT} width={100} />
      </div>
      <div style={{ display: 'flex', marginBottom: SKELETON_HEIGHT }}>
        <Skeleton
          variant="rect"
          height={SKELETON_HEIGHT}
          width={120}
          style={{ marginBottom: MARGIM_RIGHT, marginRight: MARGIM_RIGHT }}
        />
        <Skeleton
          variant="rect"
          height={SKELETON_HEIGHT}
          width={120}
          style={{ marginBottom: MARGIM_RIGHT, marginRight: MARGIM_RIGHT }}
        />
        <Skeleton
          variant="rect"
          height={SKELETON_HEIGHT}
          width={150}
          style={{ marginBottom: MARGIM_RIGHT, marginRight: MARGIM_RIGHT }}
        />{' '}
        <Skeleton
          variant="rect"
          height={SKELETON_HEIGHT}
          width={120}
          style={{ marginBottom: MARGIM_RIGHT, marginRight: MARGIM_RIGHT }}
        />
      </div>
    </div>
  )
}
export default MySkeleton
