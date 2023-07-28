"use strict";
// Class definition
const tableName = "vehicleAdditionalInfo_datatable";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Vehicle/Configuration/AdditionalInfo/GetAllVehicleAdditionalInfos",
                        dataType: 'json',
                        params: {
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
                    field: 'name',
                    title: 'Name',
                    sortable: true,
                },
                {
                    field: 'dataType',
                    title: 'Data Type',
                    sortable: true,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'Text',
                                'class': ' label-light-primary'
                            },
                            2: {
                                'title': 'Integer',
                                'class': ' label-light-info'
                            },
                            3: {
                                'title': 'Decimal',
                                'class': ' label-light-warning'
                            },
                            4: {
                                'title': 'Date',
                                'class': ' label-light-danger'
                            },
                            5: {
                                'title': 'Selection',
                                'class': ' label-light-success'
                            },
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.dataType].class + ' label-inline">' + status[row.dataType].title + '</span>';
                    },
                },
                {
                    field: 'status',
                    title: 'Status',
                    sortable: false,
                    // callback function support for column rendering
                    template: function (row) {
                        var d = {
                            1: {
                                'title': 'Active',
                                'class': ' label-light-success'
                            },
                            0: {
                                'title': 'Inactive',
                                'class': ' label-light-danger'
                            }
                        };
                        return '<span class="label font-weight-bold label-lg ' + d[row.status].class + ' label-inline">' + d[row.status].title + '</span>';
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
                            + "<a href='/Vehicle/Configuration/AdditionalInfo/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById("SearchName").value = datatable.getDataSourceParam("name");
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

    document.getElementById("SearchName").value = "";
    localStorage.removeItem(tableName + '-1-meta');

    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", "");

    datatable.reload();
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", $('#SearchName').val().toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
