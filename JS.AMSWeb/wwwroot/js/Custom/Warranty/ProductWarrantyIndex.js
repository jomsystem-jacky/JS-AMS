"use strict";
// Class definition
const tableName = "product_warranty_datatable";

var ProductWarrantyDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/ItemManagement/Configuration/Warranty/GetProductWarranties",
                        dataType: 'json',
                        params: {
                            "productId": productId,
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
                    field: 'period',
                    title: 'Period',
                    sortable: true,
                }, {
                    field: 'type',
                    title: 'Period Type',
                    sortable: false,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'Day',
                                'class': ' label-light-success'
                            },
                            2: {
                                'title': 'Month',
                                'class': ' label-light-warning'
                            },
                            3: {
                                'title': 'Year',
                                'class': ' label-light-info'
                            }
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.type].class + ' label-inline">' + status[row.type].title + '</span>';
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
                            //+ "<a href='/Administration/CompanySettings/IPAddress/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<a onclick=deletePW(\"" + row.id + "\") class='btn btn-sm btn-clean btn-icon mr-2' title='Delete'>"
                            + "<i class='fas fa-trash text-danger'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });
    };


    return {
        init: function () {
            demo();
        },
    };
}();

//jQuery(document).ready(function () {
//    ProductWarrantyDatatableRemoteAjaxDemo.init();
//});
