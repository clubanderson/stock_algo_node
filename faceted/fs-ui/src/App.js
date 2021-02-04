import React, {Component} from 'react';

import FacetedItems from './FacetedItems';
import MenuBar from './MenuBar';
import './App.scss';
import { AgGridReact } from 'ag-grid-react';
// import './ag-grid-enterprise.min';
import 'ag-grid-community/dist/styles/ag-grid.css';
// import 'ag-grid/dist/ag-grid.min.js",
// import 'ag-grid-enterprise/dist/ag-grid-enterprise.min.js",
// import 'ag-grid-angular/updateGridAndColumnProperties.js",
// import 'ag-grid-community/dist/ag-grid-community.min.js"

// import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import { ModuleRegistry, AllModules } from '@ag-grid-enterprise/all-modules';
import {Button} from "reactstrap";
// import {Dropdown} from "react-bootstrap";
import ModalHelp from "./functions/ModalHelp";
import ModalSecurity from "./functions/ModalSecurity";
import fontawesome from '@fortawesome/fontawesome'
import faFreeSolid from '@fortawesome/fontawesome-free-solid'

ModuleRegistry.registerModules(AllModules);

const host = 'localhost';
const api_port = 30001;
// const host = 'np-api.default.svc.cluster.local';
// const api_port = 3001;
console.log(`host:port = ${host}:${api_port}`);
const currencySymbol = "$";

class App extends Component {

    constructor(props) {
        super(props);
        this.toggleModalHelp = this.toggleModalHelp.bind(this);
        this.toggleModalSecurity = this.toggleModalSecurity.bind(this);
        this.toggleColumnNodeHiddenFlag = this.toggleColumnNodeHiddenFlag.bind(this);
        this.searchItemToggle = this.searchItemToggle.bind(this);
        // this.getFacets = this.getFacets.bind(this);
        this.state = {
            searchStr: '',
            stretch: false,
            sort: true,
            username: '',
            password: '',
            isModalHelpOpen: false,
            isModalSecurityOpen: false,
            showColumnPanel: true,
            showFilterPanel: false,
            showPivotPanel: false,
            modalContent: "hello world",
            modalTitle: "",
            cellSelection: true,
            facetsLoaded: false,
            lastFieldSearched: '',
            cellSelectionText: "Cell Selection",
            facetColumns: [
                {original_language: {field: "original_language", headerName: "Language", type: "text"}},
                {status: {field: "status", headerName: "Status", type: "text"}},
                {budget: {field: "budget", headerName: "Budget", type: "currency"}},
                {popularity: {field: "popularity", headerName: "Popularity", type: "numeric"}},
                {revenue: {field: "revenue", headerName: "Revenue", type: "currency"}},
                {runtime: {field: "runtime", headerName: "Runtime", type: "numeric"}},
                {vote_average: {field: "vote_average", headerName: "Vote Average", type: "numeric"}},
                {vote_count: {field: "vote_count", headerName: "Vote Count", type: "numeric"}}
            ],
            columnDefs: [
                 {
                headerName: "Title", editable: true, field: "title", sortable: true, filter: true, resizable: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Homepage", editable: true, field: "homepage", sortable: true, filter: true, resizable: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Language", editable: true, width: 120, field: "original_language", sortable: true, filter: 'agSetColumnFilter', resizable: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Overview", editable: true, field: "overview", sortable: true, filter: true, resizable: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Popularity", filter: 'agNumberColumnFilter', editable: true, width: 120, field: "popularity", sortable: true, resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Release Date", editable: true, field: "release_date", sortable: true, filter: true, resizable: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Revenue", editable: true, width: 140, field: "revenue", sortable: true, filter: 'agNumberColumnFilter', resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Runtime", editable: true, width: 120, field: "runtime", sortable: true, filter: 'agNumberColumnFilter', resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Status", editable: true, width: 120, field: "status", sortable: true, filter: 'agSetColumnFilter', resizable: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Tagline", editable: true, field: "tagline", sortable: true, filter: true, resizable: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Budget", editable: true, width: 120, field: "budget", sortable: true, filter: 'agNumberColumnFilter', resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Vote Average", editable: true, width: 140, field: "vote_average", sortable: true, filter: 'agNumberColumnFilter', resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "Vote Count", editable: true, width: 140, field: "vote_count", sortable: true, filter: 'agNumberColumnFilter', resizable: true, enableValue: true, enableRowGroup: true, enablePivot: true,
            }, {
                headerName: "ID", editable: false, filter: 'agNumberColumnFilter', width: 100, field: "id", sortable: true, resizable: true, enablePivot: true, enableRowGroup: true, // checkboxSelection: function(params) { return true; }
            }],
        }
    }

