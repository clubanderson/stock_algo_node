import React, {Component} from "react";
// import {Dropdown} from 'react-bootstrap';
// var classNames = require( 'classnames' );

export default class FacetedItems extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: false
        };
        this.toggleFacet = this.toggleFacet.bind(this);
    }
    toggleFacet(fieldName,e){
        let fieldsCopy = this.state.fields;
        fieldsCopy[fieldName] = !this.state.fields[fieldName].open;
        this.setState({fields: fieldsCopy});
    }

    subItems(columnNode){
        var arrShow=[];
        let arrHide = [];
        let i = 0;
        let limit = 5;
        Object.keys(columnNode.distinctItems).forEach(function(key) {
            if ( i < limit ) {
                arrShow.push({column: columnNode, columnName: columnNode.field, label: key, value: columnNode.distinctItems[key]});
            } else {
                arrHide.push({column: columnNode, columnName: columnNode.field, label: key, value: columnNode.distinctItems[key]});
            }
            i++;
        });
        return (
            <div>{arrShow.map(item => <div id={item.label} className="fs-item-option">
                    <input type="checkbox" value={item.label} className={`${item.columnName}-clear`} onChange={() => this.props.searchItemToggle(item.column, item.label)}/>
                    <label>
                        <span className="label">{item.label}</span>
                        <span className="fs-item-option-badge">{item.value}</span>
                    </label>
                </div>
            )}{arrHide.map(item => <div id={item.label} className={`fs-item-option ${columnNode.hidden ? "u-hidden" : ""}`}>
                    <input type="checkbox" value={item.label} className={`${item.columnName}-clear`} onChange={() => this.props.searchItemToggle(item.column, item.label)}/>
                    <label>
                        <span className="label">{item.label}</span>
                        <span className="fs-item-option-badge">{item.value}</span>
                    </label>
                </div>
            )}
            </div>
        )
    }

    render() {
        const obj = this;
        if (!this.props.facetsLoaded) {
            // this.setState({fields: {} });
            // this.props.facetColumns.map((columnNode) => {
            //     let fieldName = `content-${columnNode[Object.keys(columnNode)].field}`;
            //     obj.state.fields[fieldName] = {open: true};
            // });
            return <div />
        }

        const items = this.props.facetColumns.map((columnNode, idx) => {
            return (
                <div className="a-FS-control">
                    <h3 className="a-FS-header" id="">
                        <button className="a-FS-toggle" type="button" onClick={(fieldName,e)=>this.toggleFacet(fieldName,e)}>
                                            <span className="a-Icon a-Collapsible-icon">
                                                <i className="fas fa-chevron-down"></i>
                                            </span>
                        </button>
                        <span className="a-FS-label" id="">{columnNode[Object.keys(columnNode)].headerName}</span>
                        <button className={`a-FS-clearButton js-clear ${columnNode[Object.keys(columnNode)].filter.length > 0 ? "" : "u-hidden"}`} onClick={() => this.props.clearFilters(columnNode[Object.keys(columnNode)].field)} type="button">Clear</button>
                    </h3>
                    {/*{obj.state.fields[columnNode[Object.keys(columnNode)].field].open ? (<div className={`a-FS-body content-${columnNode[Object.keys(columnNode)].field}`}>*/}
                    <div className={`a-FS-body content-${columnNode[Object.keys(columnNode)].field}`}>
                        <div className="a-FS-wrap">
                            <div className = "a-FS-bodyInner">
                                {this.subItems(columnNode[Object.keys(columnNode)])}
                            </div>
                            <div id={`show-button-${columnNode[Object.keys(columnNode)].field}`} className={`a-FS-listFooter ${columnNode[Object.keys(columnNode)].hidden ? "" : "u-hidden"} ${columnNode[Object.keys(columnNode)].more ? "" : "u-hidden"}`} onClick={() => this.props.columnHideToggle(columnNode)}><button className="a-FS-toggleOverflow js-toggleOverflow" type="button">Show More</button></div>
                            <div id={`hide-button-${columnNode[Object.keys(columnNode)].field}`} className={`a-FS-listFooter ${columnNode[Object.keys(columnNode)].hidden ? "u-hidden" : ""} ${columnNode[Object.keys(columnNode)].more ? "" : "u-hidden"}`} onClick={() => this.props.columnHideToggle(columnNode)}><button className="a-FS-toggleOverflow js-toggleOverflow" type="button">Show Less</button></div>
                        </div>
                    </div>
                    {/*) : null }*/}
                </div>
            )
        });
        return (
            <div className={this.props.className}>
                <div>
                    <div id="" className="a-FS">
                        <div>{items}</div>
                    </div>
                </div>
                <br style={{clear:"both"}}/>
            </div>
        );
    }
}
