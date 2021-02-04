import React, {Component} from 'react';

import MenuBar from './MenuBar.js';
import './App.scss';
import { AgGridReact } from 'ag-grid-react';
// import './ag-grid-enterprise.min';
// import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { ModuleRegistry, AllModules } from '@ag-grid-enterprise/all-modules';
import {Button} from "reactstrap";
import {Dropdown} from "react-bootstrap";
import ModalHelp from "./functions/ModalHelp";
import ModalSecurity from "./functions/ModalSecurity";
import ModalHighlight from "./functions/ModalHighlight";
import ModalFill from "./functions/ModalFill";
import ModalSingleRowView from "./functions/ModalSingleRowView";
import fontawesome from '@fortawesome/fontawesome'
import faFreeSolid from '@fortawesome/fontawesome-free-solid'

ModuleRegistry.registerModules(AllModules);

const host = 'localhost';
const api_port = 80;
const actives_url = "/stocks/actives/1";
const submissions_new_url = "stocks/submissions/1?limit=100&relevance=new";
const submissions_hot_url = "stocks/submissions/1?limit=100&relevance=hot";
const comments_new_url = "stocks/comments/1?limit=100&relevance=new";
const comments_hot_url = "stocks/comments/1?limit=100&relevance=hot";
const frequency_url = "stocks/frequency/1"  // post - requires a list in json
// const host = 'np-api.default.svc.cluster.local';
// const api_port = 3001;
console.log(`host:port = ${host}:${api_port}`);

class App extends Component {

    constructor(props) {
        super(props);
        this.getContextMenuItems = this.getContextMenuItems.bind(this);
        this.toggleModalHelp = this.toggleModalHelp.bind(this);
        this.toggleModalSecurity = this.toggleModalSecurity.bind(this);
        this.toggleModalHighlight = this.toggleModalHighlight.bind(this);
        this.toggleModalSingleRowView = this.toggleModalSingleRowView.bind(this);
        this.toggleModalFill = this.toggleModalFill.bind(this);
        this.state = {
            searchStr: '',
            stretch: false,
            sort: true,
            username: '',
            password: '',
            isModalSingleRowViewOpen: false,
            isModalHelpOpen: false,
            isModalSecurityOpen: false,
            isModalHighlightOpen: false,
            isModalFillOpen: false,
            showColumnPanel: true,
            showFilterPanel: false,
            showPivotPanel: false,
            modalContent: "hello world",
            modalTitle: "",
            cellSelection: true,
            cellSelectionText: "Cell Selection",
            dirtyRecords: [],
            dirtySave: false,
            highlightRecords: [{column: "symbol", text: "AMC", operator: "==", color: "red", backgroundcolor: "yellow"},{column: "symbol", text: "NOK", operator: "==", color: "blue", backgroundcolor: "yellow"},{column: "runtime", text: "140", operator: ">=", color: "pink", backgroundcolor: "yellow"}],
            highlightPolicy: [],
            highlightPolicy2: { 'rag-back-green rag-fore-white': 'data.symbol == "AMC"', 'rag-fore-red rag-back-purple': 'data.symbol == "NOK"'},
            columnDefs: [{
                headerName: "ID", editable: false, filter: 'agNumberColumnFilter', width: 60, field: "id", sortable: true, checkboxSelection: function(params) {
                    return true;
                }, resizable: true, enablePivot: true, enableRowGroup: true,
            }, {
                headerName: "Symbol",        editable: false, width: 120, field: "symbol",       sortable: true, filter: true, resizable: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Name",          editable: false, width: 260, field: "name",         sortable: true, filter: true, resizable: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Price",         editable: false, width: 120, field: "price",        sortable: true, filter: 'agNumberColumnFilter', type: 'number', comparator: numCompare, resizable: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Change",        editable: false, width: 120, field: "change",       sortable: true, filter: 'agNumberColumnFilter', type: 'number', comparator: numCompare, valueFormatter: numFormatter, resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "% Change",      editable: false, width: 160, field: "pct_change",   sortable: true, filter: 'agNumberColumnFilter', type: 'number', comparator: numCompare, valueFormatter: pctFormatter, resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Market Cap",    editable: false, width: 160, field: "market_cap",   sortable: true, filter: 'agNumberColumnFilter', type: 'number', comparator: numCompare, valueFormatter: currencyFormatter, resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Avg 3 Mon Vol", editable: false, width: 160, field: "avg_3mon_vol", sortable: true, filter: 'agNumberColumnFilter', type: 'number', comparator: numCompare, valueFormatter: volumeFormatter, resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Volume",        editable: false, width: 160, field: "volume",       sortable: true, filter: 'agNumberColumnFilter', type: 'number', comparator: numCompare, valueFormatter: volumeFormatter, resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }],
        }
        // valueFormatter: params => currencyFormatter(params.data.market_cap, '$'),
        
        function numCompare(a, b) {
            if(parseFloat(a) > parseFloat(b)) return 1; else if( parseFloat(a) < parseFloat(b)) return -1; else return 0;
            // if(a > b) return 1; else if(a < b) return -1; else return 0;
        }

        function numFormatter(params) {
            return formatFloatNumber(params.value);
        }
        function pctFormatter(params) {
            return formatFloatNumber(params.value);
        }
        function currencyFormatter(params) {
            return Math.trunc(formatVol(params.value));
        }
        function volumeFormatter(params) {
            return Math.trunc(formatVol(params.value));
            // parseFloat(params.value).toFixed(3)
            // return parseFloat(formatVol(params.value)).toFixed();
        }
        function formatVol(number){
            if (number.slice(-1) == 'M') {
                return parseFloat(number) * 1000000
            } else if (number.slice(-1) == 'B') {
                return parseFloat(number) * 1000000000
            } else {
                return parseFloat(number) * 1000000000000
            }
        }
        function formatFloatNumber(number) {
            return number.toString()
        }
    }

