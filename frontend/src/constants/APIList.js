/**
 * API List
 *
 * @package   src/constants
 * @author    HuangTuring <huang@turingai.net>
 * @copyright 2018 Turing Company
 * @license   Turing License
 * @version   2.0
 * @link      https://turing.ly
 */
const ENV = 'production'
const DEV_BASE_URL = 'http://localhost:3002/api/'
const LIVE_BASE_URL = 'https://customer.turing.website/api/'

const APIList = {
  /**
   * Base url of api
   */
  BASE_URL: ENV === 'developement' ? DEV_BASE_URL : LIVE_BASE_URL,

  /**
   * API to get customer list
   */
  GET_CUSTOMER_LIST: 'customers/list',

  /**
   * API to get contact list
   */

  GET_CONTACT_LIST: 'customers/contact-list',
  /**
   * API to get skills
   */
  GET_SKILL_LIST: 'skills/list',
  /**
   * API to get code analysis result
   */
  CODE_ANALYSIS_SERVICE_URL: 'http://localhost:8000/api/code_analysis'
}

export default APIList