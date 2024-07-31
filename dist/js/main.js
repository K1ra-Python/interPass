function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  
  // Закройте выпадающее меню, если пользователь щелкает за его пределами
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  } 
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
    nav.style.display = "block";
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
  
let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelector('.slides');
    const totalSlides = document.querySelectorAll('.slide').length;

    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    slides.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    showSlide(currentIndex + 1);
}

function prevSlide() {
    showSlide(currentIndex - 1);
}

// Инициализация первого слайда
showSlide(currentIndex);
