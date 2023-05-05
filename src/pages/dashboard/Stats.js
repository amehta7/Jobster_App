import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showStats } from '../../features/allJobs/allJobsSlice'
import { StatsContainer, ChartsContainer, Loading } from '../../components'

const Stats = () => {
  const dispatch = useDispatch()
  const { isLoading, monthlyApplications } = useSelector(
    (store) => store.allJobs
  )

  useEffect(() => {
    dispatch(showStats())
    // eslint-disable-next-line
  }, [])

  if (isLoading) {
    return <Loading center />
  }

  return (
    <React.Fragment>
      <StatsContainer />
      {monthlyApplications.length > 0 && <ChartsContainer />}
    </React.Fragment>
  )
}

export default Stats
