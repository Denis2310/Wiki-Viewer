var remoteUrlWithOrigin = "https://www.mediawiki.org/w/api.php"; 
var text;
ContentDiv = document.getElementById("contentBox");

/*Kada input polje primi focus */
$(".searchInput").click(function(){
	$(this).animate({
		width: "81%",
		height: "43px",
		fontSize: "16px",
		border: "0px",
	});
	$(this).attr("placeholder", "");
	$(".button").show(300);
	$(".reset-image").show(300);
});


$(".button").click(function(){
	text = $(".searchInput").val();
	if(ContentDiv.firstChild)
	{
		$(ContentDiv).empty();
	}
	wikiRequest();
}).mouseover(function(){
	$(this).css("opacity", "0.7");
}).mouseout(function(){
	$(this).css("opacity", "initial");
});


//Tipka x za resetiranje aplikacije na početak
$(".reset-image").click(function(){
	$(".searchInput").animate({
		width: "210px",
		height: "35px",
		fontSize: "13.33px",
	});
	$(".searchInput").attr("placeholder", "Click here to search Wikipedia...");
	$("#search-box").animate({marginTop: "120px"});
	$(".button").hide(300);
	$(".reset-image").hide(300);
	$(ContentDiv).empty();
	$(".searchInput").val("");
	$(ContentDiv).css("display", "none");
});




/*Korištenje .ajax za slanje zathjeva na Wikipedia */

function wikiRequest(){
	$.ajax({
  		url: 'https://en.wikipedia.org/w/api.php',
  		data: {
    		action: 'query',
    		list: 'search',
    		srsearch: text,
    		srlimit: 20,
    		format: 'json',
    		formatversion: 2
  		},
  		dataType: 'jsonp',
  		success: function (x) {
    	console.log(x.query);
    	if(x.query.search.length > 0)
    	{
    		for(i=0; i<x.query.search.length; i++)
    		{
    			d = document.createElement('div');
    			a = document.createElement('a');
    			a.setAttribute("href", "http://en.wikipedia.org/?curid="+x.query.search[i].pageid+"");
    			a.setAttribute("target", "_blank");
    			d.append(a);
    			d.className = "content-element";
    			a.innerHTML = "<h3>"+x.query.search[i].title+"</h3> <hr> "+x.query.search[i].snippet+"..."
    			ContentDiv.append(d);
    		}
    		$("#search-box").animate({marginTop: "20px"});
    		$(ContentDiv).css("display", "block");
    		$(".content-element").mouseenter(function(){
    			$(this).css({
					"opacity": "0.7",
					"cursor": "pointer"
				});
			}).mouseleave(function(){
				$(this).css({
					"opacity": "initial",
					"cursor": "auto"
				});
			});
    	} 
    	else
    	{
    		d = document.createElement('div');
    		d.className = "error-content-element";
    		d.innerHTML = "Your search found 0 results."
    		ContentDiv.append(d);
  			$(ContentDiv).css("display", "block");
    	};
    		
  		},

  		error: function(){ 
  			d = document.createElement('div');
    		d.className = "error-content-element";
    		d.innerHTML = "Something went wrong with your request :("
    		ContentDiv.append(d);
  			$(ContentDiv).css("display", "block");
  		}
	})
};



/* {
	"action": "query",  Fetch data from and about MediaWiki
	"format": "json",   vraca format u json
	"prop": "",         which properties to get for queried pages
	"list": "search",   perform a full text search
	"continue": "-||",
	"srsearch": "Hajduk",  Search for page titles or content matching this value
	"srnamespace": "0",    Search only within these namespaces. - koje dijelove vikipedije da pretrazuje (valjda)
	"srlimit": "10",		how many total pages to return
	"sroffset": "10"		When more results are available, use this to continue. ???
}*/