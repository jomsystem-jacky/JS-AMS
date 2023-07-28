"use strict";
// Class definition
const tableName = "stock_transfer_item_datatable";
const searchCodeField = "SearchCode";
const searchNameField = "SearchName";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Inventory/StockTransferOut/GetAllTransferOutItems",
                        dataType: 'json',
                        params: {
                            "transferId": stockTransferId,
                            "productCode": "",
                            "productName": ""
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
                    field: 'productCode',
                    title: 'Product Code',
                    sortable: true,
                },
                {
                    field: 'productName',
                    title: 'Product Name',
                    sortable: true,
                },
                {
                    field: 'transferQuantity',
                    title: 'Transfer',
                    sortable: false,
                },
                {
                    field: 'receivedQuantity',
                    title: 'Received',
                    sortable: false,
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        //alert(!!isEnableEditJs)
                        //alert(isEnableEditJs)
                        if (!!isEnableEditJs) {
                            return "<div class='dropdown dropdown-inline float-right'/>"
                                //+ "<a href='/Administration/CompanySettings/IPAddress/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                                + "<a onclick=deleteItem(\"" + row.stockTransferItemId + "\") class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                                + "<i class='fas fa-trash text-danger'></i>"
                                + "</a>"
                                ;
                        }
                        else {
                            return "";
                        }
                    },
                }
            ]
        });

        document.getElementById(searchCodeField).value = datatable.getDataSourceParam("productCode");
        document.getElementById(searchNameField).value = datatable.getDataSourceParam("productName");
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
    document.getElementById(searchCodeField).value = "";
    document.getElementById(searchNameField).value = "";
    localStorage.removeItem(tableName + '-1-meta');

    //redraw table
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("productCode", "");
    datatable.setDataSourceParam("productName", "");
    datatable.reload();
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("productCode", document.getElementById(searchCodeField).value.toLowerCase());
    datatable.setDataSourceParam("productName", document.getElementById(searchNameField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
