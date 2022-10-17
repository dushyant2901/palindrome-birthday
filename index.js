const dateInputRef = document.querySelector("#bday-input");
const showBtnRef = document.querySelector("#show-btn");
const resultRef = document.querySelector("#result");

const waitDiv = document.querySelector("#waiting");

const yesImg = document.querySelector("#img-yay");
const yesDiv = document.querySelector("#div-yay");

const noImg = document.querySelector("#img-nah");
const noDiv = document.querySelector("#div-nah");

showBtnRef.addEventListener("click", clickHandler);

function reverseString(str) {
  //  let listOfChar=str.split("");
  // let reverseListOfChar=listOfChar.reverse();
  // let reversedString=reverseListOfChar.join("");
  // return reversedString
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  let reverseStr = reverseString(str);
  return str === reverseStr;
}

function convertDateToString(date) {
  let dateStr = {
    day: "",
    month: "",
    year: "",
  };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormat(date) {
  let dateStr = convertDateToString(date);

  let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindromeForAllDateFormat(date) {
  let palindromeList = getAllDateFormat(date);

  let flag = false;
  for (let i = 0; i < palindromeList.length; i++) {
    if (isPalindrome(palindromeList[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  console.log(year);
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
}
function nextDay(date) {
  let day = date.day;
  let month = date.month;
  let year = date.year;
  day = day + 1;

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      console.log("leap");
      if (day > 29) {
        day = 1;
        month++;
        // console.log("leap")
      }
    } else {
      console.log("not-leap");
      if (day > 28) {
        day = 1;
        month++;
        // console.log("not-leap")
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindrome(date) {
  ctr = 0;
  let nextDate = nextDay(date);

  while (1) {
    let isPalindrome = checkPalindromeForAllDateFormat(nextDate);
    ctr++;
    if (isPalindrome) {
      break;
    }
    nextDate = nextDay(nextDate);
  }
  return [ctr, nextDate];
}
function setDisplay(refs, val) {
  refs.forEach((ref) => {
    ref.style.display = val;
  });
}
function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  var previousDate = getPreviousDate(date);
  var ctr = 0;

  while (1) {
    let isPalindrome = checkPalindromeForAllDateFormat(previousDate);
    ctr++;
    if (isPalindrome) {
      break;
    }
    previousDate = getPreviousDate(previousDate);
  }
  return [ctr, previousDate];
}

function clickHandler() {
  let bdaystr = dateInputRef.value;
  //console.log(bdayDate)
  if (bdaystr !== "") {
    let listOfBdayStr = bdaystr.split("-");
    let date = {
      day: Number(listOfBdayStr[2]),
      month: Number(listOfBdayStr[1]),
      year: Number(listOfBdayStr[0]),
    };

    let isPalindrome = checkPalindromeForAllDateFormat(date);

    setDisplay([resultRef, noDiv, noImg, yesDiv, yesImg], "none");
    setDisplay([waitDiv], "flex");

    setTimeout(function () {
      setDisplay([waitDiv], "none");

      if (isPalindrome) {
        //console.log("yay")
        setDisplay([resultRef, noDiv, noImg], "none");
        setDisplay([resultRef, yesDiv, yesImg], "flex");
        //  resultRef.innerText="Congrats!! Your Birthday Is Palindrome."
      } else {
        console.log("nope");
        setDisplay([resultRef, yesDiv, yesImg], "none");
        let [ctr, nextDate] = getNextPalindrome(date);
        let [ctr2, prevDate] = getPreviousPalindromeDate(date);
        console.log(ctr, ctr2);
        if (ctr > ctr2) {
          noDiv.innerHTML = `Nah! Your birthday is not Palindrome.Previous palindrome was on ${prevDate.day}-${prevDate.month}-${prevDate.year} . You missed it by ${ctr2} days. `;
          //  howManyDays.innerText = ` ${ctr2} `;
          //  next.innerText = `  ${prevDate.day}-${prevDate.month}-${prevDate.year} `;
        } else {
          noDiv.innerHTML = `Nah! Your birthday is not Palindrome.Next palindrome was on ${nextDate.day}-${nextDate.month}-${nextDate.year} . You missed it by ${ctr} days. `;
        }

        setDisplay([resultRef, noImg], "flex");
        setDisplay([noDiv], "block");
      }
    }, 4000);
  }
}

/* function getPreviousPalindrome(date){
        ctr1=0
        let previousDate=previousDay(date);
     
        while(1){
            let isPalindrome=checkPalindromeForAllDateFormat(previousDate)
            ctr1++;
            if(isPalindrome){
     
                break
            }
            previousDate=previousDay(previousDate);
            
           }
           return [ctr1,previousDate]
     } 

     
     let [ctr1,previousDate]= getPreviousPalindrome(date);
resultRef.innerText=`The Previous Palindrome Date Is ${previousDate.day}-${previousDate.month}-${previousDate.year} and you missed it by ${ctr1} days`
  */
