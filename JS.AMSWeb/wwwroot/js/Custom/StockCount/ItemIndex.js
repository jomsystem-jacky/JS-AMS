"use strict";
// Class definition
const tableName = "stock_count_item_datatable";
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
                        url: "/Inventory/StockCount/GetAllStockCountItems",
                        dataType: 'json',
                        params: {
                            "stockCountId": stockCountId,
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
                    field: 'currentQuantity',
                    title: 'Current Quantity',
                    sortable: false,
                },
                {
                    field: 'actualQuantity',
                    title: 'Actual Quantity',
                    sortable: false,
                    template: function (row) {
                        if (stockCountStatus == "New") {
                            //const value = row.actualQuantity || '-';
                            return '<div class="col-6"'
                                + 'id="qParent' + row.stockCountItemId + '" >'
                                + '<span class="value-label"'
                                + 'id="q' + row.stockCountItemId + '" >'
                                + row.actualQuantity
                                + ' </span>'
                                + '</div>'
                                ;
                        }
                        else {
                            return row.actualQuantity;
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
                        if (stockCountStatus == "New") {
                            return "<div class='dropdown dropdown-inline'/>"
                                + "<button type='button' id='btnEdit" + row.stockCountItemId + "' class='btn btn-sm btn-clean btn-icon edit-row' onclick='EditItem(\"" + row.stockCountItemId + "\")' title='Edit'>"
                                + "<i  id='btnEditIcon" + row.stockCountItemId + "' class='far fa-edit'></i>"
                                + "</button>"
                                ;
                        }
                        else {
                            return ""
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
