import {get, post} from './http.base'

export function getSolutionDetail(params) {
  return get('/api/smfly/solveplan/', params)
}

export function getProductIndex(params) {
  return get('/api/smfly/productcenter/', params)
}

export function getProductList(params) {
  return get('/api/smfly/productline/', params)
}

export function getProductDetail(params) {
  return get('/api/smfly/detailspage/', params)
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
