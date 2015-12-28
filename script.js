var main = function() {	
	
	//LocalStorage interaction
	function lsGet(key){ return localStorage.getItem(key); }
	function lsSave(key, value){ localStorage.setItem(key, value); }
	
	//Globals
	var idToken = "com-fs-gvg-finder";
	var Participants = new Array(); // ["username","level","username","level"...]
	var Targets = new Array(); // ["participant", "targets", ...]
	var Conflicts = new Array(); // ["50", "75", "100"]
	
	if(GET_PARAMS()["subcmd"] == "atoz"){
	
		//Inject placeholder
		$($("table[width='100%']")[0]).prepend('<div id="'+idToken+'" class="news"></div>');

		//HTML lookup
		var html = '<div class="news_head">';
		html += '<img src="http://fileserver.huntedcow.com/newsicons/5.gif" alt="">';
		html += '<h1>GvG Finder</h1>';
		html += '<i>Click to expand</i>';
		html += '</div>';
		
		html += '<div class="news_body">';
			html += '<div style="display:inline-block; vertical-align:top;">';
				html += '<table border="0" cellspacing="0" cellpadding="5" width="310px">';
				html += '<tr>';
				html += '<td class="header" colspan="3" align="center"><b>Participants</b></td>';
				html += '</tr>';
				
				html += '<tr>';
				html += '<td class="header" align="center" width="180px">Username:</td>';
				html += '<td class="header" align="center" width="50px">Level:</td>';
				html += '<td class="header" align="center" width="50px">Targets:</td>';
				html += '</tr>';
				
				html += '<tr>';
				html += '<td><input type="text" id="'+idToken+'-partic-username-1" value="" style="width:98%" /></td>';
				html += '<td><input type="text" id="'+idToken+'-partic-level-1" value="" style="width:98%" /></td>';
				html += '<td id='+idToken+'-partic-targets-1 align="center">0</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td><input type="text" id="'+idToken+'-partic-username-2" value="" style="width:98%" /></td>';
				html += '<td><input type="text" id="'+idToken+'-partic-level-2" value="" style="width:98%" /></td>';
				html += '<td id='+idToken+'-partic-targets-2 align="center">0</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td><input type="text" id="'+idToken+'-partic-username-3" value="" style="width:98%" /></td>';
				html += '<td><input type="text" id="'+idToken+'-partic-level-3" value="" style="width:98%" /></td>';
				html += '<td id='+idToken+'-partic-targets-3 align="center">0</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td><input type="text" id="'+idToken+'-partic-username-4" value="" style="width:98%" /></td>';
				html += '<td><input type="text" id="'+idToken+'-partic-level-4" value="" style="width:98%" /></td>';
				html += '<td id='+idToken+'-partic-targets-4 align="center">0</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td colspan="3"><input type="button" id="'+idToken+'-save-partics" value="Save Participants List" style="width:98%" /></td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td colspan="3"><input type="button" id="'+idToken+'-run-search" value="Start Search!" style="width:98%" /></td>';
				html += '</tr>';
				
				
				html += '</table>';
			html += '</div>';
		
			html += '<div style="display:inline-block; vertical-align:top;">';
				html += '<table border="0" cellspacing="0" cellpadding="5" width="310px">';
				html += '<tr>';
				html += '<td class="header" colspan="4" align="center"><b>Information</b></td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td width="50%" colspan="2">Active players:</td>';
				html += '<td width="50%" colspan="2" id="'+idToken+'-active-players" align="center">0</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td colspan="2">Inactive players:</td>';
				html += '<td colspan="2" id="'+idToken+'-inactive-players" align="center">0</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td>Parsed:</td>';
				html += '<td id="'+idToken+'-current-parse" align="center">0</td>';
				html += '<td align="center"> of </td>';
				html += '<td id="'+idToken+'-total-parse" align="center">0</td>';
				html += '</tr>';
				html += '</table>';
				
				html += '<table border="0" cellspacing="0" cellpadding="5" width="310px">';
				html += '<tr>';
				html += '<td class="header" colspan="3" align="center"><b>Available conflicts:</b></td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td class="header" align="center" width="33%">50</td>';
				html += '<td class="header" align="center" width="33%">75</td>';
				html += '<td class="header" align="center" width="33%">100</td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td id="'+idToken+'-available-conflict-50" align="center">0</td>';
				html += '<td id="'+idToken+'-available-conflict-75" align="center">0</td>';
				html += '<td id="'+idToken+'-available-conflict-100" align="center">0</td>';
				html += '</tr>';
				html += '</table>';
				
				html += '<table border="0" cellspacing="0" cellpadding="5" width="310px">';
				html += '<tr>';
				html += '<td class="header" colspan="3" align="center"><b>Legend</b></td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td align="right" colspan="2">Conflict 50 available</td>';
				html += '<td style="width:20px; height:20px; background:#E40;"></td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td align="right" colspan="2">Conflict 75 available</td>';
				html += '<td style="width:20px; height:20px; background:#FD0"></td>';
				html += '</tr>';
				html += '<tr>';
				html += '<td align="right" colspan="2">Conflict 100 available</td>';
				html += '<td style="width:20px; height:20px; background:#9C1;"></td>';
				html += '</tr>';
				html += '</table>';
			html += '</div>';
		
		html += '</div>';
		
		//HCS script for emulating accordion
		html += "<script>$(function(){$('.news_head').css('cursor', 'pointer');$('.news_body').hide().data('open', false);$('.news_head').click(function(e){if (!$(this).parent().children('.news_body').data('open')){e.preventDefault();$('.news_body').hide().data('open', false);$(this).parent().children('.news_body').show().data('open', true);}else{if (e.originalEvent.srcElement.className.length == 0) {e.preventDefault();$('.news_body').hide().data('open', false);}}});});</script>";
		
		//Create HCS style jQuery UI accordion
		$("#"+idToken).html(html);
		
		//Preload saved list
		loadParticipants();
		
		//Button handlers
		$("#"+idToken+"-save-partics").click(saveParticipants);
		$("#"+idToken+"-run-search").click(runSearch);
		
		function runSearch(){
			lockInteraction();
			parseParticipants();
					
			var isBusy = false;
			var waitingResponse = false;
			
			var allGuilds = $("td[width='25%']").parent().parent().children();
			var validGuilds = 0;
			var totalMembers = 0;
			
			for(var i = 2; i <= allGuilds.length; i += 4){
				var guild = $(allGuilds[i]);
				
				var guild_members = parseInt($(guild.children()[2]).text());
				
				if(guild_members < 4) continue;
				
				totalMembers += guild_members;
				validGuilds++;
				
				var guild_name = $(guild.children()[1]).children().text();
				var guild_link = $(guild.children()[1]).children().prop("href");
				
				$.ajax({
					url: guild_link,
					success: function(data) {
					
						//Help varibles for use in ajax respond parse
						var inactivePlayers = 0;
						var activePlayers = 0;
						var targets = new Array();
						for(var x=0; x<4; x++) targets.push(0);
						
						var playerTable = $($(data).find("td[bgcolor='#C38D37'][valign='top']")[0]).parent().parent().children();
							
						for(var i = 2; i <= playerTable.length; i += 3){
							var p = $(playerTable[i]);
							var xp = p.children("[align='right']").text();
							var level = p.children("[align='center'][width!='90%']").text();
							var targetName = p.children("[valign='top'][align!='center'][align!='right']").children('a').text();
							
							//Fetch activity
							var activityTime = $($($($($(p.children()[1]).children().attr("data-tipped")).closest("table")).children().children()[3]).children()[1]).text();
							
							var tmp = activityTime.split(' ');
							var days = tmp[0];
							days = days.substring(0, days.length - 1);
							
							if(days >= 7){
								inactivePlayers++;
								continue;
							}else if(xp == 0){
								inactivePlayers++;
								continue;
							}else{
								activePlayers++;
								
								for(var k=0; k<4; k++){
									var id = 0;
									if(k==0) id=1; else if(k==1) id=3; else if(k==2) id=5; else if(k==3) id=7;
									var vlevel = Participants[id];
									if(vlevel == 0) vlevel = -1000;
									
									if(vlevel <= 300){
										if(Math.abs(vlevel - level) <= 25) {
											targets[k]++;
										}
									}else if(vlevel > 300 && vlevel <= 700){
										if(Math.abs(vlevel - level) <= 50) {
											targets[k]++;
										}
									}else if(vlevel > 700){
										if(Math.abs(vlevel - level) <= 100) {
											targets[k]++;
										}
									}
								}
							}
						}
					
						var zeroCount = 0;
						for(var j=1; j<=4; j++){
							if(targets[j-1] == 0) zeroCount++;
							var oldTargets = parseInt($("#"+idToken+"-partic-targets-"+j).text());
							$("#"+idToken+"-partic-targets-"+j).text(oldTargets + targets[j-1]);
						}
						
						var avvConf = 100 - (zeroCount * 25);
								
							 if(avvConf == 100) $("#"+idToken+"-available-conflict-100").text(parseInt($("#"+idToken+"-available-conflict-100").text()) + 1);
						else if(avvConf ==  75) $("#"+idToken+"-available-conflict-75").text(parseInt($("#"+idToken+"-available-conflict-75").text()) + 1);
						else if(avvConf ==  50) $("#"+idToken+"-available-conflict-50").text(parseInt($("#"+idToken+"-available-conflict-50").text()) + 1);
						
						var oldActive = parseInt($("#"+idToken+"-active-players").text());
						var oldInactive = parseInt($("#"+idToken+"-inactive-players").text());
						
						$("#"+idToken+"-active-players").text(oldActive + activePlayers);
						$("#"+idToken+"-inactive-players").text(oldInactive + inactivePlayers);
						
						var url = this.url.substring(23);
						var toColor = $(document).find("a[href='"+url+"']").parent().parent();
										
							 if(avvConf == 100) toColor.css("background", "#9C1");
						else if(avvConf ==  75) toColor.css("background", "#FD0");
						else if(avvConf ==  50) toColor.css("background", "#E40");
						
						var parsed = parseInt($("#"+idToken+"-current-parse").text()) + 1;
						$("#"+idToken+"-current-parse").text(parsed);
						
						if(parsed == validGuilds){
							alert("Done.");
							unlockInteraction();
						}
					}
				});
			}
			$("#"+idToken+"-total-parse").text(validGuilds);
		}
		
		function parseParticipants(){
			Participants = new Array();
			
			for(var i = 1; i<=4; i++){
				Participants.push( $("#"+idToken+"-partic-username-"+i).val() );
				Participants.push( $("#"+idToken+"-partic-level-"+i).val() );
			}
		}
		
		function saveParticipants(){
			parseParticipants();
			
			for(var i=1; i<=Participants.length; i+=2){
				var id = (i==1) ? (i) : (i - parseInt(i/2));
				lsSave("com.fs.gvg.finder.partic.username."+id, Participants[i-1]);
				lsSave("com.fs.gvg.finder.partic.level."+id, Participants[i]);			
			}
			
			$("#"+idToken+"-save-partics").prop("value", "Saved!").prop("disabled", true);
			setTimeout(function(){ $("#"+idToken+"-save-partics").prop("value", "Save Participants List").prop("disabled", false); }, 2000);
			
		}
		
		function lockInteraction(){
			$("#"+idToken+"-partic-username-1").attr("disabled", "disabled");
			$("#"+idToken+"-partic-username-2").attr("disabled", "disabled");
			$("#"+idToken+"-partic-username-3").attr("disabled", "disabled");
			$("#"+idToken+"-partic-username-4").attr("disabled", "disabled");
			$("#"+idToken+"-partic-level-1").attr("disabled", "disabled");
			$("#"+idToken+"-partic-level-2").attr("disabled", "disabled");
			$("#"+idToken+"-partic-level-3").attr("disabled", "disabled");
			$("#"+idToken+"-partic-level-4").attr("disabled", "disabled");
			
		
			$("#"+idToken+"-save-partics").attr("disabled", "disabled");
			$("#"+idToken+"-run-search").prop("value", "Parsing...").prop("disabled", true);
			
			//clear if search is restarted
			$("#"+idToken+"-current-parse").text("0");
			$("#"+idToken+"-active-players").text("0");
			$("#"+idToken+"-inactive-players").text("0");
			
			$("#"+idToken+"-partic-targets-1").text("0");
			$("#"+idToken+"-partic-targets-2").text("0");
			$("#"+idToken+"-partic-targets-3").text("0");
			$("#"+idToken+"-partic-targets-4").text("0");
			
			$("#"+idToken+"-available-conflict-100").text("0");
			$("#"+idToken+"-available-conflict-75").text("0");
			$("#"+idToken+"-available-conflict-50").text("0");
			
			var table = $("td[width='25%']").parent().parent().children();
			for(var i = 2; i <= table.length; i += 4)
				$(table[i]).css("background", "");
		}
		
		function unlockInteraction(){
			$("#"+idToken+"-partic-username-1").removeAttr("disabled");
			$("#"+idToken+"-partic-username-2").removeAttr("disabled");
			$("#"+idToken+"-partic-username-3").removeAttr("disabled");
			$("#"+idToken+"-partic-username-4").removeAttr("disabled");
			$("#"+idToken+"-partic-level-1").removeAttr("disabled");
			$("#"+idToken+"-partic-level-2").removeAttr("disabled");
			$("#"+idToken+"-partic-level-3").removeAttr("disabled");
			$("#"+idToken+"-partic-level-4").removeAttr("disabled");
			
		
			$("#"+idToken+"-save-partics").removeAttr("disabled");
			$("#"+idToken+"-run-search").prop("value", "Start Search!").prop("disabled", false);
		}
	
	}else if(GET_PARAMS()["cmd"] == "guild" && GET_PARAMS()["subcmd"] == "view"){
	
		//Inject placeholder
		$("#pCR").prepend('<div class="minibox" id="'+idToken+'"></div>');
	
		//HTML lookup
		var html = '<h3>GvG Finder</h3>';
		html += '<div class="minibox-content">';
		html += '<h4>Settings</h4>';
		html += '<style type="text/css">.'+idToken+'-autoparse-on, .'+idToken+'-autoparse-off{display:inline-block;width:12px;height:12px;margin:0 1px 2px 0;vertical-align:bottom;background: transparent url("http://huntedcow.cachefly.net/fs/media/dist/img/ui/ui.png");} .'+idToken+'-autoparse-on{background-position: -270px -80px;} .'+idToken+'-autoparse-off{background-position: -246px -80px;}</style>';
		
		html += '<a href="#" class="'+idToken+'-autoparse-off" id="'+idToken+'-autoparse"></a> Auto-Parse<br /><br />';
		html += '<input type="button" id="'+idToken+'-parse-start" value="Parse Guild" /><br />';
		
		html += '</div>';
		
		$("#"+idToken).html(html);
		
		var box = $("#"+idToken+"-autoparse");
		
		if(lsGet("com.fs.gvg.finder.autoparse.guild") == "true"){
			box.addClass(idToken+"-autoparse-on");
			box.removeClass(idToken+"-autoparse-off");
			
			loadParticipantsGlobal();
			parseGuild();
		}
		
		$("#"+idToken+"-autoparse").click(function(){
			var box = $("#"+idToken+"-autoparse");
			
			if(box.hasClass(idToken+"-autoparse-on")){
				box.addClass(idToken+"-autoparse-off");
				box.removeClass(idToken+"-autoparse-on");
				lsSave("com.fs.gvg.finder.autoparse.guild", "false");
			}else{
				box.addClass(idToken+"-autoparse-on");
				box.removeClass(idToken+"-autoparse-off");
				lsSave("com.fs.gvg.finder.autoparse.guild", "true");
			}
		});
		
		$("#"+idToken+"-parse-start").click(function(){
			
			loadParticipantsGlobal();
			parseGuild();
			
		});
		
		function parseGuild(){
			var playerTable = $($("table[cellpadding='1'][width='100%']")[1]).children().children()
			
			for(var i = 2; i <= playerTable.length; i += 3){
				var p = $(playerTable[i]);
				var place = p.children("[width='90%']");
				var xp = p.children("[align='right']").text();
				var targetLevel = p.children("[align='center'][width!='90%']").text();
				var targetName = p.children("[valign='top'][align!='center'][align!='right']").children('a').text();
				
				//Clear rank
				place.text("");
				
				//Fetch activity
				var activityTime = $($($($($(p.children()[1]).children().attr("data-tipped")).closest("table")).children().children()[3]).children()[1]).text();
				
				if(isInactive(activityTime)){
					//p.css("background", "#600");
					//p.css("color", "#fff");
					place.text("INACTIVE");
					continue;
				}else if(xp == 0){
					//p.css("background", "#660");
					//p.css("color", "#fff");
					place.text("TERMINATED");
					continue;
				}else{
					checkPlayer(targetLevel, p, place, targetName);
				}
			}
		}
	
		function isInactive(time){
			var tmp = time.split(' ');
			var days = tmp[0];
			days = days.substring(0, days.length - 1);
			
			if(days >= 7)
				return true;
			return false;
		}
		
		function checkPlayer(level, p, place, targetName){
		
			for(var k=0; k<4; k++){
				var id = 0;
				if(k==0) id=1; else if(k==1) id=3; else if(k==2) id=5; else if(k==3) id=7;
				var vlevel = Participants[id];
				var name = Participants[id-1];
				
				if(vlevel == 0) vlevel = -1000;
				
				if(vlevel <= 300){
					if(Math.abs(vlevel - level) <= 25) {
						p.css("background", "#C38D37");
						(place.text() == "") ? (place.text(name)) : (place.text(place.text() + ", " + name));
					}
				}else if(vlevel > 300 && vlevel <= 700){
					if(Math.abs(vlevel - level) <= 50) {
						p.css("background", "#C38D37");
						(place.text() == "") ? (place.text(name)) : (place.text(place.text() + ", " + name));
					}
				}else if(vlevel > 700){
					if(Math.abs(vlevel - level) <= 100) {
						p.css("background", "#C38D37");
						(place.text() == "") ? (place.text(name)) : (place.text(place.text() + ", " + name));
					}
				}
			}		
		}
		
	}
	
	function loadParticipants(){
		for(var i=1; i<=4; i++){
			$("#"+idToken+"-partic-username-"+i).val( lsGet("com.fs.gvg.finder.partic.username."+i) );
			$("#"+idToken+"-partic-level-"+i).val( lsGet("com.fs.gvg.finder.partic.level."+i) );
		}
	}
	
	function loadParticipantsGlobal(){
		for(var i=1; i<=4; i++){
			Participants.push( lsGet("com.fs.gvg.finder.partic.username."+i) );
			Participants.push( lsGet("com.fs.gvg.finder.partic.level."+i) );
		}
	}
	
	function GET_PARAMS() {
		var vars = {};
		var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) { vars[key] = value; });
		return vars;
	}

}

var script = document.createElement("script");
script.textContent = "(" + main.toString() + ")();";
document.body.appendChild(script);