    toggleModalHelp() {
        this.setState({ isModalHelpOpen: !this.state.isModalHelpOpen });
    }
    toggleModalSecurity() {
        this.setState({ isModalSecurityOpen: !this.state.isModalSecurityOpen });
    }

    toggleColumnNodeHiddenFlag(columnNode) {
        columnNode[Object.keys(columnNode)].hidden = !columnNode[Object.keys(columnNode)].hidden;
        var facetColumnsCopy = this.state.facetColumns;
        facetColumnsCopy[columnNode[Object.keys(columnNode)].hidden] = !columnNode[Object.keys(columnNode)].hidden;
        this.setState({ facetColumns: facetColumnsCopy })
    }

    searchItemToggle(columnNode,item){
        var facetColumnsCopy = this.state.facetColumns;
        if (!columnNode.filter.includes(item)) {
            columnNode.filter.push(item)
        } else {
            const index = columnNode.filter.indexOf(item);
            if (index > -1) {
                columnNode.filter.splice(index, 1);
            }
        }
        facetColumnsCopy[columnNode.filter] = columnNode.filter;
        this.setState({ facetColumns: facetColumnsCopy });
        this.updateFilters(columnNode.field, columnNode.filter, columnNode.type);
        // this.getFacets();
    }

    clearFilter(columnName) {
        var columnFilterComponent = this.refs.agGrid.gridOptions.api.getFilterInstance(columnName);
        columnFilterComponent.setModel(null);
        var facetColumnsCopy = this.state.facetColumns;
        facetColumnsCopy.map(function (result, key) {
            try {
                if (result[columnName].field === columnName) {
                    result[columnName].filter = [];
                }
            }
            catch (e) {
            }
        });
        this.setState({ facetColumns: facetColumnsCopy });
        this.unCheckAll(columnName);
        if (this.state.lastFieldSearched === columnName) {
            this.setState({lastFieldSearched: ''});
        }
        this.refs.agGrid.gridOptions.api.onFilterChanged();
        this.getFacets();
    }

    unCheckAll(columnName) {
        [...document.querySelectorAll('.' + columnName + '-clear')].map((input) => {
            if (input.checked) {
                let fakeInput = {
                    target: {
                        value: input.value,
                        checked: false
                    }
                };
                input.checked = !input.checked;
                // this.onFilterChange(fakeInput);
            }
            return null;
        })
    };

    setTextFilter(columnName,filter) {
        const obj = this;
        this.refs.agGrid.gridOptions.api.getFilterInstance(columnName, function(filterInstance) {
            filterInstance.setModel({ values: filter });
            obj.refs.agGrid.gridOptions.api.onFilterChanged();
            obj.getFacets();
        });
    }
    setRangeFilter(columnName,filter) {
        const obj = this;
        filter = filter.toString().replace(/,/g, '');
        const filterArr = filter.split(' ');
        var filterStart = 0;
        var filterEnd = 0;
        var filterOper = '';
        try {
            if (filterArr[2]) {
                filterStart = filterArr[0].replace(currencySymbol,'');
                filterEnd = filterArr[2].replace(currencySymbol,'');
                filterOper = 'inRange';
            } else {
                filterStart = filterArr[1].replace(currencySymbol, '');
                filterArr[0] === "<" ? filterOper = 'lessThan' : filterOper = "greaterThanOrEqual";
            }
        } catch (e) {
            filterStart = filterArr[1].replace(currencySymbol,'');
            filterArr[0] === "<" ? filterOper = 'lessThan' : filterOper = "greaterThanOrEqual";
        }
        // console.log(filterStart, filterEnd, filterOper);
        this.refs.agGrid.gridOptions.api.getFilterInstance(columnName, function(filterInstance) {
            if (filterEnd > 0) {
                console.log(filterStart,filterEnd,filterOper);
                filterInstance.setModel({
                    condition1: {
                        type: 'greaterThanOrEqual',
                        filter:   filterStart,
                        // filterTo: '',
                    }, operator: 'AND',
                    condition2: {
                        type: 'lessThanOrEqual',
                        filter: filterEnd,
                    }
                });
                console.log(filterInstance.getModel());
            } else {
                filterInstance.setModel({
                    type: filterOper,
                    filter: filterStart,
                });
            }
            obj.refs.agGrid.gridOptions.api.onFilterChanged();
            obj.getFacets();
        });
    }
    updateFilters(field, filter, type) {
        this.state.lastFieldSearched === '' ? this.setState({lastFieldSearched: field}) : this.setState({lastFieldSearched: this.state.lastFieldSearched});
        if (filter.length > 0) {
            if (type === "text") {
                console.log("text: " + field, filter);
                this.setTextFilter(field, filter);
            } else {
                console.log("range: " +field, filter);
                this.setRangeFilter(field, filter);
            }
        } else {
            this.clearFilter(field)
        }
        // this.setState({rowData: this.refs.agGrid.gridOptions.rowData});
        // this.gridApi.setRowData(this.refs.agGrid.gridOptions.rowData);
        // this.getFacets();
    }




