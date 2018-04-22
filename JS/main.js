	// JS to open and close sidebar overlay effect 

	function w3_open() {
		document.getElementById("mySidebar").style.display = "block";
		// document.getElementById("myOverlay").style.display = "block";
	}

	function w3_close() {
		document.getElementById("mySidebar").style.display = "none";
		// document.getElementById("myOverlay").style.display = "none";
	}

	// pour gerer le menu lorsqu on change 'd'onglet'
	function openView(pageId) {
		$('.view').hide();
		$('#' + pageId).show();
		w3_close();
	}

	function minToHour(minutes) {
		//On test que minutes est bien un nombre entier
		var Myexp = new RegExp("^[0-9]+$", "g");
		if (Myexp.test(minutes)) {
			var nbHour = parseInt(minutes / 60);
			var nbminuteRestante = (minutes % 60);
			if (nbminuteRestante == 0) {
				alert(nbHour + "h");
			} else {
				alert(nbHour + "h" + nbminuteRestante);
			}
		}
	}

	function consulterAlbum(resultat) {
		return function (event) {

			// var url = window.location.href.indexOf('album/');
			// alert(url);
			var id = resultat.album.id;
			console.log(id);

			$.ajax({
				url: 'https://api.deezer.com/album/' + id + '/tracks',
				data: {
					output: 'jsonp',
				},
				dataType: 'jsonp',
			}).then(function (response) {
				openView('pagealbum');
				$('#albumNom').html(resultat.album.title);

				console.log('album', response);
				// affichageElement(response.data);
			}); /* Accolade fin de function(response){} */
		};
	}

	function affichageElements(data) {
		console.log(data.length);
		var sortie = $('div.resultats');
		sortie.empty();

		for (var i = 0; i < data.length; i++) {
			var idAlbum = data[i].album.id;
			var consulterAlbumBoutonId = 'consulterAlbumBouton' + i;
			var div = $('<div class="container-artist"></div>');
			sortie.append(div);

			// console.log(div)

			//append('<div class="container"><div id="numeroArtiste"><p>Album N°</p>' +
			//		i + '</div>')
			div.append('<div class="album-img"><img src="' + data[i].album.cover_medium +
					'"></div>')
				.append('<p>' + data[i].album.title + '</br> Duree : ' +
					data[i].duration + ' minutes </p>')
				.append('<div class="container-info-artiste flex">' +
					'<button class="w3-bar-item w3-button w3-black">' +
					'écouter un extrait' +
					'</button>' +
					'<button id="' + consulterAlbumBoutonId + '" class="w3-bar-item w3-button w3-black consulterAlbumBouton">' +
					'Consulter Album' +
					'</button>' +
					'<button class="w3-bar-item w3-button w3-black">' +
					'Voir la fiche de lartiste' +
					'</button>' +
					'</div></div>');

			$(document).on('click', '#' + consulterAlbumBoutonId, consulterAlbum(data[i]));
		} /* Boucle for */
	}

	function changeRoute(route, initial) {
		// Page intiale de retour sinon page avec le bon path
		if (initial) {
			history.pushState(null, null, "/Recherche");
			// alert("1ere fois");
			$("div.view").hide(0, function () {
				$("div.view[data-link='/Recherche'").show();
			});
		} else {
			getArticle(route);
		}
	}

	var links = $(".page-link");
	links.click(function (event) {

		event.preventDefault();
		event.stopPropagation(); // Modification de l'url avec la valeur du lien
		var target = event.target;
		route = $(target).attr("data-href");
		alert("ajout de la route " + route + " dans l'historique");
		history.pushState(null, null, route);
		changeRoute(route); // Modification du contenu de la page
	});

	function getArticle(route) {
		alert("affichage de la page" + route);
		$(".view").hide(0, function () {
			$("div.view[data-link='" + route + "'").show();
		});
	}

	(function () {
		'use strict';
		$(document).ready(function () {
			window.onpopstate = function () {
				changeRoute(window.location.pathname);
			}
			changeRoute(null, true);
			//openView('pagerecherche');

			// Faire apparaitre dans la page apres avoir taper dans la bar de recherche
			var albumOption = $("option:contains('Album')")[0].value;
			var artisteOption = $("option:contains('Artiste')")[0].value;

			$('#boutonrechercher').on('click', function (event) {
				var barrecherche = $('#barrecherche').val();
				if (barrecherche) {

					$.ajax({
						url: 'https://api.deezer.com/search?q=' + barrecherche + '&order=TRACK_ASC',
						data: {
							output: 'jsonp',
						},
						dataType: 'jsonp',
					}).then(function (response) {
						console.log(response);

						if ($('select#trimusique').val() === albumOption) {
							affichageElements(response.data);
						} else if ($('select#trimusique').val() === artisteOption) {
							affichageElements(response.data);
						} else {
							alert("salut");
						}
					}); /* Accolade fin de function(response){} */
				} else {
					console.log('Il n y a rien dans la barre de recherche');
				}
			});
		});
	})();