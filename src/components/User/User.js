import React, { Component } from "react";
import ChatContext from "contexts/ChatContext";
import "./styles.scss";

class User extends Component {
    static contextType = ChatContext;

    handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const username = data.get('username');
        this.context.setUsername(username);
    };

    render() {
        const { error, username } = this.context;
        return (
            <div className='login-root'>
                <div className='login-card'>
                    <form onSubmit={this.handleSubmit}>
                        {error}
                        <input
                            minLength='3'
                            name='username'
                            value={username}
                            placeholder='Pick a username'
                        />
                        <button className='primary' type='submit'>
                            {loading ? <Spinner size='16px' spinnerWidth={2} spinnerColor='white' /> : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default User;
