import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { showStatsThunk, getAllJobsThunk } from './allJobsThunk'

const initialFiltersState = {
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}

const initialState = {
  isLoading: false,
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  stats: {},
  monthlyApplications: [],
  ...initialFiltersState,
}

export const getAllJobs = createAsyncThunk('allJobs/getJobs', getAllJobsThunk)

export const showStats = createAsyncThunk('allJobs/showStats', showStatsThunk)

const allJobsSlice = createSlice({
  name: 'allJobs',
  initialState: initialState,
  reducers: {
    showLoading: (state) => {
      state.isLoading = true
    },
    hideLoading: (state) => {
      state.isLoading = false
    },
    handleChange: (state, action) => {
      state.page = 1
      const { name, value } = action.payload
      state[name] = value
    },
    changePage: (state, action) => {
      state.page = action.payload
    },
    clearFilters: (state) => {
      return { ...state, ...initialFiltersState }
    },
    clearAllJobsState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJobs.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllJobs.fulfilled, (state, action) => {
        state.isLoading = false
        state.jobs = action.payload.jobs
        state.totalJobs = action.payload.totalJobs
        state.numOfPages = action.payload.numOfPages
      })
      .addCase(getAllJobs.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })
      .addCase(showStats.pending, (state) => {
        state.isLoading = true
      })
      .addCase(showStats.fulfilled, (state, action) => {
        state.isLoading = false
        state.stats = action.payload.defaultStats
        state.monthlyApplications = action.payload.monthlyApplications
      })
      .addCase(showStats.rejected, (state, action) => {
        state.isLoading = false
        toast.error(action.payload)
      })
  },
})

export const {
  showLoading,
  hideLoading,
  handleChange,
  clearFilters,
  changePage,
  clearAllJobsState,
} = allJobsSlice.actions

export default allJobsSlice.reducer
