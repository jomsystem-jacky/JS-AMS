"use strict";
// Class definition
const productUOMTableName = "product_uom_datatable";
const searchNameField = "searchName";

var UOMDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + productUOMTableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/ItemManagement/Configuration/UOM/GetUOMsByProductId",
                        dataType: 'json',
                        params: {
                            "name": "",
                            "productId": productId,
                        },

                        map: function (raw) {
                            $('#loading').hide();
                            $('#' + productUOMTableName).show();
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
                    title: 'Name',
                    sortable: true,
                },
                //{
                //    field: 'seqNo',
                //    title: 'Sequence',
                //    sortable: true,
                //},
                {
                    field: 'isActive',
                    title: 'Active',
                    sortable: false,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            true: {
                                'title': 'Active',
                                'class': ' label-light-success'
                            },
                            false: {
                                'title': 'Inactive',
                                'class': ' label-light-danger'
                            }
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.isActive].class + ' label-inline">' + status[row.isActive].title + '</span>';
                    },
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        return "<div class='dropdown dropdown-inline float-right'/>"
                            + "<a onclick=deleteUOM(\"" + row.id + "\") class='btn btn-sm btn-clean btn-icon mr-2' title='Delete'>"
                            + "<i class='fas fa-trash text-danger'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById("searchName").value = datatable.getDataSourceParam("name");
    };


    return {
        init: function () {
            demo();
        },
    };
}();


function ResetTable() {
    document.getElementById("searchName").value = "";
    localStorage.removeItem(productUOMTableName + '-1-meta');
    window.location = window.location
}
function Search() {

    $('#loading').show();
    $('#' + productUOMTableName).hide();
    var datatable = $('#' + productUOMTableName).KTDatatable();
    datatable.setDataSourceParam("name", $('#searchName').val().toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    //UOMDatatableRemoteAjaxDemo.init();
});
