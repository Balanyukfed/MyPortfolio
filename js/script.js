let loaderVisible = document.querySelector('html');
setTimeout( function() {
	
	document.querySelector('.loader').style.zIndex = '-1'}, 10500)

setTimeout( function() {
	loaderVisible.style.cssText = 'overflow: visible;'}, 13500)

setTimeout( function() {
	if(window.screen.width<=480){
		loaderVisible.style.cssText = 'overflow: visible;'}}, 3500)


//=======================Скрытие Header при скроле====================
let header = document.querySelector('header');
let screenHeight = window.screen.height-100;

window.addEventListener('scroll', function () {
	if (window.scrollY > screenHeight) {
		header.style.opacity = '0';
	} else {
		header.style.opacity = '1';
	}
});

//==================Создание анимации параллакса======================
window.onload = function(){ 
	let figur = document.querySelectorAll('.figur');

//Массив, отвечающий за кэффициенты для перемещения и вращения
let arrayForMove = [-5,4,10,-2,10,-7,9,-3,-10,2]

//Скорость анимаций
const speed = 0.05;

//Определение позиции и переменные для перевода в проценты значений
let positionX = 0, positionY = 0;
let coordProcentX = 0, coordProcentY = 0;

//Функция параллакса
function setMouseParallax(){
	const distX = coordProcentX - positionX;
	const distY = coordProcentY - positionY;

	positionX = positionX + (distX * speed);
	positionY = positionY + (distY * speed);

	rotate = positionX*(180/Math.PI);

//Перемещение массива фигур с учетом массива коэффициентов
for(i = 0; i < figur.length; i++){
	figur[i].style.cssText = `Transform: translate(${positionX*arrayForMove[i]}%,${positionY*arrayForMove[i]}%) rotate(${rotate/150*arrayForMove[i]}deg);`;
	if(window.screen.width<=480){
		figur[i].style.cssText = `Transform: translate(${positionX*arrayForMove[i]}%,${positionY*arrayForMove[i]}%) rotate(${rotate/150*arrayForMove[i]}deg) scale(0.5);`;
	}
}
requestAnimationFrame(setMouseParallax);
}
setMouseParallax();

//Проверка события перемещения мыши
header.addEventListener('mousemove', function(e){
	const parallaxWidth = header.offsetWidth;
	const parallaxHeight = header.offsetHeight;

	const coordX = e.pageX - parallaxWidth / 2;
	const coordY = e.pageY - parallaxHeight / 2;

	coordProcentX = coordX / parallaxWidth * 100;
	coordProcentY = coordY / parallaxHeight * 100;
});
}

//===============Запуск и остановка анимации колец==================
let ring = document.querySelectorAll('.window_quality');
let animPaused = document.querySelectorAll('.quality');


for (let i = 0; i<ring.length; i++){
	ring[i].addEventListener("mouseover" , () => {
		animPaused[i].style.animationPlayState = 'paused';
	})
	ring[i].addEventListener("mouseout" , () => {
		animPaused[i].style.webkitAnimationPlayState = 'running';
	})
}

//===============Создание распадающегося меню порфтолио===============
let portfCard = document.querySelectorAll('.portf_card');
let buttonCard = document.querySelectorAll('.button_portf');
let moveLogo = document.querySelectorAll('.portf_logo');

for (let i = 0; i<portfCard.length; i++){
	portfCard[i].addEventListener("click" , () => {

//при нажатии добавление класса или удаление, чтоб работать дальше с картами		
if(!document.querySelector('.portf_frame').classList.contains('frameList')){
	document.querySelector('.portf_frame').classList.add('frameList');
	if(window.screen.width<=480){
		document.querySelector('.portf_frame').style.height = 1000 + 'px';
	}

	for (let i = 0; i<portfCard.length; i++){
		portfCard[i].classList.add('swap_card');

		//при наведении убирать занавеску карты
		if(window.screen.width<=480){
				setTimeout( function() {
					moveLogo[i].style.cssText = 'transform: translateY(-100%);'}, 1000)
		} else {
			setTimeout( function() {
			portfCard[i].classList.add('portf_card_focus')}, 1000)	
		}

		//убрать анимации смещения карт
		portfCard[i].style.animationPlayState = 'paused';
		buttonCard[i].style.display = 'block';

		/*убрать всплытие(чтоб при нажатии на дочерний 
		элемент действие не переходило на родителя)*/
		buttonCard[i].addEventListener("click" , () => {event.stopPropagation()});
	}
}
else {
	document.querySelector('.portf_frame').classList.remove('frameList');
	if(window.screen.width<=480){
		document.querySelector('.portf_frame').style.height = 500 + 'px';
	}
	for (let i = 0; i<portfCard.length; i++){
		portfCard[i].classList.remove('swap_card','portf_card_focus');
		portfCard[i].style.animationPlayState = 'running';
		buttonCard[i].style.display = 'none';
	}
}
})
}

/*==============Анимирование объемности формы обратной связи==============*/
const line = document.querySelectorAll('.line');
const row = document.querySelectorAll('.row');

let focused = document.querySelectorAll('.focused');

