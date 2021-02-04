import React  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalSingleRowView= (props) => {
    const {
        isOpen,
        onClose,
        content,
        title,
        // buttonLabel,
        className
    } = props;
    if (!isOpen) {
        return null;
    }

    return (
        <div>
            <Modal isOpen={true} className={className}>
                <ModalHeader>{title}</ModalHeader>
                <ModalBody>
                    {content}
                </ModalBody>
                <ModalFooter>
                    {/*<Button color="primary" >Do Something</Button>{' '}*/}
                    <Button color="secondary" onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default ModalSingleRowView;
