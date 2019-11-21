'use strict';
// Globals
var itemImageSectionElem = document.getElementById('all_items');

var leftItemImageElem = document.getElementById('left_item_img');
var rightItemImageElem = document.getElementById('right_item_img');
var middleItemImageElem = document.getElementById('middle_item_img');

var leftItemCaptionElem = document.getElementById('left_item_h2');
var rightItemCaptionElem = document.getElementById('right_item_h2');
var middleItemCaptionElem = document.getElementById('middle_item_h2');
var maxClicks = 12;
var storedItems = [];
var trio = [];



var ItemPicture = function (name, imageSrc) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;
  // the allImages array is a property of the ItemPicture constructor
  ItemPicture.allImages.push(this);
  storedItems.push(this);
};
ItemPicture.allImages = [];

var totalClicks = 0;

// Variables to store the Items already on the page
var leftItemOnThePage = null;
var rightItemOnThePage = null;
var middleItemOnThePage = null;

var renderNewItems = function (leftIndex, rightIndex, middleIndex) {
  leftItemImageElem.src = ItemPicture.allImages[leftIndex].url;
  rightItemImageElem.src = ItemPicture.allImages[rightIndex].url;
  middleItemImageElem.src = ItemPicture.allImages[middleIndex].url;

  leftItemCaptionElem.textContent = ItemPicture.allImages[leftIndex].name;
  rightItemCaptionElem.textContent = ItemPicture.allImages[rightIndex].name;
  middleItemCaptionElem.textContent = ItemPicture.allImages[middleIndex].name;
};
///// quesion declaring indexes for left and middlebefore do loop
var pickNewItems = function () {
  do {
    var leftIndex = Math.floor(Math.random() * ItemPicture.allImages.length);
  } while (leftIndex === trio[0] || leftIndex === trio[1] || leftIndex === trio[2]);


  do {
    var middleIndex = Math.floor(Math.random() * ItemPicture.allImages.length);
  } while (middleIndex === leftIndex || middleIndex === trio[0] || middleIndex === trio[1] || middleIndex === trio[2]);

  do {
    var rightIndex = Math.floor(Math.random() * ItemPicture.allImages.length);
  } while (rightIndex === leftIndex || rightIndex === middleIndex || middleIndex === trio[0] || middleIndex === trio[1] || middleIndex === trio[2]);
  // console.log(ItemPicture.allImages[leftIndex].name, ItemPicture.allImages[rightIndex].name);


  leftItemOnThePage = ItemPicture.allImages[leftIndex];
  rightItemOnThePage = ItemPicture.allImages[rightIndex];
  middleItemOnThePage = ItemPicture.allImages[middleIndex];

  trio[0] = leftIndex;
  trio[1] = rightIndex;
  trio[2] = middleIndex;

  console.log('trio', trio);

  renderNewItems(leftIndex, rightIndex, middleIndex);
};


var handleClickOnItem = function (event) {

  if (totalClicks < maxClicks) {

    var thingWeClickedOn = event.target;
    var picId = thingWeClickedOn.id;

    if (picId === 'left_item_img' || picId === 'right_item_img' || picId === 'middle_item_img') {
      //track the Items
      // increment the Item image in the left_Item_image slot's clicks
      // if Item is the left Item, increment the left Item)
      if (picId === 'left_item_img') {
        leftItemOnThePage.clicks++;
        console.log('item', name.ItemPicture);
      }

      if (picId === 'right_item_img') {
        rightItemOnThePage.clicks++;
      }
      if (picId === 'middle_item_img') {
        middleItemOnThePage.clicks++;
      }
      leftItemOnThePage.timesShown++;
      rightItemOnThePage.timesShown++;
      middleItemOnThePage.timesShown++;
      //after we update the old, pick new pictures
      pickNewItems();
    }
    console.log(event.target.id);
  }
  // increment amount of clicks
  totalClicks++;
  //when they reach total max clicks, remove the click function
  if (totalClicks === maxClicks) {
    itemImageSectionElem.removeEventListener('click', handleClickOnItem);
    console.log(`you picked ${maxClicks} Items, thanks!`);
    renderChart();

    var itemJASON= JSON. stringify(itemList); //replace itemList with click count
    localStorage.setItem('item data', itemJASON);
  }
};

itemImageSectionElem.addEventListener('click', handleClickOnItem);

var itemList = ['bag', 'banana', 'bathroom', 'breakfast', 'bubblegum', 'boots', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'tauntaun', 'unicorn', 'water-can', 'wine-glass'];
for (var i = 0; i < itemList.length; i++) {
  new ItemPicture(`${itemList[i]}`, `./img/${itemList[i]}.jpg`);
}
pickNewItems();

var renderChart = function () {

  var clickTotals = [];
  for (var i = 0; i < ItemPicture.allImages.length; i++) {
    clickTotals.push(ItemPicture.allImages[i].clicks);
  }
  console.log('clickTotals', clickTotals);
  //putting all times shown into array
  var timesRendered = [];
  for (var j = 0; j < ItemPicture.allImages.length; j++) {
    timesRendered.push(ItemPicture.allImages[j].timesShown);
  }
  console.log('timesShown', timesRendered);


// Canvas related stuff
  var ctx = document.getElementById('myChart').getContext('2d');
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: ['bag', 'banana', 'bathroom', 'breakfast', 'bubblegum', 'boots', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'],
      datasets: [{
        label: 'voting',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: clickTotals
      }, {
        label: 'total shows',
        backgroundColor: 'rgb(0,0,255)',
        borderColor: 'rgb(0,0,255)',
        data: timesRendered
      }
      ]

    },

    // Configuration options go here
    options: {}
  });



  // function saveStatsToLocalStorage(storedItems){
  //   var productStats = [];
  //   for (var i = 0; i < storedItems.length; i++) {
  //     productStats.push(storedItems[i]);
  //   }
  //   console.log(JSON.stringify(productStats));
  //   localStorage.productStats = JSON.stringify(productStats);
  // }

  // saveStatsToLocalStorage(storedItems);

}