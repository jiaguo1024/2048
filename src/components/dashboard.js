/**
 * Created by Jia on 2017/9/23.
 */
import React from 'react';
import Button from './button';

class Dashboard extends React.Component {

    render() {
        return (
            <div className="dashboard">
                <div className="left">
                    <div className="title">2048</div>
                </div>
                <div className="right">
                    <div className="score-board">
                        <div className="score-title">Score</div>
                        <div className="score">{this.props.score}</div>
                    </div>
                    <Button className="btn-restart" text="Restart" handleClick={this.props.restart}/>
                </div>
            </div>
        );
    }

}

export default Dashboard;