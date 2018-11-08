/**
 * Contact list service file
 *
 * These APIs works for Contact list
 *
 * @package    src/services
 * @author     HuangTuring <huang@turingai.net>
 * @copyright  2018 Turing Company
 * @license    Turing License
 * @version    2.0
 * @link       https://turing.ly/api/general/
 */
import axios from 'axios'
import { APIList } from '../constants'

export async function getCustomerList() {
  return axios.get(`${APIList.BASE_URL}${APIList.GET_CUSTOMER_LIST}`)
}

/**
 * Get contact list
 *
 * @author  HuangTuring <huang@turingai.net>
 * @param
 * @return  object
 */
export function getContactList(data) {
  const header = {
    'Content-Type': 'application/json'
  }

  return axios.get(`${APIList.BASE_URL}${APIList.GET_CONTACT_LIST}`, {params: data}, {headers: header})
}

/**
 * Get code analysis result
 *
 * @author  JinTuring <jin@turingai.net>
 * @param
 * @return  object
 */
export function getCodeAnalysisResult(data) {
  const header = {
    'Content-Type': 'application/json'
  }

  return axios.get(`${APIList.CODE_ANALYSIS_SERVICE_URL}`, {params: data}, {headers: header})
}