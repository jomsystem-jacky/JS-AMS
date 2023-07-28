"use strict";
// Class definition
const tableName = "transaction_datatable";
const searchNameField = "Name";
const searchTypeField = "Type";
const searchStatusField = "Status";
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
                        url: "/Finance/Controllers/Transaction/GetAllTransaction",
                        dataType: 'json',
                        params: {
                            "no": "",
                            "type": "",
                            "status": "",
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
                    field: 'name',
                    title: 'Branch Name',
                    sortable: true,
                },
                {
                    field: 'amount',
                    title: 'Amount',
                    sortable: false,
                },
                {
                    field: 'date',
                    title: 'Date',
                    type: 'date',
                    format: 'MM/DD/YYYY',
                    sortable: true,
                    template: function (row) {
                        const date = new Date(row.date);
                        const year = date.getFullYear(); // get the four-digit year
                        const month = ('0' + (date.getMonth() + 1)).slice(-2); // get the two-digit month (add leading zero and slice the last two characters)
                        const day = ('0' + date.getDate()).slice(-2); // get the two-digit day (add leading zero and slice the last two characters)
                        const formattedDate = `${day}/${month}/${year}`;
                        return formattedDate;
                    },
                },
                {
                    field: 'type',
                    title: 'Type',
                    sortable: true,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'Cash Sales',
                                'class': ' label-light-success'
                            },
                            2: {
                                'title': 'Delivery Cash Sales',
                                'class': ' label-light-success'
                            },
                            3: {
                                'title': 'Delivery Order',
                                'class': ' label-light-success'
                            },
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.type].class + ' label-inline">' + status[row.type].title + '</span>';
                    },
                },
                {
                    field: 'status',
                    title: 'Status',
                    sortable: true,
                    // callback function support for column rendering
                    template: function (row) {
                        var v = {
                            1: {
                                'title': 'New',
                                'class': ' label-light-success'
                            },
                            2: {
                                'title': 'Pending',
                                'class': ' label-light-success'
                            },
                            3: {
                                'title': 'Closed',
                                'class': ' label-light-success'
                            },
                        };
                        return '<span class="label font-weight-bold label-lg ' + v[row.status].class + ' label-inline">' + v[row.status].title + '</span>';
                    },
                },
                {
                    field: 'paymentMethod',
                    title: 'Payment Method',
                    sortable: false,
                },
                {
                    field: 'typeRefNo',
                    title: 'Ref No',
                    sortable: false,
                    /*template: function (row) {
                    return "<div class='dropdown dropdown-inline'/>"
                        + "<a href=' put link here "
                        + row.typeRefNo + "'>"
                        + "</a>"
                            ;*/
                },
                {
                    field: 'paymentReceipt',
                    title: 'Payment Receipt',
                    sortable: false,
                    template: function (row) {
                        if (!row.isReceiptUploaded) {
                            return '<a href="#" onclick="uploadReceiptPopUp()">Upload Receipt</a>';
                        } else {
                            return '<a href="' + row.paymentReceipt + '" target="_blank">View Receipt</a>';
                        }
                    }
                }
                /*{
                    field: 'paymentReceipt',
                    title: 'Payment Receipt',
                    sortable: false,
                    template: function (value) {
                        if (value === null) {
                            return '<a href="#" onclick="uploadReceiptPopUp()">Upload Receipt</a>';
                        } else {
                            return '<a href="' + value + '" target="_blank">View Receipt</a>';
                        }
                    }
                }*/
            ]
        });

        document.getElementById(searchNameField).value = datatable.getDataSourceParam("name");
        document.getElementById(searchTypeField).value = datatable.getDataSourceParam("type");
        document.getElementById(searchStatusField).value = datatable.getDataSourceParam("status");
        document.getElementById(fromField).value = datatable.getDataSourceParam("from");
        document.getElementById(toField).value = datatable.getDataSourceParam("to");
    };


    return {
        init: function () {
            demo();
        },
    };
}();

function uploadReceiptPopUp() {
    $('#uploadReceipt').modal('show');
}

function closeUploadReceipt() {
    $('#uploadReceipt').modal('hide');
}

function ResetTable() {
    //show loading
    $('#loading').show();
    $('#' + tableName).hide();

    //set text field value to null
    document.getElementById(searchNameField).value = "";
    document.getElementById(searchTypeField).value = "";
    document.getElementById(searchStatusField).value = "";
    document.getElementById(fromField).value = "";
    document.getElementById(toField).value = "";
    localStorage.removeItem(tableName + '-1-meta');

    //redraw table
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("no", "");
    datatable.setDataSourceParam("type", "");
    datatable.setDataSourceParam("status", "");
    datatable.setDataSourceParam("from", "");
    datatable.setDataSourceParam("to", "");
    datatable.reload();
}

function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", document.getElementById(searchNameField).value.toLowerCase());
    datatable.setDataSourceParam("type", document.getElementById(searchTypeField).value.toLowerCase());
    datatable.setDataSourceParam("status", document.getElementById(searchStatusField).value.toLowerCase());
    datatable.setDataSourceParam("from", document.getElementById(fromField).value.toLowerCase());
    datatable.setDataSourceParam("to", document.getElementById(toField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