    getContextMenuItems(params) {
        const obj = this;
        var result = [
            {
                name: 'Single Row View',
                action: function() {
                    var rowData = JSON.stringify(params.node.data);
                    console.log('Single Row Selected: ' + rowData);
                    obj.setState({modalTitle : "Single Row Details"});
                    obj.setState({modalContent : rowData});
                    obj.toggleModalSingleRowView();
                },
                icon: '<img src="./images/revert.png"/>',
            },
            'separator',
            {
                name: 'Add Row',
                action: function() {
                    console.log('Add Row Selected');
                    obj.actionAddRow();
                },
                icon: '<img src="./images/revert.png"/>',
            },
            {
                name: 'Duplicate Row',
                action: function() {
                    console.log('Duplicate Row Selected');
                    obj.actionDuplicateRow(params.node.data);
                },
                icon: '<img src="./images/revert.png"/>',
            },
            'separator',
            {
                name: 'Delete Row',
                action: function() {
                    console.log('Delete Row Selected');
                    obj.actionDeleteRow();
                },
                icon: '<img src="./images/revert.png"/>',
            },
            'separator',
            {
                name: 'Refresh Row',
                action: function() {
                    console.log('Refresh Row Selected');
                    obj.actionRefresh();
                },
                icon: '<img src="./images/revert.png"/>',
            },
            {
                name: 'Revert Changes',
                disable: true,
                action: function() {
                    console.log('Revert Changes Selected');
                    obj.actionFlashback();
                },
                icon: '<img src="./images/revert.png"/>',
            },
            'separator',
            'copy',
            'separator',
            'chartRange',
        ];

        return result;
    }

    toggleSave(position) {
        this.setState({dirtySave : position});
    };

    toggleModalHelp() {
        this.setState({ isModalHelpOpen: !this.state.isModalHelpOpen });
    }
    toggleModalSecurity() {
        this.setState({ isModalSecurityOpen: !this.state.isModalSecurityOpen });
    }
    toggleModalHighlight() {
        this.setState({ isModalHighlightOpen: !this.state.isModalHighlightOpen });
    }
    toggleModalFill() {
        this.setState({ isModalFillOpen: !this.state.isModalFillOpen });
    }
    toggleModalSingleRowView() {
        this.setState({ isModalSingleRowViewOpen: !this.state.isModalSingleRowViewOpen });
    }

