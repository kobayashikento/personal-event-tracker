import React from 'react';
import { render } from 'react-dom';

class DisplayServer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isRunning: false};
    }

    render(){
    const isRunning = this.state.isRunning;
        return( 
            <div className="display-server">
                <header className="display-server-header">
                    <p>
                        <ServerStatus />
                    </p>
                </header>
            </div>
        );
    }
}

function OfflineStatus(props){
    return <h1>Server is currently offline</h1>
}

function OnlineStatus(props){
    return (
        <h1>Server is currently online</h1>
    );
}

function ServerStatus(props){
    const isRunning = props.isRunning;
    if (isRunning){
        return <OnlineStatus />;
    } 
    return <OfflineStatus />;
}

export default DisplayServer;