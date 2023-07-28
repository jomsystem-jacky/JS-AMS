function GetCustomerInfo() {

    customerInfo = new Object();

    var dCustomerName = customerName.value;
    var dCustomerEmail = customerEmail.value;
    var dCustomerPhoneNo = customerPhoneNo.value;
    var dCustomerAddress = customerAddress.value;
    var dCustomerCarModel = customerCarModel.value;
    var dCustomerCarBrand = customerCarBrand.value;
    var dCustomerPlateNumber = customerPlateNumber.value;

    var customerInfoDTO = {

        dCustomerName: dCustomerName,
        dCustomerEmail: dCustomerEmail,
        dCustomerPhoneNo: dCustomerPhoneNo,
        dCustomerAddress: dCustomerAddress,
        dCustomerCarModel: dCustomerCarModel,
        dCustomerCarBrand: dCustomerCarBrand,
        dCustomerPlateNumber: dCustomerPlateNumber,
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

            console.log(selectId);
            console.log(data);

            $(selectId).empty();
            // add new options
            $.each(data, function (index, brand) {
                $(selectId).append('<option value="' + brand.id + '">' + brand.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof brandId != 'undefined')
                SetSelectBrandValue(selectId, brandId);
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

            console.log(data);

            $("#W2_CarModel").empty();
            // add new options
            $.each(data, function (index, brand) {
                $("#W2_CarModel").append('<option value="' + brand.id + '">' + brand.name + '</option>');
            });

            // refresh selectpicker
            $("#W2_CarModel").selectpicker('refresh');

            if (typeof brandId != 'undefined')
                SetSelectBrandValue("#W2_CarModel", brandId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}
