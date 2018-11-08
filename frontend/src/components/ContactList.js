/**
 * Contact list component file
 *
 * @package    src/components
 * @author     HuangTuring <huang@turingai.net>
 * @copyright  2018 Turing Company
 * @license    Turing License
 * @version    2.0
 * @link       https://turing.ly/admin/contact_list
 */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import FirstPageIcon from '@material-ui/icons/FirstPage'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import LastPageIcon from '@material-ui/icons/LastPage'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'
import SearchIcon from '@material-ui/icons/Search'
import ExportCsvIcon from '@material-ui/icons/Save'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import { LabelConstant, ButtonConstant } from '../constants'
import Paper from '@material-ui/core/Paper'
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import FormLabel from '@material-ui/core/FormLabel'
import FormControlLabel from '@material-ui/core/FormControlLabel'
/**
 * Table pagination Component style sheets
 */
const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
})

/**
 * Table pagination acitons component class
 *
 * This class will be render view for table pagination
 *
 * @category  Component
 * @author    HuangTuring <huang@turingai.net>
 */
class TablePaginationActions extends React.Component {
  /**
   * Handle function for click first page button
   */
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0)
  }

  /**
   * Handle function for click back page button
   */
  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1)
  }

  /**
   * Handle function for click next page button
   */
  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1)
  }

  /**
   * Handle function for click last page button
   */
  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
    )
  }

  /**
   * Render function to view this component
   */
  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page">
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    )
  }
}

/**
 * Set prop types for table pagination actions
 */
TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
}

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions
)

/**
 * Component style sheets
 */
