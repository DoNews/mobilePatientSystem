import {get, post} from './http.base'

export function getPatientList(params) {
  return get('/api/apoint/mypatien/', params)
}

export function getPatientDetail(params) {
  return get('/api/apoint/patientsdetail/', params)
}

export function getProvinceList(params) {
  return get('/api/apoint/province/', params)
}

export function getHospitalList(params) {
  return get('/api/apoint/hospital/', params)
}

export function submitTreat(params) {
  return post('/api/apoint/thememo/', params)
}

export function submitAppiont(params) {
  return post('/api/apoint/ordersubmit/', params)
}

export function submitAuthInfo(params) {
  return post('/api/apoint/staff/', params)
}

export function submitSendCode(params) {
  return post('/api/apoint/scrfcode/', params)
}

export function checkTelAndName(params) {
  return get('/api/apoint/checkphone/', params)
}
export function getMoreInfo(params) {
  return get('/api/apoint/lookcheat/', params)
}
export function getMatchList(params) {
  return get('/api/apoint/patsearch/', params)
}
