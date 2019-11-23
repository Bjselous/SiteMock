var AvailableCatgories = [];
var SelectedSessionIndexForCategories = [];
var SelectedServicesInGiftCard = [];
var UserIsMember = false;

function setDefaults()
{
    var availableCatgories = document.getElementById('availableCategories').value;
    AvailableCatgories = JSON.parse(availableCatgories);

    var memberhsip = document.getElementById('alreadyMember');
    UserIsMember = memberhsip.value;
}

function displayPrice(category, session) {
    var priceForCategoryAndSession = document.getElementById('price-' + category + "-" + session).value;
    var pricespan = document.getElementById('pricespan-' + category);

    pricespan.innerHTML = priceForCategoryAndSession;
}

function setSessionSpanValues(category)
{
    var availablesessions = document.getElementById('availableSessionFor-' + category).value;
    var DeserialisedAvailableSessions = JSON.parse(availablesessions);

    var sessionSpan = document.getElementById('sessionspan-' + category);
    sessionSpan.innerHTML = DeserialisedAvailableSessions[0];

    displayPrice(category, DeserialisedAvailableSessions[0]);
}

function handleChangeSessionButtonClicked(clickedBTN)
{
    var category = clickedBTN[0].attributes["data-category"].value;
    var selectedfunction = clickedBTN[0].attributes["data-function"].value;

    //itterate through every category
    for (var index = 0; index < AvailableCatgories.length; index++)
    {
        if (AvailableCatgories[index] === category)
        {
            //After we find the index of the category

            //cat the available SessionLengths for the category
            var availablesessions = document.getElementById('availableSessionFor-' + category).value;
            var DeserialisedAvailableSessions = JSON.parse(availablesessions);

            var sessionSpan = document.getElementById('sessionspan-' + category);

            if (selectedfunction === "+")
            {
                //Select a longer session
                var indexPlusOne = SelectedSessionIndexForCategories[index] + 1;
                if (DeserialisedAvailableSessions.length > indexPlusOne)
                {
                    sessionSpan.innerHTML = DeserialisedAvailableSessions[indexPlusOne];
                    SelectedSessionIndexForCategories[index]++;

                    //Show the price for this session length
                    displayPrice(category, DeserialisedAvailableSessions[indexPlusOne]);
                }

            } else
            {
                //Select a shorter session
                var indexMinusOne = SelectedSessionIndexForCategories[index] - 1;
                if (0 <= indexMinusOne) {
                    sessionSpan.innerHTML = DeserialisedAvailableSessions[indexMinusOne];
                    SelectedSessionIndexForCategories[index]--;

                    //Show the price for this session length
                    displayPrice(category, DeserialisedAvailableSessions[indexMinusOne]);
                }
            }

            return;
        }
    }
}

function removeServiceFromGiftCard(clickedBTN)
{
    var serviceIndex = clickedBTN[0].attributes["data-serviceIndex"].value;
    SelectedServicesInGiftCard.splice(serviceIndex, 1);

    displayGiftCard();
}

function displayGiftCardCostAfterDiscounts()
{
    var totalBeforeDiscounts = 0;
    var ActualPrice = 0;

    for (var index = 0; index < SelectedServicesInGiftCard.length; index++)
    {
        totalBeforeDiscounts += parseInt(SelectedServicesInGiftCard[index].price);
    }

    var discountExplinationContainer = document.getElementById('discountExplinationContainer');
    discountExplinationContainer.innerHTML = "<p>No discounts have been applied to your booking. We offer discounts for bulk bookings and members get $20 off every booking.<p>";

    var membershipDiscountRow = document.getElementById('membershipDiscountRow');
    if (UserIsMember === true) {
       
        membershipDiscountRow.hidden = false;

        ActualPrice = totalBeforeDiscounts - 20;

        discountExplinationContainer.innerHTML = "<p>You have been given a $20 discount because you a member.<p>";
    }
    else
    {
        membershipDiscountRow.hidden = true;
    }

    ActualPrice = totalBeforeDiscounts;

    var bulkDiscountRow = document.getElementById('bulkDiscountRow');
    var bulkdiscountPricespan = document.getElementById('bulkdiscountPricespan'); 

    if (SelectedServicesInGiftCard.length > 9)
    {
        discountExplinationContainer.innerHTML += "<p>You have been given a 25% discount for a bulk booking.<p>";
        bulkdiscountPricespan.innerHTML = (ActualPrice * .25).toFixed(2);
        bulkDiscountRow.hidden = false;

        ActualPrice -= (ActualPrice * .25);
    }
    else if (SelectedServicesInGiftCard.length > 4)
    {
        discountExplinationContainer.innerHTML += "<p>You have been given a 20% discount for a bulk booking.<p>";
        bulkdiscountPricespan.innerHTML = (ActualPrice * .20).toFixed(2);
        bulkDiscountRow.hidden = false;
        ActualPrice -= (ActualPrice * .20);

    } else if (SelectedServicesInGiftCard.length > 2)
    {
        discountExplinationContainer.innerHTML += "<p>You have been given a 15% discount for a bulk booking.<p>";
        bulkdiscountPricespan.innerHTML = (ActualPrice * .15).toFixed(2);
        bulkDiscountRow.hidden = false;
        ActualPrice -= (ActualPrice * .15);

    } else if (SelectedServicesInGiftCard.length > 1)
    {
        discountExplinationContainer.innerHTML += "<p>You have been given a 10% discount for a bulk booking.<p>";
        bulkdiscountPricespan.innerHTML = (ActualPrice * .1).toFixed(2);
        bulkDiscountRow.hidden = false;
        ActualPrice -= (ActualPrice * .10);
    }
    else if (SelectedServicesInGiftCard.length === 1)
    {
        bulkDiscountRow.hidden = true;
    }
    
    var totalspan = document.getElementById('totalspan');
    totalspan.innerHTML = ActualPrice.toFixed(2);
    
}

