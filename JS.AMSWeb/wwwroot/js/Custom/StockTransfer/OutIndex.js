"use strict";
// Class definition
const tableName = "stock_transfer_out_datatable";
const searchNoField = "SearchNo";
const searchFrombranchIdField = "ddFrom";
const searchTobranchIdField = "ddTo";
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
                        url: "/Inventory/StockTransferOut/GetTransferOut",
                        dataType: 'json',
                        params: {
                            "no": "",
                            "fromBranchId": "",
                            "toBranchId": "",
                            "from": "",
                            "to": ""
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
                    field: 'transferRefNo',
                    title: 'Transfer No',
                    sortable: true,
                },
                {
                    field: 'originBranchName',
                    title: 'From',
                    sortable: false,
                },
                {
                    field: 'destinationBranchName',
                    title: 'To',
                    sortable: false,
                },
                {
                    field: 'transferDate',
                    title: 'Date',
                    type: 'date',
                    format: 'MM/DD/YYYY',
                    sortable: true,
                    template: function (row) {
                        const date = new Date(row.transferDate);
                        const year = date.getFullYear(); // get the four-digit year
                        const month = ('0' + (date.getMonth() + 1)).slice(-2); // get the two-digit month (add leading zero and slice the last two characters)
                        const day = ('0' + date.getDate()).slice(-2); // get the two-digit day (add leading zero and slice the last two characters)
                        const formattedDate = `${day}/${month}/${year}`;
                        return formattedDate;
                    },
                },
                {
                    field: 'transferStatus',
                    title: 'Status',
                    sortable: true,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'New',
                                'class': ' label-light-primary'
                            },
                            2: {
                                'title': 'Pending Confirm',
                                'class': ' label-light-primary'
                            },
                            3: {
                                'title': 'Confirm',
                                'class': ' label-light-primary'
                            },
                            4: {
                                'title': 'Partially Accepted',
                                'class': ' label-light-success'
                            },
                            5: {
                                'title': 'Accepted',
                                'class': ' label-light-success'
                            },
                            6: {
                                'title': 'Cancelled',
                                'class': ' label-light-danger'
                            },
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.transferStatus].class + ' label-inline">' + status[row.transferStatus].title + '</span>';
                    },
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a href='/Inventory/StockTransferOut/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById(searchNoField).value = datatable.getDataSourceParam("no");
        document.getElementById(searchFrombranchIdField).value = datatable.getDataSourceParam("fromBranchId");
        document.getElementById(searchTobranchIdField).value = datatable.getDataSourceParam("toBranchId");
        document.getElementById(fromField).value = datatable.getDataSourceParam("from");
        document.getElementById(toField).value = datatable.getDataSourceParam("to");
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
    document.getElementById(searchNoField).value = "";
    document.getElementById(searchFrombranchIdField).selectedIndex = -1;
    document.getElementById(searchFrombranchIdField).dispatchEvent(new Event("change"));
    document.getElementById(searchTobranchIdField).selectedIndex = -1;
    document.getElementById(searchTobranchIdField).dispatchEvent(new Event("change"));
    document.getElementById(fromField).value = "";
    document.getElementById(toField).value = "";
    localStorage.removeItem(tableName + '-1-meta');

    //redraw table
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("no", "");
    datatable.setDataSourceParam("fromBranchId", "");
    datatable.setDataSourceParam("toBranchId", "");
    datatable.setDataSourceParam("from", "");
    datatable.setDataSourceParam("to", "");
    datatable.reload();
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("no", document.getElementById(searchNoField).value.toLowerCase());
    datatable.setDataSourceParam("fromBranchId", document.getElementById(searchFrombranchIdField).value.toLowerCase());
    datatable.setDataSourceParam("toBranchId", document.getElementById(searchTobranchIdField).value.toLowerCase());
    datatable.setDataSourceParam("from", document.getElementById(fromField).value.toLowerCase());
    datatable.setDataSourceParam("to", document.getElementById(toField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
