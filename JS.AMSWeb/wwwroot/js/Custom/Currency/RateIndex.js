"use strict";
// Class definition
const tableName = "currency_conversion_datatable";

var KTDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + tableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Administration/GeneralSettings/CurrencyConversion/GetAllCurrencyConversions",
                        dataType: 'json',
                        params: {
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
                    field: 'fromCurrencyName',
                    title: 'From',
                    sortable: true,
                },
                {
                    field: 'toCurrencyName',
                    title: 'To',
                    sortable: true,
                },
                {
                    field: 'rate',
                    title: 'Rate',
                    sortable: true,
                    template: function (row) {
                        return '<div class="col-6"'
                            + 'id="rParent' + row.id + '" >'
                            + '<span class="value-label"'
                            + 'id="r' + row.id + '" >'
                            + row.rate
                            + ' </span>'
                            + '</div>'
                            ;
                    }
                },
                {
                    field: '',
                    title: '',
                    sortable: false,
                    width: 75,
                    overflow: 'visible',
                    template: function (row) {
                        return "<div class='dropdown dropdown-inline'/>"
                            + "<button type='button' id='btnEdit" + row.id + "' class='btn btn-sm btn-clean btn-icon edit-row' onclick='EditRate(\"" + row.id + "\")' title='Edit'>"
                            + "<i  id='btnEditIcon" + row.id + "' class='far fa-edit'></i>"
                            + "</button>"
                            + "<a onclick=deleteData(\"" + row.id + "\") class='btn btn-sm btn-clean btn-icon mr-2' title='Delete'>"
                            + "<i class='fas fa-trash text-danger'></i>"
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

jQuery(document).ready(function () {
    KTDatatableRemoteAjaxDemo.init();
});
