function InitSelectItemBrandOptions(selectId, brandId) {
    $.ajax({
        async: true,
        method: 'GET',
        url: "/api/v1/ItemBrandAPI/GetAllItemBrands",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, brand) {
                $(selectId).append('<option value="' + brand.id + '">' + brand.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof brandId != 'undefined')
                SetSelectCompanyValue(selectId, brandId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectCompanyValue(selectId, brandId) {
    $(selectId).val(brandId);
    $(selectId).selectpicker('refresh');
}