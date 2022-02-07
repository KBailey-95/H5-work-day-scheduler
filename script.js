//displays current day and time
getCurrentTime = () => {
    const today = moment();
    $("#currentDay").text(today.format("LLLL"));
  };
  
  getLocalStorage = () => {
    //loop through local storage
    for (let i = 0; i < localStorage.length; i++) {
      //key
      const key = localStorage.key(i);
      //gets value from key and saves in variable named description
      const description = localStorage.getItem(key);
        //input's attribute `data-id` is its corresponding key
      $(`input[data-id=${key}]`).val(description);
  
    }
  };
  
  attachBtnClicks = () => {
    const saveBtnEl = $(".saveBtn");
    saveBtnEl.on("click", function () {
      const button = $(this); //gets reference to what was just clicked.
      const descriptionEl = button.closest(".row").find(".description"); //gets closest with class=description
      const description = descriptionEl.val(); //value of text input
      const dataId = descriptionEl.attr("data-id"); //get attribute from descriptionEl
      
      //dataId is the key, description is the value.
      localStorage.setItem(`${dataId}`, description); //store description and its data-id (using string interpolation)
  
    });
  };
  
  //compare .description's data-id to the current time
  //append  class with  css properties to reflect time.
  setPlaceInTime = () => {
    $(".description").each(function () {
      var dataId = $(this).attr("data-id");
      var currentHour = moment().hour();
  
      if (dataId < currentHour) {
        $(this).addClass("past");
      } else if (dataId == currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  };
  
  resetDayBtn = () => { 
    const resetDayBtn = $(".clear-btn");
    resetDayBtn.on("click", function () {
      localStorage.clear();
      for (let i = 0; i < $(".description").length; i++){
        $(".description").val('');
      }
      
    })
    
  
  }
  //call functions.
  main = () => {
    getCurrentTime();
    getLocalStorage();
    attachBtnClicks();
    setPlaceInTime();
    resetDayBtn();
  };
  main();