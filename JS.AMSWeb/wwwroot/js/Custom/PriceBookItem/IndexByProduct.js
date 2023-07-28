"use strict";
// Class definition
const productPriceBookItemTable = "product_price_book_item_datatable";

var ProductPriceBookItemDatatableRemoteAjaxDemo = function () {
    var demo = function () {

        var datatable = $('#' + productPriceBookItemTable).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/ItemManagement/PriceBook/GetAllItemsByProductId",
                        dataType: 'json',
                        params: {
                            "productId": productId,
                            "priceBookName": "",
                        },

                        map: function (raw) {
                            $('#loading').hide();
                            $('#' + productPriceBookItemTable).show();
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
                    field: 'priceBookName',
                    title: 'Price Book',
                    sortable: true,
                },
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
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a href='/ItemManagement/PriceBook/Edit?id=" + row.priceBookId + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
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
        document.getElementById("SearchName").value = datatable.getDataSourceParam("name");
    };


    return {
        init: function () {
            demo();
        },
    };
}();

function ResetPriceBookTable() {
    document.getElementById("SearchName").value = "";
    localStorage.removeItem(productPriceBookItemTable + '-1-meta');
    window.location = window.location
}
function SearchPriceBook() {

    $('#loading').show();
    $('#' + productPriceBookItemTable).hide();
    var datatable = $('#' + productPriceBookItemTable).KTDatatable();
    datatable.setDataSourceParam("name", $('#SearchName').val().toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    //ProductPriceBookItemDatatableRemoteAjaxDemo.init();
});
