"use strict";
// Class definition
const tableName = "warranty_datatable";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/ItemManagement/Configuration/Warranty/GetAllWarranties",
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
                    field: 'period',
                    title: 'Period',
                    sortable: true,
                }, {
                    field: 'periodType',
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
                        return '<span class="label font-weight-bold label-lg ' + status[row.periodType].class + ' label-inline">' + status[row.periodType].title + '</span>';
                    },
                },
                {
                    field: 'companyName',
                    title: 'Company',
                    sortable: true,
                },
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
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a href='/ItemManagement/Configuration/Warranty/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        //document.getElementById("SearchCompany").value = datatable.getDataSourceParam("companyId");
    };


    return {
        init: function () {
            demo();
        },
    };
}();


//function ResetTable() {
//    document.getElementById("SearchCompany").value = "";
//    localStorage.removeItem(tableName + '-1-meta');
//    window.location = window.location
//}
//function Search() {

//    $('#loading').show();
//    $('#' + tableName).hide();
//    var datatable = $('#' + tableName).KTDatatable();
//    datatable.setDataSourceParam("companyId", $('#SearchCompany').val().toLowerCase());
//    datatable.reload();
//}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
