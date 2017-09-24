var app = angular.module('cardPayment', ['ui.router', 'ui.bootstrap', 'ngAnimate']);

app.service('PaymentService', function ($http) {
	var service = {
		getCard: function (type) {
			switch(type) {
				case "0":
					return {image: '/images/visa.png', text: "Visa", id: 0};
				case "1":
					return {image: '/images/amex.png', text: "Amex", id: 1};
				case "2":
					return {image: '/images/mastercard.png', text: "MasterCard", id: 2};
				case "3":
					return {image: '/images/discover.png', text: "Discover", id: 3};
			}
		}
	}
	return service;
});

app.factory('CardIndex', function () {
	var data = 0;
	return data;
});

app.factory('SelectedCard', function () {
	var data = 0;
	return data;
});

app.config(['$locationProvider', function ($locationProvider) {
	$locationProvider.hashPrefix('');
}]);

app.config(function ($stateProvider) {
	var states = [
		{
			name: 'selectCard',
			url: '',
			component: 'selectCard'
		},
		{
			name: 'card',
			url: '/pay/{index}',
			component: 'card',
			resolve: {
				selectedCard: function (PaymentService, $transition$) {
					return PaymentService.getCard($transition$.params().index);
				}
			}
		}
	];

	states.forEach(function (state) {
		$stateProvider.state(state);
	});
});

app.component('selectCard', {
	templateUrl: 'select-card.component.html',
	controller: function (CardIndex, SelectedCard) {
		var ctrl = this;
		ctrl.$onInit = function () {
			ctrl.index = CardIndex;
			ctrl.slides = [];
			ctrl.slides[0] = {image: '/images/visa.png', text: "Visa", id: 0};
			ctrl.slides[1] = {image: '/images/amex.png', text: "Amex", id: 1};
			ctrl.slides[2] = {image: '/images/mastercardNew.png', text: "MasterCard", id: 2};
			ctrl.slides[3] = {image: '/images/discover.png', text: "Discover", id: 3};
		}

		ctrl.$doChanges = function () {
			ctrl.selected = SelectedCard;
		}

		ctrl.getActiveCard = function (index) {
			return ctrl.slides[index].image;
		}

		ctrl.selectCard = function (index) {
			ctrl.selected = index;
		}

		ctrl.getPreviousHiddenCard = function (index) {
			if (index == 0) {
				return ctrl.slides[ctrl.slides.length-1].image;
			} else {
				return ctrl.slides[index-1].image;
			}
		}

		ctrl.getNextHiddenCard = function (index) {
			if (index == (ctrl.slides.length-1)) {
				return ctrl.slides[0].image;
			} else {
				return ctrl.slides[index+1].image;
			}
		}

		ctrl.updateCards = function (id) {
			if (id == -1) {
				ctrl.index = ctrl.slides.length-1;
			} else if (id == ctrl.slides.length) {
				ctrl.index = 0;
			} else ctrl.index = id;
		}
	}
});

app.component('card', {
	templateUrl: 'card.component.html',
	controller: function ($location, $window) {
		var ctrl = this;

		ctrl.$onInit = function () {
			ctrl.selected = ctrl.selectedCard;
		}

		ctrl.upperCase = function (input) {
			return input.toUpperCase();
		}

		ctrl.onlyNumbers = function (input) {
			if (!isNaN(input))
				return input;
		}

		ctrl.splitNumber = function (input, start, end) {
			if (input && !isNaN(input)) 
				return input.substring(start,end);
		}

		ctrl.submit = function () {
			if (ctrl.cardNumber.length < 16)
				alert('Enter a card number with the correct length');
			else {
				$window.location.reload(true);				
				// $location.host();
				// $location.path("/");
				// console.log($location.host());
			}
		}
	},
	bindings: { selectedCard: '<' } 
});

