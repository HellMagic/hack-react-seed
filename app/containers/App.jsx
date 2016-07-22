import _ from 'lodash';
import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Radium from 'radium';

@Radium
class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }

}

export default App;

