import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUserInfo} from "../reducers/getAsyncData"

class UserInfo extends Component {
    constructor(props){
        super(props)
        console.log(this.props)
    }
    render() {
        const {async_info, isLoading, error_msg} = this.props.UserInfo;
        console.log(this.props.UserInfo)
        return (
            <div>
                {
                    isLoading ? '请求信息中......' :
                        (
                            error_msg ? error_msg :
                                <div>
                                    <p>用户信息：</p>
                                    <p>用户名：{async_info.name}</p>
                                    <p>介绍：{async_info.intro}</p>
                                </div>
                        )
                }
                <div>safe</div>
                <button onClick={() => this.props.getUserInfo()}>请求用户信息</button>
            </div>
        )
    }
}

export default connect((state) => ({UserInfo: state.asyncInfo}), {getUserInfo})(UserInfo);
