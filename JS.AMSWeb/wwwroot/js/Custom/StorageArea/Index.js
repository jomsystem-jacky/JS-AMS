"use strict";
// Class definition
const tableName = "storage_area_datatable";
const searchField = "SearchName";

var KTDatatable = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Inventory/Configuration/StorageArea/GetAllStorageAreas",
                        dataType: 'json',
                        params: {
                            //"branchId": branchId,
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
                },
                {
                    field: 'cityName',
                    title: 'location',
                    template: function (row) {
                        return row.cityName
                            + ", "
                            + row.stateName
                            ;
                    }
                },
                {
                    field: 'storageType',
                    title: 'Type',
                    sortable: false,
                    template: function (row) {
                        var type = {
                            1: {
                                'title': 'Branch',
                                'class': ' label-light-primary'
                            },
                            2: {
                                'title': 'Warehouse',
                                'class': ' label-light-success'
                            }
                        };
                        return '<span class="label font-weight-bold label-lg ' + type[row.storageType].class + ' label-inline">' + type[row.storageType].title + '</span>';
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
                            + "<a href='/Inventory/Configuration/StorageArea/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
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

function ResetTable() {
    document.getElementById(searchField).value = "";
    localStorage.removeItem(tableName + '-1-meta');
    window.location = window.location
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", document.getElementById(searchField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatable.init();
});
