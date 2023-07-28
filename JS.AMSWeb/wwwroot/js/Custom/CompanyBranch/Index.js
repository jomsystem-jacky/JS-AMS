"use strict";
// Class definition
const tableName = "branch_datatable";
const searchField = "SearchName";
const searchRegionField = "ddRegion";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Administration/CompanySettings/CompanyBranch/GetAllBranches",
                        dataType: 'json',
                        params: {
                            "name": "",
                            "regionId": ""
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
                    field: 'branchName',
                    title: 'Name',
                    sortable: true,
                },
                {
                    field: 'phoneNumber',
                    title: 'Phone',
                    sortable: false,
                },
                {
                    field: 'regionName',
                    title: 'Region',
                    sortable: true,
                },
                {
                    field: 'branchCode',
                    title: 'Branch Code',
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
                            + "<a href='/Administration/CompanySettings/CompanyBranch/Edit?id=" + row.branchId + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });
        document.getElementById(searchField).value = datatable.getDataSourceParam("name");
        document.getElementById(searchRegionField).value = datatable.getDataSourceParam("regionId");
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
    datatable.setDataSourceParam("regionId", document.getElementById(searchRegionField).value);
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
