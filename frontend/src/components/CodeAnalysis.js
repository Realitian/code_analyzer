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
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Tooltip from '@material-ui/core/Tooltip';
import TableSortLabel from '@material-ui/core/TableSortLabel';

/**
 * Component style sheets
 */
const styles = theme => ({
  toolbar: {
    width: '100%'
  },
  tableWrapper: {
    paddingLeft: theme.spacing.unit*4,
    paddingRight: theme.spacing.unit*4,
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    marginBottom: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 4,
    paddingBottom: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    paddingRight: theme.spacing.unit * 4,
  },
  textfield: {
    width: '80vw'
  },
  // table: {
  //   minWidth: 500,
  //   marginLeft: theme.spacing.unit,
  //   marginRight: theme.spacing.unit,
  // },

  // tableCell: {
  //   paddingLeft: theme.spacing.unit,
  //   paddingRight: theme.spacing.unit,
  //   paddingTop: theme.spacing.unit,
  //   paddingBottom: theme.spacing.unit
  // },
  title: {
    flex: '0 0 auto',
    marginTop: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 4,
  },
  spacer: {
    flex: '1 1 100%'
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

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { order, orderBy, rows } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                numeric={row.numeric}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rows: PropTypes.number.isRequired,
};

class CodeAnalysis extends React.Component {

  constructor() {
    super()
    this.shouldUpdate = true
  }

  state = {
    repo_url: '',
    order: 'asc',
    orderBy: 'calories',
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }

    this.setState({ order, orderBy });
  };

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
    const { classes, tables, loading } = this.props
    const { order, orderBy } = this.state

    return (
      <div>
        <Paper className={classes.paper}>
        <Toolbar className={classes.toolbar}>
        <div>
            <TextField className={classes.textfield}
                id="repo_url"
                name="repo_url"
                label="Repo Url"
                autoComplete="repo_url"
                onChange={this.handleChangeStringCondition()}
              />
          </div>

          <div className={classes.spacer} />
          
          <div>
            <Fade 
              in={loading}
              style={{ transitionDelay: '800ms',}}
              unmountOnExit>
              <CircularProgress />
            </Fade>
          </div>

          <div className={classes.spacer} />
          
          <div>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={() => this.props.onClick(this.state.repo_url)}
              className={classes.button}>
              Analyze
            </Button>
          </div>
          
        </Toolbar>
        </Paper>

        <div className={classes.spacer} />

        {tables.map((table, index) => {
          return (
            <Paper className={classes.tableWrapper}>
              <Typography variant="h5" className={classes.title}>
                {table.title}
              </Typography>
              <Table className={classes.table}>
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={this.handleRequestSort}
                  rows={table.headers}
                />
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
                  {stableSort(table.rows, getSorting(order, orderBy))
                    .map(row => {
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
