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

var ItemPicture = function (name, imageSrc) {
  this.name = name;
  this.clicks = 0;
  this.timesShown = 0;
  this.url = imageSrc;
  // the allImages array is a property of the ItemPicture constructor
  ItemPicture.allImages.push(this);
};
ItemPicture.allImages = [];

var totalClicks = 0;

// Variables to store the Items already on the page
var leftItemOnThePage = null;
var rightItemOnThePage = null;
var middleItemOnThePage = null;

var renderNewItems = function (leftIndex, rightIndex, middleIndex){
  leftItemImageElem.src = ItemPicture.allImages[leftIndex].url;
  rightItemImageElem.src = ItemPicture.allImages[rightIndex].url;
  middleItemImageElem.src = ItemPicture.allImages[middleIndex].url;

  leftItemCaptionElem.textContent = ItemPicture.allImages[leftIndex].name;
  rightItemCaptionElem.textContent = ItemPicture.allImages[rightIndex].name;
  middleItemCaptionElem.textContent = ItemPicture.allImages[middleIndex].name;
};
///// quesion declaring indexes for left and middlebefore do loop
var pickNewItems = function(){
  var leftIndex = Math.floor(Math.random() * ItemPicture.allImages.length);
  var middleIndex = Math.floor(Math.random() * ItemPicture.allImages.length);

  do {
    var rightIndex = Math.floor(Math.random() * ItemPicture.allImages.length);
  } while (rightIndex === leftIndex===middleIndex);
  // console.log(ItemPicture.allImages[leftIndex].name, ItemPicture.allImages[rightIndex].name);

  leftItemOnThePage = ItemPicture.allImages[leftIndex];
  rightItemOnThePage = ItemPicture.allImages[rightIndex];
  middleItemOnThePage = ItemPicture.allImages[middleIndex];
  renderNewItems(leftIndex, rightIndex, middleIndex);
};

var handleClickOnItem = function(event){

  if(totalClicks < maxClicks){

    var thingWeClickedOn = event.target;
    var picId = thingWeClickedOn.id;

    if(picId === 'left_item_img' || picId === 'right_item_img' || picId === 'middle_item_img'){
      //track the Items
      // increment the Item image in the left_Item_image slot's clicks
      // if Item is the left Item, increment the left Item)
      if(picId === 'left_item_img'){
        leftItemOnThePage.clicks++;
        console.log('item',name.ItemPicture);
      }

      if(picId === 'right_item_img'){
        rightItemOnThePage.clicks++;
      }
      if(picId === 'middle_item_img'){
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
  if(totalClicks === maxClicks){
    itemImageSectionElem.removeEventListener('click', handleClickOnItem);
    console.log(`you picked ${maxClicks} Items, thanks!`);
  }
};

itemImageSectionElem.addEventListener('click', handleClickOnItem);

// Instantiate my image objects
var itemList = ['bag', 'banana','bathroom','breakfast','bubblegum', 'boots', 'chair', 'cthulhu','dog-duck','dragon','pen','pet-sweep'];
for (var i=0; i<itemList.length; i++) {
  new ItemPicture(`${itemList[i]}`, `./img/${itemList[i]}.jpg`);
}

pickNewItems();

