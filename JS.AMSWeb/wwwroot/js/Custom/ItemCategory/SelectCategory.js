function InitSelectItemCategoryOptions(selectId, categoryId) {

    $.ajax({
        async: true,
        method: 'GET',
        url: "/api/v1/ItemCategoryAPI/GetAllItemCategories",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, category) {
                $(selectId).append('<option value="' + category.id + '">' + category.name + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof categoryId != 'undefined')
                SetSelectCategoryValue(selectId, categoryId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectCategoryValue(selectId, categoryId) {
    $(selectId).val(categoryId);
    $(selectId).selectpicker('refresh');
}