// Используется синтаксис ES6 (2015)
// ==================================================================== Пример 1 (анимация при наведении, возврат к изначальному состоянию при отведении мыши)

// Получаем объекты и записываем в переменные
const mainpageBtns = document.querySelectorAll(".main__item_btn");
const mainpageLeftCloud = document.querySelector(".main__bg_left");
const mainpageRightCloud = document.querySelector(".main__bg_right");
const mainpageLeftBg = document.querySelector(".main__item_img.left");
const mainpageCenterBg = document.querySelector(".main__item_img.center");
const mainpageRightBg = document.querySelector(".main__item_img.right");

// Проходим функцией по объектам и каждому вешаем слушатель на наведении мышью
mainpageBtns.forEach((item) => {
	item.addEventListener("mouseover", () => {
		// Получаем атрибут data-btn объекта
		let itemId = item.getAttribute("data-btn");

		// В зависимости от значения атрибута меняем стили
		switch (itemId) {

			// В зависимости от случая (атрибута) меняем размер и расположение элементов
			case "left":
				mainpageLeftBg.style.transform = "translateX(20%) scale(1.2)";
				mainpageCenterBg.style.transform = "translate(8%, 15%)";
				mainpageLeftCloud.style.transform = "translate(-10%, 4%)";
				mainpageRightCloud.style.transform = "translate(-10%, 4%)";
				break;

			case "center":
				mainpageCenterBg.style.transform = "translateY(0%) scale(1.1)";
				mainpageLeftBg.style.transform = "translateX(-5%)";
				mainpageRightBg.style.transform = "translateX(5%)";
				mainpageLeftCloud.style.transform = "translate(0%, -8%)";
				mainpageRightCloud.style.transform = "translate(0%, -8%)";
				break;

			case "right":
				mainpageRightBg.style.transform = "translateX(-10%) scale(1.2)";
				mainpageCenterBg.style.transform = "translate(-8%, 15%)";
				mainpageLeftCloud.style.transform = "translate(10%, 4%)";
				mainpageRightCloud.style.transform = "translate(10%, 4%)";
				break;
		}
	});

	// Слушатель события на отведение мыши с выбранных элементов
	item.addEventListener("mouseleave", () => {

		// Сброс стилей всех элементов к изначальным значениям
		mainpageLeftBg.style.transform = "translateX(10%) scale(1)";
		mainpageCenterBg.style.transform = "translate(0%, 10%) scale(1)";
		mainpageRightBg.style.transform = "translate(0%, 0%) scale(1)";
		mainpageLeftCloud.style.transform = "translate(0%, 0%)";
		mainpageRightCloud.style.transform = "translate(0%, 0%)";
	});
});






// =========================================== Пример 2 (переключение всплывающих окон и передача данных в inputs при клике по элементам)


// Получаем объекты и записываем в переменные
const subpopupTable = document.getElementById("selectTable");
const subpopupColor = document.getElementById("selectColor");
const subpopupSizes = document.getElementById("selectSizes");

const choosenTableInput = document.getElementById("choosenTable");
const choosenColorInput = document.getElementById("choosenColor");

const popupTables = document.querySelectorAll(".popup__view_item");
const popupColors = document.querySelectorAll(".popup__colors_item");

const calcBtns = document.querySelectorAll(".calc-btn");
const calcPopup = document.querySelector(".popup__calc");


// Циклом каждому элементу вешаем слушатель события нажатия
popupTables.forEach((item) => {
	item.addEventListener("click", () => {

		// Записываем текстовое содержимое текущего элемента 
		let tableTitle = this.querySelector(".popup__table").textContent;

		// Устанавливаем в значение (input) текущий текст из предыдущей переменной
		choosenTableInput.value = tableTitle;

		// Удаляем класс для текущего окна и присуждаем следующему
		subpopupTable.classList.remove("active");
		subpopupColor.classList.add("active");
	});
});

// Циклом каждому элементу вешаем слушатель события нажатия
popupColors.forEach((item) => {
	item.addEventListener("click", () => {
		// Передаем id атрибут текущего элемента в значение (input)
		choosenColorInput.value = this.id;

		// Удаляем класс для текущего окна и присуждаем следующему
		subpopupColor.classList.remove("active");
		subpopupSizes.classList.add("active");
	});
});

// Циклом каждому элементу вешаем слушатель события нажатия
calcBtns.forEach((item) => {
	item.addEventListener("click", (e) => {

		// Отменяем стандартное действие при клике
		e.preventDefault();

		calcPopup.classList.add("active");
		subpopupTable.classList.add("active");
		subpopupSizes.classList.remove("active");
	});
});






// ================================================ Пример 3 (переключение вкладок при нажатии)

// Получаем объекты и записываем в переменные
const tabs = document.querySelectorAll(".js-selector");
const content = document.querySelectorAll(".js-body");

// Циклом каждому элементу вешаем слушатель события нажатия
tabs.forEach((tab) => {
	tab.addEventListener("click", () => {
	
		// Проверка текущего элемента на отсутствие класса active
		if (!this.classList.contains("active")) {

			// При нажатии на вкладку удаляем класс active для всех вкладок
			for (let i = 0; i < tabs.length; i++) {
				tabs[i].classList.remove("active");
			}

			// При нажатии на вкладку удаляем класс active для содержимого всех вкладок
			for (let i = 0; i < content.length; i++) {
				content[i].classList.remove("active");
			}

			// Текущей вкладке присуждаем класс active
			this.classList.add("active");

			// Получаем атрибут data-tab текущего вкладки (элемента)
			var tabID = this.getAttribute("data-tab");

			// Находим ближайший элемент с атрибутом id равным атрибуту data-tab кнопки
			var tabContent = this.closest(".buy").querySelector("#" + getID);

			// Присуждаем класс active найденному элементу (отображаем содержимое вкладки)
			getContent.classList.add("active");
		}
	});
});