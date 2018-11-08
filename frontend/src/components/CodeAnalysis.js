/**
 * Code analysis component file
 *
 * @package    src/components
 * @author     JinTuring <jin@turingai.net>
 * @copyright  2018 Turing Company
 * @license    Turing License
 * @version    2.0
 * @link       https://turing.ly/admin/code_analysis
 */
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import { ButtonConstant } from '../constants'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
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
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
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

class CodeAnalysis extends React.Component {

  constructor() {
    super()
    this.shouldUpdate = true
  }

  state = {
    repo_url: ''
  }

  /**
   * Handle function to change query condition
   */
  handleChangeStringCondition = () => event => {
    this.shouldUpdate = false
    this.setState({
      repo_url: event.target.value
    })
  }

  /**
   * Render function to view this component
   */
  render() {
    const { classes, tables } = this.props

    return (
      <div>
        <Paper className={classes.paper}>
          <Grid container alignItems="flex-end" spacing={24}>
            <Grid item xs={10}>
              <TextField
                id="repo_url"
                name="repo_url"
                label="Repo Url"
                fullWidth
                autoComplete="repo_url"
                onChange={this.handleChangeStringCondition()}
              />
            </Grid>
            <Grid item xs={2}>
              <Button
                size="large"
                variant="contained"
                color="primary"
                onClick={() => this.props.onClick(this.state.repo_url)}
                className={classes.button}>
                Analyze
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {tables.map((table, index) => {
          return (
            <Paper className={classes.tableWrapper}>
              <div className={classes.title}>
                <Typography variant="h5">
                  {table.title}
                </Typography>
              </div>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    {table.headers.map((name, index) => {
                      return (
                        <TableCell key={index} className={classes.tableCell}>
                          {name}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {table.rows.map(row => {
                    return (
                      <TableRow key={row.id}>
                        {row.map(cell => {
                          return (
                            <TableCell className={classes.tableCell}>{cell}</TableCell>
                          )
                        })
                        }
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Paper>
          )
        })}        
      </div>
    )
  }
}

CodeAnalysis.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(CodeAnalysis)
