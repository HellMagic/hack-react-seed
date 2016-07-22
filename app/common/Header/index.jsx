import React, {PropTypes} from 'react';
import style from './Header.css';
import {Link} from 'react-router';
import Radium from 'radium';


let dialogProps = {
    title: '我要吐槽',
    content: <textarea  style={{ width: 550, height: 200 }}></textarea>,
    okButton: true
}

@Radium
class DropdownMenu extends React.Component {

    render() {
        return (
            <ul id='header-dropdown' className={style['dropdown-menu']}>
                <li style={localStyle.listItem}>
                    <a href='javascript: void(0)' className={style['dropdown-link']} style={localStyle.listLink} onClick={this.props.onLogout}>
                        退出登录
                    </a>
                </li>
            </ul>
        )
    }
}


class HeaderComponent extends React.Component {
    //({user, actions}) =>
    constructor(props) {
        super(props);
        this.state = {
            showDropdown: false
        }
    }
    onClickAvatar() {
        this.setState({
            showDropdown: !this.state.showDropdown
        })
    }
    onLogout() {
        var Cookies = require('cookies-js');
        var options = (_.includes(window.location.hostname, 'yunxiao')) ? { domain: '.yunxiao.com'} : {};
        Cookies.expire('authorization', options);
        window.location = '/login';
    }
    componentDidMount() {
        $('body').click((event)=> {
            if($(event.target).parents('#header-dropdown').length === 0){
                this.setState({
                    showDropdown: false
                })
            }
        })
    }
    render() {
        var _this = this;
        return (
            <div className={style.header}>
                <div className={style.wrapper}>
                    <h1 className={style.title}>
                        <a className={style['title-a']} href='javascript:void(0)' title="好分数">好分数</a>
                    </h1>
                    <ul className={style.menu}>
                        <li className={style['menu-li']}>
                            <a href="/" className={style['menu-nav']} style={localStyle.headerLink} key={'headerLink-0'}>首页</a>
                        </li>
                    </ul>
                    <a key='addAnalysisBtn' href='/add/analysis' style={localStyle.addAnalysisBtn}><i className='icon-add-3'></i>自定义分析</a>

                    {/* ------------------------------右侧头像、名字--------------------------------------*/ }
                    <a href='javascript:;' onClick={this.onClickAvatar.bind(this)} style={localStyle.userInfo}>
                        <div className={style['user-avatar']}> </div>
                        <div className='dropdown' style={{marginLeft: 48}}>
                            {this.props.user.realName}
                            <span className='caret' style={{color: '#e1e1e1'}}></span>
                        </div>
                    </a>

                    <a key='versionSwitcher' href="http://fx.yunxiao.com"  style={_.assign({},localStyle.headerLink,{float: 'right', marginRight: 30, color: '#5a5a5a'})}><i className='icon-loop-alt'></i>返回旧版</a>
                    {/*<a href="javascript:void(0)"  onClick={this.props.actions.bind(_this, dialogProps) } style={{ float: 'right', textDecoration: 'none', color: '#5a5a5a', paddingLeft: 40, paddingTop: 30 }}>我要吐槽</a>*/}
                    { this.state.showDropdown ? <DropdownMenu onLogout={this.onLogout.bind(this)}/> : ''}
                </div>
            </div>
        )
    }
};

var localStyle = {
    listItem: {
        height: 40,
        lineHeight: '40px'
    },
    listLink: {
        ':hover': { textDecoration: 'none',backgroundColor: '#f5f5f5',color: '#999'},
        ':link': {textDecoration: 'none'}
    },
    headerLink: {
        ':hover': { textDecoration: 'none'},
        ':link': {textDecoration: 'none'}
    },
    userInfo: {
        float: 'right', position: 'relative', height: '100%', lineHeight: '66px',
        cursor: 'pointer',textDecoration:'none',color: '#333',
        ':hover': {color: '#59bde5', textDecoration: 'none'},
        ':link': {textDecoration: 'none'}
    },
    addAnalysisBtn: {
        display: 'inline-block', width: 120, height: 30, color: '#fff', backgroundColor: '#2ea8eb',lineHeight: '30px', borderRadius: 20, textAlign: 'center',
        ':hover': {textDecoration:'none'},
        ':link':  {textDecoration: 'none'}
    }
}
HeaderComponent.propTypes = {
    user: PropTypes.object.isRequired
};

export default Radium(HeaderComponent);

