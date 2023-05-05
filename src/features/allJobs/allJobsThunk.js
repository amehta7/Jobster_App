import customFetch from '../../utils/axios'

export const getAllJobsThunk = async (_, thunkAPI) => {
  const { page, search, searchStatus, searchType, sort } =
    thunkAPI.getState().allJobs

  let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${page}`

  if (search) {
    url = url + `&search=${search}`
  }

  try {
    const res = await customFetch.get(url, {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    //console.log(res.data)
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}

export const showStatsThunk = async (_, thunkAPI) => {
  try {
    const res = await customFetch.get('/jobs/stats', {
      headers: {
        authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
      },
    })
    //console.log(res.data)
    return res.data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data.msg)
  }
}
