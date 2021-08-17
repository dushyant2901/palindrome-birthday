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

 function convertDateToString(date){
    let dateStr={
          day:"",
          month:"",
          year:""
      }
   if(date.day<10){
       dateStr.day="0"+date.day;
   }else{
       dateStr.day=date.day.toString();
   }
  
   if(date.month<10){
       dateStr.month="0"+date.month;
   }else{
       dateStr.month= date.month.toString();
   }
  
   dateStr.year=date.year.toString();
   return dateStr  
  
  }