function displayGiftCard()
{
    var giftCardContainer = document.getElementById('giftCardContainer');
    giftCardContainer.innerHTML = ""; //reset the container

    var newHTML = "";

    for (var index = 0; index < SelectedServicesInGiftCard.length; index++)
    {
        newHTML += '<div class="row no-gutters">';

        newHTML += '<div class="col-3 text-center">';
        newHTML += SelectedServicesInGiftCard[index].category;
        newHTML += '</div>';

        newHTML += '<div class="col-3 text-center">';
        newHTML += SelectedServicesInGiftCard[index].sessionLength + " min";
        newHTML += '</div>';

        newHTML += '<div class="col-3 text-center">';
        newHTML += "$ " + SelectedServicesInGiftCard[index].price;
        newHTML += '</div >';

        newHTML += '<div class="col-3 text-center">';
        newHTML += '<button data-serviceIndex="'+ index +'" class="btn btn-danger removeServiceButton">Remove</button>';
        newHTML += '</div>';

        newHTML += '</div>';

        newHTML += '<br/>';
    }

    if (SelectedServicesInGiftCard.length === 0)
    {
        newHTML += '<div class="col-12 text-center">';
        newHTML += "<p>You haven't added any services to your gift card yet. As you add services they will appear here.</p>";
        newHTML += '</div>';
    }
    giftCardContainer.innerHTML = newHTML;
    
    var removeServiceButtons = document.getElementsByClassName("btn btn-danger removeServiceButton");
    for (let i = 0; i < removeServiceButtons.length; i++)
    {
        removeServiceButtons[i].removeEventListener('click', function () {
            addServiceToGiftCard($(this));
        });

        removeServiceButtons[i].addEventListener('click', function () {
            removeServiceFromGiftCard($(this));
        });
    }

    displayGiftCardCostAfterDiscounts();

    if (SelectedServicesInGiftCard.length>0)
    {
        var submitButton = document.getElementById('submitButton');
        submitButton.disabled = false;
    }
}

function addServiceToGiftCard(clickedBTN)
{
    var category = clickedBTN[0].attributes["data-category"].value;
    var sessionSpan = document.getElementById('sessionspan-' + category);
    var pricespan = document.getElementById('pricespan-' + category);

    var service = new Object();
    service.category = category;
    service.sessionLength = sessionSpan.innerHTML;
    service.price = pricespan.innerHTML;

    SelectedServicesInGiftCard.push(service);
    displayGiftCard();
}

function navigatToStepTwo()
{
    window.location.href = "../giftcard/steptwo?services=" + JSON.stringify(SelectedServicesInGiftCard);
}

$(document).ready(function ()
{
    setDefaults();

    AvailableCatgories.forEach(setSessionSpanValues);

    for (var index = 0; index < AvailableCatgories.length; index++)
    {
        SelectedSessionIndexForCategories[index] = 0;
    }

    var changeSessionsButtons = document.getElementsByClassName("btn btn-default changeSessionLength");
    for (let i = 0; i < changeSessionsButtons.length; i++) {
        changeSessionsButtons[i].addEventListener('click', function () {
            handleChangeSessionButtonClicked($(this));
        });
    }

    var addServiceButtons = document.getElementsByClassName("btn btn-primary addServiceButton");
    for (let i = 0; i < addServiceButtons.length; i++)
    {
        addServiceButtons[i].addEventListener('click', function ()
        {
            addServiceToGiftCard($(this));
        });
    }

    displayGiftCard();

    var submitButton = document.getElementById('submitButton');
    submitButton.disabled  = true;
    submitButton.addEventListener('click', function ()
    {
        navigatToStepTwo();
    });
});