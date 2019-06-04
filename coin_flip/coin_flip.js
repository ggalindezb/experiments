function randomNumber(n) {
  return search(0, n);
}

function flip() {
  return Math.random() >= 0.5;
}

function search(bottom, top) {
  var lower_limit = Math.floor(bottom);
  var upper_limit = Math.ceil(top);

  if(Math.floor(bottom) == Math.floor(top)) {
    return flip() ? lower_limit : upper_limit;
  } else {
    var middle = (lower_limit + upper_limit) / 2
    middle = flip() ? Math.floor(middle) : Math.ceil(middle);

    return flip() ? search(lower_limit, middle) : search(middle, upper_limit);
  }
}

console.log(randomNumber(10));
