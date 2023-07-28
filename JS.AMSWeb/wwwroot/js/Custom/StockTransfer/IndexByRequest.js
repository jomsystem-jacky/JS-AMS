"use strict";
// Class definition
const transferTableName = "stock_transfer_item_datatable";

var TransferDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + transferTableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Inventory/StockTransferIn/GetAllTransferByRequest",
                        dataType: 'json',
                        params: {
                            "requestId": stockRequestId,
                        },

                        map: function (raw) {
                            $('#transfer_loading').hide();
                            $('#' + transferTableName).show();
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
                    field: 'type',
                    title: 'Transfer Type',
                    sortable: false,
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'Internal',
                            },
                            2: {
                                'title': 'Other',
                            },
                        };
                        return status[row.type].title;
                    },

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
                        if (row.type == 1) {
                            return "<div class='dropdown dropdown-inline'/>"
                                + "<a href='/Inventory/StockTransferOut/Edit?id=" + row.id + "&fromPage=requestPage' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                                + "<i class='fas fa-search-plus'></i>"
                                + "</a>"
                                ;

                        }
                        else if (row.type == 2) {
                            return "<div class='dropdown dropdown-inline'/>"
                                + "<a href='/Inventory/StockTransferIn/Edit?id=" + row.id + "&fromPage=requestPage' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                                + "<i class='fas fa-search-plus'></i>"
                                + "</a>"
                                ;

                        }
                    },
                }
            ]
        });

    };


    return {
        init: function () {
            demo();
        },
    };
}();


jQuery(document).ready(function () {
    //TransferDatatableRemoteAjaxDemo.init();
});
