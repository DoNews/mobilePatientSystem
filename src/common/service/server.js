import {get, post} from './http.base'

export function getPatientList(params) {
  return get('/api/apoint/mypatien/', params)
}

export function getPatientDetail(params) {
  return get('/api/apoint/patientsdetail/', params)
}

export function getSmfDetail(params) {
  return get('/api/smfly/shier/', params)
}

export function getHistoryMsgList(params) {
  return get('/api/smfly/message/', params)
}

export function getQuestionnaireList(params) {
  return get('/api/smfly/surver/', params)
}

export function getQuestionnaireDetail(params) {
  return get('/api/smfly/details/', params)
}

export function submitQuestionnaire(params) {
  return post('/api/smfly/questionsubmit/', params)
}
