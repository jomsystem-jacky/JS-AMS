"use strict";

let vehicleBrandResult = new Array();

async function GetVehicleBrands() {

    try {
        const response = await fetch(`/api/v1/VehicleModule/VehicleBrand/GetVehicleBrands/`);
        const vehicleBrands = await response.json();

        const vehicleBrandElement = document.getElementById('W2_VehicleBrand');
        vehicleBrandElement.innerHTML = '';

        vehicleBrands.forEach(brand => {
            const option = document.createElement("option");
            option.value = brand.id;
            option.textContent = brand.name;
            vehicleBrandElement.appendChild(option);

            vehicleBrandResult.push(brand);
        });


    } catch (error) {
        console.error("Error fetching category:", error);
    }
}

async function GetVehicleModels(brandId) {

    try {
        const response = await fetch(`/api/v1/VehicleModule/VehicleModel/GetVehicleModelByBrandId/?brandId=${brandId}`);
        const vehicleModels = await response.json();

        const vehicleModelElement = document.getElementById('W2_VehicleModel');
        vehicleModelElement.innerHTML = '';

        vehicleModels.forEach(model => {
            const option = document.createElement("option");
            option.value = model.id;
            option.textContent = model.name;
            vehicleModelElement.appendChild(option);
        });


    } catch (error) {
        console.error("Error fetching category:", error);
    }
}

//async function GetVehicleTypes() {

//    try {
//        const response = await fetch(`/api/v1/VehicleModule/VehicleBrand/GetVehicleBrands/`);
//        const vehicleBrands = await response.json();

//        const vehicleBrandElement = document.getElementById('W2_VehicleBrand');
//        vehicleBrandElement.innerHTML = '';

//        vehicleBrands.forEach(brand => {
//            const option = document.createElement("option");
//            option.value = brand.id;
//            option.textContent = brand.name;
//            vehicleBrandElement.appendChild(option);

//            vehicleBrandResult.push(brand);
//        });


//    } catch (error) {
//        console.error("Error fetching category:", error);
//    }
//}

function ShowVehicleSection() {

    var vehicleSection = document.getElementById("W2_VehicleSection");

    var checkBox = document.getElementById("W2_HasVehicle").checked;
    if (checkBox) {
        vehicleSection.classList.remove("d-none");
    }

    if (!checkBox) {
        vehicleSection.classList.add("d-none");
    }

}

function GetCustomerInfo() {

    customerInfo = new Object();

    var dCustomerName = customerName.value;
    var dCustomerEmail = customerEmail.value;
    var dCustomerPhoneNo = customerPhoneNo.value;
    var dCustomerAddress = customerAddress.value;
    var dCustomerCarModel = customerCarModel.value;
    var dCustomerVehicleType = customerVehicleType.value;
    var dCustomerCarBrand = customerCarBrand.value;
    var dCustomerPlateNumber = customerPlateNumber.value;
    var dCustomerIndividualClientId = individualClientId;
    var dVehicleId = vehicleId;

    var customerInfoDTO = {

        dCustomerName: dCustomerName,
        dCustomerEmail: dCustomerEmail,
        dCustomerPhoneNo: dCustomerPhoneNo,
        dCustomerAddress: dCustomerAddress,
        dCustomerCarModel: dCustomerCarModel,
        dCustomerCarBrand: dCustomerCarBrand,
        dCustomerPlateNumber: dCustomerPlateNumber,
        dCustomerIndividualClientId: dCustomerIndividualClientId,
        dVehicleId: dVehicleId,
        dCustomerVehicleType: dCustomerVehicleType,
    }

    customerInfo = customerInfoDTO;

    UpdateFinalResult();

    return customerInfo;
}

function GetCarBrand(selectId) {
    $.ajax({
        async: true,
        method: 'GET',
        url: "/api/v1/VehicleBrandAPI/GetBrand",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, brand) {
                $(selectId).append('<option value="' + brand.id + '">' + brand.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

        //    if (typeof brandId != 'undefined')
        //        SetSelectBrandValue(selectId, brandId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}


function GetCarModelByBrandId() {

    $("#W2_CarModel").selectpicker('refresh');

    var brandId = customerCarBrand.value;
    if (brandId == null || brandId == '') {

        $("#W2_CarModel").append('<option value="null">No car model</option>');

        return;
    }

    let getModelByBrandDTO = {
        brandId: brandId
    }

    $.ajax({
        async: true,
        method: 'GET',
        data: getModelByBrandDTO,
        url: "/api/v1/VehicleModelAPI/GetVechileModelByBrandId",
        success: function (data, textStatus, jqXHR) {
            $("#W2_CarModel").empty();
            // add new options
            $.each(data, function (index, brand) {
                $("#W2_CarModel").append('<option value="' + brand.id + '">' + brand.name + '</option>');
            });

            // refresh selectpicker
            $("#W2_CarModel").selectpicker('refresh');

        //    if (typeof brandId != 'undefined')
        //        SetSelectBrandValue("#W2_CarModel", brandId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}
