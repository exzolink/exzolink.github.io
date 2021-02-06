<template>
	<div class="wrapper" :class="weatherClass">
		<transition name="scale" appear>
			<div class="container">
				<header class="header">
					<span class="notFound" v-if="notFound === true"
						>Такой город не найден</span
					>
					<div class="search__wrapper">
						<input
							type="text"
							v-model="query"
							placeholder="Введите город"
							@keypress.enter="fetchWeather(query)"
							class="search-input"
						/>
						<button class="search-button" @click="fetchWeather(query)">
							<img
								src="../assets/imgs/search-icon.svg"
								width="16"
								height="16"
								alt=""
							/>
						</button>
					</div>

					<div class="search__presets"></div>
				</header>

				<main key="1" class="main" v-if="isFetched == true">
					<section class="result__main">
						<span class="city"
							>{{ results.city }}
							<small class="fz-sm">({{ results.population }} чел.)</small></span
						>
						<div class="content__wrapper">
							<div class="temp__wrapper">
								<transition name="fade">
									<span class="temp">{{ results.temp }}°</span>
								</transition>
								<span class="temp-feels fz-sm"
									>Ощущается как
									<strong>{{ results.feels_like }}°</strong></span
								>
							</div>

							<div class="temp__wrapper">
								<img
									:src="
										'https://openweathermap.org/img/wn/' +
											results.iconNow +
											'@2x.png'
									"
									width="100"
									:alt="results.desc"
									class="temp-icon"
								/>
								<div class="temp-desc fz-sm">
									{{ results.desc }}
								</div>
							</div>
						</div>
					</section>

					<section class="result__info">
						<div class="content__wrapper--grid">
							<dl class="info__wrapper">
								<dt>Скорость ветра</dt>
								<dd class="fz-sm">{{ results.wind }} м/с</dd>
							</dl>
							<dl class="info__wrapper">
								<dt>Давление</dt>
								<dd class="fz-sm">{{ results.pressure }} мм рт. ст.</dd>
							</dl>

							<dl class="info__wrapper">
								<dt>Влажность</dt>
								<dd class="fz-sm">{{ results.humidity }}%</dd>
							</dl>
						</div>

						<div class="content__wrapper">
							<dl class="time__wrapper">
								<img
									src="../assets/imgs/sunrise-icon.svg"
									width="35"
									alt="Рассвет"
								/>
								<dt>Рассвет</dt>
								<dd class="fz-sm">
									{{ this.results.sunrise }}
								</dd>
							</dl>

							<dl class="time__wrapper">
								<img
									src="../assets/imgs/sunset-icon.svg"
									width="35"
									alt="Закат"
								/>
								<dt>Закат</dt>
								<dd class="fz-sm">
									{{ this.results.sunset }}
								</dd>
							</dl>
						</div>
					</section>

					<section>
						<div :key="list[index]" v-for="(list, index) in fullResults.list">
							{{ fullResults.list[index].weather[0].main }}
								{{ Math.floor(fullResults.list[index].main.temp) + 3 }}
						</div>
					</section>
				</main>

				<main key="2" class="main" v-else>
					<section class="placeholder">
						<div class="logo">
							<img
								src="../assets/imgs/cloud-icon.svg"
								width="300"
								height="300"
								alt=""
							/>
						</div>
					</section>
				</main>
			</div>
		</transition>
	</div>
</template>

<script>
export default {
	name: "mainComponent",
	data() {
		return {
			api_key: "278171a7d3d204b5ea4ab96b9d3ceff5",
			api_base: "https://api.openweathermap.org/data/2.5/forecast",
			query: "",
			isFetched: false,
			notFound: false,
			fullResults: {},
			results: {
				city: "",
				population: "",
				desc: "",
				sunrise: "",
				sunset: "",
				wind: "",
				pressure: "",
				humidity: "",
				temp: "",
				feels_like: "",
				iconNow: "",
			},
			weatherClass: "",
		};
	},
	methods: {
		async fetchWeather(query) {
			if (this.query.trim() == "") return;

			const response = await fetch(
				`${this.api_base}?q=${query}&units=metric&appid=${this.api_key}&lang=ru`,
			);
			const data = await response.json();
			if (data.cod === "200") {
				this.fullResults = data;
				this.results.city = data.city.name;
				this.results.population = this.populationFilter(data.city.population);
				this.results.desc = data.list[0].weather[0].description;
				this.results.wind = data.list[0].wind.speed;
				this.results.pressure = data.list[0].main.pressure - 250;
				this.results.humidity = data.list[0].main.humidity;
				this.results.temp = Math.floor(data.list[0].main.temp) + 3; // Вероятная погрешность температуры
				this.results.feels_like = Math.floor(data.list[0].main.feels_like) + 3; // Вероятная погрешность температуры
				this.results.iconNow = data.list[0].weather[0].icon;
				this.results.sunrise = this.timeConvert(data.city.sunrise);
				this.results.sunset = this.timeConvert(data.city.sunset);

				this.isFetched = true;
				this.notFound = false;
				this.query = "";
				this.weatherState();
			} else {
				this.notFound = true;
			}
		},
		weatherState() {
			return (this.weatherClass = this.fullResults.list[0].weather[0].main.toLowerCase());
		},
		timeConvert(time) {
			const convertedTime = new Date(time * 1000);
			const timeZeros = (value) => {
				return value < 10 ? "0" + value : value;
			};
			return `${timeZeros(convertedTime.getUTCHours())}:${timeZeros(
				convertedTime.getUTCMinutes(),
			)}`;
		},
		populationFilter(population) {
			if (population == "1000000") {
				return "> 1 млн.";
			} else {
				const separate = (value) => {
					const str = value.toString();
					return str.replace(/(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g, "$1" + " ");
				};
				return separate(population);
			}
		},
	},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/main.scss";
</style>
