"use strict";
// Class definition
const tableName = "product_warranty_datatable";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "GET",
                        url: "/api/v1/WarrantyAPI/GetProductWarrantyWithOptions",
                        dataType: 'json',
                        params: {
                            "productId": productId,
                            "companyId": companyId,
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
                //{
                //    field: 'warrantyId',
                //    title: '#',
                //    sortable: false,
                //    width: 20,
                //    type: 'string',
                //    selector: {
                //        class: 'kt-checkbox--solid',
                //        multiple: true,
                //    },
                //    textAlign: 'center',
                //},

                {
                    field: 'displayText',
                    title: 'Warranty',
                    sortable: true,
                },
                {
                    field: 'isChecked',
                    title: 'Checked',
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
                        //return '<span class="label font-weight-bold label-lg ' + status[row.isChecked].class + ' label-inline">' + status[row.isChecked].title + '</span>';

                        if (row.isChecked) {

                            checkedWarrantyIds.push(row.warrantyId);

                            return '<div class="col-3">'
                                + '<span class="switch switch-icon">'
                                + '<label>'
                                + '<input type="checkbox"'
                                + 'id="' + row.warrantyId + '"'
                                + 'onchange="UpdateCheckList(\'' + row.warrantyId + '\')"'
                                + 'checked="checked" />'
                                + '<span></span>'
                                + '</label>'
                                + '</span>'
                                + '</div>';
                        }

                        if (!row.isChecked) {

                            uncheckedWarrantyIds.push(row.warrantyId);
                            
                            return '<div class="col-3">'
                                + '<span class="switch switch-icon">'
                                + '<label>'
                                + '<input type="checkbox" '
                                + 'id="' + row.warrantyId + '" '
                                + 'onchange="UpdateCheckList(\'' + row.warrantyId + '\')"'
                                + '/>'
                                + '<span></span>'
                                + '</label>'
                                + '</span>'
                                + '</div>';
                        }
                    },
                },
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
    datatable.reload();
}

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});

function UpdateCheckList(warrantyId) {
    if (uncheckedWarrantyIds.includes(warrantyId)) {
        const indexToRemove = uncheckedWarrantyIds.indexOf(warrantyId);
        uncheckedWarrantyIds.splice(indexToRemove, 1);
        checkedWarrantyIds.push(warrantyId);
        return;
    }

    if (checkedWarrantyIds.includes(warrantyId)) {
        const indexToRemove = checkedWarrantyIds.indexOf(warrantyId);
        checkedWarrantyIds.splice(indexToRemove, 1);
        uncheckedWarrantyIds.push(warrantyId);
    }
}