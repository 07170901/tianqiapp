$(function() {
	//var url =  'https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture'
	//还可以使用下面的缓存版本刷新 (每 30 分钟)
	//var url =  'https://uploadbeta.com/api/pictures/random/?cached&key=BingEverydayWallpaperPicture'
	var url = 'http://lorempixel.com/1080/1920/'
	$('body').css('backgroundImage', 'url(' + url + ')');

	function getWeather(city) {
		if(city !== undefined) {
			data1.city = city;
			//console.log(data1)
			data2.city = city;
			//console.log(data2)
		}

		$.ajax({
			type: "get",
			url: "https://www.tianqiapi.com/api",
			data: data1,
			async: true,
			dataType: 'jsonp',
			success: function(data) {
				$('.city').text(data.city);
				console.log(data)
				var weather = ['date', 'week', 'tem', 'wea_img', 'air_level', 'win', 'win_speed', 'win_meter']
				for(var i = 0; i < weather.length; i++) {
					if(weather[i] == 'wea_img') {
						$('.' + weather[i]).css('backgroundImage', 'url(' + icon[data[weather[i]]] + ')');
					} else {
						$('.' + weather[i]).text(weather[i] == 'tem' ? data[weather[i]] + '℃' : data[weather[i]]);
					}
				}
			}

		});

		$.ajax({
			type: "get",
			url: "https://www.tianqiapi.com/api",
			data: data2,
			async: true,
			dataType: 'jsonp',
			success: function(data) {
				var hours = data.data[0].hours;
				console.log(data)
				$.each(hours, function(i, v) {
					var $li = $(`<li class='list_li'>
					<div>${v.hours}</div>
					<div class="time-weather-icon" style="background-image: url(${icon[v.wea_img]});"></div>
					<div>${v.tem+'℃'}</div>
					<div>${v.win}</div>
				</li>`)
					$('.weather-today-list').append($li);

				})
				var liWidth = $('.list_li').css('width');
				//console.log(liWidth);
				var ulWidth = parseFloat(liWidth) * (hours.length + 1);
				//console.log(ulWidth);
				$('.weather-today-list').css('width', ulWidth);

				var futuredata = data.data.slice(1);;
				//console.log(futuredata)
				$.each(futuredata, function(i, v) {
					var $li = $(`<li class='future_li'>
					<span>${v.day.replace(/（星期[一二三四五六日]）/, '')}</span>
					<span><i class="future-weather-icon" style="background-image: url(${icon[v.wea_img]});"></i></span>
					<span class='tem-text'>${v.tem2+'℃~'+v.tem1+'℃'}</span>
					<span class='win-text'>${v.win[0]}</span>
				</li>`)
					$('.future-list').append($li);
				})
			}
		});
	}
	getWeather();
	//搜索
	$('.searth-icon').click(function() {
		var city = $('.search').val();
		if(city == undefined || city.trim() == '') {
			return;
		}
		$('.list_li ').empty();
		$('.future-list').empty()
		getWeather(city)
	})

})