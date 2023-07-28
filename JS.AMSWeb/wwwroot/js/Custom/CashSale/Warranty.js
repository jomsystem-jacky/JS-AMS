"use strict";

let productWarrantyResult = new Array();
let tempSelectedProductWarranty = new Object();

let isGetBatteryWarrantyRunning = false;

async function GetItemBatteryWarranty() {

    try {

        if (Object.keys(tempSelectedProduct).length === 0) {

            Swal.fire({
                title: 'Error!',
                text: 'Select at least 1 item',
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: "#DD6B55"
            });

            return;
        }

        if (isGetBatteryWarrantyRunning) {
            return;
        }

        isGetBatteryWarrantyRunning = true;

        const postData = {
            companyBranchId: initCashSaleFormInfo.companyBranchId,
            productId: tempSelectedProduct.id
        };

        const response = await fetch("/api/v1/ProductModule/ProductWarranty/GetProductWarrantyOption", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        const productWarranties = await response.json();

        const warrantySelectionContainer = document.getElementById('WarrantySelectionContainer');
        warrantySelectionContainer.innerHTML = '';

        productWarranties.forEach(productWarranty => {
            const productWarrantyElement = document.createElement('div');
            productWarrantyElement.classList.add('row');
            productWarrantyElement.classList.add('pt-3');

            productWarrantyElement.innerHTML = `
                    <div class="card p-5 mb-3 w-100" onclick="SelectProductWarranty('${productWarranty.id}')">
                        <a>${productWarranty.displayLabel}</a>
                    </div>
            `;

            warrantySelectionContainer.appendChild(productWarrantyElement);

            productWarrantyResult.push(productWarranty);
        });

        if (productWarranties.length == 0) {
            const productWarrantyElement = document.createElement('div');

            productWarrantyElement.innerHTML = `
                <div>
                    <a>No warranty found</a>
                </div>
            `;

            warrantySelectionContainer.appendChild(productWarrantyElement);
        }
    }
    catch (error) {

        Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
        });

    } finally {

        isGetBatteryWarrantyRunning = false;
    }
}

function SelectProductWarranty(id) {

    var closeButton = document.getElementById("WarrantyModalCloseBtn");
    closeButton.click();

    var productWarranty = productWarrantyResult.find((productWarranty) => productWarranty.id === id);

    DrawSelectedProductWarranty(productWarranty);

    tempSelectedProductWarranty = productWarranty;
}

function DrawSelectedProductWarranty(productWarranty) {

    var warrantyCheckbox = document.getElementById("W1_HasWarranty");
    warrantyCheckbox.setAttribute("disabled", true);

    const selectedWarrantyContainer = document.getElementById('SelectedWarrantyContainer');
    selectedWarrantyContainer.innerHTML = '';

    var productWarrantyRow = `"ProductWarrantyRow-${productWarranty.id}"`;

    const productWarrantyElement = document.createElement('div');
    productWarrantyElement.classList.add('row');
    productWarrantyElement.setAttribute("id", productWarrantyRow);

    productWarrantyElement.innerHTML = `
        <div class="pl-3 pb-3">
            <span class="svg-icon svg-icon-danger" onclick="RemoveProductWarranty('${productWarranty.id}')" >
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">
                    <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                        <rect x="0" y="0" width="24" height="24"/>
                        <circle fill="#000000" opacity="0.3" cx="12" cy="12" r="10"/>
                        <rect fill="#000000" x="6" y="11" width="12" height="2" rx="1"/>
                    </g>
                </svg>
            </span>
            <a class=pl-3>${productWarranty.displayLabel}</a>
        </div>
    `;

    selectedWarrantyContainer.appendChild(productWarrantyElement);
}

function RemoveProductWarranty(productWarrantyId) {

    var productWarrantyRowId = `"ProductWarrantyRow-${productWarrantyId}"`;

    var productWarrantyRow = document.getElementById(productWarrantyRowId);
    if (productWarrantyRow) {

        const selectedWarrantyContainer = document.getElementById('SelectedWarrantyContainer');
        selectedWarrantyContainer.removeChild(productWarrantyRow);

        tempSelectedProductWarranty = new Object();

        var warrantyCheckbox = document.getElementById("W1_HasWarranty");
        warrantyCheckbox.checked = false;
        warrantyCheckbox.removeAttribute("disabled");
    }

    if (!productWarrantyRow) {
        console.log('cannot find');
    }

}