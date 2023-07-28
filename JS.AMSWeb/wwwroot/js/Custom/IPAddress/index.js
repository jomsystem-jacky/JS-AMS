"use strict";
// Class definition
const tableName = "ip_datatable";

var IPKTDatatable = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Administration/CompanySettings/IPAddress/GetIPAddressByBranchId",
                        dataType: 'json',
                        params: {
                            "branchId": branchId,
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
                pageSize: 5,
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
                    field: 'ipAddress',
                    title: 'IP Address',
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
                            + "<a onclick=deleteIP(\"" + row.id + "\") class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
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

jQuery(document).ready(function () {
    IPKTDatatable.init();
});
