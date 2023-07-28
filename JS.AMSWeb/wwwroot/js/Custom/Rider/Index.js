"use strict";
// Class definition
const tableName = "rider_datatable";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Administration/UserManagement/Rider/GetAllRiders",
                        dataType: 'json',
                        params: {
                            "name": "",
                            "icPassport": "",
                            "phoneNumber": "",
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
                    field: 'fullName',
                    title: 'Full Name',
                    sortable: true,
                },
                {
                    field: 'icPassport',
                    title: 'Ic Passport',
                    sortable: true,
                },
                {
                    field: 'phoneNumber',
                    title: 'Phone Number',
                    sortable: true,
                },
                {
                    field: 'email',
                    title: 'Email',
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
                            + "<a href='/Administration/UserManagement/Rider/Edit?id=" + row.id + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
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
    document.getElementById("SearchName").value = "";
    localStorage.removeItem(tableName + '-1-meta');
    window.location = window.location
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", $('#SearchName').val().toLowerCase());
    datatable.setDataSourceParam("icPassport", $('#SearchIcPassport').val().toLowerCase());
    datatable.setDataSourceParam("phoneNumber", $('#SearchPhoneNumber').val().toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
