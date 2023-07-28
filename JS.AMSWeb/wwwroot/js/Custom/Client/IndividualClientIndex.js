"use strict";
// Class definition
const tableName = "individual_client_datatable";
const searchField = "SearchCustomerName";
const debtorSearchField = "ddDebtor";
const branchSearchField = "ddBranch";

var ExistingCustomerDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Client/IndividualClient/GetAllIndividualClient",
                        dataType: 'json',
                        params: {
                            "name": "",
                            "debtorId": "",
                            "branchId": "",
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
                    title: 'Name',
                    sortable: true,
                },
                {
                    field: 'branchName',
                    title: 'Branch',
                    sortable: false,
                },
                {
                    field: 'debtorName',
                    title: 'Debtor',
                    sortable: false,
                },
                {
                    field: 'icPassport',
                    title: 'IC/Passport',
                    sortable: false,
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<a href='/Client/IndividualClient/Edit?id=" + row.individualId + "' class='btn btn-sm btn-clean btn-icon mr-2' title='View details'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById(searchField).value = datatable.getDataSourceParam("name");
        document.getElementById(debtorSearchField).value = datatable.getDataSourceParam("debtorId");
    };


    return {
        init: function () {
            demo();
        },
    };
}();


function ResetTable() {
    document.getElementById(searchField).value = "";
    document.getElementById(debtorSearchField).value = "";
    localStorage.removeItem(tableName + '-1-meta');
    window.location = window.location
}
function Search() {

    $('#loading').show();
    $('#' + tableName).hide();
    var datatable = $('#' + tableName).KTDatatable();
    datatable.setDataSourceParam("name", document.getElementById(searchField).value.toLowerCase());
    datatable.setDataSourceParam("debtorId", document.getElementById(debtorSearchField).value);
    datatable.reload();
}

jQuery(document).ready(function () {
    ExistingCustomerDatatableRemoteAjaxDemo.init();
});
