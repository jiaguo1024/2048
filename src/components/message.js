/**
 * Created by Jia on 2017/9/23.
 */
import React from 'react';

class Message extends React.Component {
    render() {
        let message;
        if (this.props.gameOver) {
            message = "Game Over";
        } else {
            message = "Swipe Or Press Arrow Keys To Play"
        }
        return (
            <div className="message">{message}</div>
        );
    }
}

export default Message;