//======RADIO CLICKING AREA CLICK BEHAVIOUR=======

$(document).ready(function() {
  $(".form-check").on("click", function() {
    var checkBoxes = $(this).find("input");
    checkBoxes.prop("checked", !checkBoxes.prop("checked"));
    var section = parseInt($(this).parent().parent().parent().attr("data-section"));
    var question = parseInt($(checkBoxes).attr("name"));
    var value = parseInt($(checkBoxes).attr("data-value"));
    if ($(checkBoxes).is(":checked") == true) {
      updatePosition(section, question, value);
    } else {
      updatePosition(section, question, 0);
    }
  });
});

//=======WERTESYSTEM===============

var answers = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
  [0, 0],
  [0],
  [0],
  [0, 0],
]

function updatePosition(section, question, value) {
  answers[section - 1][question - 1] = value;
  sortSuggestions();
}

function sortSuggestions() {
  var category = getCategories();
  var sortedCategory = sortWithIndeces(category);
  applyNewOrder(sortedCategory, false);
}

function getCategories() {
  var categoryArray = []
  var calculatedNumber = 0;
  var score = 0;
  for (var i = 0; i < answers.length; i++) {
    for (var j = 0; j < answers[i].length; j++) {
      calculatedNumber += parseInt(answers[i][j]);
      score += parseInt(answers[i][j]);
    }
    categoryArray.push(calculatedNumber);
    calculatedNumber = 0;
    var subcategory = getSubcategory(i);
    var sortedSubcategory = sortWithIndeces(subcategory);
    applyNewOrder(sortedSubcategory, true, i + 1);
  }
  document.getElementById("score").innerHTML = score+'/86 Punkten  <span class="badge badge-secondary">&empty; 49</span>';
  return categoryArray;
}

function getSubcategory(section) {
  var categoryArray = [];
  for (var i = 0; i < answers[section].length; i++) {
    categoryArray.push(answers[section][i]);
  }
  return categoryArray
}

function sortWithIndeces(toSort) { //Nach Vorschlag von Stackoverflow: Dave Aaron Smith
  var indices = [];
  for (var i = 0; i < toSort.length; i++) {
    toSort[i] = [toSort[i], i];
  }
  toSort.sort(function(left, right) {
    return left[0] < right[0] ? -1 : 1;
  });
  for (var j = 0; j < toSort.length; j++) {
    indices.push(toSort[j][1]);
    toSort[j] = toSort[j][0];
  }
  return indices;
}

function applyNewOrder(toOrder, sub, section) {
  if (sub != true) {
    $(".categoryContainer").removeClass(function() {
      return $(this).attr("class").split(' ').pop();
    });
    for (var i = 0; i < toOrder.length; i++) {
      var j = i + 1;
      var k = toOrder[toOrder.length - j] + 1;
      $(".categoryContainer:nth-of-type(" + k + ")").addClass("order-" + j);
    }
  } else if (sub == true) {
    $(".subcategoryContainer" + section).removeClass(function() {
      return $(this).attr("class").split(' ').pop();
    }); //remove order-x
    for (var i = 0; i < toOrder.length; i++) {
      var j = i + 1;
      var k = toOrder[toOrder.length - j] + 1;
      // console.log(k);
      $(".subcategoryContainer" + section + ":nth-of-type(" + k + ")").addClass("order-" + j);
    }
  }
}