    onFilterChanged(event) {
        this.setState({searchStr : event.target.value})
    }
    actionGo() {
        this.refs.agGrid.api.setQuickFilter(this.state.searchStr);
    }

    // actionFilter() {
    //     if (this.state.showFilterPanel === false) {
    //         console.log('action: "filter - true" attempted');
    //         this.refs.agGrid.api.setSideBar('filters');
    //         this.refs.agGrid.api.openToolPanel('filters');
    //         this.setState({showColumnPanel: false});
    //         this.setState({showFilterPanel: true});
    //     } else {
    //         console.log('action: "filter - false" attempted');
    //         this.setState({showFilterPanel: false});
    //     }
    // }

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

    sortObjByKey(obj) {
        return Object.keys(obj).sort().reduce(function (result, key) {
            result[key] = obj[key];
            return result;
        }, {});
    }

    sortObjByValue(obj){
        var sortedArray = [];
        for(var i in obj)
        {
            sortedArray.push([obj[i], i]);
        }
        return sortedArray.sort();
    }

    getFacets(){
        var sum = function(array) {
            var total = 0;
            for (var i=0; i<array.length; i++) {
                total += array[i];
            }
            return total;
        };


        var mean = function(array) {
            var arraySum = sum(array);
            return arraySum / array.length;
        };


        var median = function(array) {
            array = array.sort();
            if (array.length % 2 === 0) { // array with even number elements
                return (array[array.length/2] + array[(array.length / 2) - 1]) / 2;
            }
            else {
                return array[(array.length - 1) / 2]; // array with odd number elements
            }
        };

        var countRange = function(arr,min,max){
            let i=0;
            arr.map(function(val, idx) {
                (val < max) ? ((val >= min) ? i++ : i=i) : i=i;
            });
            return i;
        };
        var countRange2 = function(arr,min,max){
            let i=0;
            arr.map(function(val, idx) {
                (val <= max) ? ((val >= min) ? i++ : i=i) : i=i;
            });
            return i;
        };


        const obj = this;
        let limit = 5;
        var facetColumnsCopy = this.state.facetColumns;
        facetColumnsCopy.forEach(function(result, index){
            var res = result[Object.keys(result)];
            // console.log(res.field, obj.state.lastFieldSearched);
            if (res.field !== obj.state.lastFieldSearched) {
                console.log('headerName: ' + res.headerName);
                if (res.type === 'text') {
                    let cellArr = [];
                    obj.refs.agGrid.gridOptions.api.forEachNodeAfterFilter(function (rowNode, index2) {
                        cellArr.push({"item": eval(`rowNode.data.${res.field}`)});
                    });
                    cellArr = cellArr.sort();
                    // console.log(cellArr);
                    const frequency = cellArr
                        .map(({item}) => item)
                        .reduce((items, item) => {
                            const count = items[item] || 0;
                            items[item] = count + 1;
                            return items;
                        }, {});
                    res.distinctItems = obj.sortObjByKey(frequency);
                    let i = 0;
                    Object.keys(frequency).map(function (result, key) {
                        return i++;
                    });
                    (i < limit) ? res.more = false : res.more = true;
                    (i < limit) ? res.hidden = false : res.hidden = true;
                    res.filter = [];
                } else {
                    let cellArr = [];
                    obj.refs.agGrid.gridOptions.api.forEachNodeAfterFilter(function (rowNode, index2) {
                        cellArr.push(eval(`rowNode.data.${res.field}`));
                    });
                    if (!obj.state.facetsLoaded) {
                        res.arrSum = sum(cellArr);
                        res.arrMean = mean(cellArr);
                        res.arrMedian = obj.roundNum(Math.round(median(cellArr)));
                        res.arrMax = obj.roundNum(Math.round(Math.max(...cellArr)));
                        res.arrMin = obj.roundNum(Math.round(Math.min(...cellArr)));
                        res.arrMidBottom = obj.roundNum(Math.round((res.arrMedian + res.arrMin) / 2));
                        res.arrMidTop = obj.roundNum(Math.round((res.arrMedian + res.arrMax) / 2));
                        res.keyLow = `< ${res.type === "currency" ? currencySymbol : ""}${obj.commaFormatted(res.arrMidBottom)}`;
                        res.keyMidLow = `${res.type === "currency" ? currencySymbol : ""}${obj.commaFormatted(res.arrMidBottom)} - ${res.type === "currency" ? currencySymbol : ""}${obj.commaFormatted(res.arrMedian)}`;
                        res.keyMid = `${res.type === "currency" ? currencySymbol : ""}${obj.commaFormatted(res.arrMedian)} - ${res.type === "currency" ? currencySymbol : ""}${obj.commaFormatted(res.arrMidTop)}`;
                        res.keyMidHigh = `>= ${res.type === "currency" ? currencySymbol : ""}${obj.commaFormatted(res.arrMidTop)}`;
                        res.filter = [];
                    }
                    res.distinctItems = {};
                    res.distinctItems[res.keyLow] = countRange(cellArr, res.arrMin, res.arrMidBottom);
                    res.distinctItems[res.keyMidLow] = countRange(cellArr, res.arrMidBottom, res.arrMedian);
                    res.distinctItems[res.keyMid] = countRange(cellArr, res.arrMedian, res.arrMidTop);
                    res.distinctItems[res.keyMidHigh] = countRange2(cellArr, res.arrMidTop, res.arrMax);
                    res.more = false;
                }
            }
        });
        this.setState({facetColumns: facetColumnsCopy});
        this.setState({facetsLoaded: true});
    }

