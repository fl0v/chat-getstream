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
                        <p className="text-center">Enter your name to join chat</p>
                        {error}
                        <input
                            type="text"
                            minLength='3'
                            name='username'
                            defaultValue={username}
                            placeholder='your name'
                            className="username"
                        />
                        <button className='primary' type='submit'>
                            Join
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

export default User;
