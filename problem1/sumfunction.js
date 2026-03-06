var sum_to_n_a = function (n) {
  var sum = 0;
  for (var i = 0; i <= n; i++) {
    sum = sum + i;
  }
  return sum;
};

var sum_to_n_e = function (n) {
  var sum = 0;
  var i = 1;
  while (i <= n) {
    sum += i;
    i++;
  }
  return sum;
};

var sum_to_n_c = function (n) {
  return (n * (n + 1)) / 2;
};
