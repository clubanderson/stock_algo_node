import React, {Component} from "react";
import {Dropdown} from 'react-bootstrap';


export default class MenuBar extends Component {

    render() {
        return (
            <div className={this.props.className}>
                <div className={"title-col-1"}>
                    <Dropdown>
                        <Dropdown.Toggle variant="hamburger-menu" id="dropdown-hamburger-menu">
                            <i className="fas fa-bars"></i>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="#/dashboard">Dashboard</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <div className={"title"}>Clubanderson Social Stock Analyzer</div>
                </div>
                <div className={"title-col-2"}>
                    <Dropdown>
                        <Dropdown.Toggle variant="permident" id="dropdown-basic-button">
                            <i className="fas fa-user-shield"></i><div className={'username'}>{this.props.username}</div>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.props.onClose}>logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <br style={{clear:"both"}}/>
            </div>
    );
    }
}



