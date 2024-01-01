//  Dark Mode

const darkMode = document.querySelector('#dark-btn');

function checkMode(){
    if(darkMode.checked){
        document.body.classList.add('dark');
    }else{
        document.body.classList.remove('dark');
    }
}

darkMode.addEventListener('click',checkMode);

/*********************************************************************/
//   Advance Mode

// Defining all the possible values
let number = '0123456789';
let lowerAlpha = 'abcdefghijklmnopqrstuvwxyz';
let upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let symbol = '~`!@#$%^&*()_-+={[]}|:;<,>.?/';

const advanceBtn = document.querySelector('#advance-btn');
const advanceHiddenTextField = document.querySelectorAll('#box-main input[type="text"]');
const advanceHidden = document.querySelectorAll('.advhidden');
const allCheckbox = document.querySelectorAll('#box-main input[type="checkbox"]');
const resetButton = document.querySelectorAll('.fa-arrows-rotate');

function ResetNumber(){
    number = '0123456789';
    advanceHiddenTextField[0].value = number;
}

resetButton[0].addEventListener('click',ResetNumber);

function ResetLowerAlpha(){
    lowerAlpha = 'abcdefghijklmnopqrstuvwxyz';
    advanceHiddenTextField[1].value = lowerAlpha;
}

resetButton[1].addEventListener('click',ResetLowerAlpha);

function ResetUpperAlpha(){
    upperAlpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    advanceHiddenTextField[2].value = upperAlpha;
}

resetButton[2].addEventListener('click',ResetUpperAlpha);

function ResetSymbol(){
    symbol = '~`!@#$%^&*()_-+={[]}|:;<,>.?/';
    advanceHiddenTextField[3].value = symbol;
}

resetButton[3].addEventListener('click',ResetSymbol);

function ResetAllPossibleValues(){
    ResetNumber();
    ResetLowerAlpha();
    ResetUpperAlpha();
    ResetSymbol();
}


function setAllPossibleValues(){
    number = document.querySelector('#possibleNumber').value;
    lowerAlpha = document.querySelector('#possibleLowerAlpha').value;
    upperAlpha = document.querySelector('#possibleUpperAlpha').value;
    symbol = document.querySelector("#possibleSymbol").value;
}

for(let i=0;i<4;i++){
    allCheckbox[i].addEventListener('click',()=>{
        console.log(advanceHiddenTextField[i],allCheckbox[i].checked);
        advanceHiddenTextField[i].disabled = !allCheckbox[i].checked;
    })
}

function changeAdvanceMode(){
    if(advanceBtn.checked){
        advanceHidden.forEach(element => {
            element.classList.remove('hidden')
        });
        document.querySelector('#box').classList.add('h-[660px]');
        document.querySelector('#box').classList.remove('h-[500px]');       
    }else{
        advanceHidden.forEach(element => {
            element.classList.add('hidden')
        });
        document.querySelector('#box').classList.add('h-[500px]');
        document.querySelector('#box').classList.remove('h-[660px]');
    }
}

advanceBtn.addEventListener('click',changeAdvanceMode);


/*********************************************************************/

let Password='';
let PasswordLength = 10;

const inputSlider = document.querySelector("[data-lengthSlider]");
const inputNumber = document.querySelector("[data-lengthNumber]");

const generateBtn = document.querySelector('#generateBtn');
let checkedItem = [];

function changeLength(e){
    if(e.target.value>0&&e.target.value<=50){
        PasswordLength = e.target.value;
    }else if(e.target.value>50){
        PasswordLength = 50;
    }else{
        PasswordLength = 1;
    }
    inputNumber.value = PasswordLength;
    inputSlider.value = PasswordLength;
}

inputSlider.addEventListener('input',changeLength);
inputNumber.addEventListener('input',changeLength);

inputNumber.value = 10;
inputSlider.value = 10;

// Initailising all the checkBox

const checkNumber = document.querySelector('#checkNumber');
const checkLowerAlpha = document.querySelector('#checkLowerAlpha');
const checkUpperAlpha = document.querySelector('#checkUpperAlpha');
const checkSymbol = document.querySelector('#checkSymbol');


function checkAllCheckbox(){
    checkedItem.length = 0;
    if(checkNumber.checked){
        checkedItem.push(number);
    }
    if(checkLowerAlpha.checked){
        checkedItem.push(lowerAlpha);
    }
    if(checkUpperAlpha.checked){
        checkedItem.push(upperAlpha);
    }
    if(checkSymbol.checked){
        checkedItem.push(symbol);
    }
}

// Handle CheckBox
function checkPossibleValue(){
    console.log(number,number.length);
    console.log(lowerAlpha,lowerAlpha.length);
    console.log(upperAlpha,upperAlpha.length);
    console.log(symbol,symbol.length);
}


// Random function creation
// this function give random integer min inclusive and max exclusive
function getRandomInt(min,max){
    return min+Math.floor(Math.random()*(max-min));
}

// handle overflow -> responsive
function truncateText() {
    if(textToCopy.scrollWidth <= textToCopy.clientWidth){
        return;
    }
    while (textToCopy.scrollWidth > textToCopy.clientWidth) {
      textToCopy.textContent = textToCopy.textContent.slice(0, -5);
    }
    textToCopy.textContent += '...';
}

// createPassword
function createPassword(){
    let str = '';
    for(let i=0;i<PasswordLength;i++){
        let k = getRandomInt(0,checkedItem.length);
        let r = getRandomInt(0,checkedItem[k].length);
        str += checkedItem[k][r];
    }
    Password = str;
    textToCopy.textContent = Password;
}


// lower-part initialisations
const copiedDisplay = document.querySelector('#copiedDisplay');
const textToCopy = document.querySelector('#textToCopy');
const preText = document.querySelector('#preText');
copiedDisplay.classList.remove('hidden');

// diplay generated password
function showCopiedPassword(){
    preText.classList.add('hidden');
    textToCopy.classList.remove('hidden');
    textToCopy.classList.add('flex');
    textToCopy.classList.remove('pointer-events-none');
}

// will display a copied message
function copyText(){
    if(Password.length==0){
        return;
    }
    navigator.clipboard.writeText(Password);
    copiedDisplay.classList.remove('scale-0');
    setTimeout(()=>{
        copiedDisplay.classList.add('scale-0');
    },1200)
}
textToCopy.addEventListener('click',copyText);

function generatePassword(){
    if(advanceBtn.checked){
        setAllPossibleValues();
    }else{
        ResetAllPossibleValues();
    }
    checkAllCheckbox(); // check all checkbox
    if(checkedItem.length==0){ // handle length = 0 -> do nothing
        return;
    }
    createPassword(); // create password
    showCopiedPassword(); // show copied Password
    truncateText(); // hide text overflow -> responsive
}

generateBtn.addEventListener('click',generatePassword);

