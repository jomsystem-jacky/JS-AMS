"use strict";
// Class definition
const tableName = "tax_datatable";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Sales/Configuration/Tax/GetAllTax",
                        dataType: 'json',
                        params: {
                            "taxCode": "",
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
                    field: 'taxCode',
                    title: 'Tax Code',
                    sortable: true,
                },
                {
                    field: 'taxType',
                    title: 'Tax Type ',
                    sortable: false,
                    template: function (row) {
                        var type = {
                            1: {
                                'title': 'Amount',
                                //'class': ' label-light-danger'
                            },
                            2: {
                                'title': 'Percentage',
                                //'class': ' label-light-success'
                            }
                        };

                        return '<span>' + type[row.taxType].title + '</span>';
                    },
                },
                {
                    field: 'taxAmount',
                    title: 'Tax Amount',
                    sortable: true,
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a href='/Sales/Configuration/Tax/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById("SearchTaxCode").value = datatable.getDataSourceParam("taxCode");
    };


    return {
        init: function () {
            demo();
        },
    };
}();


function ResetTable() {
    document.getElementById("SearchTaxCode").value = "";
    localStorage.removeItem(tableName + '-1-meta');
    window.location = window.location
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("taxCode", $('#SearchTaxCode').val().toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
