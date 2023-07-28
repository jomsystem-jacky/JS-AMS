"use strict";
// Class definition
const table1Name = "staff_datatable";
var StaffKTDatatable = function () {
    var demo = function () {
        var datatable = $('#' + table1Name).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Administration/CompanySettings/Staff/GetStaffByBranchId",
                        dataType: 'json',
                        params: {
                            "branchId": branchId,
                            "name": "",
                        },

                        map: function (raw) {
                            $('#loading').hide();
                            $('#' + table1Name).show();
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
                    field: 'fullName',
                    title: 'Full Name',
                    sortable: true,
                },
                {
                    field: 'phoneNumber',
                    title: 'Phone Number',
                    sortable: false,
                },
                {
                    field: 'status',
                    title: 'Status',
                    sortable: false,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            0: {
                                'title': 'Inactive',
                                'class': ' label-light-danger'
                            },
                            1: {
                                'title': 'Active',
                                'class': ' label-light-success'
                            }
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.status].class + ' label-inline">' + status[row.status].title + '</span>';
                    },
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 125,
                    overflow: 'visible',
                    template: function (row) {
                        return '\
                        <div class="dropdown dropdown-inline">\
                            <a href = "javascript:;" class="btn btn-sm btn-clean btn-icon mr-2" data-toggle="dropdown">\
                                <span class="svg-icon svg-icon-md">\
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                            <rect x="0" y="3" width="24" height="24" />\
                                            <path d="M5,8.6862915 L5,5 L8.6862915,5 L11.5857864,2.10050506 L14.4852814,5 L19,5 L19,9.51471863 L21.4852814,12 L19,14.4852814 L19,19 L14.4852814,19 L11.5857864,21.8994949 L8.6862915,19 L5,19 L5,15.3137085 L1.6862915,12 L5,8.6862915 Z M12,15 C13.6568542,15 15,13.6568542 15,12 C15,10.3431458 13.6568542,9 12,9 C10.3431458,9 9,10.3431458 9,12 C9,13.6568542 10.3431458,15 12,15 Z" fill="#000000" />\
                                            <rect fill="#000000" opacity="0.3" x="5" y="20" width="15" height="2" rx="1"/>\
                                        </g >\
                                    </svg>\
                                </span>\
                            </a>\
                            <div class="dropdown-menu dropdown-menu-sm dropdown-menu-right">\
                                <ul class="navi flex-column navi-hover py-2">\
                                    <li class="navi-header font-weight-bolder text-uppercase font-size-xs text-primary pb-2">\
                                        Choose an action:\
                                    </li>\
                                    <li class="navi-item">\
                                        <a href="#" onclick=(RemoveStaffFromBranch(\''+ row.staffId + '\')) class="navi-link">\
                                            <span class="navi-icon"><i class="la la-remove"></i></span>\
                                            <span class="navi-text">Remove staff</span>\
                                        </a>\
                                    </li>\
                                    <li class="navi-item" >\
                                        <a href="#" data-toggle="modal" data-target="#transferBranchModal" data-value=\''+ row.staffId + '\' class="navi-link">\
                                            <span class="navi-icon"><i class="la la-exchange-alt"></i></span>\
                                            <span class="navi-text">Transfer staff</span>\
                                        </a>\
                                    </li>\
                                </ul>\
                            </div>\
                        </div >\
                        <a href="/Administration/CompanySettings/Staff/Edit?id=' + row.staffId + '&branchId=' + row.branchId + '" class="btn btn-sm btn-clean btn-icon mr-2" title="View details">\
                        <i class="fas fa-search-plus"></i>\
                        </a>';
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
    localStorage.removeItem(table1Name + '-1-meta');
    window.location = window.location
}
function Search() {

    $('#loading').show();
    $('#' + table1Name).hide();
    var datatable = $('#' + table1Name).KTDatatable();
    datatable.setDataSourceParam("name", $('#SearchName').val().toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    StaffKTDatatable.init();
});