    roundNum(amount) {
        if (amount >= 100000000) {
            return Math.round(amount/10000000)*10000000;
        }
        if (amount >= 1000000) {
            return Math.round(amount/100000)*100000;
        }
        if (amount >= 100000) {
            return Math.round(amount/10000)*10000;
        }
        if (amount >= 1000) {
            return Math.round(amount/100)*100;
        }
        return amount;
    }

    commaFormatted(amount) {
        var delimiter = ","; // replace comma if desired
        var a = amount.toString().split('.',2);
        var d = a[1];
        var i = parseInt(a[0]);
        if(isNaN(i)) { return ''; }
        var minus = '';
        if(i < 0) { minus = '-'; }
        i = Math.abs(i);
        var n = new String(i);
        var a = [];
        while(n.length > 3) {
            var nn = n.substr(n.length-3);
            a.unshift(nn);
            n = n.substr(0,n.length-3);
        }
        if(n.length > 0) { a.unshift(n); }
        n = a.join(delimiter);
        try {
            if (d.length < 1) {
                amount = n;
            }
            else {
                amount = n + '.' + d;
            }
        } catch (e) {
            amount = n;
        }
        amount = minus + amount;
        return amount;
    }

    componentDidMount() {
        this.toggleModalSecurity();
        this.setState({showColumnPanel: false});
        this.setState({showFilterPanel: false});
        this.setState({username : "citizen"});
        this.setState({password : "password"});
        this.fetchData();
    }

    onLogin(username,password) {
        this.toggleModalSecurity();
        this.setState({username : username});
        this.setState({password : password});
        // setTimeout(() => {
        this.getFacets();
        // this.fetchData();
        // }, 1000);

    }

    fetchData(){
        fetch(`http://${host}:${api_port}`)
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
            .catch(err => console.log(err));
    }

    // actionConvertLang(lang){
    //     const focusedCell = this.refs.agGrid.gridOptions.api.getFocusedCell();
    //     var rowNode = this.refs.agGrid.gridOptions.api.getRowNode(focusedCell.rowIndex);
    //     rowNode.setDataValue('original_language', lang);
    // }

    render() {
        return (
            <div className={"background-container"}>
                <MenuBar className={"row menubar-top"} onClose={this.toggleModalSecurity} username={this.state.username}></MenuBar>
                <div className={"row"}>
                    <div className={"action-col-1"}>
                        <input id="searchstr" type="text" className="input-spyglass" onInput={(event) => {this.onFilterChanged(event)}} placeholder="Search: All Text Columns" />
                        <Button className={"btn-go"} onClick={() => this.actionGo()}>Go</Button>{' '}
                        <FacetedItems facetColumns={this.state.facetColumns} clearFilters={(column) => this.clearFilter(column)} facetsLoaded={this.state.facetsLoaded} columnHideToggle={this.toggleColumnNodeHiddenFlag} searchItemToggle={this.searchItemToggle}/>
                    </div>
                    <div className="ag-theme-alpine action-col-2" style={{ height: '1400px', width: '1350px'}}>
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
                            animateRows={"true"}
                            cacheQuickFilter={"true"}
                            unSortIcon={"true"}
                            // rowGroupPanelShow={'always'}
                            showToolPanel={this.state.showColumnPanel || this.state.showFilterPanel}
                        >
                        </AgGridReact>
                    </div>

                </div>

                <ModalHelp title={this.state.modalTitle} content={this.state.modalContent} isOpen={this.state.isModalHelpOpen} onClose={this.toggleModalHelp}>
                </ModalHelp>
                <ModalSecurity className={"modalsecurity"} title={this.state.modalTitle} content={this.state.modalContent} isLoading={this.state.isModalSecurityOpen} onClose={this.toggleModalSecurity} onExecute={(username,password) => this.onLogin(username,password)}>
                </ModalSecurity>
            </div>
        );
    }
}

export default App;