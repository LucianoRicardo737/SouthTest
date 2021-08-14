import { initialUserData } from '../../db/initialData_db'
import { tagAccountData, tagUserData } from '../env/determinants'

// set by default initial data for user on localstorage
export const setInLocalTheUserData = () =>  localSet(tagUserData, initialUserData)

// functions for set and get data in localstorage
export const localSet = (name, data) => localStorage.setItem(name, JSON.stringify(data))
export const localGet = name => JSON.parse(localStorage.getItem(name))

// if in localstorage not exist data, seting default
// user
export function getInLocalTheUserData () {
  if(localGet(tagUserData)) return localGet(tagUserData)
  else return setInLocalTheUserData()
}
// accounts
export function getInLocalTheLocalAccounts () {
  if(!localGet(tagAccountData)) return []
  else return localGet(tagAccountData)
}