const styles = theme => ({
  toolbar: {
    width: '100%'
  },
  table: {
    minWidth: 500
  },

  tableCell: {
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingTop: 0,
    paddingBottom: 0
  },
  title: {
    flex: '0 0 auto'
  },
  spacer: {
    flex: '1 1 100%'
  },
  paper: {
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 12,
    paddingRight: theme.spacing.unit * 12,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  topbarTitle: {
    paddingTop: 0,
    paddingRight: 24,
    paddingBottom: 0,
    paddingLeft: 24
  }
})

class ContactList extends React.Component {

  constructor() {
    super()
    this.shouldUpdate = true
  }

  state = {
    search: {
      email: '',
      full_name: '',
      company_name: '',
      job_url: '',
      skype_id: '',
      phone_number: '',
      description: '',
      newProject: true,
      existingProject: true,
      neither: true,
      remoteOpenYes: true,
      remoteOpenNo: true,
      howSoonImmediately: true,
      howSoonLess2Weeks: true,
      howSoonLess4Weeks: true,
      howSoonMore4Weeks: true,
      teamMembers0: true,
      teamMembers3: true,
      teamMembers10: true,
      teamMembers30: true,
      teamMembers100: true,
      teamMembers300: true,
      teamMembers1000: true,
      teamMembers3000: true,
      companyStageSelfFund: true,
      companyStagePreFunding: true,
      companyStageSeedFunded: true,
      companyStageSeriesA: true,
      companyStageSeriesB: true,
      companyStageSeriesC: true,
      companyStageSeriesCOrLaterStagePrivateCompany: true,
      companyStageLargeEnterprise: true,
      fromDate: null,
      toDate: null
    }
  }

  /**
   * Handle function for change page
   */
  handleChangePage = (event, page) => {
    this.shouldUpdate = true
    this.props.onChangePage(event, page)
  }

  /**
   * Handle function for change rows per page
   */
  handleChangeRowsPerPage = event => {
    this.shouldUpdate = true
    this.props.onChangeRowsPerPage(event)
  }

  /**
   * Handle function to change query condition
   */
  handleChangeStringCondition = key => event => {
    this.shouldUpdate = false
    this.setState({
      search: {
        ...this.state.search,
        [key]: event.target.value
      }
    })
  }

  /**
   * Handle function to change query condition
   */
  handleChangeQueryCondition = key => event => {
    this.shouldUpdate = false
    this.setState({
      search: {
        ...this.state.search,
        [key]: event.target.checked
      }
    })
  }

  /**
   * Handle function to change date query condition
   */
  handleChangeDateCondition = key => event => {
    this.shouldUpdate = false
    let selectedValue = new Date(event.target.value)
    let value = new Date()
    if (key === 'toDate') {
      value = new Date(
        selectedValue.getFullYear(),
        selectedValue.getMonth(),
        selectedValue.getDate() + 1,
        selectedValue.getHours(),
        selectedValue.getMinutes(),
        selectedValue.getSeconds())
    } else {
      value = selectedValue
    }

    this.setState({
      search: {
        ...this.state.search,
        [key]: value
      }
    })
  }

  /**
   * Render function to view this component
   */
  render() {
    const { classes, headers, rows, count, rowsPerPage, rowsPerPageOptions, page } = this.props

    return (
      <div>
        <Toolbar className={classes.toolbar}>
          <div className={classes.title}>
            <Typography variant="h5">
              Customer list for web version
            </Typography>
          </div>
          <div className={classes.spacer} />
          <div>
            <Tooltip title={ButtonConstant.EXPORT_CSV}>
              <IconButton onClick={() => this.props.onClick(ButtonConstant.EXPORT_CSV)}>
                <ExportCsvIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div>
            <Tooltip title={ButtonConstant.ADVANCED_SEARCH}>
              <IconButton onClick={() => this.props.onClick(ButtonConstant.ADVANCED_SEARCH)}>
                <SearchIcon />
              </IconButton>
            </Tooltip>
          </div>
        </Toolbar>
        <div>
          <ExpansionPanel expanded={this.props.openAdvancedSearch}>
            <ExpansionPanelDetails
              className={classes.topbarTitle}>
              <Typography variant="caption">
                <h2>Search</h2>
              </Typography>
            </ExpansionPanelDetails>
            <Divider />
            <Paper className={classes.paper}>
              <Grid container alignItems="flex-end" spacing={24}>
                <Grid item xs={2}>
                  <FormLabel component="legend">Contact Info</FormLabel>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    autoComplete="email"
                    onChange={this.handleChangeStringCondition('email')}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="full_name"
                    name="full_name"
                    label="Full Name"
                    fullWidth
                    autoComplete="full_name"
                    onChange={this.handleChangeStringCondition('full_name')}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="companyName"
                    name="company_name"
                    label="Company Name"
                    fullWidth
                    autoComplete="company_name"
                    onChange={this.handleChangeStringCondition('company_name')}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="skype_id"
                    name="skype_id"
                    label="Skype Id"
                    fullWidth
                    autoComplete="skype_id"
                    onChange={this.handleChangeStringCondition('skype_id')}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="phone_number"
                    name="phone_number"
                    label="Phone Number"
                    fullWidth
                    autoComplete="phone_number"
                    onChange={this.handleChangeStringCondition('phone_number')}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="flex-end" spacing={24}>
                <Grid item xs={2}>
                  <FormLabel component="legend">Job</FormLabel>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    id="job_url"
                    name="job_url"
                    label="Job Url"
                    fullWidth
                    autoComplete="job_url"
                    onChange={this.handleChangeStringCondition('job_url')}
                  />
                </Grid>
                <Grid item xs={7}>
                  <TextField
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                    autoComplete="description"
                    onChange={this.handleChangeStringCondition('description')}
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={24}>
                <Grid item xs={12}>
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={24}>
                <Grid item xs={2}>
                  <FormLabel component="legend">For Which Project Type</FormLabel>
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.newProject}
                        onChange={this.handleChangeQueryCondition('newProject')}
                        color="primary"
                        name="newProject"
                        value="newProject"
                      />
                    }
                    label="New Project"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.existingProject}
                        onChange={this.handleChangeQueryCondition('existingProject')}
                        color="primary"
                        name="existingProject"
                        value="existingProject"
                      />
                    }
                    label="Existing Project"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.neither}
                        onChange={this.handleChangeQueryCondition('neither')}
                        color="primary"
                        name="neither"
                        value="neither"
                      />
                    }
                    label="Neither"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={24}>
                <Grid item xs={2}>
                  <FormLabel component="legend">Accept Remote</FormLabel>
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.remoteOpenYes}
                        onChange={this.handleChangeQueryCondition('remoteOpenYes')}
                        color="primary"
                        name="remoteOpenYes"
                        value="remoteOpenYes"
                      />
                    }
                    label="Yes"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.remoteOpenNo}
                        onChange={this.handleChangeQueryCondition('remoteOpenNo')}
                        color="primary"
                        name="remoteOpenNo"
                        value="remoteOpenNo"
                      />
                    }
                    label="No"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={24}>
                <Grid item xs={2}>
                  <FormLabel component="legend">How Soon</FormLabel>
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.howSoonImmediately}
                        onChange={this.handleChangeQueryCondition('howSoonImmediately')}
                        color="primary"
                        name="howSoonImmediately"
                        value="howSoonImmediately"
                      />
                    }
                    label="Immediately"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.howSoonLess2Weeks}
                        onChange={this.handleChangeQueryCondition('howSoonLess2Weeks')}
                        color="primary"
                        name="howSoonLess2Weeks"
                        value="howSoonLess2Weeks"
                      />
                    }
                    label="Less 2 Weeks"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.howSoonLess4Weeks}
                        onChange={this.handleChangeQueryCondition('howSoonLess4Weeks')}
                        color="primary"
                        name="howSoonLess4Weeks"
                        value="howSoonLess4Weeks"
                      />
                    }
                    label="Less 4 Weeks"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.howSoonMore4Weeks}
                        onChange={this.handleChangeQueryCondition('howSoonMore4Weeks')}
                        color="primary"
                        name="howSoonMore4Weeks"
                        value="howSoonMore4Weeks"
                      />
                    }
                    label="More 4 Weeks"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={24}>
                <Grid item xs={2}>
                  <FormLabel component="legend">Company Size</FormLabel>
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.teamMembers0}
                        onChange={this.handleChangeQueryCondition('teamMembers0')}
                        color="primary"
                        name="teamMembers0"
                        value="teamMembers0"
                      />
                    }
                    label="0"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleChangeQueryCondition('teamMembers3')}
                        checked={this.state.search.teamMembers3}
                        color="primary"
                        name="teamMembers3"
                        value="teamMembers3"
                      />
                    }
                    label="1 - 3"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleChangeQueryCondition('teamMembers10')}
                        checked={this.state.search.teamMembers10}
                        color="primary"
                        name="teamMembers10"
                        value="teamMembers10"
                      />
                    }
                    label="4 - 10"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleChangeQueryCondition('teamMembers30')}
                        checked={this.state.search.teamMembers30}
                        color="primary"
                        name="teamMembers30"
                        value="teamMembers30"
                      />
                    }
                    label="11 - 30"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={this.handleChangeQueryCondition('teamMembers100')}
                        checked={this.state.search.teamMembers100}
                        color="primary"
                        name="teamMembers100"
                        value="teamMembers100"
                      />
                    }
                    label="31 - 100"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={24}>
                <Grid item xs={2}></Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.teamMembers300}
                        onChange={this.handleChangeQueryCondition('teamMembers300')}
                        color="primary"
                        name="teamMembers300"
                        value="teamMembers300"
                      />
                    }
                    label="101 - 300"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.teamMembers1000}
                        onChange={this.handleChangeQueryCondition('teamMembers1000')}
                        color="primary"
                        name="teamMembers1000"
                        value="teamMembers1000"
                      />
                    }
                    label="301 - 1000"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.teamMembers3000}
                        onChange={this.handleChangeQueryCondition('teamMembers3000')}
                        color="primary"
                        name="teamMembers3000"
                        value="teamMembers3000"
                      />
                    }
                    label="1001 - "
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={24}>
                <Grid item xs={2}>
                  <FormLabel component="legend">Company Stage</FormLabel>
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.companyStageSelfFund}
                        onChange={this.handleChangeQueryCondition('companyStageSelfFund')}
                        color="primary"
                        name="companyStageSelfFund"
                        value="companyStageSelfFund"
                      />
                    }
                    label="Self-funded"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.companyStagePreFunding}
                        onChange={this.handleChangeQueryCondition('companyStagePreFunding')}
                        color="primary"
                        name="companyStagePreFunding"
                        value="companyStagePreFunding"
                      />
                    }
                    label="Pre-seed funding"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.companyStageSeedFunded}
                        onChange={this.handleChangeQueryCondition('companyStageSeedFunded')}
                        color="primary"
                        name="companyStageSeedFunded"
                        value="companyStageSeedFunded"
                      />
                    }
                    label="Seed funded"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.companyStageSeriesA}
                        onChange={this.handleChangeQueryCondition('companyStageSeriesA')}
                        color="primary"
                        name="companyStageSeriesA"
                        value="companyStageSeriesA"
                      />
                    }
                    label="Series A"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.companyStageSeriesB}
                        onChange={this.handleChangeQueryCondition('companyStageSeriesB')}
                        color="primary"
                        name="companyStageSeriesB"
                        value="companyStageSeriesB"
                      />
                    }
                    label="Series B"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="center" spacing={24}>
                <Grid item xs={2} container justify="flex-start"></Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.companyStageSeriesC}
                        onChange={this.handleChangeQueryCondition('companyStageSeriesC')}
                        color="primary"
                        name="companyStageSeriesC"
                        value="companyStageSeriesC"
                      />
                    }
                    label="Series C"
                  />
                </Grid>
                <Grid item xs={4} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.companyStageSeriesCOrLaterStagePrivateCompany}
                        onChange={this.handleChangeQueryCondition('companyStageSeriesCOrLaterStagePrivateCompany')}
                        color="primary"
                        name="companyStageSeriesCOrLaterStagePrivateCompany"
                        value="companyStageSeriesCOrLaterStagePrivateCompany"
                      />
                    }
                    label="Series C or later stage private company"
                  />
                </Grid>
                <Grid item xs={2} container justify="flex-start">
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={this.state.search.companyStageLargeEnterprise}
                        onChange={this.handleChangeQueryCondition('companyStageLargeEnterprise')}
                        color="primary"
                        name="companyStageLargeEnterprise"
                        value="companyStageLargeEnterprise"
                      />
                    }
                    label="Large Enterprise"
                  />
                </Grid>
              </Grid>
              <Grid container alignItems="flex-end" spacing={24}>
                <Grid item xs={2}>
                  <FormLabel component="legend">Registered Date Range</FormLabel>
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="from"
                    onChange={this.handleChangeDateCondition('fromDate')}
                    name="from"
                    type="date"
                    label="From"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    id="to"
                    onChange={this.handleChangeDateCondition('toDate')}
                    name="to"
                    type="date"
                    label="To"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

            <ExpansionPanelActions>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => this.props.onClick(ButtonConstant.ADVANCED_SEARCH)}
                className={classes.button}>
                Cancel
              </Button>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => this.props.onClick(ButtonConstant.SEARCH_CLICK, this.state.search)}
                className={classes.button}>
                Search
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        </div>
        <Paper className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {headers.map((name, index) => {
                  return (
                    <TableCell key={index} className={classes.tableCell}>
                      {name}
                    </TableCell>
                  )
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row" className={classes.tableCell}>
                      {new Date(row.created_time).toLocaleDateString()}
                    </TableCell>
                    <TableCell className={classes.tableCell}>{row.email}</TableCell>
                    <TableCell className={classes.tableCell}>{row.full_name}</TableCell>
                    <TableCell className={classes.tableCell}>{row.company_name}</TableCell>
                    <TableCell className={classes.tableCell}>{LabelConstant.project[row.project]}</TableCell>
                    <TableCell className={classes.tableCell}>{LabelConstant.remote[row.remote_open]}</TableCell>
                    <TableCell className={classes.tableCell}>{LabelConstant.how_soon[row.how_soon]}</TableCell>
                    <TableCell className={classes.tableCell}>{row.skype_id}</TableCell>
                    <TableCell className={classes.tableCell}>{row.phone_number}</TableCell>
                    <TableCell className={classes.tableCell}>{LabelConstant.numberToStr(row.dev_type)}</TableCell>
                    <TableCell className={classes.tableCell}>{row.skills}</TableCell>
                    <TableCell className={classes.tableCell}>{row.description}</TableCell>
                    <TableCell className={classes.tableCell}>{row.job_url}</TableCell>
                    <TableCell className={classes.tableCell}>{LabelConstant.team_members[row.team_members]}</TableCell>
                    <TableCell className={classes.tableCell}>{LabelConstant.company_stage[row.company_stage]}</TableCell>
                    <TableCell className={classes.tableCell}>{new Date(row.updated_time).toLocaleDateString()}</TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </Paper>
        <div>
          <TablePagination
            component="div"
            count={count}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={rowsPerPageOptions}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActionsWrapped}
          />
        </div>
      </div>
    )
  }
}

ContactList.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(ContactList)
