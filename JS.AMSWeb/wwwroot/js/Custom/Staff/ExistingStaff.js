"use strict";
// Class definition
const table2Name = "existing_staff_datatable";
var ExistingStaffKTDatatable = function () {
    var demo = function () {
        var datatable = $('#' + table2Name).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Administration/CompanySettings/Staff/GetUnaddedCompanyStaff",
                        dataType: 'json',
                        params: {
                            "branchId": branchId,
                            "name": "",
                            "ic": "",
                        },

                        map: function (raw) {
                            $('#existing_loading').hide();
                            $('#' + table2Name).show();
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
                    field: 'staffId',
                    title: '#',
                    sortable: false,
                    width: 20,
                    type: 'number',
                    selector: {
                        class: 'kt-checkbox--solid',
                        multiple: true
                    },
                    textAlign: 'center',
                },
                {
                    field: 'fullName',
                    title: 'Full Name',
                    sortable: true,
                },
                {
                    field: 'employeeNo',
                    title: 'Employee No',
                    sortable: true,
                },
                {
                    field: 'phoneNumber',
                    title: 'Phone Number',
                    sortable: false,
                },
                {
                    field: 'icPassport',
                    title: 'IC/Passport',
                    sortable: false,
                }
            ],
            // Enable checkbox selection
            selectable: true,
            // Enable multiple row selection
            rows: {
                selected: {
                    multiple: true
                }
            },
        });

        document.getElementById("ExistingSearchName").value = datatable.getDataSourceParam("name");
        document.getElementById("ExistingSearchIC").value = datatable.getDataSourceParam("ic");
    };


    return {
        init: function () {
            demo();
        },
    };
}();

function ExistingStaffSearch() {

    $('#existing_loading').show();
    $('#' + table2Name).hide();
    var datatable = $('#' + table2Name).KTDatatable();
    datatable.setDataSourceParam("name", $('#ExistingSearchName').val().toLowerCase());
    datatable.setDataSourceParam("ic", $('#ExistingSearchIC').val().toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    ExistingStaffKTDatatable.init();
});
