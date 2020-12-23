// Вешаем слушатель нажатий на кнопку
$('#btn_select').click(() => {

	// Скрываем/показываем элемент с плавным эффектом
	$('.filter__popup').fadeToggle(300);

	// Проверка значений полей на пустоту
	if ($('#firstDate-input').val() !== '' && $('#lastDate-input').val() !== '') {

			// Записываем значения полей в переменные
			let fD = $('#firstDate-input').val();
			let lD = $('#lastDate-input').val();

			// Добавляем элементу класс и заменяем текстовое поле на полученное из переменной
			$('#firstDate').addClass('activated');
			$('#first-date').text(fD);

			// Добавляем элементу класс и заменяем текстовое поле на полученное из переменной
			$('#lastDate').addClass('activated');
			$('#last-date').text(lD);

			// Показываем элемент с плавным эффектом
			$('.mails__reset').fadeIn(300);

	}
});



