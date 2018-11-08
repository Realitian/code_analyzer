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
import { ButtonConstant, CodeConstant, LabelConstant } from '../constants'
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
      tables: [
        {
          title: 'Overview',
          headers: [
            'Language',
            'Size(KB)',
            'Line Counts',
          ],
          rows: [
            ['C', 123, 63],
            ['C++', 235, 642],
            ['PHP', 634, 12512]
          ]
        },
        {
          title: 'Details',
          headers: [
            'Path',
            'Language',
            'Size(KB)',
            'Line Counts',
          ],
          rows: [
            ['aaa', 'C', 12623463, 6346],
            ['bbb', 'C++', 1566, 634],
            ['gab', 'PHP', 623, 63463]
          ]
        }
      ]
    }
  }

  /**
   * Handle function for clicking buttons
   */
  handleButtonClick = (repo_url) => {
    customerService.getCodeAnalysisResult(repo_url).then(res => {
      if (res.data.code === CodeConstant.OK) {
        this.setState({
          tables: res.data.data          
        })
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
    const {tables} = this.state
    return (
      <div>
        <CodeAnalysisWrapper>
          <CodeAnalysis 
            tables={tables}
            onClick={this.handleButtonClick}
          />
        </CodeAnalysisWrapper>
      </div>
    )
  }
}

export default CodeAnalysisContainer
