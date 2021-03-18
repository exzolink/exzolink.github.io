<?php

	// events (actions) - можно и анонимную функцию (событие, функция, приоритет, аргументы)
	// примеры других событий: wp_footer, wp_head и т.д.
	add_action('wp_enqueue_scripts', 'themename_css_scripts');
	function themename_css_scripts() {
		// links css
		wp_enqueue_style('main_css', get_stylesheet_uri(), array(), '1.2.0');
		// wp_enqueue_style('main_css', get_stylesheet_uri());

		// подключение других стилей и онлайн шрифтов отличных от основного стиля - сохраняем порядок следования стилей... основной, второстепенные или наоборот, но с разными именами, то есть 'add_style2', 'add_style3',...

		wp_enqueue_style('add_style2', 'https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.css');

		//wp_enqueue_style('add_style3', get_template_directory_uri().'/assets/css/style3.css');
		wp_enqueue_style('add_font-open-sans', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&amp;subset=cyrillic');








		// links scripts (событие, функция, зависимость от других библиотек, версия, в подвал)
		// фильтр для wp_enqueue_script https://wp-kama.ru/hook/script_loader_tag

		// если надо подключаем другие скрипты отличных от основного скрипта - сохраняем порядок js как в верстке
		// переопределяем jquery от wordpress так как он старый из коробки и лучше jquery подключать в header, а не в footer
		wp_deregister_script('jquery');
		wp_register_script('jquery', 'https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js');
		wp_enqueue_script('jquery');

		wp_enqueue_script('add_script2', get_template_directory_uri().'/assets/libs/slick/slick.min.js',['jquery'], null, true);
		wp_enqueue_script('add_script3', get_template_directory_uri().'/assets/libs/jquery.magnific-popup/jquery.magnific-popup.min.js',['jquery'], null, true);

		wp_enqueue_script('add_script4','https://cdn.jsdelivr.net/bxslider/4.2.12/jquery.bxslider.min.js',['jquery'], null, true);

		// wp_enqueue_script('add_script5', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js',['jquery'], null, true);
		wp_enqueue_script('main_script', get_template_directory_uri().'/assets/js/index-page.js', ['jquery'], '1.1.0', true);

		// для ie 9 и ниже взамен
		//<!--[if lt IE 9]>
		//  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
		//  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		//<![endif]-->
		wp_enqueue_script('html5shiv', 'https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js');
		wp_enqueue_script('respond', 'https://oss.maxcdn.com/respond/1.4.2/respond.min.js');
		wp_script_add_data('html5shiv', 'conditional', 'lt IE 9');
		wp_script_add_data('respond', 'conditional', 'lt IE 9');
	}





	if( is_admin() ) {
		// отключим проверку обновлений при любом заходе в админку...
		remove_action( 'admin_init', '_maybe_update_core' );
		remove_action( 'admin_init', '_maybe_update_plugins' );
		remove_action( 'admin_init', '_maybe_update_themes' );

		// отключим проверку обновлений при заходе на специальную страницу в админке...
		remove_action( 'load-plugins.php', 'wp_update_plugins' );
		remove_action( 'load-themes.php', 'wp_update_themes' );

		// оставим принудительную проверку при заходе на страницу обновлений...
		//remove_action( 'load-update-core.php', 'wp_update_plugins' );
		//remove_action( 'load-update-core.php', 'wp_update_themes' );

		// внутренняя страница админки "Update/Install Plugin" или "Update/Install Theme" - оставим не мешает...
		//remove_action( 'load-update.php', 'wp_update_plugins' );
		//remove_action( 'load-update.php', 'wp_update_themes' );

		// событие крона не трогаем, через него будет проверяться наличие обновлений - тут все отлично!
		//remove_action( 'wp_version_check', 'wp_version_check' );
		//remove_action( 'wp_update_plugins', 'wp_update_plugins' );
		//remove_action( 'wp_update_themes', 'wp_update_themes' );

		/**
		 * отключим проверку необходимости обновить браузер в консоли - мы всегда юзаем топовые браузеры!
		 * эта проверка происходит раз в неделю...
		 * @see https://wp-kama.ru/function/wp_check_browser_version
		 */
		add_filter( 'pre_site_transient_browser_'. md5( $_SERVER['HTTP_USER_AGENT'] ), '__return_true' );
	}



	function mytheme_setup() {
		// включение поддержки html5
		add_theme_support('html5', array('search-form', 'gallery'));

		// включение поддержки post-formats
		add_theme_support( 'post-formats', array( 'aside', 'gallery', 'image' ) );

		add_theme_support('custom-logo');
		//add_theme_support('custom-logo', array('height' => 31, 'widht' => 134, 'flex-height' => true));

		add_theme_support('post-thumbnails');

		register_nav_menu('top', 'для шапки');	// первое название для верстки, а второе для админки
		register_nav_menu('footer1', 'для подвала1'); // первое название для верстки, а второе для админки
		register_nav_menu('footer2', 'для подвала2'); // первое название для верстки, а второе для админки
	}

	add_action('after_setup_theme', 'mytheme_setup');
















	// добавляем свои настройки в настройки темы oceanwp
	function wptest2_customize_register( $wp_customize ) {
		// All our sections, settings, and controls will be added here

		// 1. Сперва добавляем нашу секцию
		// добавляем свою секцию - text-header
		$wp_customize->add_section( 'text_header', array(
			'title'      => 'Название и описание магазина, телефон, адрес, соц сети',
			'priority'   => 30,
		));



		// 2. Теперь создаем настройки + контроллер к каждой из них
		// добавляем свои настройки - header_name1
		$wp_customize->add_setting( 'header_name1', array(
			'default'   => 'Магазин',
			'transport' => 'refresh',	// postMessage
		));

		// добавляем свои настройки - header_name2
		$wp_customize->add_setting( 'header_name2', array(
			'default'   => 'нужных вещей',
			'transport' => 'refresh',	// postMessage
		));

		// добавляем свои настройки - phone_header
		$wp_customize->add_setting( 'phone_header', array(
			'default'   => '8 852 252 22 25',
			'transport' => 'refresh',	// postMessage
		));

		// добавляем свои настройки - phone_footer
		$wp_customize->add_setting( 'phone_footer', array(
			'default'   => '+7 852 250 25 02',
			'transport' => 'refresh',	// postMessage
		));

		// добавляем свои настройки - address_footer
		$wp_customize->add_setting( 'address_footer', array(
			'default'   => '66404, г. Иркутск, ул. Р. Люксембург, д. 202, пав. 4',
			'transport' => 'refresh',	// postMessage
		));

		// добавляем свои настройки - social1
		$wp_customize->add_setting( 'social1', array(
			'default'   => 'https://vk.com/',
			'transport' => 'refresh',	// postMessage
		));

		// добавляем свои настройки - social2
		$wp_customize->add_setting( 'social2', array(
			'default'   => 'https://www.instagram.com/',
			'transport' => 'refresh',	// postMessage
		));



		// 3.1. Теперь создаем настройки + контроллер к каждой из них
		// добавляем контроль для настройки - header_name1
		$wp_customize->add_control(
			'header_name1',
			array(
				'label'    => 'Имя магазина',
				'section'  => 'text_header', // к какой секции 'your_section_id',
				'settings' => 'header_name1', //'your_setting_id',
				'type'     => 'text',	// text, checkbox, radio, select, textarea, dropdown-pages, email, url, number, hidden, and date
				// for radio
				// 'type'     => 'radio',
				// 'choices'  => array(
				// 	'left2'  => 'left',
				// 	'right2' => 'right',
				// ),
			)
		);

		// 3.2. Теперь создаем настройки + контроллер к каждой из них
		// добавляем контроль для настройки - header_name2
		$wp_customize->add_control(
			'header_name2',
			array(
				'label'    => 'Описание магазина',
				'section'  => 'text_header', // к какой секции 'your_section_id',
				'settings' => 'header_name2', //'your_setting_id',
				'type'     => 'text',	// text, checkbox, radio, select, textarea, dropdown-pages, email, url, number, hidden, and date
				// for radio
				// 'type'     => 'radio',
				// 'choices'  => array(
				// 	'left2'  => 'left',
				// 	'right2' => 'right',
				// ),
			)
		);

		// 3.3. Теперь создаем настройки + контроллер к каждой из них
		// добавляем контроль для настройки - phone_header
		$wp_customize->add_control(
			'phone_header',
			array(
				'label'    => 'Телефон в шапке',
				'section'  => 'text_header', // к какой секции 'your_section_id',
				'settings' => 'phone_header', //'your_setting_id',
				'type'     => 'text',	// text, checkbox, radio, select, textarea, dropdown-pages, email, url, number, hidden, and date
				// for radio
				// 'type'     => 'radio',
				// 'choices'  => array(
				// 	'left'  => 'left',
				// 	'right' => 'right',
				// ),
			)
		);

		// 3.4. Теперь создаем настройки + контроллер к каждой из них
		// добавляем контроль для настройки - phone_footer
		$wp_customize->add_control(
			'phone_footer',
			array(
				'label'    => 'Телефон в футере',
				'section'  => 'text_header', // к какой секции 'your_section_id',
				'settings' => 'phone_footer', //'your_setting_id',
				'type'     => 'text',	// text, checkbox, radio, select, textarea, dropdown-pages, email, url, number, hidden, and date
				// for radio
				// 'type'     => 'radio',
				// 'choices'  => array(
				// 	'left'  => 'left',
				// 	'right' => 'right',
				// ),
			)
		);

		// 3.5. Теперь создаем настройки + контроллер к каждой из них
		// добавляем контроль для настройки - address_footer
		$wp_customize->add_control(
			'address_footer',
			array(
				'label'    => 'Адрес в футере',
				'section'  => 'text_header', // к какой секции 'your_section_id',
				'settings' => 'address_footer', //'your_setting_id',
				'type'     => 'text',	// text, checkbox, radio, select, textarea, dropdown-pages, email, url, number, hidden, and date
				// for radio
				// 'type'     => 'radio',
				// 'choices'  => array(
				// 	'left'  => 'left',
				// 	'right' => 'right',
				// ),
			)
		);

		// 3.6. Теперь создаем настройки + контроллер к каждой из них
		// добавляем контроль для настройки - social1
		$wp_customize->add_control(
			'social1',
			array(
				'label'    => 'Вк в футере',
				'section'  => 'text_header', // к какой секции 'your_section_id',
				'settings' => 'social1', //'your_setting_id',
				'type'     => 'text',	// text, checkbox, radio, select, textarea, dropdown-pages, email, url, number, hidden, and date
				// for radio
				// 'type'     => 'radio',
				// 'choices'  => array(
				// 	'left'  => 'left',
				// 	'right' => 'right',
				// ),
			)
		);

		// 3.7. Теперь создаем настройки + контроллер к каждой из них
		// добавляем контроль для настройки - social2
		$wp_customize->add_control(
			'social2',
			array(
				'label'    => 'Инста в футере',
				'section'  => 'text_header', // к какой секции 'your_section_id',
				'settings' => 'social2', //'your_setting_id',
				'type'     => 'text',	// text, checkbox, radio, select, textarea, dropdown-pages, email, url, number, hidden, and date
				// for radio
				// 'type'     => 'radio',
				// 'choices'  => array(
				// 	'left'  => 'left',
				// 	'right' => 'right',
				// ),
			)
		);
	}
	add_action( 'customize_register', 'wptest2_customize_register' );




	add_filter( 'excerpt_length', function(){
		return 20;
	} );














	add_action('init', 'my_news');
	function my_news() {
		register_post_type('news', array(
			'labels'             => array(
				'name'               => 'Наша новость', // Основное название типа записи
				'singular_name'      => 'Наша новость', // отдельное название записи типа В нашем каталоге
				'add_new'            => 'Добавить новость',
				'add_new_item'       => 'Добавить новую новость',
				'edit_item'          => 'Редактировать новость',
				'new_item'           => 'Новая новость',
				'view_item'          => 'Посмотреть новость',
				'search_items'       => 'Найти новость',
				'not_found'          => 'Новость не найдена',
				'not_found_in_trash' => 'В корзине новость не найден',
				'parent_item_colon'  => '',
				'menu_name'          => 'Наши новости'
			),
			'public'             => true, // ставим в false если нужно отключить отображение url данного типа записей в админке для контент менеджера
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => true,
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => null,
				// 1 — в самом верху меню
				// 2-3 — под «Консоль»
				// 4-9 — под «Записи»
				// 10-14 — под «Медиафайлы»
				// 15-19 — под «Ссылки»
				// 20-24 — под «Страницы»
				// 25-59 — под «Комментарии» (по умолчанию, null)
				// 60-64 — под «Внешний вид»
				// 65-69 — под «Плагины»
				// 70-74 — под «Пользователи»
				// 75-79 — под «Инструменты»
				// 80-99 — под «Параметры»
				// 100+ — под разделителем после «Параметры»

			'menu_icon'           => 'dashicons-format-image',
			// https://developer.wordpress.org/resource/dashicons/#tickets-alt

			'supports'           => array('title','editor','thumbnail'),
			// 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
			'taxonomies'          => array(),
			'has_archive'         => false,
			'rewrite'             => true,
			'query_var'           => true
		) );
	}

	// Сообщения при публикации или изменении типа записи - 'news'
	add_filter('post_updated_messages', 'news_updated_messages');
	function news_updated_messages( $messages ) {
		global $post;

		$messages['news'] = array(
			0 => '', // Не используется. Сообщения используются с индекса 1.
			1 => sprintf( 'Наша новость обновлена. <a href="%s">Посмотреть запись - наша новость</a>', esc_url( get_permalink($post->ID) ) ),
			2 => 'Произвольное поле обновлено.',
			3 => 'Произвольное поле удалено.',
			4 => 'Запись новость обновлена.',
			/* %s: дата и время ревизии */
			5 => isset($_GET['revision']) ? sprintf( 'Запись новость восстановлена из ревизии %s', wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
			6 => sprintf( 'Запись новость опубликована. <a href="%s">Перейти к записи новость каталога</a>', esc_url( get_permalink($post->ID) ) ),
			7 => 'Запись новость каталога сохранена.',
			8 => sprintf( 'Запись новость каталога сохранена. <a target="_blank" href="%s">Предпросмотр записи новость каталога</a>', esc_url( add_query_arg( 'preview', 'true', get_permalink($post->ID) ) ) ),
			9 => sprintf( 'Запись новость каталога запланирован на: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Предпросмотр записи новость каталога</a>',
			  // Как форматировать даты в PHP можно посмотреть тут: http://php.net/date
			  date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink($post->ID) ) ),
			10 => sprintf( 'Черновик записи новость каталога обновлена. <a target="_blank" href="%s">Предпросмотр записи новость каталога</a>', esc_url( add_query_arg( 'preview', 'true', get_permalink($post->ID) ) ) ),
		);

		return $messages;
	}


















	add_action('init', 'my_reviews');
	function my_reviews() {
		register_post_type('reviews', array(
			'labels'             => array(
				'name'               => 'Наш отзыв', // Основное название типа записи
				'singular_name'      => 'Наш отзыв', // отдельное название записи типа В нашем каталоге
				'add_new'            => 'Добавить отзыв',
				'add_new_item'       => 'Добавить новый отзыв',
				'edit_item'          => 'Редактировать отзыв',
				'new_item'           => 'Новый отзыв',
				'view_item'          => 'Посмотреть отзыв',
				'search_items'       => 'Найти отзыв',
				'not_found'          => 'Отзыв не найден',
				'not_found_in_trash' => 'В корзине отзыв не найден',
				'parent_item_colon'  => '',
				'menu_name'          => 'Наши отзывы'
			),
			'public'             => true, // ставим в false если нужно отключить отображение url данного типа записей в админке для контент менеджера
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => true,
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => null,
				// 1 — в самом верху меню
				// 2-3 — под «Консоль»
				// 4-9 — под «Записи»
				// 10-14 — под «Медиафайлы»
				// 15-19 — под «Ссылки»
				// 20-24 — под «Страницы»
				// 25-59 — под «Комментарии» (по умолчанию, null)
				// 60-64 — под «Внешний вид»
				// 65-69 — под «Плагины»
				// 70-74 — под «Пользователи»
				// 75-79 — под «Инструменты»
				// 80-99 — под «Параметры»
				// 100+ — под разделителем после «Параметры»

			'menu_icon'           => 'dashicons-format-image',
			// https://developer.wordpress.org/resource/dashicons/#tickets-alt

			'supports'           => array('title','editor'),
			// 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
			'taxonomies'          => array(),
			'has_archive'         => false,
			'rewrite'             => true,
			'query_var'           => true
		) );
	}

	// Сообщения при публикации или изменении типа записи - 'reviews'
	add_filter('post_updated_messages', 'news_updated_messages2');
	function news_updated_messages2( $messages ) {
		global $post;

		$messages['reviews'] = array(
			0 => '', // Не используется. Сообщения используются с индекса 1.
			1 => sprintf( 'Наш отзыв обновлен. <a href="%s">Посмотреть запись - наш отзыв</a>', esc_url( get_permalink($post->ID) ) ),
			2 => 'Произвольное поле обновлено.',
			3 => 'Произвольное поле удалено.',
			4 => 'Запись отзыв обновлен.',
			/* %s: дата и время ревизии */
			5 => isset($_GET['revision']) ? sprintf( 'Запись отзыв восстановлен из ревизии %s', wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
			6 => sprintf( 'Запись отзыв опубликован. <a href="%s">Перейти к записи отзыв каталога</a>', esc_url( get_permalink($post->ID) ) ),
			7 => 'Запись отзыв каталога сохранен.',
			8 => sprintf( 'Запись отзыв каталога сохранен. <a target="_blank" href="%s">Предпросмотр записи отзыв каталога</a>', esc_url( add_query_arg( 'preview', 'true', get_permalink($post->ID) ) ) ),
			9 => sprintf( 'Запись отзыв каталога запланирован на: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Предпросмотр записи отзыв каталога</a>',
			  // Как форматировать даты в PHP можно посмотреть тут: http://php.net/date
			  date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink($post->ID) ) ),
			10 => sprintf( 'Черновик записи отзыв каталога обновлен. <a target="_blank" href="%s">Предпросмотр записи отзыв каталога</a>', esc_url( add_query_arg( 'preview', 'true', get_permalink($post->ID) ) ) ),
		);

		return $messages;
	}









	add_action('init', 'my_akczii');
	function my_akczii() {
		register_post_type('akczii', array(
			'labels'             => array(
				'name'               => 'Наша акция', // Основное название типа записи
				'singular_name'      => 'Наша акция', // отдельное название записи типа В нашем каталоге
				'add_new'            => 'Добавить акцию',
				'add_new_item'       => 'Добавить новую акцию',
				'edit_item'          => 'Редактировать акцию',
				'new_item'           => 'Новая акция',
				'view_item'          => 'Посмотреть акцию',
				'search_items'       => 'Найти акцию',
				'not_found'          => 'Акция не найдена',
				'not_found_in_trash' => 'В корзине акция не найдена',
				'parent_item_colon'  => '',
				'menu_name'          => 'Наши акции'
			),
			'public'             => true, // ставим в false если нужно отключить отображение url данного типа записей в админке для контент менеджера
			'publicly_queryable' => true,
			'show_ui'            => true,
			'show_in_menu'       => true,
			'query_var'          => true,
			'rewrite'            => true,
			'capability_type'    => 'post',
			'has_archive'        => true,
			'hierarchical'       => false,
			'menu_position'      => null,
				// 1 — в самом верху меню
				// 2-3 — под «Консоль»
				// 4-9 — под «Записи»
				// 10-14 — под «Медиафайлы»
				// 15-19 — под «Ссылки»
				// 20-24 — под «Страницы»
				// 25-59 — под «Комментарии» (по умолчанию, null)
				// 60-64 — под «Внешний вид»
				// 65-69 — под «Плагины»
				// 70-74 — под «Пользователи»
				// 75-79 — под «Инструменты»
				// 80-99 — под «Параметры»
				// 100+ — под разделителем после «Параметры»

			'menu_icon'           => 'dashicons-format-image',
			// https://developer.wordpress.org/resource/dashicons/#tickets-alt

			'supports'           => array('title','editor','thumbnail'),
			// 'title','editor','author','thumbnail','excerpt','trackbacks','custom-fields','comments','revisions','page-attributes','post-formats'
			'taxonomies'          => array(),
			'has_archive'         => false,
			'rewrite'             => true,
			'query_var'           => true
		) );
	}

	// Сообщения при публикации или изменении типа записи - 'akczii'
	add_filter('post_updated_messages', 'news_updated_messages3');
	function news_updated_messages3( $messages ) {
		global $post;

		$messages['akczii'] = array(
			0 => '', // Не используется. Сообщения используются с индекса 1.
			1 => sprintf( 'Наша акция обновлена. <a href="%s">Посмотреть запись - наша акция</a>', esc_url( get_permalink($post->ID) ) ),
			2 => 'Произвольное поле обновлено.',
			3 => 'Произвольное поле удалено.',
			4 => 'Запись акция обновлена.',
			/* %s: дата и время ревизии */
			5 => isset($_GET['revision']) ? sprintf( 'Запись акция восстановлена из ревизии %s', wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
			6 => sprintf( 'Запись акция опубликована. <a href="%s">Перейти к записи акция каталога</a>', esc_url( get_permalink($post->ID) ) ),
			7 => 'Запись акция каталога сохранена.',
			8 => sprintf( 'Запись акция каталога сохранена. <a target="_blank" href="%s">Предпросмотр записи акция каталога</a>', esc_url( add_query_arg( 'preview', 'true', get_permalink($post->ID) ) ) ),
			9 => sprintf( 'Запись акции каталога запланирован на: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Предпросмотр записи акции каталога</a>',
			  // Как форматировать даты в PHP можно посмотреть тут: http://php.net/date
			  date_i18n( __( 'M j, Y @ G:i' ), strtotime( $post->post_date ) ), esc_url( get_permalink($post->ID) ) ),
			10 => sprintf( 'Черновик записи акции каталога обновлен. <a target="_blank" href="%s">Предпросмотр записи акции каталога</a>', esc_url( add_query_arg( 'preview', 'true', get_permalink($post->ID) ) ) ),
		);

		return $messages;
	}





	function wpd_subcategory_template( $template ) {
		$cat = get_queried_object();
		if( 0 < $cat->category_parent )
				$template = locate_template( 'subcategory.php' );
		return $template;
	}
	add_filter( 'category_template', 'wpd_subcategory_template' );




	add_filter('wpcf7_form_elements', function( $content ) {
	  $dom = new DOMDocument();
	  $dom->preserveWhiteSpace = false;
	  $dom->loadHTML(mb_convert_encoding($content, 'HTML-ENTITIES', 'UTF-8'), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

	  $xpath = new DomXPath($dom);
	  $spans = $xpath->query("//span[contains(@class, 'wpcf7-form-control-wrap')]" );

	  foreach ( $spans as $span ) :
	    $children = $span->firstChild;
	    $span->parentNode->replaceChild( $children, $span );
	  endforeach;

	  return $dom->saveHTML();
	});



	// function debug_cf7_add_error( $items, $result ) {
	//     if ( 'mail_failed' == $result['status'] ) {
	//         global $phpmailer;
	//         $items['errorInfo'] = $phpmailer->ErrorInfo;
	//     }
	//     return $items;
	// }
	// add_action( 'wpcf7_ajax_json_echo', 'debug_cf7_add_error', 10, 2 );



	// add_filter('wpcf7_spam', '__return_false');









	// отключение menu самого wp на сайте в functions.php
	add_filter('show_admin_bar', '__return_false');



	// off gutenberg в functions.php
	add_filter('use_block_editor_for_post', '__return_false');

	function sg_get_cached_acf_brands_in_category( $category, $return = true ) {
		$cache_group = 'brand_cahce_by_category';
		$cache_key   = 'sg_cache_' . $category->slug;

		$brands = get_transient( $cache_key );

		if ( ! $brands || ! $return ) {

			$brands = array();

			$products = get_posts(
				array(
					'numberposts' => -1,
					'post_status' => 'publish',
					'category'    => $category->term_id,
				)
			);

			if ( $products ) {
				foreach ( $products as $product ) {
					$brand = get_field( 'brend', $product->ID );

					if ( $brand ) {
						array_push( $brands, $brand );
					}

				}

				$brands = array_unique( $brands, SORT_STRING );

			}

			set_transient( $cache_key, $brands, 0 );
		}

		if ( $return ) {
			return $brands;
		}
	}

	function sg_update_cached_acf_brands_in_category( $post_ID, $post, $update ) {

		$post_cats = get_the_category( $post_ID );

		if ( $post_cats ) {
			foreach ( $post_cats as $cat ) {
				if ( $cat->parent !== 0 ) {
					sg_get_cached_acf_brands_in_category( $cat, false );
				}
			}
		}
	}
	add_action( 'save_post', 'sg_update_cached_acf_brands_in_category', 10, 3 );
?>
