import React, {useEffect}  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const ModalSecurity = (props) => {
    const { isLoading,
        className,
        onExecute,
    } = props;

    var username='';
    var password='';

    const updateUsernameStr = (event) => {
        username = event.target.value;
    };
    const updatePasswordStr = (event) => {
        password = event.target.value;
    };
    const onExit = e => {
        onExecute && onExecute(username,password);
    };

    useEffect(() => {
        if (!isLoading) {
            document.querySelector('body').classList.remove('modal-open');
        };
    }, [isLoading]);

    // render() {
    //     if (!this.props.isOpen) {
    //         return null;
    //     }
        return (
            <div>
                <Modal isOpen={isLoading} className={className}>
                    <ModalHeader>Login</ModalHeader>
                    <ModalBody>
                        <div className={"login-lable"}>Username</div><input id="nodeDialogPromptUsername" onChange={(event) => updateUsernameStr(event)} type="text" maxLength="40"
                                                                            className="node-item-user"/><p/>
                        <div className={"login-lable"}>Password</div><input id="nodeDialogPromptPassword" onChange={(event) => updatePasswordStr(event)} type="password" maxLength="40"
                                                                            className="node-item-pass"/>
                    </ModalBody>
                    <ModalFooter>
                        {/*<Button color="secondary" onClick={this.props.onClose}>Cancel</Button>*/}
                        <Button color="primary" onClick={onExit}>Ok</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
    // return (
    //     <Modal isOpen={isLoading}>
    //         Loading....
    //     </Modal>
    // );
// };

export default ModalSecurity;

// export default class ModalSecurity extends Modal {
//     updateUsernameStr = (event) => {
//         this.setState({username : event.target.value });
//     };
//     updatePasswordStr = (event) => {
//         this.setState({password : event.target.value });
//     };
//     onExecute = e => {
//         this.props.onExecute && this.props.onExecute(this.state.username,this.state.password);
//     };
//     render() {
//         if (!this.props.isOpen) {
//             return null;
//         }
//         return (
//             <div>
//                 <Modal isOpen={true} className={this.props.className}>
//                     <ModalHeader>Login</ModalHeader>
//                     <ModalBody>
//                         <div className={"login-lable"}>Username</div><input id="nodeDialogPromptUsername" onChange={(event) => this.updateUsernameStr(event)} type="text" maxLength="40"
//                                className="node-item-user"/><p/>
//                         <div className={"login-lable"}>Password</div><input id="nodeDialogPromptPassword" onChange={(event) => this.updatePasswordStr(event)} type="text" maxLength="40"
//                                className="node-item-pass"/>
//                     </ModalBody>
//                     <ModalFooter>
//                         {/*<Button color="secondary" onClick={this.props.onClose}>Cancel</Button>*/}
//                         <Button color="primary" onClick={this.onExecute}>Ok</Button>{' '}
//                     </ModalFooter>
//                 </Modal>
//             </div>
//         );
//     }
// }
//

