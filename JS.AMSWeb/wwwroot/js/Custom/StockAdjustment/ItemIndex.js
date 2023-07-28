"use strict";
// Class definition
const tableName = "stock_adjustment_item_datatable";
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
                        url: "/Inventory/StockAdjustment/GetAllStockItemAdjustments",
                        dataType: 'json',
                        params: {
                            "stockAdjustmentId": stockAdjustmentId,
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
                    field: 'quantityBefore',
                    title: 'Quantity Before',
                    sortable: false,
                },
                {
                    field: 'adjustQuantity',
                    title: 'Adjust Quantity',
                    sortable: false,
                    template: function (row) {
                        if (adjustmentStatus == "New") {
                            return '<div class="col-6"'
                                + 'id="qParent' + row.stockAdjustmentItemId + '" >'
                                + '<span class="value-label"'
                                + 'id="q' + row.stockAdjustmentItemId + '" >'
                                + row.adjustQuantity
                                + ' </span>'
                                + '</div>'
                                ;
                        }
                        else {
                            return row.adjustQuantity;
                        }
                    }
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        if (adjustmentStatus == "New") {
                            return "<div class='dropdown dropdown-inline'/>"
                                + "<button type='button' id='btnEdit" + row.stockAdjustmentItemId + "' class='btn btn-sm btn-clean btn-icon edit-row' onclick='EditItem(\"" + row.stockAdjustmentItemId + "\")' title='Edit'>"
                                + "<i  id='btnEditIcon" + row.stockAdjustmentItemId + "' class='far fa-edit'></i>"
                                + "</button>"
                                + "<a onclick=deleteItem(\"" + row.stockAdjustmentItemId + "\") class='btn btn-sm btn-clean btn-icon mr-2' title='Delete'>"
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
