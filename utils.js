// utils.js

module.exports = {

  sortByTime: sortByTime
};

function sortByTime(data) {

  var datesmade = {};
  var yearArr = [];
  var finalArr = [];

  data.forEach(function(poast, index, data) {

    // if there is no array for this year yet, make one first
    if (!datesmade[poast.updated_at.year]) {
      datesmade[poast.updated_at.year] = [];
      yearArr.push(poast.updated_at.year);
    }

    datesmade[poast.updated_at.year].push(maketitleObj(poast));
  });
  yearArr.sort(function(a,b){return b-a;});

  // loop through datesmade, and sort
  yearArr.forEach(function(year, index, yearArr) {

    datesmade[year].sort(sortPosts);
    finalArr.push({year: year, posts: datesmade[year]});
  });

  return finalArr;
}

function maketitleObj(poast) {
  var titleObj = {};
  titleObj.title = poast.title;
  titleObj.month = poast.updated_at.month;
  titleObj.day = poast.updated_at.day;
  return titleObj;
}

function sortPosts(a, b) {
  if (a.month < b.month)
    return 1;
  else if (a.month > b.month)
    return -1;
  else {
    if (a.day < b.day)
      return 1;
    else if (a.day > b.day)
      return -1;
  }
  return 0;
}

/*
  format should be
  [
    {
      year: yyyy,  // these objects also sorted
      poasts: [
        // sorted
      ]
    },
    {

    }
  ]
 */
