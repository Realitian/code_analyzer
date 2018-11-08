/**
 * Code analysis container file
 *
 * @package    src/containers
 * @author     JinTuring <jin@turingai.net>
 * @copyright  2018 Turing Company
 * @license    Turing License
 * @version    2.0
 * @link       https://turing.ly/admin/code_analysis
 */
import React, { Component } from 'react'
import { CodeAnalysisWrapper, CodeAnalysis } from '../components'
import * as customerService from '../services/Customers'

/**
 * Code analysis container class
 *
 * This class will be contains code analysis.
 *
 * @category  Container
 * @author    JinTuring <jin@turingai.net>
 */
class CodeAnalysisContainer extends Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props)

    this.state = {
      tables: [],
      loading: false
    }
  }

  /**
   * Handle function for clicking buttons
   */
  handleButtonClick = (repo_url) => {
    this.setState({
      loading: true
    })

    let param = {repo_url: repo_url}
    customerService.getCodeAnalysisResult(param).then(res => {
      this.setState({
        loading: false
      })

      console.log(res)

      if (res.status === 200) {
        if ( res.data.ok ) {
          this.setState({
            tables: res.data.data
          })
        } else {
          console.log(res.data.msg)
        }        
      } else {
        // output error message
        console.log('Get code analysis error')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Render function to view this component
   */
  render() {
    const {tables, loading} = this.state
    return (
      <div>
        <CodeAnalysisWrapper>
          <CodeAnalysis 
            tables={tables}
            loading={loading}
            onClick={this.handleButtonClick}
          />
        </CodeAnalysisWrapper>
      </div>
    )
  }
}

export default CodeAnalysisContainer
