/**
 * Contact list container file
 *
 * @package    src/containers
 * @author     HuangTuring <huang@turingai.net>
 * @copyright  2018 Turing Company
 * @license    Turing License
 * @version    2.0
 * @link       https://turing.ly/admin/contact_list
 */
import React, { Component } from 'react'
import { ContactListWrapper, ContactList } from '../components'
import { ButtonConstant, CodeConstant, LabelConstant } from '../constants'
import * as customerService from '../services/Customers'

/**
 * Contact list container class
 *
 * This class will be contains contact list and search query.
 *
 * @category  Container
 * @author    HuangTuring <huang@turingai.net>
 */
class ContactListContainer extends Component {
  /**
   * Default constructor
   */
  constructor(props) {
    super(props)

    this.state = {
      headers: [
        'Create Date',
        'Email',
        'Full Name',
        'Company Name',
        'Project',
        'Remote Developer',
        'How soon',
        'Skype',
        'Phone number',
        'Developer Type',
        'Skills',
        'Description',
        'Job URL',
        'Team Members',
        'Company stage',
        'Update Date'
      ],
      rows: [
      ],
      count: 0,
      page: 0,
      rowsPerPage: 100,
      rowsPerPageOptions: [ 100, 200, 500, 1000 ],
      openAdvancedSearch: false,
      condition: ''
    }
  }

  /**
   * Life cyle API that is invoked immediately after a component is mounted
   */    
  componentDidMount() {
    this.fetchContactList()
  }

  /**
   * Handle function for clicking buttons
   */
  handleButtonClick = (type, status) => {
    if (type === ButtonConstant.EXPORT_CSV) {
      this.exportCSV()
      this.setState({
        openAdvancedSearch: false
      })
    } else if (type === ButtonConstant.ADVANCED_SEARCH) {
      this.setState({
        openAdvancedSearch: !this.state.openAdvancedSearch
      })
    } else if (type === ButtonConstant.SEARCH_CLICK) {
      this.setState({
        ...this.state,
        condition: status,
        openAdvancedSearch: !this.state.openAdvancedSearch
      })

      const { page, rowsPerPage } = this.state
      const data = {
        page: page,
        rowsPerPage: rowsPerPage,
        condition: status
      }

      customerService.getContactList(data).then(res => {
        if (res.data.code === CodeConstant.OK) {
          this.setState({
            count: res.data.data.count,
            rows: res.data.data.rows
          })
        } else {
          // output error message
          console.log('Get contact list error')
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }

  /**
   * Handle function for change page
   */
  handleChangePage = (event, page) => {
    const { rowsPerPage } = this.state
    const data = {
      page: page,
      rowsPerPage: rowsPerPage,
      condition: this.state.condition
    }

    customerService.getContactList(data).then(res => {
      if (res.data.code === CodeConstant.OK) {
        this.setState({
          page: page,
          count: res.data.data.count,
          rows: res.data.data.rows
        })
      } else {
        // output error message
        console.log('change page error')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * Handle function for change rows per page
   */
  handleChangeRowsPerPage = (event) => {
    const data = {
      page: 0,
      rowsPerPage: event.target.value,
      condition: this.state.condition
    }

    customerService.getContactList(data).then(res => {
      if (res.data.code === CodeConstant.OK) {
        this.setState({
          count: res.data.data.count,
          rows: res.data.data.rows,
          page: 0,
          rowsPerPage: event.target.value
        })
      } else {
        // output error message
        console.log('change rows per page error')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * The function that fetch contact list
   */
  fetchContactList() {
    const { page, rowsPerPage, condition } = this.state
    const data = {
      page: page,
      rowsPerPage: rowsPerPage,
      condition: condition
    }

    customerService.getContactList(data).then(res => {
      if (res.data.code === CodeConstant.OK) {
        console.log(res.data)
        this.setState({
          count: res.data.data.count,
          rows: res.data.data.rows
        })
      } else {
        // output error message
        console.log('Get contact list error')
      }
    }).catch(error => {
      console.log(error)
    })
  }

  /**
   * The function that exports contact list data with CSV format file
   */
  exportCSV = async () => {
    // Get contact list
    const param = {
      page: -1,
      rowsPerPage: -1,
      condition: this.state.condition
    }

    const res = await customerService.getContactList(param)
    console.log(res.data.code)
    console.log(res)
    let csvData = ''
    let header = ''
    let list = ''
    let bHeader = false

    if (res.data.code === CodeConstant.OK) {
      res.data.data.rows.forEach(function(item) {
        for (let key in item) {
          console.log(key)
          if (!bHeader && header !== '') {
            header += ','
          }

          if (list !== '') {
            list += ','
          }

          if (!bHeader) {
            header += key
          }

          let value = ''
          let data = item[key]

          if (key === 'how_soon') {
            value = LabelConstant.how_soon[data] || ''
          } else if (key === 'remote_open') {
            value = LabelConstant.remote[data] || ''
          } else if (key === 'project') {
            value = LabelConstant.project[data] || ''
          } else if (key === 'team_members') {
            value = LabelConstant.team_members[data] || ''
          } else if (key === 'company_stage') {
            value = LabelConstant.company_stage[data] || ''
          } else if (key === 'created_time' || key === 'updated_time') {
            let date = new Date(data)
            let month = '' + (date .getMonth() + 1)
            let day = '' + date .getDate()
            let year = date .getFullYear()
            if (month.length < 2) month = '0' + month
            if (day.length < 2) day = '0' + day
            value = [year, month, day].join('-')
          } else {
            value = item[key] || ''
          }

          value = new String(value)
          list += '"' + value.replace(/"/g,'""') + '"'
        }

        if (!bHeader) {
          csvData = header + '\n'
          bHeader = true
        }

        csvData += list + '\n'
        list = ''
      })
    } else {
      csvData = 'export csv error'
    }

    let blob = new Blob([ csvData ], { type: 'application/csv;charset=utf-8;' })
    let fileName = 'contact_list.csv'

    if (window.navigator.msSaveBlob) {
      // For internet explorer
      navigator.msSaveBlob(blob, fileName)
    } else {
      // For other browsers
      let link = document.createElement('a')
      let csvUrl = URL.createObjectURL(blob)

      link.href = csvUrl
      link.style = 'visibility:hidden'
      link.target = '_blank'
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  /**
   * Render function to view this component
   */
  render() {
    const {headers, rows, count, page, rowsPerPage, rowsPerPageOptions, openAdvancedSearch} = this.state
    return (
      <div>
        <ContactListWrapper>
          <ContactList 
            headers={headers}
            rows={rows}
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            openAdvancedSearch={openAdvancedSearch}
            onClick={this.handleButtonClick}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </ContactListWrapper>
      </div>
    )
  }
}

export default ContactListContainer
