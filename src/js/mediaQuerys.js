function myFunction(x) {
    var button = document.getElementById("gfe");
    if (x.matches) {
      // Проверка состояния медиа-запроса
      button.style.backgroundColor = "";
      addExtraButton();
    } else {
      button.style.backgroundColor = "";
      removeExtraButton();
    }
  }
  
  function addExtraButton() {
    if (!document.getElementById("extraButton")) {
      const newButton = document.createElement("button");
      newButton.id = "extraButton";
      const button = document.getElementById("gfe");
      button.parentNode.insertBefore(newButton, button);
  
      // Показать меню
      const nav = document.getElementById("myNav");
      nav.style.display = "none";
  
      // Обработчик клика для основного элемента
      button.onclick = function() {
        if (nav.style.display === "none") {
          borderRadius.style.borderRadius = 0; // Используем глобальную переменную
          telephone.style.display = "none";
          nav.style.display = "flex";
        } else {
          nav.style.display = "none";
          telephone.style.display = "flex";
          borderRadius.style.borderRadius = "18px"; // Используем глобальную переменную
        }
      };
    }
  }
  
  function removeExtraButton() {
    var extraButton = document.getElementById("extraButton");
    if (extraButton) {
      extraButton.remove();
    }
    // Скрыть меню
    const nav = document.getElementById("myNav");
    borderRadius.style.borderRadius = "18px"; // Используем глобальную переменную
    nav.style.display = "none";
  }
  
  // Create a MediaQueryList object
  var x = window.matchMedia("(max-width: 735px)");
  
  // Глобальная переменная для элемента borderRadius
  let borderRadius = document.getElementById("myHeader");
  let telephone = document.getElementById("telephone")
  
  // Call listener function at run time
  myFunction(x);
  
  // Attach listener function on state changes
  x.addEventListener("change", function() {
    myFunction(x);
  });
  