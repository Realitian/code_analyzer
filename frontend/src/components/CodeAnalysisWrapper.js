/**
 * Code analysis wrapper component file
 *
 * @package    src/components/
 * @author     JinTuring <jin@turingai.net>
 * @copyright  2018 Turing Company
 * @license    Turing License
 * @version    2.0
 * @link       https://turing.ly/admin/code_analysis
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'

/**
 * Component style sheets
 */
const styles = theme => ({
  roots: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 5
  }
})

class CodeAnalysisWrapper extends Component {
  /**
   * Render function to view this component
   */
  render() {
    const { classes } = this.props

    return (
      <div className={classes.roots}>
        {this.props.children}
      </div>
    )
  }
}

CodeAnalysisWrapper.propTypes = {
  classes: PropTypes.object.isRequired
}
  
export default withStyles(styles)(CodeAnalysisWrapper)
