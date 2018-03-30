	// JS to open and close sidebar overlay effect 

	function w3_open() {
	 document.getElementById("mySidebar").style.display = "block";
	  document.getElementById("myOverlay").style.display = "block";
	}

	function w3_close() {
	  document.getElementById("mySidebar").style.display = "none";
	  document.getElementById("myOverlay").style.display = "none";
	}


	// Deezer
(function (){
    'use strict';
	$(document).ready(function(){

// Faire apparaitre dans la page apres avoir taper dans la bar de recherche
		
		$('#boutonrechercher').on('click', function(event){
			if ($('select#trimusique').val() === $("option:contains('Album')")[0].value && $('#barrecherche').val() != null){
				
				var TabApi = [];
				var barrecherche = $('#barrecherche').val();
				
				$.ajax({
					 url : 'https://api.deezer.com/search?q=' + barrecherche + '&order=TRACK_ASC',
  					 data : {
  					 	output : 'jsonp',
  					 },
  					 dataType : 'jsonp',
  					}).then(function(data){

  					TabApi = data;

  					console.log(TabApi.data);

  					  for (var i = 0; i < TabApi.data.length; i++){
  					 	$('div.container-artist').append('<div class="w3-container"><div id="numeroArtiste"><p>Album N°</>'+ i + '</div>');
  					 	$('div.container-artist').append('<div class="album-img"><img src="'+ TabApi.data[i].album.cover_medium +'"></div>')
  					 	.append('<h2>'+ TabApi.data[i].artist.name + ' / Album : ' + TabApi.data[i].album.title + ' / Duree : ' + TabApi.data[i].duration + ' minutes </h2>')
                   		.append('<div class="container-info-artiste flex"><button class="w3-bar-item w3-button w3-black">écouter un extrait</button><button class="w3-bar-item w3-button w3-black">Consulter Album</button><button class="w3-bar-item w3-button w3-black">Voir la fiche de lartiste</button></div></div>');
                   	}

              });
            }
        });
    });
})();


  /*else if($('select#trimusique').val() === $("option:contains('Artiste')")[0].value && $('#barrecherche').val() != null){
        
        $.ajax({
           url : 'https://api.deezer.com/search?q=' + barrecherche ,
             data : {
              output : 'jsonp',
             },
             dataType : 'jsonp',
             }).then(function(data){

             for (var i = 0; i < TabApi.data.length; i++){
              $('div.container-artist').append('<div class="w3-container"><div id="numeroArtiste"><p>Album N°</>'+ i + '</div>');
              $('div.container-artist').append('<div class="album-img"><img src="'+ TabApi.data[i].album.cover_medium +'"></div>')
              .append('<h2>'+ TabApi.data[i].artist.name + ' / Album : ' + TabApi.data[i].album.title + ' / Duree : ' + TabApi.data[i].duration + ' minutes </h2>')
                      .append('<div class="container-info-artiste flex"><button class="w3-bar-item w3-button w3-black">écouter un extrait</button><button class="w3-bar-item w3-button w3-black">Consulter Album</button><button class="w3-bar-item w3-button w3-black">Voir la fiche de lartiste</button></div></div>');
                        }
                        else {

                       alert("salut"); */