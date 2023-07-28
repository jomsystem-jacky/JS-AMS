"use strict";
// Class definition
const tableName = "stock_movement_datatable";
const searchfromBranchIdField = "searchFromBranch";
const searchtoBranchIdField = "searchToBranch";
const searchProductField = "SearchProduct";
const fromField = "From";
const toField = "To";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Inventory/StockMovement/GetAllMovement",
                        dataType: 'json',
                        params: {
                            "product": "",
                            "fromBranchId": "",
                            "toBranchId": "",
                            "from": "",
                            "to": "",
                        },

                        map: function (raw) {
                            $('#loading').hide();
                            $('#' + tableName).show();
                            // sample data mapping
                            var dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
                //    saveState: false
            },

            // layout definition
            layout: {
                scroll: false,
                footer: false,
                spinner: {
                    message: true,
                    message: "Loading..."
                }
            },

            // column sorting
            sortable: true,
            pagination: true,

            // columns definition
            columns: [
                {
                    field: 'originBranchName',
                    title: 'From',
                    sortable: true,
                    width: 150
                },
                {
                    field: 'destinationBranchName',
                    title: 'To',
                    sortable: true,
                    width: 150
                },
                {
                    field: 'transactionDateTime',
                    title: 'Date',
                    type: 'date',
                    format: 'MM/DD/YYYY',
                    sortable: true,
                    width: 100,
                    template: function (row) {
                        const date = new Date(row.transactionDateTime);
                        const year = date.getFullYear(); // get the four-digit year
                        const month = ('0' + (date.getMonth() + 1)).slice(-2); // get the two-digit month (add leading zero and slice the last two characters)
                        const day = ('0' + date.getDate()).slice(-2); // get the two-digit day (add leading zero and slice the last two characters)
                        const formattedDate = `${day}/${month}/${year}`;
                        return formattedDate;
                    },
                },
                {
                    field: 'product',
                    title: 'Name',
                    sortable: true,
                    template: function (row) {
                        return row.productCode + " - " + row.productName
                            ;
                    },
                },
                {
                    field: 'quantity',
                    title: 'Quantity',
                    sortable: false,
                    width: 100
                },
                {
                    field: 'type',
                    title: 'Type',
                    sortable: false,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'Stock Transfer',
                                'class': ' label-light-success'
                            },
                            2: {
                                'title': 'Stock Received',
                                'class': ' label-light-success'
                            },
                            3: {
                                'title': 'Stock Adjustment',
                                'class': ' label-light-success'
                            },
                            4: {
                                'title': 'Stock Count',
                                'class': ' label-light-success'
                            },
                            5: {
                                'title': 'Cash Sales',
                                'class': ' label-light-success'
                            },
                            6: {
                                'title': 'Delivery Cash Sales',
                                'class': ' label-light-success'
                            },
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.type].class + ' label-inline">' + status[row.type].title + '</span>';
                    },
                },

                {
                    field: 'docRefNo',
                    title: 'Ref No',
                    sortable: false,
                },
            ]
        });

        document.getElementById(searchfromBranchIdField).value = datatable.getDataSourceParam("fromBranchId");
        document.getElementById(searchtoBranchIdField).value = datatable.getDataSourceParam("toBranchId");
        document.getElementById(fromField).value = datatable.getDataSourceParam("from");
        document.getElementById(toField).value = datatable.getDataSourceParam("to");
        document.getElementById(searchProductField).value = datatable.getDataSourceParam("product");
    };


    return {
        init: function () {
            demo();
        },
    };
}();


function ResetTable() {
    //show loading
    $('#loading').show();
    $('#' + tableName).hide();

    //set text field value to null
    document.getElementById(searchfromBranchIdField).selectedIndex = -1;
    document.getElementById(searchfromBranchIdField).dispatchEvent(new Event("change"));
    document.getElementById(searchtoBranchIdField).selectedIndex = -1;
    document.getElementById(searchtoBranchIdField).dispatchEvent(new Event("change"));
    document.getElementById(searchProductField).value = "";
    document.getElementById(toField).value = "";
    document.getElementById(fromField).value = "";

    localStorage.removeItem(tableName + '-1-meta');

    //redraw table
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("fromBranchId", "");
    datatable.setDataSourceParam("toBranchId", "");
    datatable.setDataSourceParam("product", "");
    datatable.setDataSourceParam("from", "");
    datatable.setDataSourceParam("to", "");
    datatable.reload();
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("fromBranchId", document.getElementById(searchfromBranchIdField).value.toLowerCase());
    datatable.setDataSourceParam("toBranchId", document.getElementById(searchtoBranchIdField).value.toLowerCase());
    datatable.setDataSourceParam("product", document.getElementById(searchProductField).value.toLowerCase());
    datatable.setDataSourceParam("from", document.getElementById(fromField).value.toLowerCase());
    datatable.setDataSourceParam("to", document.getElementById(toField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
