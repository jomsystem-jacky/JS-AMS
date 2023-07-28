"use strict";
// Class definition
const tableName = "priceBookItem_datatable";
const searchField = "SearchName";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {

        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/ItemManagement/PriceBook/GetAllItemsByPriceBookId",
                        dataType: 'json',
                        params: {
                            "priceBookId": priceBookId,
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
                editable: true,
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
                    field: 'productName',
                    title: 'Name',
                    sortable: true,
                },
                //{
                //    field: 'currencyCode',
                //    title: 'Currency',
                //    sortable: false,
                //},
                {
                    field: 'sellingPrice',
                    title: 'Price',
                    sortable: true,
                    template: function (row) {
                        return '<div class="col-6"'
                            + 'id="spParent' + row.priceBookItemId + '" >'
                            + '<span class="value-label"'
                            + 'id="sp' + row.priceBookItemId + '" >'
                            + row.sellingPrice.toFixed(2)
                            + ' </span>'
                            + '</div>'
                            ;
                    }
                },
                //{
                //    field: 'sellingPrice',
                //    title: 'Price',
                //    sortable: true,
                //    template: function (row) {
                //        return '<div class="col-6">'
                //            + '<input type="number" class="form-control"'
                //            + 'id="' + row.id + '" value="'
                //            + row.sellingPrice
                //            + '" />'
                //            + '<span></span>'
                //            + '</div>'
                //            ;
                //    },
                //},
                {
                    field: 'minSellingPrice',
                    title: 'Min Price',
                    sortable: true,
                    template: function (row) {
                        const value = row.minSellingPrice == null ? '-' : row.minSellingPrice.toFixed(2);
                        return '<div class="col-6"'
                            + 'id="mspParent' + row.priceBookItemId + '" >'
                            + '<span class="value-label"'
                            + 'id="msp' + row.priceBookItemId + '" >'
                            + value
                            + ' </span>'
                            + '</div>'
                            ;
                    }
                },
                //{
                //    field: 'code',
                //    title: 'Code',
                //    sortable: true,
                //},
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a href='/Client/Debtor/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            + "<button type='button' id='btnEdit" + row.priceBookItemId + "' class='btn btn-sm btn-clean btn-icon edit-row' onclick='EditPrice(\"" + row.priceBookItemId + "\")' title='Edit'>"
                            + "<i  id='btnEditIcon" + row.priceBookItemId + "' class='far fa-edit'></i>"
                            + "</button>"
                            ;
                    },
                }
            ]
        })

        //// Edit button click event handler
        //datatable.on('click', '.edit-row', function (e) {
        //    e.preventDefault();
        //    var row = $(this).closest('tr');
        //    var rowData = datatable.row(row).data();
        //    var rowId = rowData.productId;
        //    console.log(rowData);
        //    datatable.setCellFocus(row, 1); // enable editing for the Price field
        //});

        document.getElementById(searchField).value = datatable.getDataSourceParam("name");
    };


    return {
        init: function () {
            demo();
        },
    };
}();

function ResetPriceBookTable() {
    $('#loading').show();
    $('#' + tableName).hide();

    document.getElementById(searchField).value = "";
    localStorage.removeItem(tableName + '-1-meta');

    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", "");
    datatable.reload();
}
function SearchPriceBook() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", document.getElementById(searchField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
