import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'
import NoMatch from './routes/NoMatch.js'
import withRoot from './withRoot'
import ContactListContainer from './routes/ContactListContainer'
import CodeAnalysisContainer from './routes/CodeAnalysisContainer'

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
})

class App extends Component {
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    })
  };

  handleClick = () => {
    this.setState({
      open: true,
    })
  };

  render() {
    // const { classes } = this.props;
    // const { open } = this.state;

    return (
      <Router>
        <Switch>
          <Route exact path = "/" component = {ContactListContainer} />
          <Route exact path = "/code_analysis" component = {CodeAnalysisContainer} />
          <Route component = {NoMatch}/>
        </Switch>
      </Router>
    )
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withRoot(withStyles(styles)(App))
