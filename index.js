const dateInputRef=document.querySelector("#bday-input");
const showBtnRef=document.querySelector("#show-btn");
const resultRef=document.querySelector("#result");

showBtnRef.addEventListener("click",clickHandler);

function reverseString(str){
    let listOfChar=str.split("");
   let reverseListOfChar=listOfChar.reverse();
   let reversedString=reverseListOfChar.join("");
   return reversedString 
  // return str.split("").reverse().join("")
 } 

 function isPalindrome(str){
    let reverseStr=reverseString(str);
    return str===reverseStr
 
 }