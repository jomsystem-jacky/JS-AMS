"use strict";
// Class definition
const tableName = "cashSale_datatable";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Sales/CashSales/GetAllCashSales",
                        dataType: 'json',
                        params: {
                            "docNo": "",
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
                    field: 'cashSaleNo',
                    title: 'Cash Sale No',
                    sortable: true,
                },
                {
                    field: 'date',
                    title: 'Date',
                    sortable: true,
                    template: function (row) {

                        const timestamp = new Date(row.date);
                        const options = { year: 'numeric', month: 'short', day: '2-digit' };
                        const formattedDate = timestamp.toLocaleDateString('en-US', options);

                        return '<span>' + formattedDate + '</span>';
                    },
                },
                {
                    field: 'customerName',
                    title: 'Customer name',
                    sortable: true,
                },
                {
                    field: 'phoneNo',
                    title: 'Phone No.',
                    sortable: true,
                },
                {
                    field: 'amount',
                    title: 'Amount',
                    sortable: true,
                },
                {
                    field: 'salesStatus',
                    title: 'Status',
                    sortable: true,
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'New',
                                'class': ' label-light-primary'
                            },
                            2: {
                                'title': 'Closed',
                                'class': ' label-light-warning'
                            }
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.salesStatus].class + ' label-inline">' + status[row.salesStatus].title + '</span>';
                    }
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a href='/Sales/CashSales/EditCashSale?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById("SearchDocNo").value = datatable.getDataSourceParam("docNo");
    };


    return {
        init: function () {
            demo();
        },
    };
}();


function ResetTable() {
    document.getElementById("SearchDocNo").value = "";
    localStorage.removeItem(tableName + '-1-meta');
    window.location = window.location
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("docNo", $('#SearchDocNo').val().toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
