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
                        url: "/Inventory/StockTransferIn/GetAllTransferInItems",
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
                    template: function (row) {
                        const value = row.receivedQuantity || '-';
                        return '<div class="col-6"'
                            + 'id="qParent' + row.stockTransferItemId + '" >'
                            + '<span class="value-label"'
                            + 'id="q' + row.stockTransferItemId + '" >'
                            + value
                            + ' </span>'
                            + '</div>'
                            ;
                    }
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        if (transferStatus.toLowerCase() == "confirm") {
                            return "<div class='dropdown dropdown-inline'/>"
                                + "<button type='button' id='btnEdit" + row.stockTransferItemId + "' class='btn btn-sm btn-clean btn-icon edit-row' onclick='EditItem(\"" + row.stockTransferItemId + "\",\"" + row.transferQuantity + "\")' title='Edit'>"
                                + "<i  id='btnEditIcon" + row.stockTransferItemId + "' class='far fa-edit'></i>"
                                + "</button>"
                                ;
                        }
                        else if (transferStatus.toLowerCase() == "pendingconfirm") {
                            return "<div class='dropdown dropdown-inline'/>"
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