    // onButtonClick = e => {
    //     this.gridApi.sizeColumnsToFit();
    //     const selectedNodes = this.gridApi.getSelectedNodes();
    //     const selectedData = selectedNodes.map( node => node.data );
    //     const selectedDataStringPresentation = selectedData.map( node => node.title + ' ' + node.revenue).join(', ')
    //     alert(`Selected nodes: ${selectedDataStringPresentation}`)
    // };

    onLogin(username,password) {
        this.toggleModalSecurity();
        this.setState({username : username});
        this.setState({password : password});
        this.createHighlightPolicy();
        // setTimeout(() => {
        this.fetchData();
        // }, 1000);

    }

    fetchData(){
        // fetch(`http://${host}:${api_port}`)
        //     .then(result => result.json())
        //     .then(rowData => this.setState({rowData}))
        //     .catch(err => console.error(err));
        fetch(`http://${host}:${api_port}/${actives_url}`)
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
            .catch(err => console.error(err));
    }

    onFilterChanged(event) {
        this.setState({searchStr : event.target.value})
    }
    actionGo() {
        this.refs.agGrid.api.setQuickFilter(this.state.searchStr);
    }
    actionEdit() {
        console.log('action: "edit" attempted');
        const focusedCell = this.refs.agGrid.gridOptions.api.getFocusedCell();
        this.refs.agGrid.gridOptions.api.startEditingCell({
            rowIndex: focusedCell.rowIndex,
            colKey: focusedCell.column,
        });
    }
    actionCheckBox() {
        return this.state.cellSelection;
    }
    actionToggleCellSelection() {
        if (this.state.cellSelection === true) {
            console.log('action: "toggle cell/row selection: row" attempted');
            // this.columnApi.checkboxSelection(false);
            this.setState({cellSelection: false});
            this.setState({cellSelectionText: "Row Selection"});
        } else {
            console.log('action: "toggle cell/row selection: cell" attempted');
            // this.refs.agGrid.gridOptions.suppressCellSelection=false;
            this.setState({cellSelection: true});
            this.setState({cellSelectionText: "Cell Selection"});
        }
    }
    actionCopyDown() {
        console.log('action: "copy down" attempted');
    }

    actionFill() {
        console.log('action: "fill" attempted');
        this.setState({modalTitle : "Fill Selection"});
        this.setState({modalContent : "Fill selection with"});
        this.toggleModalFill();
    }
    actionExecuteFill(fillStr) {
        console.log('action: "execute fill" attempted: ' + fillStr);
        this.toggleModalFill();
        const focusedCell = this.refs.agGrid.gridOptions.api.getFocusedCell();
        var rowNode = this.refs.agGrid.gridOptions.api.getRowNode(focusedCell.rowIndex);
        rowNode.setDataValue(focusedCell.column, fillStr);
    }

