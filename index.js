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

  function getAllDateFormat(date){
    let dateStr=convertDateToString(date)

    let ddmmyyyy=dateStr.day+dateStr.month+dateStr.year;
    let mmddyyyy=dateStr.month+dateStr.day+dateStr.year;
    let yyyymmdd=dateStr.year+dateStr.month+dateStr.day;
    let ddmmyy=dateStr.day+dateStr.month+dateStr.year.slice(-2);
    let mmddyy=dateStr.month+dateStr.day+dateStr.year.slice(-2);
    let yymmdd=dateStr.year.slice(-2)+dateStr.month+dateStr.day;

    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
}

function checkPalindromeForAllDateFormat(date){
    let palindromeList=getAllDateFormat(date);
 
    let flag=false;
    for(let i=0;i<palindromeList.length;i++){
    if(isPalindrome(palindromeList[i])){
        flag=true;
        break;
    }
    }
    return flag
 }