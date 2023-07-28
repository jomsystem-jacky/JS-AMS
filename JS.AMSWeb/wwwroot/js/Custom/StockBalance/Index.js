"use strict";
// Class definition
const tableName = "stock_balance_datatable";
const searchbranchIdField = "ddBranch";
const searchCodeField = "SearchCode";
const searchNameField = "SearchName";

var ProductWarrantyDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Inventory/StockBalanceInquiry/GetAllStock",
                        dataType: 'json',
                        params: {
                            "branchId": "",
                            "code": "",
                            "name": "",
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
                    field: 'branchName',
                    title: 'Branch',
                    sortable: true,
                    width: 150
                },
                {
                    field: 'productCode',
                    title: 'Code',
                    sortable: true,
                    width: 100
                },
                {
                    field: 'productName',
                    title: 'Name',
                    sortable: true,
                    template: function (row) {
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a href='/ItemManagement/ItemMaster/Edit?id=" + row.productId + "'>"
                            + row.productName
                            + "</a>"
                            ;
                    },
                },
                {
                    field: 'productCategoryName',
                    title: 'Category',
                    sortable: true,
                    width: 100
                },
                {
                    field: 'quantityOnHand',
                    title: 'On Hand',
                    sortable: false,
                },
                {
                    field: 'quantityReadyToSell',
                    title: 'Ready To Sell',
                    sortable: false,
                },
            ]
        });

        InitSelectBranchOptions(companyId, "#ddBranch", datatable.getDataSourceParam("branchId"));
        document.getElementById(searchCodeField).value = datatable.getDataSourceParam("code");
        document.getElementById(searchNameField).value = datatable.getDataSourceParam("name");
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
    document.getElementById(searchbranchIdField).selectedIndex = -1;
    document.getElementById(searchbranchIdField).dispatchEvent(new Event("change"));
    document.getElementById(searchCodeField).value = "";
    document.getElementById(searchNameField).value = "";

    localStorage.removeItem(tableName + '-1-meta');

    //redraw table
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("branchId", "");
    datatable.setDataSourceParam("code", "");
    datatable.setDataSourceParam("name", "");
    datatable.reload();
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("branchId", document.getElementById(searchbranchIdField).value.toLowerCase());
    datatable.setDataSourceParam("code", document.getElementById(searchCodeField).value.toLowerCase());
    datatable.setDataSourceParam("name", document.getElementById(searchNameField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    ProductWarrantyDatatableRemoteAjaxDemo.init();
});
