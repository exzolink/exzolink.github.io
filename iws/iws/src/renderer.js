const puppeteer = require("puppeteer");
const cron = require("node-cron");

const btn = document.querySelector(".button__wrapper button");

const inputTime = document.querySelector("#input-time");
const inputFio = document.querySelector("#input-fio");
const inputMsg = document.querySelector("#input-msg");

const alertText = document.querySelector("#alert");
const tabsEl = document.querySelectorAll(".tab");
const windows = document.querySelectorAll(".window");

const inputZachetka = document.querySelector("#input-zachetka");
const inputSurname = document.querySelector("#input-surname");
const inputName = document.querySelector("#input-name");
const inputPass = document.querySelector("#input-pass");

const allInputs = document.querySelectorAll("input, textarea");

let browser, page, task;

const getChromiumExecPath = () => {
	return puppeteer.executablePath().replace("app.asar", "app.asar.unpacked");
};

// Проверка работы и получение разрешения для Chromium
const testSite = async () => {
	let browserTest = await puppeteer.launch({
		executablePath: getChromiumExecPath(),
	});
	let pageTest = await browserTest.newPage();
	await pageTest
		.goto("http://oreluniver.ru/student")
		.catch((err) => console.log(err));
	await pageTest.screenshot({ path: `${inputSurname.value.trim()}.png` });
	await browserTest.close();
};

// Основная функция для отправки сообщения и входа в аккаунт
const goSite = async () => {
	browser = await puppeteer.launch({
		executablePath: getChromiumExecPath(),
	});
	page = await browser.newPage();
	page.setDefaultNavigationTimeout(0);

	// Переход на страницу входа
	await page
		.goto("http://oreluniver.ru/student")
		.catch((err) => console.log(err));
	if (page.url() !== "http://oreluniver.ru/student") {
		await browser.close();
		return goSite();
	} else {
		// Ввод зачетки
		const pageInputBook = await page.$("#studentBookId");
		await pageInputBook.focus();
		await page.keyboard.type(`${inputZachetka.value.trim()}`);

		// Ввод фамилии
		const pageInputSurname = await page.$("#f");
		await pageInputSurname.focus();
		await page.keyboard.type(`${inputSurname.value.trim()}`);

		// Ввод имени
		const pageInputName = await page.$("#i");
		await pageInputName.focus();
		await page.keyboard.type(`${inputName.value.trim()}`);

		// Ввод пароля
		const pageInputPass = await page.$("#pass");
		await pageInputPass.focus();
		await page.keyboard.type(`${inputPass.value.trim()}`);

		// Клик по кнопке войти
		const pageLoginSubmit = await page.$("#submit");
		await pageLoginSubmit.click();

		// Переход к чату
		await page.waitForNavigation();
		await page
			.goto("http://oreluniver.ru/chat")
			.catch((err) => console.log(err));

		if (page.url() !== "http://oreluniver.ru/chat") {
			toggleState("incorrectLogin");
			return await browser.close();
		} else {
			// Выбор преподавателя
			evalVar = inputFio.value.trim();
			try {
				const links = await page.evaluate((evalVar) => {
					const select = (document.querySelector(
						`#sender option[label="${evalVar}"]`,
					).selected = true);
					return select;
				}, evalVar);
			} catch (err) {
				return toggleState("incorrectTeacher");
			}

			// Ввод сообщения
			const pageChatMsg = await page.$("#message");
			await pageChatMsg.focus();
			await page.keyboard.type(`${inputMsg.value.trim()}`);

			// Клик по кнопке отправить
			const pageChatSubmit = await page.$("#submitMessage");
			await pageChatSubmit.click();

			// Ожидание отправки и завершение процесса
			await page.waitForNavigation();
			await browser.close();

			toggleState("finished");
		}
	}
};

// Переключатель стейта кнопки
const toggleState = (state) => {
	switch (state) {
		case "activated": {
			alertText.innerHTML =
				"Режим ожидания включен. Не выключай компьютер и не закрывай программу.<br>Спящий режим также отключает приложение <strong>(!)</strong>";
			alertText.className = "blue";
			btn.classList.add("active");
			btn.textContent = "Отключить ожидание";

			const timeArray = inputTime.value.split(":");
			const hours = +timeArray[0];
			const minutes = +timeArray[1];

			testSite();
			task = cron.schedule(`${minutes} ${hours} * * *`, () => {
				console.log("Создано окно");
				goSite();
			});
			break;
		}
		case "disabled": {
			alertText.innerHTML = "Режим ожидания отключен";
			alertText.className = "orange";
			btn.classList.remove("active");
			btn.textContent = "Включить ожидание";
			task.destroy();
			break;
		}
		case "empty": {
			alertText.innerHTML = "Введены не все данные";
			alertText.className = "orange";
			btn.classList.remove("active");
			btn.textContent = "Включить ожидание";
			break;
		}
		case "finished": {
			alertText.innerHTML = `Сообщение успешно отправлено в ${new Date().getHours()}:${new Date().getMinutes()}`;
			alertText.className = "blue";
			btn.classList.remove("active");
			btn.textContent = "Включить ожидание";
			console.log("Окно удалено");
			task.destroy();
			break;
		}
		case "incorrectLogin": {
			alertText.innerHTML = "Неверные данные для входа";
			alertText.className = "orange";
			btn.classList.remove("active");
			btn.textContent = "Включить ожидание";
			task.destroy();
			break;
		}
		case "incorrectTeacher": {
			alertText.innerHTML = "Такого преподавателя нет";
			alertText.className = "orange";
			btn.classList.remove("active");
			btn.textContent = "Включить ожидание";
			task.destroy();
			break;
		}
	}
};

// Переключение вкладок
tabsEl.forEach((tab) => {
	tab.addEventListener("click", () => {
		if (tab.classList.contains("active")) return;

		const tabWindow = tab.dataset.tab;
		for (let i = 0; i < windows.length; i++) {
			windows[i].classList.remove("active");
			tabsEl[i].classList.remove("active");
		}
		const selectWindow = document.querySelector(`#${tabWindow}`);
		selectWindow.classList.add("active");
		tab.classList.add("active");
	});
});

// Сохранение и вывод введенных данных
allInputs.forEach((input) => {
	if (localStorage.getItem(input.id)) {
		input.value = localStorage.getItem(input.id);
	}

	input.addEventListener("blur", () => {
		localStorage.setItem(`${input.id}`, `${input.value.trim()}`);
	});
});

// Логика клика по кнопке ожидания
btn.addEventListener("click", () => {
	try {
		if (
			!btn.classList.contains("active") &&
			(inputTime.value.trim() === "" ||
				inputFio.value.trim() === "" ||
				inputMsg.value.trim() === "" ||
				inputZachetka.value.trim() === "" ||
				inputSurname.value.trim() === "" ||
				inputName.value.trim() === "" ||
				inputPass.value.trim() === "")
		) {
			// Данные не введены и кнопка не активирована
			toggleState("empty");
		} else {
			// Если данные введены и кнопка еще не активирована
			if (!btn.classList.contains("active")) {
				toggleState("activated");
			} else {
				toggleState("disabled");
			}
		}
	} catch (err) {
		console.log(err);
	}
});
