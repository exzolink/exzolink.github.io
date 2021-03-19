const calcForm = document.querySelector('#compare-form');

const fetchData = () => {
	return {
		API_TOKEN: "XgoKVtotMNsxb9xbJDvsXNWCwINR3X1n",
		API_PASSWORD: "9Bbkw6leCyldn73XDrjcz8G199zOGO87",
		
		data: {
			del_d2d: 0,
		},

		async sendRequest() {
			const response = await fetch(`https://api.cdek.ru/v2/calculator/tarifflist?from_location=44&to_location=44`, {
				method: "GET",
				headers: {
					"Access-Control-Allow-Origin": "*",
					"Content-Type": "application/json",
				}
			});
			console.log(response)
		}
	}
}



