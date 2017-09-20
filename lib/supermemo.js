//  Supermemo equation https://www.supermemo.com/english/ol/sm2.htm

function getEf(oldEf, difficulty) {

  if (difficulty < 3) {
    return oldEf;
  } else {

    var newEf = oldEf + (0.1 - (5.0 - difficulty) * (0.08 + (5.0 - difficulty) * 0.02));

    if (newEf < 1.3) {

      newEf = 1.3;

    }

  	return newEf;
  }
}

function getInterval(newEf, oldInt, oldN, difficulty) {

  var newInt = Math.ceil(oldInt * newEf);
  var	newN = oldN + 1;

  if (difficulty < 3) {
    newN = 1;
  }

  if (difficulty < 4) {
    dueAgain = true;
  } else {
    dueAgain = false;
  }

  if (newN === 1) {
    newInt= 1;
  } else if (newN === 2) {
		newInt= 6;
  }


  const newCard = {
    n: newN,
    int: newInt,
    dueAgain: dueAgain
  };

	return newCard;
}

module.exports = {
  getEf: getEf,
  getInterval: getInterval
};
