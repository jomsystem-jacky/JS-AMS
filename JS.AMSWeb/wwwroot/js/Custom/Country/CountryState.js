"use strict";
// Class definition
const tableName = "state_datatable";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Administration/AreaManagement/State/GetStateByCountryId",
                        dataType: 'json',
                        data: { "id": countryId },
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
                    field: 'name',
                    title: 'Name',
                    sortable: true,
                },
                {
                    field: 'isActive',
                    title: 'Active',
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            true: {
                                'title': 'Active',
                                'class': ' label-light-danger'
                            },
                            false: {
                                'title': 'Inactive',
                                'class': ' label-light-success'
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
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a href='/Administration/AreaManagement/State/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
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
    KTDatatableRemoteAjaxDemo.init();
});
