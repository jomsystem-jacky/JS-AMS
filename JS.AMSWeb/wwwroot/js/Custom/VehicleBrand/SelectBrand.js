function InitSelectBrandOptions(selectId, brandId) {
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

            if (typeof brandId != 'undefined')
                SetSelectBrandValue(selectId, brandId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function InitSelectBrandExceptCurrentBrandOptions(selectId, brandId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "brandId": brandId
        },
        url: "/api/v1/VehicleBrandAPI/GetBrand",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, brand) {
                $(selectId).append('<option value="' + brand.id + '">' + brand.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectBrandValue(selectId, brandId) {
    $(selectId).val(brandId);
    $(selectId).selectpicker('refresh');
}