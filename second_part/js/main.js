const lengthItem = document.getElementById('lengthItem');
const widthItem = document.getElementById('widthItem');
const calculate = document.getElementById('calculate');

const elementSquare = 4;

calculate.addEventListener('click', function () {
    let lengthOfSquare = lengthItem.value;
    let widthOfSquare = widthItem.value;
    let squareAll = (lengthOfSquare * widthOfSquare);
    let items = (squareAll / elementSquare);
    let smallPackage = 0;
    let bigPackage = 0;

    let i = 0;
    while (i < items) {
        let temp = items - i;
        if (temp <= 6) {
            i += 6;
            smallPackage++;
            console.log('six');
        } else if (temp % 8 == 0) {
            i += 8;
            console.log('eight');
            bigPackage++;
        } else if (temp % 6 == 0) {
            i += 6;
            smallPackage++;
            console.log('six');
        } else {
            i += 8;
            bigPackage++;
            console.log('eight');
        }
    }

    let inc = 2;
    if (items > 8) {
        while(((smallPackage * 6) + (bigPackage * 8) - items) >= inc) {
            bigPackage -= (inc / 2);
            smallPackage += (inc / 2);
            console.log("inc: " + inc);
            inc += 2;
        }
        if (((smallPackage * 6) + (bigPackage * 8) - items) == 3) {
          bigPackage -= 1;
          smallPackage +=1; 
        }
        console.log(inc);
    }

    let remainder = ((smallPackage * 6) + (bigPackage * 8) - items);

    document.getElementById('sixPackages').textContent = smallPackage;
    document.getElementById('eightPackages').textContent = bigPackage;
    document.getElementById('total').textContent = items;
    document.getElementById('total-calc').textContent = ((smallPackage * 6) + (bigPackage * 8));
    document.getElementById('remainder').textContent = remainder;
    // console.log("big package: " + bigPackage);
    // console.log("small package: " + smallPackage);
    // console.log("nado: " + items);
    // console.log("Ostatok: " + remainder);
});