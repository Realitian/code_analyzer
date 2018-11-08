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