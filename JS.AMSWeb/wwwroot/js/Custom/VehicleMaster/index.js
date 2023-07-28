"use strict";
// Class definition
const tableName = "vehicleMaster_datatable";
const searchNameField = "Name";
const searchPlateField = "PlateNumber";

var VehicleDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Vehicle/Controllers/VehicleMaster/GetAllVehicleMaster",
                        dataType: 'json',
                        params: {
                            "name": "",
                            "plateNumber": ""
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
                    title: 'Client Name',
                    sortable: true,
                },
                {
                    field: 'plateNumber',
                    title: 'Plate Number',
                    sortable: true,
                },
                {
                    field: 'type',
                    title: 'Type',
                    sortable: true,
                    template: function (row) {
                        var v = {
                            1: {
                                'title': 'Car',
                                'class': ' label-light-primary'
                            },
                        };
                        return '<span class="label font-weight-bold label-lg ' + v[row.type].class + ' label-inline">' + v[row.type].title + '</span>';
                    },
                },
                {
                    field: 'brandName',
                    title: 'Brand Name',
                    sortable: true,
                },
                {
                    field: 'modelName',
                    title: 'Model Name',
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
                            + "<a href='/Vehicle/Controllers/VehicleMaster/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById(searchNameField).value = datatable.getDataSourceParam("name");
        document.getElementById(searchPlateField).value = datatable.getDataSourceParam("plateNumber");
    };


    return {
        init: function () {
            demo();
        },
    };
}();

function ResetTable() {
    document.getElementById(searchNameField).value = "";
    document.getElementById(searchPlateField).value = "";
    localStorage.removeItem(tableName + '-1-meta');
    window.location = window.location
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", document.getElementById(searchNameField).value);
    datatable.setDataSourceParam("plateNumber", document.getElementById(searchPlateField).value);
    datatable.reload();
}

jQuery(document).ready(function () {
    VehicleDatatableRemoteAjaxDemo.init();
});