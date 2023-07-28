"use strict";
// Class definition
const vehicleTableName = "existing_vehicle_datatable";
const searchPlateNumberField = "SearchPlateNumber";

var VehicleDatatableRemoteAjaxDemo = function () {
    var demo = function () {
        var datatable = $('#' + vehicleTableName).KTDatatable({
            // datasource definition
            data: {
                type: 'remote',
                source: {
                    read: {
                        method: "POST",
                        url: "/Vehicle/Controllers/VehicleMaster/GetAllVehicleMaster",
                        dataType: 'json',
                        params: {
                            "plateNumber": "",
                            "individualClientId": individualClientId
                        },

                        map: function (raw) {
                            $('#existing_vehicle_loading').hide();
                            $('#' + vehicleTableName).show();
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
                    field: 'plateNumber',
                    title: 'Plate Number',
                    sortable: true,
                },
                {
                    field: 'type',
                    title: 'Type',
                    sortable: true,
                    template: function (row) {
                        var v = {
                            1: {
                                'title': 'Car',
                                'class': ' label-light-primary'
                            },
                        };
                        return '<span class="label font-weight-bold label-lg ' + v[row.type].class + ' label-inline">' + v[row.type].title + '</span>';
                    },
                },
                {
                    field: 'brandName',
                    title: 'Brand Name',
                    sortable: true,
                },
                {
                    field: 'modelName',
                    title: 'Model Name',
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
                            + "<a onclick='SelectVehicle(\"" + row.id + "\",\"" + row.type + "\",\"" + row.brandId + "\",\"" + row.modelId + "\",\"" + row.plateNumber + "\")' class='btn btn-sm btn-clean btn-icon mr-2' title='Select'>"
                            + "<i class='fas fa-search-plus'></i>"
                            + "</a>"
                            ;
                    },
                }
            ]
        });

        document.getElementById(searchPlateNumberField).value = datatable.getDataSourceParam("plateNumber");
    };


    return {
        init: function () {
            demo();
        },
    };
}();


function ResetVehicleTable() {
    $('#existing_vehicle_loading').show();
    $('#' + vehicleTableName).hide();

    document.getElementById(searchPlateNumberField).value = "";
    localStorage.removeItem(vehicleTableName + '-1-meta');

    var datatable = $('#' + vehicleTableName).KTDatatable();
    datatable.setDataSourceParam("plateNumber", "");
    datatable.reload();
}

function ExistingVehicleSearch() {

    $('#existing_vehicle_loading').show();
    $('#' + vehicleTableName).hide();
    var datatable = $('#' + vehicleTableName).KTDatatable();
    datatable.setDataSourceParam("plateNumber", document.getElementById(searchPlateNumberField).value.toLowerCase());
    datatable.reload();
}

jQuery(document).ready(function () {
    VehicleDatatableRemoteAjaxDemo.init();
});

function OpenExistingVehicle() {

    if (addExistingVehicleBtn.textContent == "Existing Vehicle?") {
        var datatable = $('#' + vehicleTableName).KTDatatable();
        datatable.setDataSourceParam("individualClientId", individualClientId);
        datatable.reload();
        $('#addExistingVehicleModal').modal('show');
    }
    else {
        ResetVehicleField();
    }
}

function ResetVehicleField() {
    addExistingVehicleBtn.innerHTML = "<u>Existing Vehicle?</u>";

    DisableOrEnableVehicleInput(false);

    customerVehicleType.value = SetVehicleType(1);
    $('#W2_VehicleType').selectpicker('refresh');

    customerCarBrand.value = "";
    $('#W2_CarBrand').selectpicker('refresh');
    GetCarModelByBrandId();

    customerCarModel.value = "";
    $('#W2_CarModel').selectpicker('refresh');

    customerPlateNumber.value = "";
    vehicleId = null;
}

function CloseExistingVehicle() {
    $('#addExistingVehicleModal').modal('hide');
}

function SelectVehicle(id, type, brandId, modelId, plateNumber) {
    CloseExistingVehicle();
    addExistingVehicleBtn.innerHTML = "<u>Click here to cancel</u>";

    DisableOrEnableVehicleInput(true);
    customerVehicleType.value = SetVehicleType(type);
    $('#W2_VehicleType').selectpicker('refresh');

    customerCarBrand.value = brandId;
    $('#W2_CarBrand').selectpicker('refresh');
    GetCarModelByBrandId();

    customerCarModel.value = modelId;
    $('#W2_CarModel').selectpicker('refresh');

    customerPlateNumber.value = plateNumber;
    vehicleId = id;

}

function SetVehicleType(type) {
    if (type == 1)
        return "Car";
}

function DisableOrEnableVehicleInput(isDisabled) {
    customerVehicleType.disabled = isDisabled;
    customerCarBrand.disabled = isDisabled;
    customerCarModel.disabled = isDisabled;
    customerPlateNumber.disabled = isDisabled;
}