    actionClear(){
        console.log('action: "clear" attempted');
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.rowIndex );
        for (let rowIndex of selectedData) {
            this.refs.agGrid.gridOptions.rowData.fill(rowIndex-1,rowIndex,rowIndex+1);
            this.gridApi.setRowData(this.refs.agGrid.gridOptions.rowData);
        }
    }
    actionColumns() {
        if (this.state.showColumnPanel === false) {
            console.log('action: "columns - true" attempted');
            this.refs.agGrid.api.setSideBar('columns');
            this.refs.agGrid.api.openToolPanel('columns');
            this.setState({showFilterPanel: false});
            this.setState({showColumnPanel: true});
        } else {
            console.log('action: "columns - false" attempted');
            this.setState({showColumnPanel: false});
        }
    }
    actionFilter() {
        if (this.state.showFilterPanel === false) {
            console.log('action: "filter - true" attempted');
            this.refs.agGrid.api.setSideBar('filters');
            this.refs.agGrid.api.openToolPanel('filters');
            this.setState({showColumnPanel: false});
            this.setState({showFilterPanel: true});
        } else {
            console.log('action: "filter - false" attempted');
            this.setState({showFilterPanel: false});
        }
    }
    actionSort() {
        var sort =[];
        if (this.state.sort === true) {
            console.log('action: "data:sort - false" attempted');
            this.setState({sort: false});
            sort = [
                { colId: 'title', sort: 'asc' }
            ];
            this.refs.agGrid.api.setSortModel(sort);
        } else {
            console.log('action: "data:sort - true" attempted');
            this.setState({sort: true});
            sort = [
                { colId: 'id', sort: 'asc' }
            ];
            this.refs.agGrid.api.setSortModel(sort);
        }
    }
    actionAggregate() {
        if (this.state.showColumnPanel === false) {
            console.log('action: "data:aggregate - true" attempted');
            this.refs.agGrid.api.setSideBar('columns');
            this.refs.agGrid.api.openToolPanel('columns');
            this.setState({showFilterPanel: false});
            this.setState({showColumnPanel: true});
        } else {
            console.log('action: "data:aggregate - false" attempted');
            this.setState({showColumnPanel: false});
        }
    }
    actionRefresh() {
        console.log('action: "data:refresh" attempted');
        var params = {
            force: true,
            suppressFlash: false,
        };
        this.refs.agGrid.api.refreshCells(params);
    }
    actionFlashback() {
        console.log('action: "data:flashback" attempted');
        this.gridApi.undoCellEditing();
    }
    actionFlashbacks() {
        console.log('action: "data:flashback" attempted');
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        for (let rowData of selectedData) {
            this.gridApi.undoCellEditing();
        }
    }

    actionControlBreak() {
        if (this.state.showColumnPanel === false) {
            console.log('action: "columns - true" attempted');
            this.refs.agGrid.api.setSideBar('columns');
            this.refs.agGrid.api.openToolPanel('columns');
            this.setState({showFilterPanel: false});
            this.setState({showColumnPanel: true});
        } else {
            console.log('action: "columns - false" attempted');
            this.setState({showColumnPanel: false});
        }
    }
    actionStretchColumn() {
        if (this.state.stretch === true) {
            console.log('action: "format:stretchcolumn - false" attempted');
            this.setState({stretch: false});
            this.refs.agGrid.api.sizeColumnsToFit();
        } else {
            console.log('action: "format:stretchcolumn - true" attempted');
            this.setState({stretch: true});
            this.refs.agGrid.columnApi.autoSizeColumns([
                'id',
                'title',
                'homepage',
                'original_language',
                'overview',
                'popularity',
                'release_date',
                'revenue',
                'runtime',
                'status',
                'tagline',
                'budget',
                'vote_average',
                'vote_count'
            ])
        }
    }
    actionCopyToClipboard(){
        console.log('action: "selection:copytoclipboard attemtped');
        this.refs.agGrid.api.copySelectedRowsToClipboard();
    }
    actionChart(params) {
        console.log('action: "chart" attempted');
        var chart_params = {
            cellRange: {
                columns: ['runtime', 'original_language'],
            },
            chartType: 'groupedColumn',
            // chartContainer: eContainer,
            processChartOptions: function(params) {
                params.options.seriesDefaults.tooltip.renderer = function(params) {
                    var titleStyle = params.color
                        ? ' style="color: white; background-color:' + params.color + '"'
                        : '';
                    var title = params.title
                        ? '<div class="ag-chart-tooltip-title"' +
                        titleStyle +
                        '>' +
                        params.title +
                        '</div>'
                        : '';
                    var value = params.datum[params.yKey]
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    return (
                        title +
                        '<div class="ag-chart-tooltip-content" style="text-align: center">' +
                        value +
                        '</div>'
                    );
                };
                return params.options;
            },
        };
        this.refs.agGrid.api.createRangeChart(chart_params)
    }
    actionReport() {
        console.log('action: "report" attempted');

    }
    actionDownload() {
        console.log('action: "download" attempted');
        this.refs.agGrid.api.exportDataAsCsv();
    }
    actionHelp() {
        console.log('action: "help" attempted');
        this.setState({modalTitle : "Interactive Grid Help"});
        this.setState({modalContent : ""});
        this.toggleModalHelp();
    }
    actionReset() {
        console.log('action: "reset" attempted');
        this.refs.agGrid.api.refreshCells();
    }

    getNextID(){
        let ids = [];
        var i = 0;
        // this.refs.agGrid.api.forEachNode(function(rowNode, index) {
        this.refs.agGrid.gridOptions.api.forEachNode(function(rowNode, index) {
            if (i < 10) {console.log(rowNode.data.id);}
            ids[i] = rowNode.data.id;
            i++;
        });
        var nextId = this.findFreeId(ids);
        console.log('min is: ' + nextId);
        return nextId;
    }
    findFreeId (ids) {
        const sortedArray = ids
            .slice() // Make a copy of the array.
            .sort(function (a, b) {return a.id - b.id}); // Sort it.
        let previousId = 0;
        for (let element of sortedArray) {
            if (element !== (previousId + 1)) {
                // alert('Found a gap: ');
                return previousId + 1;
            }
            previousId = element;
        }
        // Found no gaps.
        return previousId + 1;
    }

    actionAddRow() {
        console.log('action: "add row" attempted');
        var nextID = this.getNextID();
        const row = {"budget":null,"homepage":null,"id":nextID,"original_language":null,"overview":null,"popularity":null,"release_date":null,"revenue":null,"runtime":null,"status":null,"tagline":null,"title":null,"vote_average":null,"vote_count":null}
        this.refs.agGrid.gridOptions.api.addItems([row]);
        var sort = [{ colId: 'id', sort: 'asc' }];
        this.refs.agGrid.api.setSortModel(sort);
        this.addRowToDB(row);
    }
    actionDeleteRow() {
        console.log('action: "delete row" attempted');
        var selectedNodes = this.refs.agGrid.gridOptions.api.getSelectedNodes();
        this.refs.agGrid.gridOptions.api.removeItems(selectedNodes);
        const selectedData = selectedNodes.map( node => node.data.id );
        for (let item of selectedData) {
            this.deleteRowFromDB(item);
        }
    }
    actionDeleteRows() {
        console.log('action: "delete rows" attempted');
        var selectedNodes = this.refs.agGrid.gridOptions.api.getSelectedNodes();
        this.refs.agGrid.gridOptions.api.removeItems(selectedNodes);
        const selectedData = selectedNodes.map( node => node.data.id );
        for (let item of selectedData) {
            this.deleteRowFromDB(item);
        }
    }
    actionDuplicateRow(rowData) {
        console.log('action: "duplicate row" attempted');
        var nextID = this.getNextID();
        var newRowData = JSON.parse(JSON.stringify(rowData));
        newRowData.id = nextID;
        this.refs.agGrid.gridOptions.api.addItems([newRowData]);
        var sort = [{ colId: 'id', sort: 'asc' }];
        this.refs.agGrid.api.setSortModel(sort);
        this.addRowToDB(newRowData);
    }
    actionDuplicateRows() {
        console.log('action: "duplicate rows" attempted');
        const selectedNodes = this.gridApi.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        for (let rowData of selectedData) {
            this.actionDuplicateRow(rowData);
        }
        var sort = [{ colId: 'id', sort: 'asc' }];
        this.refs.agGrid.api.setSortModel(sort);
    }

    addRowToDB(rowData) {
        const postMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(rowData) // We send data in JSON format
        };

        fetch(`http://${host}:${api_port}/movies`, postMethod)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(this.fetchData())
            .catch(err => console.log(err));
    }
    updateRowToDB(rowData,item) {
        const postMethod = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(rowData) // We send data in JSON format
        };

        fetch(`http://${host}:${api_port}/update/${item}`, postMethod)
            .then(response => response.json())
            .then(data => console.log(data))
            .then(this.fetchData())
            .catch(err => console.log(err));
    }
    deleteRowFromDB(id) {
        fetch(`http://${host}:${api_port}/movies/${id}`, {method: 'delete'})
            .then(result => result.json())
            .then(result => console.log(result))
            .then(this.fetchData());
    }

    actionSave() {
        console.log('action: "save" attempted');
        const obj = this;
        this.state.dirtyRecords.forEach(function(item) {
            obj.refs.agGrid.api.forEachNode(function(rowNode, index) {
                if (item === rowNode.data.id) {
                    console.log('record to add: ' + JSON.stringify(rowNode.data));
                    // obj.deleteRowFromDB(item);
                    // obj.addRowToDB(rowNode.data);
                    obj.updateRowToDB(rowNode.data,item);
                }
            });
        });
        this.setState({dirtyRecords: []});
        this.toggleSave(false);
    }


    onCellValueChanged(params) {
        console.log('record changed with ID: ' + JSON.stringify(params.node.data.id));
        this.state.dirtyRecords.indexOf(params.node.data.id === -1) ? this.state.dirtyRecords.push(params.node.data.id) : console.log("This item already exists");
        this.state.dirtyRecords.length > 0 ? this.toggleSave(true) : this.toggleSave(false);
    }

    actionHighlight(){
        this.setState({modalTitle : "Highlight"});
        this.setState({modalContent : ""});
        this.toggleModalHighlight();
        console.log('action: "format:highlight" attempted');
    }
    createHighlightPolicy() {
        var obj = this;
        this.setState({highlightPolicy: []});
        this.state.highlightRecords.forEach(function (policy, index) {
            obj.setState(prevState => ({
                highlightPolicy: [...prevState.highlightPolicy, {policy: 'params.data.' + policy.column + ' ' + policy.operator + ' "' + policy.text + '" ? {backgroundColor: "' + policy.backgroundcolor + '", color: "' + policy.color + '"} : {}'}]
            }));
        });
        console.log('policy3: '+ JSON.stringify(this.state.highlightPolicy));
    };
    changeHighlight() {
        var obj = this;
        var dataStr = "";
        var classObj = {};
        console.log('policyFirst: ' + JSON.stringify(this.state.highlightPolicy2));
        this.state.highlightRecords.forEach(function (policy, index) {
            var key = `rag-back-${policy.backgroundcolor} rag-fore-${policy.color}`;
            classObj[key] = `data.${policy.column} ${policy.operator} "${policy.text}"`;
            dataStr = dataStr + ',' + JSON.stringify(classObj).slice(1).slice(0,-1);
        });
        dataStr = '{' + dataStr.slice(1) + '}';
        console.log('dataStr: ' + dataStr);
        obj.setState({highlightPolicy2: JSON.parse(dataStr)});
        // {"rag-fore-red rag-back-yellow": "data.title == \"Star Wars\""} });
        console.log('policySecond: '+ JSON.stringify(this.state.highlightPolicy2));
        this.refs.agGrid.gridOptions.api.redrawRows();
    }

    // onGridReady(params) {
    //     this.gridApi = params.api;
    //     this.gridColumnApi = params.columnApi;
    //     this.createHighlightPolicy();
    // }

    componentDidMount() {
        // this.toggleModalSecurity();
        this.createHighlightPolicy();
        // setTimeout(() => {
        this.fetchData();
        this.setState({showColumnPanel: false});
        this.setState({showFilterPanel: false});
    }

    actionConvertLang(lang){
        const focusedCell = this.refs.agGrid.gridOptions.api.getFocusedCell();
        var rowNode = this.refs.agGrid.gridOptions.api.getRowNode(focusedCell.rowIndex);
        rowNode.setDataValue('original_language', lang);
    }


    render() {
        return (
            <div className={"background-container"}>
                <MenuBar className={"row menubar-top"} onClose={this.toggleModalSecurity} username={this.state.username}></MenuBar>
                <div className={"row"}>
                    <div className={"action-col-1"}>
                        <input id="searchstr" type="text" className="input-spyglass" onInput={(event) => {this.onFilterChanged(event)}} placeholder="Search: All Text Columns" />
                        <Button className={"btn-go"} onClick={() => this.actionGo()}>Go</Button>{' '}
                        <div className={"vl"}></div>
                        <Dropdown>
                            <Dropdown.Toggle variant="action" id="dropdown-basic-button">
                                Actions
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => this.actionColumns()}><i className="menu-icon fas fa-columns"></i>
                                    Columns</Dropdown.Item>
                                <Dropdown.Item className={'DropDownItemDivider'}/>
                                <Dropdown.Item onClick={() => this.actionFilter()}><i className="menu-icon fas fa-filter"></i>
                                    Filter</Dropdown.Item>
                                <Dropdown drop={"right"} className={"submenu"}><i className="menu-icon fas fa-table"></i>
                                    <Dropdown.Toggle>
                                        Data
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.actionSort()}><i className="menu-icon fas fa-sort"></i>Sort</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.actionAggregate()}><i className="menu-icon fas fa-plus-square"></i>Aggregate</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.actionRefresh()}><i className="menu-icon fas fa-sync"></i>Refresh</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.actionFlashback()}><i className="menu-icon fas fa-history"></i>Flashback</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown drop={"right"} className={"submenu"}><i className="menu-icon fas fa-wrench"></i>
                                    <Dropdown.Toggle>
                                        Format
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.actionControlBreak()}><i className="menu-icon fas fa-file-code"></i>Control Break</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.actionHighlight()}><i className="menu-icon fas fa-star"></i>Highlight</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.actionStretchColumn()}><i className="menu-icon fas fa-expand-arrows-alt"></i>Stretch Column Widths</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown drop={"right"} className={"submenu"}><i className="menu-icon fas fa-mouse-pointer"></i>
                                    <Dropdown.Toggle>
                                        Selection
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={() => this.actionToggleCellSelection()}>{this.state.cellSelectionText}</Dropdown.Item>
                                        <Dropdown.Item className={'DropDownItemDivider'}/>
                                        <Dropdown.Item onClick={() => this.actionCopyToClipboard()}><i className="menu-icon fas fa-paste"></i>Copy to Clipboard</Dropdown.Item>
                                        <Dropdown.Item className={'DropDownItemDivider'}/>
                                        <Dropdown.Item onClick={() => this.actionDuplicateRows()}><i className="menu-icon fas fa-clone"></i>Duplicate Rows</Dropdown.Item>
                                        <Dropdown.Item className={'DropDownItemDivider'}/>
                                        <Dropdown.Item onClick={() => this.actionDeleteRows()}><i className="menu-icon fas fa-trash-alt"></i>Delete Rows</Dropdown.Item>
                                        <Dropdown.Item className={'DropDownItemDivider'}/>
                                        <Dropdown.Item onClick={() => this.actionRefresh()}><i className="menu-icon fas fa-sync"></i>Refresh Rows</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.actionFlashbacks()}><i className="menu-icon fas fa-history"></i>Revert Changes</Dropdown.Item>
                                        <Dropdown.Item className={'DropDownItemDivider'}/>
                                        <Dropdown.Item className={"menu-item-disabled"} onClick={() => this.actionCopyDown()}><i className="menu-icon-disabled fas fa-object-ungroup"></i>Copy Down</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.actionFill()}><i className="menu-icon fas fa-paint-brush"></i>Fill</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.actionClear()}><i className="menu-icon fas fa-eraser"></i>Clear</Dropdown.Item>
                                        <Dropdown.Item className={'DropDownItemDivider'}/>
                                        <Dropdown.Item onClick={() => this.actionConvertLang('en')}><i className="menu-icon fas fa-clone"></i>Convert to EN</Dropdown.Item>
                                        <Dropdown.Item onClick={() => this.actionConvertLang('fr')}><i className="menu-icon fas fa-clone"></i>Convert to FR</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                <Dropdown.Item className={'DropDownItemDivider'}/>
                                <Dropdown.Item onClick={(params) => this.actionChart(params)}><i className="menu-icon fas fa-chart-bar"></i>
                                    Chart</Dropdown.Item>
                                <Dropdown.Item className={'DropDownItemDivider'}/>
                                <Dropdown.Item onClick={() => this.actionReport()}><i className="menu-icon fas fa-map"></i>
                                    Report</Dropdown.Item>
                                <Dropdown.Item className={'DropDownItemDivider'}/>
                                <Dropdown.Item  onClick={() => this.actionDownload()}><i className="menu-icon fas fa-download"></i>
                                    Download</Dropdown.Item>
                                <Dropdown.Item className={'DropDownItemDivider'}/>
                                <Dropdown.Item onClick={() => this.actionHelp()}><i className="menu-icon fas fa-question-circle"></i>
                                    Help</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <div className={"vl"}></div>
                        {/*<Button className={"btn-edit"} onClick={() => this.getNextID()}>Edit</Button>*/}
                        <Button className={"btn-edit"} onClick={() => this.actionEdit()}>Edit</Button>
                        <Button className={`btn-save ${this.state.dirtySave ? "btn-save-active" : ""}`} onClick={() => this.actionSave()}>Save</Button>
                        <div className={"vl"}></div>
                        <Button className={"btn-addrow"} onClick={() => this.actionAddRow()}>Add Row</Button>
                    </div>
                    <div className={"action-col-2"}>
                        <Button className={"btn-reset"} onClick={() => this.actionFlashback()}><i className="menu-icon fas fa-history"></i>
                            Reset</Button>
                    </div>
                </div>
                <div className="ag-theme-alpine" style={{marginLeft: '20px', height: '800px', width: '1350px'}}>
                    {/*<button onClick={() => this.changeHighlight()}>Change Highlight</button>*/}
                    <AgGridReact
                        onGridReady={ params => this.gridApi = params.api }
                        // params => this.onGridReady(params)
                        ref="agGrid"
                        rowSelection="multiple"
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        rowHeight={"40"}
                        pagination={"true"}
                        enableCharts={"true"}
                        enableRangeSelection={"true"}
                        pivotPanelShow={this.state.showPivotPanel}
                        animateRows="true"
                        undoRedoCellEditing={"true"}
                        undoRedoCellEditingLimit={"20"}
                        rowGroupPanelShow={'always'}
                        // pivotPanelShow={'always'}
                        unSortIcon={"true"}
                        enableCellChangeFlash={"true"}
                        getContextMenuItems={this.getContextMenuItems}
                        showToolPanel={this.state.showColumnPanel || this.state.showFilterPanel}
                        onCellValueChanged={(event) => this.onCellValueChanged(event)}
                        // rowClassRules={this.state.highlightPolicy2}
                    >
                    </AgGridReact>
                </div>
                <ModalHelp title={this.state.modalTitle} content={this.state.modalContent} isOpen={this.state.isModalHelpOpen} onClose={this.toggleModalHelp}>
                </ModalHelp>
                <ModalSingleRowView title={this.state.ModalTitle} content={this.state.modalContent} isOpen={this.state.isModalSingleRowViewOpen} onClose={this.toggleModalSingleRowView}>
                </ModalSingleRowView>
                <ModalSecurity className={"modalsecurity"} title={this.state.modalTitle} content={this.state.modalContent} isLoading={this.state.isModalSecurityOpen} onClose={this.toggleModalSecurity} onExecute={(username,password) => this.onLogin(username,password)}>
                </ModalSecurity>
                <ModalHighlight className={"modalhighlight"} title={this.state.modalTitle} content={this.state.modalContent} isOpen={this.state.isModalHighlightOpen} onClose={this.toggleModalHighlight}>
                </ModalHighlight>
                <ModalFill title={this.state.modalTitle} content={this.state.modalContent} isOpen={this.state.isModalFillOpen} onClose={this.toggleModalFill} onExecute={(fillStr) => this.actionExecuteFill(fillStr)}>
                </ModalFill>
            </div>
        );
    }
}

export default App;