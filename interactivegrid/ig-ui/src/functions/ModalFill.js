import React  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalFill extends Modal {
    updateFillStr = (event) => {
        this.setState({fillStr : event.target.value });
    };
    onExecute = e => {
        this.props.onExecute && this.props.onExecute(this.state.fillStr);
    };
    render() {
        if (!this.props.isOpen) {
            return null;
        }
        return (
            <div>
                <Modal isOpen={true} className={this.props.className}>
                    <ModalHeader>{this.props.title}</ModalHeader>
                    <ModalBody>
                        <input id="nodeDialogPromptInputId" onChange={(event) => this.updateFillStr(event)} type="text" maxLength="4000"
                               className="node-item-text"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.props.onClose}>Cancel</Button>
                        <Button color="primary" onClick={this.onExecute}>Ok</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}


