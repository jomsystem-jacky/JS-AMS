"use strict";
// Class definition
const additionInfoTableName = "product_additionalInfo_datatable";

var AdditionalInfoDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var additionalInfoDatatable = $('#' + additionInfoTableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "GET",
                        url: "/api/v1/ItemAdditionalInfoAPI/GetProductAdditionalInfoWithOptions",
                        dataType: 'json',
                        params: {
                            "productId": productId,
                            "companyId": companyId,
                        },

                        map: function (raw) {
                            $('#loading').hide();
                            $('#' + additionInfoTableName).show();
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
                    field: 'displayText',
                    title: 'Additional Info',
                    sortable: true,
                },
                {
                    field: 'dataType',
                    title: 'Data Type',
                    sortable: true,
                    // callback function support for column rendering
                    template: function (row) {
                        var status = {
                            1: {
                                'title': 'Text',
                                'class': ' label-light-primary'
                            },
                            2: {
                                'title': 'Integer',
                                'class': ' label-light-info'
                            },
                            3: {
                                'title': 'Decimal',
                                'class': ' label-light-warning'
                            },
                            4: {
                                'title': 'Date',
                                'class': ' label-light-danger'
                            },
                            5: {
                                'title': 'Selection',
                                'class': ' label-light-success'
                            },
                        };
                        return '<span class="label font-weight-bold label-lg ' + status[row.dataType].class + ' label-inline">' + status[row.dataType].title + '</span>';
                    },
                },
                {
                    field: 'value',
                    title: 'Value',
                    sortable: true,
                    template: function (row) {

                        additionalInfoIds.push(row.additionalInfoId);

                        return '<div class="col-12">'
                            + '<input type="text" class="form-control"'
                            + 'id="' + row.additionalInfoId + '" value="'
                            + row.value
                            + '" />'
                            + '<span></span>'
                            + '</div>'
                            ;
                    },
                },
            ]
        });

        document.getElementById("SearchName").value = additionalInfoDatatable.getDataSourceParam("name");
    };

    return {
        init: function () {
            demo();
        },
    };
}();


function ResetTableAdditionalInfo() {
    document.getElementById("SearchName").value = "";
    localStorage.removeItem(additionInfoTableName + '-1-meta');
    window.location = window.location
}
function SearchAdditionalInfo() {

    $('#loading').show();
    $('#' + additionInfoTableName).hide();
    var additionalInfoDatatable = $('#' + additionInfoTableName).KTDatatable();
    additionalInfoDatatable.setDataSourceParam("name", $('#SearchName').val().toLowerCase());
    additionalInfoDatatable.reload();
}

jQuery(document).ready(function () {
    AdditionalInfoDatatableRemoteAjaxDemo.init();
});