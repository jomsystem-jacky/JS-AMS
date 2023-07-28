"use strict";
// Class definition
const tableName = "vehicleModel_datatable";
const searchBrandField = "BrandId";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Vehicle/Configuration/VehicleModel/GetAllVehicleModel",
                        dataType: 'json',
                        params: {
                            "brandId": ""
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
                    field: 'modelLogoUrl',
                    title: 'Model Logo',
                    sortable: true,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        return "<div>"
                            + "<img width='75' height='auto' src='" + row.modelLogoUrl + "'</img>"
                            + "</div>"
                            ;
                    },
                },
                {
                    field: 'name',
                    title: 'Model Name',
                    sortable: true,
                },
                {
                    field: 'brandName',
                    title: 'Brand Name',
                    sortable: true,
                },
                {
                    field: 'isActive',
                    title: 'Activity Status',
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            true: {
                                'title': 'Active',
                                'class': ' label-light-danger'
                            },
                            false: {
                                'title': 'Not Active',
                                'class': ' label-light-info'
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
                            + "<a href='/Vehicle/Configuration/VehicleModel/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById(searchBrandField).value = datatable.getDataSourceParam("brandId");
    };


    return {
        init: function () {
            demo();
        },
    };
}();


function ResetTable() {
    document.getElementById(searchBrandField).value = "";
    localStorage.removeItem(tableName + '-1-meta');
    window.location = window.location
}

function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("brandId", document.getElementById(searchBrandField).value);
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});