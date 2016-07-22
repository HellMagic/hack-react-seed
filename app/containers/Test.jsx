import React from 'react';
import Radium from 'radium';
import {Link} from 'react-router';
import {initParams} from '../lib/util';
import { Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/lib/Navbar';

class Test extends React.Component {
    constructor(props) {
      super(props);
    }

    render() {
        return (
            <div>
                <h1>Hello World</h1>
            </div>
        );
    }
}

export default Test;
