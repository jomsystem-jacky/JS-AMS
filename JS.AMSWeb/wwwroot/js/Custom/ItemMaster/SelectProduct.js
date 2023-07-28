function InitSelectProductOptions(selectId, companyId, productId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
        },
        url: "/api/v1/ItemMasterAPI/GetProductsByCompanyId",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, product) {
                $(selectId).append('<option value="' + product.id + '">' + `${product.code} - ${product.name}` + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');

            if (typeof productId != 'undefined')
                SetSelectProductValue(selectId, productId);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function InitProductWithoutAddedTransferOptions(selectId, companyId, transferId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
            "transferInId": transferId,
        },
        url: "/api/v1/ItemMasterAPI/GetProductsFilterByAddedTransfer",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, product) {
                $(selectId).append('<option value="' + product.id + '">' + `${product.code} - ${product.name}` + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function InitProductWithoutAddedAdjustmentOptions(selectId, companyId, adjustmentId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
            "adjustmentId": adjustmentId,
        },
        url: "/api/v1/ItemMasterAPI/GetProductsFilterByAddedAdjustment",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, product) {
                $(selectId).append('<option value="' + product.id + '">' + `${product.code} - ${product.name}` + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function InitProductWithRequestOptions(selectId,requestId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "requestId": requestId,
        },
        url: "/api/v1/ItemMasterAPI/GetRequestProduct",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, product) {
                $(selectId).append('<option value="' + product.id + '">' + `${product.code} - ${product.name}` + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function InitProductWithoutAddedRequestOptions(selectId, companyId, requestId) {
    $.ajax({
        async: true,
        method: 'GET',
        data: {
            "companyId": companyId,
            "requestId": requestId,
        },
        url: "/api/v1/ItemMasterAPI/GetProductsFilterByAddedRequest",
        success: function (data, textStatus, jqXHR) {
            $(selectId).empty();
            // add new options
            $.each(data, function (index, product) {
                $(selectId).append('<option value="' + product.id + '">' + `${product.code} - ${product.name}` + '</option>');
            });

            // refresh selectpicker
            $(selectId).selectpicker('refresh');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            ShowFailMessageBox(jqXHR.responseText);
        }

    });
}

function SetSelectProductValue(selectId, productId) {
    $(selectId).val(productId);
    $(selectId).selectpicker('refresh');
}