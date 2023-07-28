"use strict";
// Class definition
const tableName = "stock_pending_request_datatable";
const searchNoField = "SearchNo";
const searchbranchIdField = "ddBranch";
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
                        url: "/Inventory/PendingStockRequest/GetAllPendingStockRequests",
                        dataType: 'json',
                        params: {
                            "no": "",
                            "branchId": "",
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
                    field: 'requestNo',
                    title: 'Request No',
                    sortable: true,
                },
                {
                    field: 'branchName',
                    title: 'Branch',
                    sortable: true,
                },
                {
                    field: 'requestDate',
                    title: 'Date',
                    type: 'date',
                    format: 'MM/DD/YYYY',
                    sortable: true,
                    template: function (row) {
                        const date = new Date(row.requestDate);
                        const year = date.getFullYear(); // get the four-digit year
                        const month = ('0' + (date.getMonth() + 1)).slice(-2); // get the two-digit month (add leading zero and slice the last two characters)
                        const day = ('0' + date.getDate()).slice(-2); // get the two-digit day (add leading zero and slice the last two characters)
                        const formattedDate = `${day}/${month}/${year}`;
                        return formattedDate;
                    },
                },
                {
                    field: 'status',
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
                                'title': 'Confirmed',
                                'class': ' label-light-primary'
                            },
                            3: {
                                'title': 'Accepted',
                                'class': ' label-light-success'
                            },
                            4: {
                                'title': 'PartiallyAccepted',
                                'class': ' label-light-success'
                            },
                            5: {
                                'title': 'Rejected',
                                'class': ' label-light-danger'
                            },
                            6: {
                                'title': 'Received',
                                'class': ' label-light-success'
                            },
                            7: {
                                'title': 'Partially Received',
                                'class': ' label-light-success'
                            },
                            8: {
                                'title': 'Cancelled',
                                'class': ' label-light-danger'
                            },
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.status].class + ' label-inline">' + status[row.status].title + '</span>';
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
                            + "<a href='/Inventory/PendingStockRequest/Edit?id=" + row.requestId + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById(searchNoField).value = datatable.getDataSourceParam("no");
        document.getElementById(searchbranchIdField).value = datatable.getDataSourceParam("branchId");
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
    document.getElementById(searchbranchIdField).selectedIndex = -1;
    document.getElementById(searchbranchIdField).dispatchEvent(new Event("change"));
    document.getElementById(fromField).value = "";
    document.getElementById(toField).value = "";
    localStorage.removeItem(tableName + '-1-meta');

    //redraw table
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("no", "");
    datatable.setDataSourceParam("branchId", "");
    datatable.setDataSourceParam("from", "");
    datatable.setDataSourceParam("to", "");
    datatable.reload();

}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("no", document.getElementById(searchNoField).value.toLowerCase());
    datatable.setDataSourceParam("branchId", document.getElementById(searchbranchIdField).value.toLowerCase());
    datatable.setDataSourceParam("from", document.getElementById(fromField).value.toLowerCase());
    datatable.setDataSourceParam("to", document.getElementById(toField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
