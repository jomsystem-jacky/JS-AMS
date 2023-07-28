"use strict";
// Class definition
const tableName = "stock_adjustment_datatable";
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
                        url: "/Inventory/StockAdjustment/GetAllStockAdjustments",
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
                    field: 'adjustmentNo',
                    title: 'Adjustment No',
                    sortable: true,
                },
                {
                    field: 'branchName',
                    title: 'Branch',
                    sortable: true,
                },
                {
                    field: 'adjustmentDate',
                    title: 'Date',
                    type: 'date',
                    format: 'MM/DD/YYYY',
                    sortable: true,
                    template: function (row) {
                        const date = new Date(row.adjustmentDate);
                        const year = date.getFullYear(); // get the four-digit year
                        const month = ('0' + (date.getMonth() + 1)).slice(-2); // get the two-digit month (add leading zero and slice the last two characters)
                        const day = ('0' + date.getDate()).slice(-2); // get the two-digit day (add leading zero and slice the last two characters)
                        const formattedDate = `${day}/${month}/${year}`;
                        return formattedDate;
                    },
                },
                {
                    field: 'stockAdjustmentStatus',
                    title: 'Status',
                    sortable: true,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'New',
                                'class': ' label-light-success'
                            },
                            2: {
                                'title': 'Completed',
                                'class': ' label-light-primary'
                            }
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.stockAdjustmentStatus].class + ' label-inline">' + status[row.stockAdjustmentStatus].title + '</span>';
                    },
                },

                {
                    field: 'createdBy',
                    title: 'Staff',
                    sortable: false,
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a href='/Inventory/StockAdjustment/Edit?id=" + row.adjustmentId + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById(searchNoField).value = datatable.getDataSourceParam("no");
        document.getElementById(searchfromBranchIdField).value = datatable.getDataSourceParam("branchId");
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
    document.getElementById(searchfromBranchIdField).selectedIndex = -1;
    document.getElementById(searchfromBranchIdField).dispatchEvent(new Event("change"));
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
    datatable.setDataSourceParam("branchId", document.getElementById(searchfromBranchIdField).value.toLowerCase());
    datatable.setDataSourceParam("from", document.getElementById(fromField).value.toLowerCase());
    datatable.setDataSourceParam("to", document.getElementById(toField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