for(let i = 0; i < row.length-1; i++){
	focused[i].addEventListener('mousemove', rotate);
	focused[i].addEventListener('mouseout', goBack);

	function rotate(){
		const halfHeight = row[i].offsetHeight / 2;
		const halfWidth = row[i].offsetWidth / 2;

		let width = row[i].offsetWidth * 0.1;
		let height = row[i].offsetHeight * 0.04;

		row[i].style.transform = 'rotateX('+-(event.offsetY - halfHeight)/height+'deg) rotateY('+(event.offsetX - halfWidth)/width+'deg)';
		line[i].style.boxShadow = '-8px 8px 25px rgba(0, 0, 0, 0.5)';
	}


	function goBack() {
		row[i].style.transform = 'rotateX(0deg) rotateY(0deg)';
		line[i].style.boxShadow = 'none';
	}
}

/*===============Автоматическое обновление даты в футере===============*/
let footerData = document.getElementById('footer_data');
let data = new Date().getFullYear();

footerData.innerHTML = `Баланюк Никита, ${data}`;

/*=====================Анимация svg при скролле =======================*/


let pathAnimate1 = document.querySelectorAll('.aboutMe path');
let pathAnimate2 = document.querySelectorAll('.portfolio path');
let pathAnimate3 = document.querySelectorAll('.effects path');
let maskAnimate = document.querySelectorAll('.main_block mask');

let word = document.querySelectorAll('.word');

window.addEventListener('scroll', trackScroll);

//Рсчет расстояния элемента от верха и определение длины скролла для запуска анимации
function offset(el) {
	var rect = el.getBoundingClientRect(),
	scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	let topDist = {top:rect.top + scrollTop - (window.innerHeight * 0.96)}
	return (topDist.top);
}

function trackScroll() {
	for (let i = 0; i < word.length; i++) {
		
		let scrolled = window.pageYOffset;

		if (scrolled >offset(word[0])) {
			for (let j = 0; j < pathAnimate1.length; j++) {
				pathAnimate1[j].style.cssText = `animation-delay: ${0.05*j}s`;
				pathAnimate1[j].classList.add('stroke_path');
				word[0].classList.add('for_word_fill');
				maskAnimate[0].classList.add('for_mask_fill');
			}
		}
		if (scrolled > offset(word[1])) {
			for (let j = 0; j < pathAnimate2.length; j++) {
				pathAnimate2[j].style.cssText = `animation-delay: ${0.05*j}s`;
				pathAnimate2[j].classList.add('stroke_path');
				word[1].classList.add('for_word_fill');
				maskAnimate[1].classList.add('for_mask_fill');
			}
		}
		if (scrolled > offset(word[2])) {
			for (let j = 0; j < pathAnimate3.length; j++) {
				pathAnimate3[j].style.cssText = `animation-delay: ${0.05*j}s`;
				pathAnimate3[j].classList.add('stroke_path');
				word[2].classList.add('for_word_fill');
				maskAnimate[2].classList.add('for_mask_fill');
			}
		}
	}
}

//======================================================
let form = document.querySelector('#myForm');

form.addEventListener('submit', function(evt){
	evt.preventDefault();

	let formData = {
		name: document.querySelector('input[name="name"]').value,
		email: document.querySelector('input[name="email"]').value,
		title: document.querySelector('input[name="title"]').value,
		comment: document.querySelector('textarea[name="comment"]').value
	};

	let request = new XMLHttpRequest();

	request.addEventListener('load',function(){
		console.log(request.response);
		alert('Заявка успешно отправлена');
	});
    // request.open('POST', 'http://nekitg2i.beget.tech/send.php', true);
    request.open('POST', 'https://balanyuknikita.ru/send.php', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    request.send('name=' + encodeURIComponent(formData.name) + '&email=' +  encodeURIComponent(formData.email) + '&title=' +  encodeURIComponent(formData.title) + '&comment=' +  encodeURIComponent(formData.comment));
});

//============================================
let portfolio = document.querySelector('.portf_frame');

if(window.screen.height<768 || window.screen.width<1366){
	let logoSize = document.querySelector('.logo_shadow');

	logoSize.style.cssText = `Transform: scale(${window.screen.height / 1080 + 0.1})`;
	portfolio.style.cssText = `Transform: skew(-22deg,12deg) scale(${window.screen.width / 1920 })`;
}

if(window.screen.width<=480){
	let logoSize = document.querySelector('.logo_shadow');

	logoSize.style.cssText = `Transform: scale(${window.screen.width / 1920 + 0.2})`;
	portfolio.style.cssText = `Transform: skew(-22deg,12deg) scale(${(window.screen.width / 1920) + 0.2})`;
}

//=====================================================
let buttonHeader = document.querySelector('.button_header');
let firstLink = document.querySelector('.first_link');
let secondLink = document.querySelector('.sec_link');
let thirdLink = document.querySelector('.third_link');

buttonHeader.addEventListener('click', scrollfirst);
firstLink.addEventListener('click', scrollfirst);
secondLink.addEventListener('click', scrollSecond);
thirdLink.addEventListener('click', scrollThird);

function scrollfirst(){
	// if(window.screen.width>480){
	// window.scrollTo({
	// top: 1000,
 //    left: 0,
 //    behavior : "smooth"
 //    });
 //    }
 //    else{
 	window.scrollTo({
 		top: offset(word[0])+window.innerHeight-50,
 		left: 0,
 		behavior : "smooth"
 	});
 }

// }
function scrollSecond(){
	window.scrollTo({
		top: offset(word[1])+window.innerHeight-50,
		left: 0,
		behavior : "smooth"
	});
}
function scrollThird(){
	window.scrollTo({
		top: offset(word[2])+window.innerHeight-50,
		left: 0,
		behavior : "smooth"
	});
}

window.onbeforeunload = function () {
	window.scrollTo(0, 0);
}
