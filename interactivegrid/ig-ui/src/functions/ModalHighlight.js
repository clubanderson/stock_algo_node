import React  from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class ModalHighlight extends Modal {
    // updateFillStr = (event) => {
    //     this.setState({fillStr : event.target.value });
    // };
    // onExecute = e => {
    //     this.props.onExecute && this.props.onExecute(this.state.fillStr);
    // };
    render() {
        if (!this.props.isOpen) {
            return null;
        }
        return (
            <div>
                <Modal isOpen={true} className={this.props.className}>
                    <ModalHeader>{this.props.title}</ModalHeader>
                    <ModalBody>
                        <div className="" style={{width: "auto", minHeight: "0px", maxHeight: "none", height: "375px"}}>
                            <form noValidate="">
                                <section className="" style={{position: "relative", height: "475px", width: "800px"}}>
                                    <aside className="" style={{position: "absolute", height: "475px", width: "280px", left: "0px"}}>
                                        <div className=""  style={{height: "434px", width: "279px"}}>
                                            <div className="">
                                                <div className="" style={{width: "279px"}}>
                                                    <table role="presentation" className="" style={{width: "278px"}}>
                                                        <colgroup>
                                                            <col width="80" data-idx="4"></col>
                                                            <col width="198" data-idx="5"></col>
                                                        </colgroup>
                                                        <thead role="rowgroup">
                                                        <tr className="a-GV-row" role="row">
                                                            <th role="columnheader" className=""><span className="">Enabled</span></th>
                                                            <th role="columnheader" className=""><span className="">Name</span></th>
                                                        </tr>
                                                        </thead>
                                                    </table>
                                                </div>
                                                <div className="" style={{top: "1px", height: "40px", left: "273px"}}></div>
                                            </div>
                                            <div className="" style={{height: "393px"}}>
                                                <div className="" >Column 2</div>
                                                <div className="" style={{width: "279px", height: "393px"}}>
                                                    <table role="presentation" className="" style={{marginTop: "-41px", width: "278px"}}>
                                                        <colgroup>
                                                            <col width="80" data-idx="4"></col>
                                                            <col width="198" data-idx="5"></col>
                                                        </colgroup>
                                                        <thead role="rowgroup">
                                                        <tr className="a-GV-row" role="row">
                                                            <th role="columnheader" className="" style={{visibility: "hidden"}}>
                                                                <span className="">Enabled</span></th>
                                                            <th role="columnheader" className="" style={{visibility: "hidden"}}>
                                                                <span className="">Name</span></th>
                                                        </tr>
                                                        </thead>
                                                        <tbody>
                                                        <tr role="row" className="">
                                                            <td className="">
                                                                <span className=""></span>
                                                                <span className="">Enabled</span></td>
                                                            <td className=""></td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="tb a-Toolbar">
                                            <div className="a-Toolbar-groupContainer">
                                                <div className="a-Toolbar-group">
                                                    <button type="button" className="a-Button a-Button--noLabel" title="Add" aria-label="Add">
                                                        <i className="button-icon fas fa-plus"></i>
                                                    </button>
                                                    <button type="button" className="a-Button a-Button--noLabel" title="Duplicate" aria-label="Duplicate">
                                                        <i className="button-icon fas fa-clone"></i>
                                                    </button>
                                                    <button type="button" className="a-Button a-Button--noLabel" title="Delete" aria-label="Delete">
                                                        <i className="button-icon fas fa-minus"></i>
                                                    </button>
                                                    <button type="button" className="a-Button a-Button--noLabel" title="Move Up" aria-label="Move Up">
                                                        <i className="button-icon fas fa-chevron-up"></i>
                                                    </button>
                                                    <button type="button" className="a-Button a-Button--noLabel" title="Move Down" aria-label="Move Down">
                                                        <i className="button-icon fas fa-chevron-down"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </aside>
                                    <div className="a-Splitter-barH ui-draggable ui-draggable-handle"
                                         style={{position: "absolute", left: "280px", top: "0px", height: "475px"}}>
                                        <div></div>
                                        <span role="separator" className="" ></span></div>
                                    <main className="" id=""
                                          style={{position: "absolute", height: "475px", width: "512px", left: "288px"}}>
                                        <div className="" style={{height: "475px", width: "512px"}}>
                                            <div className="" style={{height: "475px"}}>
                                                <div className="">
                                                    <div className="">


                                                        <div className="">
                                                            <div className=""><span className="">Name</span></div>
                                                            <div className="">
                                                                <div className=""><input
                                                                    id="name" type="text"
                                                                    maxLength="50" className=""
                                                                    placeholder="enter name here..."/></div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className=""><span className="">Column</span></div>
                                                                <div><select size="1">
                                                                    <option value="budget">Budget</option>
                                                                    <option value="homepage">Homepage</option>
                                                                    <option value="id">Id</option>
                                                                    <option value="original_language">Original Language</option>
                                                                    <option value="original_title">Original Title</option>
                                                                    <option value="overview">Overview</option>
                                                                    <option value="popularity">Popularity</option>
                                                                    <option value="release_date">Release Date</option>
                                                                    <option value="revenue">Revenue</option>
                                                                    <option value="runtime">Runtime</option>
                                                                    <option value="status">Status</option>
                                                                    <option value="tagline">Tagline</option>
                                                                    <option value="title">Title</option>
                                                                    <option value="vote_average">Vote Average</option>
                                                                    <option value="vote_count">Vote Count</option>
                                                                </select></div>
                                                        </div>
                                                        <div className="">
                                                            <div id="background_color" className="">
                                                                <div className=""><span className="">Background Color</span></div>
                                                                <div className=""><select size="1">
                                                                    <option value="rag-back-yellow">Yellow</option>
                                                                    <option value="rag-back-red">Red</option>
                                                                    <option value="rag-back-blue">Blue</option>
                                                                    <option value="rag-back-orange">Orange</option>
                                                                    <option value="rag-back-white">White</option>
                                                                    <option value="rag-back-black">Black</option>
                                                                    <option value="rag-back-green">Green</option>
                                                                    <option value="rag-back-gray">Gray</option>
                                                                    <option value="rag-back-purple">Purple</option>
                                                                    <option value="rag-back-pink">Pink</option>
                                                                </select></div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div id="text_color" className="">
                                                                <div className=""><span className="">Text Color</span></div>
                                                                <div className=""><select size="1">
                                                                    <option value="rag-back-yellow">Yellow</option>
                                                                    <option value="rag-back-red">Red</option>
                                                                    <option value="rag-back-blue">Blue</option>
                                                                    <option value="rag-back-orange">Orange</option>
                                                                    <option value="rag-back-white">White</option>
                                                                    <option value="rag-back-black">Black</option>
                                                                    <option value="rag-back-green">Green</option>
                                                                    <option value="rag-back-gray">Gray</option>
                                                                    <option value="rag-back-purple">Purple</option>
                                                                    <option value="rag-back-pink">Pink</option>
                                                                </select></div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div id="operator" className="">
                                                                <div className=""><span className="">Operator</span></div>
                                                                <div className=""><select size="1">
                                                                    <option value="EQ">equals</option>
                                                                    <option value="NEQ">not equals</option>
                                                                    <option value="GT">greater than</option>
                                                                    <option value="GTE">greater than or equals</option>
                                                                    <option value="LT">less than</option>
                                                                    <option value="LTE">less than or equals</option>
                                                                    {/*<option value="N">is empty</option>*/}
                                                                    {/*<option value="NN">is not empty</option>*/}
                                                                    {/*<option value="IN">in</option>*/}
                                                                    {/*<option value="NIN">not in</option>*/}
                                                                    {/*<option value="BETWEEN">between</option>*/}
                                                                    {/*<option value="NBETWEEN">not between</option>*/}
                                                                </select></div>
                                                            </div>
                                                        </div>
                                                        <div className="">
                                                            <div className=""><span className="">Value</span></div>
                                                            <div className="">
                                                                <div className=""><input id="value" type="text" maxLength="4000" className="" placeholder="enter value here..."/>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </main>
                                </section>
                            </form>
                        </div>
                        {/*<input id="nodeDialogPromptInputId" onChange={(event) => this.updateFillStr(event)} type="text" maxLength="4000"*/}
                               {/*className="node-item-text"/>*/}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={() => this.props.onClose()}>Cancel</Button>
                        <Button color="primary" onClick={() => this.onExecute()}>Ok</Button>{' '}
                    </ModalFooter>
                </Modal>
            </div>

        );
    }
}


