import { useContext } from 'react'
import { StoreContext } from './storeProvider'
import { RootStore } from '../store/root'

export const useStore = (): RootStore => useContext(StoreContext)
export const StoreProvider = StoreContext.Provider