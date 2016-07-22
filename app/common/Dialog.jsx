
import React from 'react';
//import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Modal } from 'react-bootstrap';
import {alterCommentDialogStatus} from '../reducers/global-app/actions';
import { bindActionCreators } from 'redux';
import styles from './common.css';
//直接使用<Modal.Header />语法则会有“Property object of JSXMemberExpression expected node to be of。。。”的错误，因为
//babel-transform对此编译支持的原因，详见：https://phabricator.babeljs.io/T6662，所以一律写成这种语法
var {Header, Title, Body, Footer} = Modal;

let localStyle= {
    btn: {lineHeight: '50px', width: 150, height: 50,  display: 'inline-block',textAlign: 'center',textDecoration: 'none', backgroundColor:'#f2f2f2',margin: '0 30px'},
}
class Dialog extends React.Component {
    constructor(props) {
        super(props);
    }
    clickCancel() {
        this.props.onHide();
    }
    render() {
        var dialog = this.props.dialog;
        var _this = this;
        return (
            <Modal show={ dialog.show } ref="dialog"  onHide={this.props.onHide.bind(this,{})}>
                <Header closeButton style={{textAlign: 'center'}}>
                    {dialog.title && <Title>{dialog.title}</Title>}
                </Header>
                <Body className="apply-content">
                    {dialog.content}
                </Body>

                {
                    dialog.okButton &&
                    <Footer className="text-center" style={{textAlign: 'center',borderTop: 0}}>
                        <a href="javascript:void(0)" style={localStyle.btn} onClick={this.okClickHandler}>
                            {dialog.okLabel}
                        </a>
                        <a href="javascript:void(0)" style={localStyle.btn} onClick={this.clickCancel.bind(_this)}>
                            取消
                        </a>
                     </Footer>
                }

            </Modal>
        )
    }
}

function mapStateToProps(state) {
    return {
        dialog: state.app.dialog
    }
}

function mapDispatchToProps(dispatch) {
    return{
         onHide: bindActionCreators(alterCommentDialogStatus, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dialog);
