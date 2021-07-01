/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */
'use strict';

document.addEventListener("DOMContentLoaded", () => {

	const movieDB = {
		movies: [
			"Логан",
			"Лига справедливости",
			"Ла-ла лэнд",
			"Одержимость",
			"Скотт Пилигрим против..."
		]
	};

	const adv = document.querySelectorAll('.promo__adv img'),
		bg = document.querySelector(`.promo__bg`),
		genre = bg.querySelector('.promo__genre'),
		movielist = document.querySelector(`.promo__interactive-list`);

	//1 реклама
	const deleteAdv = (arr) => {
		arr.forEach(item => {
			item.remove();
		});
	};

	const makeChanges = () => {
		//2 замена текста
		genre.textContent = 'драма';
		//3 замена фона
		bg.style.backgroundImage = `url('img/bg.jpg')`;
	};

	const sortArr = (arr) => {
		arr.sort();
	};

	//4
	function createMoveList(films, patent) {
		patent.innerHTML = "";
		sortArr(films);
		films.forEach((film, i) => {
			patent.innerHTML += `
				<li class="promo__interactive-item">${i+1}  ${film}
					<div class="delete"></div>
				</li>
			`;
		});
		document.querySelectorAll(".delete").forEach((btn, i) => {
			btn.addEventListener('click', () => {
				btn.parentElement.remove();
				movieDB.movies.splice(i, 1);
				createMoveList(films, patent);
			});

		});
	}

	const addForm = document.querySelector('form.add'),
		addInput = addForm.querySelector('.adding__input'),
		checkbox = addForm.querySelector('[type="checkbox"]');

	addForm.addEventListener('submit', (e) => {
		e.preventDefault();
		let addMovie = addInput.value.toUpperCase();
		const favorite = checkbox.checked;
		if (addMovie) {
			if (addMovie.length > 21) {
				addMovie = `${addMovie.substring(0, 22)}...`;
			}
			if (favorite) {
				console.log('--Фильм очень здоровский--');
			}
			movieDB.movies.push(addMovie);
			sortArr(movieDB.movies);
		} else {
			console.log('введена пустота!');
		}
		createMoveList(movieDB.movies, movielist);
		e.target.reset();
		console.log(e.target);
		console.log(addMovie);
		console.log(movieDB.movies);

	});

	deleteAdv(adv);
	makeChanges();
	createMoveList(movieDB.movies, movielist);

	const box = document.querySelector(`.box`);
	box.addEventListener(`touchstart`, (e) => {
		e.preventDefault();
		console.log(` start`);
	});

	box.addEventListener(`touchmove`, (e) => {
		e.preventDefault();
		console.log(` move`);
	});


});