let initCashSaleFormInfo = new Object();
let checkedProductCategory = new Array();
let productResult = new Array();
let addedItems = new Array();

let isGetProductsRunning = false;
let isProductContainerOpen = false;

let grandTotal = Number(0);

let tempSelectedProduct = new Object();
let addedItemInfo = new Object();

async function GetInitCashSaleFormInfo() {

    try {
        const response = await fetch(`/api/v1/SaleModule/CashSale/GetInitCashSaleForm/`);
        const data = await response.json();

        var documentNo = document.getElementById("DocumentNo");
        var branchName = document.getElementById("BranchName");
        var dateTime = document.getElementById("DateTime");
        
        documentNo.innerText = data.documentNo;
        branchName.innerText = data.companyBranchName;

        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');

        const todayDate = `${year}-${month}-${day}`;

        dateTime.innerText = todayDate;

        initCashSaleFormInfo = data;

        console.log(initCashSaleFormInfo);

    } catch (error) {

        Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

async function GetFilterProductCategories() {

    try {
        const response = await fetch(`/api/v1/ProductModule/ProductCategory/GetProductCategories/`);
        const productCategories = await response.json();

        const productCategoryContainer = document.getElementById('FilterProductCategoryContainer');
        productCategoryContainer.innerHTML = '';

        productCategories.forEach(productCategory => {
            const productCategoryElement = document.createElement('div');
            productCategoryElement.classList.add('product');
            productCategoryElement.innerHTML = `
                <div class="col-12 py-2">
                    <label class="checkbox">
                        <input type="checkbox" checked onchange="UpdateFilterProductCategory('${productCategory.id}')"/>${productCategory.name}
                        <span></span>
                    </label>
                </div>
            `;

            checkedProductCategory.push(productCategory.id);

            productCategoryContainer.appendChild(productCategoryElement);

        });

    } catch (error) {
        console.error("Error fetching category:", error);
    }
}

async function GetFilterProductBrands() {

    try {
        const response = await fetch(`/api/v1/ProductModule/ProductBrand/GetProductBrands/`);
        const productBrands = await response.json();

        const productBrandContainer = document.getElementById('FilterProductBrandContainer');
        productBrandContainer.innerHTML = '';

        productBrands.forEach(productBrand => {
            const productBrandElement = document.createElement('div');
            productBrandElement.classList.add('pt-3');
            productBrandElement.classList.add('w-100');
            productBrandElement.classList.add('col-12');
            productBrandElement.classList.add('col-sm-6');
            productBrandElement.classList.add('col-lg-5');
            productBrandElement.classList.add('col-md-5');
            productBrandElement.classList.add('col-xl-3');
            productBrandElement.classList.add('m-2');
            productBrandElement.classList.add('m-lg-3');

            productBrandElement.innerHTML = `
                <div class="row p-8 rounded d-flex align-items-center justify-content-center bg-gray-100" onclick="GetProducts('${productBrand.id}')" style="min-height:250px;">
                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <img src="${productBrand.mediaUrl}" width="150px" height="auto" />
                    </div>
                    <div class="col-12 text-center">
                        <a class='h5'>${productBrand.name}</a>
                    </div>
                </div>
            `;

            productBrandContainer.appendChild(productBrandElement);
        });

    } catch (error) {

        Swal.fire({
            title: 'Error!',
            text: error,
            icon: 'error',
            confirmButtonText: 'OK'
        });

    } 
}

async function GetProducts(brandId) {

    let selectedBrandId = new Array();

    const guidAsString = brandId;

    selectedBrandId.push(guidAsString);

    try {

        if (isGetProductsRunning) {
            return;
        }

        isGetProductsRunning = true;

        const postData = {
            companyBranchId: initCashSaleFormInfo.companyBranchId,
            debtorId: initCashSaleFormInfo.debtorId,
            priceBookId: initCashSaleFormInfo.priceBookId,
            productCategoryIds: checkedProductCategory,
            productBrandIds: selectedBrandId,
        };

        console.log(postData);

        const response = await fetch("/api/v1/ProductModule/Product/GetBranchSaleProducts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
        });

        const products = await response.json();

        isProductContainerOpen = true;

        var sd = document.getElementById("FilterItemLabel");
        sd.innerHTML = "Item";

        var bbtn = document.getElementById("FilterItemBackBtn");
        bbtn.classList.remove("d-none");

        var filterProductBrandContainer = document.getElementById("FilterProductBrandContainer");
        filterProductBrandContainer.classList.add("d-none");

        var filterProductBrandContainer = document.getElementById("FilterProductContainer");
        filterProductBrandContainer.classList.remove("d-none");

        const productContainer = document.getElementById('FilterProductContainer');
        productContainer.innerHTML = '';

        products.forEach(product => {
            const productElement = document.createElement('div');
            productElement.classList.add('pt-3');
            productElement.classList.add('w-100');
            productElement.classList.add('col-12');
            productElement.classList.add('col-sm-6');
            productElement.classList.add('col-lg-5');
            productElement.classList.add('col-md-5');
            productElement.classList.add('col-xl-3');
            productElement.classList.add('m-2');
            productElement.classList.add('m-lg-3');

            productElement.innerHTML = `
                <div class="row p-8 rounded d-flex align-items-center justify-content-center bg-gray-100" onclick="SelectProduct('${product.id}')" style="min-height:250px;">
                    <div class="col-12 d-flex align-items-center justify-content-center">
                        <img src="${product.mediaUrl}" width="150px" height="auto" />
                    </div>
                    <div class="col-12 text-center">
                        <a class='h5'>${product.name}</a>
                    </div>
                    <div class="col-12 text-center">
                        <a class='h5'>RM ${product.price.toFixed(2)}</a>
                    </div>
                </div>
            `;

            productContainer.appendChild(productElement);

            productResult.push(product);
        });


        if (products.length == 0) {
            const productElement = document.createElement('div');
            
            productElement.innerHTML = `
                <div>
                    <a>No product found</a>
                </div>
            `;

            productContainer.appendChild(productElement);
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
        isGetProductsRunning = false;
    }
}

async function BackFilterProductBrandContainer() {

    var sd = document.getElementById("FilterItemLabel");
    sd.innerHTML = "Brand";

    var backProductBrandContainerBtn = document.getElementById("FilterItemBackBtn");
    backProductBrandContainerBtn.classList.add("d-none");

    var filterProductBrandContainer = document.getElementById("FilterProductBrandContainer");
    filterProductBrandContainer.classList.remove("d-none");

    var filterProductContainer = document.getElementById("FilterProductContainer");
    filterProductContainer.classList.add("d-none");
}

function SelectProduct(id) {

    var closeButton = document.getElementById("ItemModalCloseBtn");
    closeButton.click();

    var product = productResult.find((product) => product.id === id);

    var selectedItem = document.getElementById("W1_LabelItem");
    selectedItem.innerHTML = `${product.brandName} ${product.name}`;

    tempSelectedProduct = product;
}

async function AddItem() {

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

    var quantity = document.getElementById("W1_Quantity").value;
    if (!quantity || quantity == 0) {

        Swal.fire({
            title: 'Error!',
            text: 'Quantity must more than 1',
            icon: 'error',
            confirmButtonText: 'OK',
            confirmButtonColor: "#DD6B55"
        });

        return;
    }

    var subtotal = tempSelectedProduct.price * quantity;
    var discount = 0;

    if (tempDiscountInfo.type == "Amount") {
        discount = Number(tempDiscountInfo.amount);
    }

    if (tempDiscountInfo.type == "Percentage") {

        var discountPercentage = tempDiscountInfo.amount / 100;
        var discountAmount = subtotal * discountPercentage;

        discount = Number(discountAmount);
    }

    var finalSubtotal = subtotal - discount;

    addedItemInfo = {
        addedItemId: CreateGuid(),
        productInfo: tempSelectedProduct,
        discountInfo: tempDiscountInfo,
        productWarrantyInfo: tempSelectedProductWarranty,
        quantity: quantity,
        totalDiscount: discount,
        subtotal: finalSubtotal,
        beforeDiscountSubtotal: subtotal,
    }

    addedItems.push(addedItemInfo);

    tempSelectedScrapBattery.forEach(scrapBattery => {
        addedTradeInItems.push(scrapBattery);
    });

    //if (addedItems.length > 0) {

    //    var editAddedItemMutedBtn = document.getElementById("EditAddedItemMutedBtn");
    //    editAddedItemMutedBtn.classList.add("d-none");

    //    var editAddedItemBtn = document.getElementById("EditAddedItemBtn");
    //    editAddedItemBtn.classList.remove("d-none");
    //}

    const addedItemsSection = document.getElementById('W1_AddedItemsSection');

    var addedItemRowId = `"AddedItemRow-${addedItemInfo.addedItemId}"`;

    const addedItemElement = document.createElement('div');
    addedItemElement.classList.add('w-100');
    addedItemElement.classList.add('pt-2');
    addedItemElement.setAttribute("id", addedItemRowId);

    addedItemElement.innerHTML = `

        <div class="d-flex align-items-start justify-content-center w-100">
            <div class="position-absolute left-0 pl-10 pt-2">
                <a onclick="RemoveAddedItem('${addedItemInfo.addedItemId}')" class="btn btn-xs btn-icon btn-circle btn-danger btn-hover-text-white btn-shadow">
                    <i class="flaticon2-cross icon-sm text-white"></i>
                </a>
            </div>
            <div class="row bg-light w-100 rounded">
                <div class="col-2 col-lg-4 col-xl-2 d-flex align-items-center justify-content-center">
                    <div class="btn btn-outline-primary btn-sm py-1">
                        <a class="font-size-h5">${addedItemInfo.quantity}</a>
                    </div>
                </div>
                <div class="col-2 col-lg-8 col-xl-2 d-flex align-items-center justify-content-center">
                    <div class="m-10">
                        <img class="d-md-block d-md-none d-xl-none d-lg-none d-sm-none d-none" width="100px" src="${addedItemInfo.productInfo.mediaUrl}" />
                        <img class="d-lg-block d-md-none d-xl-none d-sm-none d-none" width="100px" src="${addedItemInfo.productInfo.mediaUrl}" />
                        <img class="d-sm-block d-md-none d-xl-none d-lg-none d-none" width="100px" src="${addedItemInfo.productInfo.mediaUrl}" />
                        <img class="d-xl-block d-lg-none d-md-none d-sm-none" width="70px" src="${addedItemInfo.productInfo.mediaUrl}" />
                    </div>
                </div>
                <div class="col-5 col-lg-12 col-xl-5 d-flex align-items-center justify-content-start text-left">
                    <div class="row">
                        <div class="col-12 pb-3">
                            <a class="font-size-lg-h5 text-darker font-weight-bolder">${addedItemInfo.productInfo.categoryName} ${addedItemInfo.productInfo.brandName} ${addedItemInfo.productInfo.name}</a>
                        </div>
                        <div class="col-12">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="19.363" height="24.415" viewBox="0 0 19.363 24.415">
                                <defs>
                                    <clipPath id="clip-path">
                                        <rect id="Rectangle_194" data-name="Rectangle 194" width="6.335" height="4.85" fill="#440dce" />
                                    </clipPath>
                                </defs>
                                <g id="Group_181" data-name="Group 181" transform="translate(-1392 -403)">
                                    <path id="Path_195" data-name="Path 195" d="M18.521,4.21c-3.353,0-6.7-1.571-8.129-3.82A.841.841,0,0,0,9.23.132.832.832,0,0,0,8.972.39C7.537,2.64,4.194,4.21.842,4.21A.842.842,0,0,0,0,5.052v8.419C0,19.3,5.655,23.434,9.478,24.39a.838.838,0,0,0,.408,0c3.822-.956,9.478-5.086,9.478-10.919V5.052a.842.842,0,0,0-.842-.842" transform="translate(1392 403)" fill="#e3d8ff" />
                                    <path id="Path_198" data-name="Path 198" d="M77.893,120.01a5.893,5.893,0,1,0,5.893,5.893,5.893,5.893,0,0,0-5.893-5.893" transform="translate(1323.789 289.305)" fill="#bfa5ff" />
                                    <g id="Group_180" data-name="Group 180" transform="translate(1399.212 412.782)">
                                        <g id="Group_129" data-name="Group 129" transform="translate(-0.497 0)" clip-path="url(#clip-path)">
                                            <path id="Path_166" data-name="Path 166" d="M103.7.185a.633.633,0,0,1,0,.9l-3.583,3.583a.633.633,0,0,1-.9,0l-.448-.448L102.8.185a.633.633,0,0,1,.9,0" transform="translate(-97.549 0)" fill="#440dce" />
                                            <path id="Path_167" data-name="Path 167" d="M.186,169.824a.633.633,0,0,1,.9,0l1.932,1.932-.448.448a.633.633,0,0,1-.9,0L.186,170.72A.633.633,0,0,1,.186,169.824Z" transform="translate(0 -167.54)" fill="#440dce" />
                                        </g>
                                    </g>
                                </g>
                            </svg>
                            <a class="pl-2 font-weight-bolder text-info">${addedItemInfo.productWarrantyInfo.displayLabel ? addedItemInfo.productWarrantyInfo.displayLabel : 'No Warranty'}</a>
                        </div>
                    </div>
                </div>
                <div class='col-3 col-lg-12 col-xl-3 d-flex align-items-center justify-content-start text-left'>
                    <div class='p-lg-3'>
                        <div>
                            <a class='font-size-h6 text-primary font-weight-bold'>RM ${addedItemInfo.subtotal.toFixed(2)}</a>
                        </div>

                        <div>
                            <a class='font-size-sm text-darker'><del>RM ${addedItemInfo.beforeDiscountSubtotal.toFixed(2)}</del></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    `;

    addedItemsSection.appendChild(addedItemElement);

    const addedTradeInItemsSection = document.getElementById('W1_AddedTradeInItemsSection');
    addedTradeInItemsSection.innerHTML = '';

    addedTradeInItems.forEach(tradeInItem => {

        var addedTradeInItemRowId = `"AddedTradeInItemRow-${tradeInItem.id}"`;

        const addedTradeInItemElement = document.createElement('div');
        addedTradeInItemElement.classList.add('w-100');
        addedTradeInItemElement.classList.add('pt-2');
        addedTradeInItemElement.setAttribute("id", addedTradeInItemRowId);

        addedTradeInItemElement.innerHTML = `

            <div class="d-flex align-items-start justify-content-center w-100">
                <div class="position-absolute left-0 pl-10 pt-2">
                    <a onclick="RemoveAddedTradeInItem('${tradeInItem.id}')" class="btn btn-xs btn-icon btn-circle btn-danger btn-hover-text-white btn-shadow">
                        <i class="flaticon2-cross icon-sm text-white"></i>
                    </a>
                </div>
                <div class="row bg-light w-100 rounded">
                    <div class="col-2 col-lg-4 col-xl-2 d-flex align-items-center justify-content-center">
                        <div class="btn btn-outline-primary btn-sm py-1">
                            <a class="font-size-h5">1</a>
                        </div>
                    </div>
                    <div class="col-2 col-lg-8 col-xl-2 d-flex align-items-center justify-content-center">
                        <div class="m-10">
                            <img class="d-md-block d-md-none d-xl-none d-lg-none d-sm-none d-none" width="100px" src="${tradeInItem.mediaUrl}" />
                            <img class="d-lg-block d-md-none d-xl-none d-sm-none d-none" width="100px" src="${tradeInItem.mediaUrl}" />
                            <img class="d-sm-block d-md-none d-xl-none d-lg-none d-none" width="100px" src="${tradeInItem.mediaUrl}" />
                            <img class="d-xl-block d-lg-none d-md-none d-sm-none" width="70px" src="${tradeInItem.mediaUrl}" />
                        </div>
                    </div>
                    <div class="col-5 col-lg-12 col-xl-5 d-flex align-items-center justify-content-start text-left">
                        <div class="row">
                            <div class="col-12 pb-3">
                                <a class="font-size-lg-h5 text-darker font-weight-bolder">${tradeInItem.categoryName} ${tradeInItem.name}</a>
                            </div>
                        </div>
                    </div>
                    <div class='col-3 col-lg-12 col-xl-3 d-flex align-items-center justify-content-start text-left'>
                        <div class='p-lg-3'>
                            <div>
                                <a class='font-size-h6 text-primary font-weight-bold'>-RM ${tradeInItem.price.toFixed(2)}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        `;

        addedTradeInItemsSection.appendChild(addedTradeInItemElement);

    });

    UpdateFinalForm();

    await Reset();
}

function RemoveAddedItem(addedItemId) {

    var addedItemRowId = `"AddedItemRow-${addedItemId}"`;

    const addedItemRow = document.getElementById(addedItemRowId);

    const addedItemSection = document.getElementById('W1_AddedItemsSection');
    addedItemSection.removeChild(addedItemRow);

    var removeItem = addedItems.find((a) => a.addedItemId === addedItemId);
    if (removeItem) {
        const indexToRemove = addedItems.findIndex(x => x.addedItemId === removeItem.addedItemId);

        if (indexToRemove !== -1) {
            addedItems.splice(indexToRemove, 1);
        }
    }

    UpdateFinalForm();
}

function RemoveAddedTradeInItem(addedTradeInItemId) {

    var addedTradeInItemRowId = `"AddedTradeInItemRow-${addedTradeInItemId}"`;

    const addedTradeInItemRow = document.getElementById(addedTradeInItemRowId);
    console.log(addedTradeInItemRow);

    const addedTradeInItemSection = document.getElementById('W1_AddedTradeInItemsSection');

    console.log(addedTradeInItemSection);

    addedTradeInItemSection.removeChild(addedTradeInItemRow);

    var removeTradeInItem = addedTradeInItems.find((a) => a.id === addedTradeInItemId);
    if (removeTradeInItem) {
        const indexToRemove = addedTradeInItems.findIndex(x => x.id === removeTradeInItem.id);

        if (indexToRemove !== -1) {
            addedTradeInItems.splice(indexToRemove, 1);
        }
    }

    UpdateFinalForm();
}

async function Reset() {

    tempSelectedProduct = new Object();
    tempDiscountInfo = new Object();
    tempSelectedProductWarranty = new Object();
    tempSelectedScrapBattery = new Array();

    var quantity = document.getElementById("W1_Quantity");
    quantity.value = '';

    var selectedItem = document.getElementById("W1_LabelItem");
    selectedItem.innerHTML = `Select Item`;

    var labelDiscount = document.getElementById("W1_LabelDiscount");
    labelDiscount.innerHTML = `No Discount`;

    var tradeInCheckbox = document.getElementById("W1_HasTradeIn");
    tradeInCheckbox.checked = false;
    tradeInCheckbox.removeAttribute("disabled");

    var warrantyCheckbox = document.getElementById("W1_HasWarranty");
    warrantyCheckbox.checked = false;
    warrantyCheckbox.removeAttribute("disabled");

    const selectedTradeInContainer = document.getElementById('SelectedTradeInContainer');
    selectedTradeInContainer.innerHTML = '';

    var tradeInAddBtnSection = document.getElementById("W1_TradeIn_AddBtnSection");
    tradeInAddBtnSection.classList.add("d-none");

    const selectedWarrantyContainer = document.getElementById('SelectedWarrantyContainer');
    selectedWarrantyContainer.innerHTML = '';
}

function CreateGuid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function UpdateFinalForm() {

    let totalSumItem = 0;
    for (const item of addedItems) {
        totalSumItem += item.subtotal;
    }

    let totalSumTradeInItem = 0;
    for (const item of addedTradeInItems) {
        totalSumTradeInItem += item.price;
    }

    var displayTotalLabel = totalSumItem - totalSumTradeInItem;

    var totalLabel = document.getElementById("W1_OrderTotalLabel");
    totalLabel.innerHTML = `RM ${Number(displayTotalLabel).toFixed(2)}`;
}