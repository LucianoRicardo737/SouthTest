import { initialAccountsData, initialUserData } from '../../db/initialData_db'
import { tagAccountData, tagUserData } from '../env/determinants'

export const setInLocalTheUserData = () =>  localSet(tagUserData, initialUserData)
export const setInLocalTheLocalAccounts = () => localSet(tagAccountData, initialAccountsData)

export const localSet = (name, data) => localStorage.setItem(name, JSON.stringify(data))
export const localGet = name => JSON.parse(localStorage.getItem(name))

export function getInLocalTheUserData () {
  if(localGet(tagUserData)===null){
    return setInLocalTheUserData()
  } else {
    return localGet(tagUserData)
  }
}

export function getInLocalTheLocalAccounts () {
  if(localGet(tagAccountData)===null){
    return []
  } else {
    return localGet(tagAccountData)
  }
}