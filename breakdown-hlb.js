var js = document.createElement("script");
js.type = "text/javascript";
js.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js';
document.body.appendChild(js);
function bd() {


  //put your team names here. this assumes 12 team, but you can adjust add more or remove some if needed
  //the periods are for display purposes. You can remove them, make them different lengths, and replace them.
  //each time you run this, a new version of this object will be printed last. The idea is for you to copy that
  //and paste it here to keep a running total for breakdowns. The team names *will* need to match text on the site.
  var hist = {
		"I Punt Cats": {Wi: 75, L: 20, T: 15, WH: 77, LH: 27, TH: 6, WP: 49, LP: 44, TP: 17, p: ".......................... "},
		"Colt .45s": {Wi: 64, L: 37, T: 9, WH: 46, LH: 51, TH: 13, WP: 70, LP: 26, TP: 14, p: "............................. "},
		"Irish Guinness07": {Wi: 56, L: 40, T: 14, WH: 43, LH: 49, TH: 18, WP: 68, LP: 29, TP: 13, p: "................. "},
		"Football Tailgater": {Wi: 52, L: 47, T: 11, WH: 58, LH: 39, TH: 13, WP: 40, LP: 57, TP: 13, p: "................. "},
		"Tropical Storm Braz": {Wi: 45, L: 45, T: 20, WH: 45, LH: 42, TH: 23, WP: 39, LP: 50, TP: 21, p: "............. "},
		"The Mike Shitty All-Stars": {Wi: 49, L: 49, T: 12, WH: 32, LH: 69, TH: 9, WP: 61, LP: 43, TP: 6, p: "...... "},
		"Irish Dawgs": {Wi: 45, L: 46, T: 19, WH: 62, LH: 32, TH: 16, WP: 34, LP: 58, TP: 18, p: "........................ "},
		"Don't Mess with Texas": {Wi: 46, L: 55, T: 9, WH: 59, LH: 38, TH: 13, WP: 38, LP: 57, TP: 15, p: ".......... "},
		"New York Mehts :(": {Wi: 41, L: 54, T: 15, WH: 48, LH: 47, TH: 15, WP: 47, LP: 51, TP: 12, p: "................ "},
		"The Brewsers": {Wi: 39, L: 61, T: 10, WH: 43, LH: 49, TH: 18, WP: 34, LP: 62, TP: 14, p: "...................... "},
		"PeaceUp ATownDown": {Wi: 39, L: 61, T: 10, WH: 34, LH: 64, TH: 12, WP: 45, LP: 49, TP: 16, p: "........... "},
		"Assault Rifle Hunters": {Wi: 33, L: 69, T: 8, WH: 28, LH: 68, TH: 14, WP: 45, LP: 44, TP: 21, p: "............ "}
	}; 

  //list your categories here in the order they appear on the scoreboard. They do not need to match the text on the site.
  var cats = ['R', 'HR', 'RBI', 'SB', 'OBP', 'SLG',
              'QS', 'W', 'SV', 'ERA', 'WHIP', 'K/9'];
  //list any categories where it's better to have a lower number here, in any order. They need to match the text in cats.
  var neg_cats = ['ERA', 'WHIP'];
  // list of categories where the team must qualify (currently assumes that if you fail one, you fail them all)
  var qual_cats = ['ERA', 'WHIP'];
  //how many hitting categories do you have?
  var num_hitting_cats = 6;
  //for display purposes when showing highs
  var periods = ['....... ','..... ','.... ', '..... ','.... ','.... ' ,'...... ', '....... ', '...... ', '.... ','.. ','..... '];



  var stats = {};
  var teams = [];
  var highs = {};
  var disqualified = {};
  var row, statObj, teamName, histObj;
  $('.linescoreTeamRow').each(function() {
    row = $(this);
    teamName = row.find('.teamName a').text();
    teams.push(teamName);
    statObj = stats[teamName] = {};
    statObj['Wi']=statObj['L']=statObj['T']=statObj['WH']=statObj['LH']=statObj['TH']=statObj['WP']=statObj['LP']=statObj['TP']=0;
    row.find('.precise').each(function(index) {
      statObj[cats[index]] = parseFloat($(this).text());
    });
    row.find('.belowMinimum').each(function(){disqualified[teamName] = true;});
  });
  var teamAWinsH, teamBWinsH, teamAWinsP, teamBWinsP, i, j, k, teamAVal, teamBVal;

  for (i=0; i<teams.length; i++) {
    for (j=i+1; j<teams.length; j++) {
      teamA = stats[teams[i]];
      teamB = stats[teams[j]];
      teamAWinsH = teamBWinsH = teamAWinsP = teamBWinsP = 0;
      for (k=0; k<cats.length; k++) {
        // first, check disqualifiers
        if ($.inArray(cats[k], qual_cats) != -1) {
          if (disqualified[teams[i]]) {
            if (!disqualified[teams[j]]) {
              if (k < num_hitting_cats) {
                teamBWinsH++;
              } else {
                teamBWinsP++;
              }
            }
            continue;
          } else if (disqualified[teams[j]]) {
            if (k < num_hitting_cats) {
              teamAWinsH++;
            } else {
              teamAWinsP++;
            }
            continue;
          }
        } // end check disqualifiers
        teamAVal = teamA[cats[k]];
        teamBVal = teamB[cats[k]];
        if (teamAVal > teamBVal) {
          if (k < num_hitting_cats) {
            if ($.inArray(cats[k], neg_cats) != -1) {
              teamBWinsH++
            } else {
              teamAWinsH++;
            }
          } else {
            if ($.inArray(cats[k], neg_cats) != -1) {
              teamBWinsP++;
            } else {
              teamAWinsP++;
            }
          }
        } else if (teamAVal < teamBVal) {
          if (k < num_hitting_cats) {
            if ($.inArray(cats[k], neg_cats) != -1) {
              teamAWinsH++
            } else {
              teamBWinsH++;
            }
          } else {
            if ($.inArray(cats[k], neg_cats) != -1) {
              teamAWinsP++;
            } else {
              teamBWinsP++;
            }
          }
        }
      }
      if ((teamAWinsH + teamAWinsP) > (teamBWinsH + teamBWinsP)) {
        teamA['Wi']++;
        teamB['L']++;
      } else if ((teamAWinsH + teamAWinsP) < (teamBWinsH + teamBWinsP)) {
        teamA['L']++;
        teamB['Wi']++;
      } else {
        teamA['T']++;
        teamB['T']++;
      }
      if (teamAWinsH > teamBWinsH) {
        teamA['WH']++;
        teamB['LH']++;
      } else if (teamAWinsH < teamBWinsH) {
        teamA['LH']++;
        teamB['WH']++;
      } else {
        teamA['TH']++;
        teamB['TH']++;
      }
      if (teamAWinsP > teamBWinsP) {
        teamA['WP']++;
        teamB['LP']++;
      } else if (teamAWinsP < teamBWinsP) {
        teamA['LP']++;
        teamB['WP']++;
      } else {
        teamA['TP']++;
        teamB['TP']++;
      }
    }
  }
  teams.sort(function(a,b){
    teamA = stats[a];
    teamB = stats[b];
    return ((teamB['Wi'] + teamB['T']/2)/11) - ((teamA['Wi'] + teamA['T']/2)/11);
  });
  console.log('[b][u]Week Breakdowns (Combined, Hitting, Pitching)[/u][/b]')
  for (i=0; i<teams.length; i++) {
    statObj = stats[teams[i]];
    histObj = hist[teams[i]]
    histObj['Wi']  += statObj['Wi'];
    histObj['L']  += statObj['L'];
    histObj['T']  += statObj['T'];
    histObj['WH'] += statObj['WH'];
    histObj['LH'] += statObj['LH'];
    histObj['TH'] += statObj['TH'];
    histObj['WP'] += statObj['WP'];
    histObj['LP'] += statObj['LP'];
    histObj['TP'] += statObj['TP'];
    console.log(teams[i] + histObj['p'] + '[b]' + statObj['Wi'] + '-' + statObj['L'] + '-' + statObj['T'] + '[/b]' +
                           ', ' + statObj['WH'] + '-' + statObj['LH'] + '-' + statObj['TH'] +
                           ', ' + statObj['WP'] + '-' + statObj['LP'] + '-' + statObj['TP']);
  }
  var totalGames = histObj['Wi'] + histObj['L'] + histObj['T'];
  teams.sort(function(a,b){
    teamA = hist[a];
    teamB = hist[b];
    return ((teamB['Wi'] + teamB['T']/2)/totalGames) - ((teamA['Wi'] + teamA['T']/2)/totalGames);
  });
  console.log('\n[b][u]Season Breakdowns (Combined, Hitting, Pitching)[/u][/b]');
  var percentage;
  for (i=0; i<teams.length; i++) {
    histObj = hist[teams[i]];
    percentage = ((histObj['Wi'] + histObj['T']/2)/totalGames).toFixed(3);
    console.log(teams[i] + histObj['p'] + '(' + percentage + ') [b]' + histObj['Wi'] + '-' + histObj['L'] + '-' + histObj['T'] + '[/b]' +
                           ', ' + histObj['WH'] + '-' + histObj['LH'] + '-' + histObj['TH'] +
                           ', ' + histObj['WP'] + '-' + histObj['LP'] + '-' + histObj['TP']);
  }

  for (k=0; k<cats.length; k++) {
    highs[cats[k]] = {teams: [teams[0]], val: stats[teams[0]][cats[k]]};
  }
  for (i=1; i<teams.length; i++) {
    for (k=0; k<cats.length; k++) {
      teamBVal = stats[teams[i]][cats[k]];
      if ((highs[cats[k]]['val'] < teamBVal && $.inArray(cats[k], neg_cats) == -1) ||
          (highs[cats[k]]['val'] > teamBVal && $.inArray(cats[k], neg_cats) != -1)) {
        highs[cats[k]]['teams'] = [teams[i]];
        highs[cats[k]]['val'] = teamBVal;
      } else if (highs[cats[k]]['val'] == teamBVal) {
        highs[cats[k]]['teams'].push(teams[i]);
      }
    }
  }

  console.log('\n[b][u]Week Highs:[/u][/b]');
  for (i=0; i<cats.length; i++) {
    if (i == 6) {console.log(' ');}
    console.log(cats[i] + periods[i] + highs[cats[i]]['val'] + ' - ' + highs[cats[i]]['teams'].join('; '));
  }

  console.log('\n\nvar hist = {')
  for (i=0; i<teams.length; i++) {
    histObj = hist[teams[i]];
    console.log('\t\t"' + teams[i] + '": {Wi: ' + histObj['Wi'] + ', L: ' + histObj['L'] + ', T: ' +
      histObj['T'] + ', WH: ' + histObj['WH'] + ', LH: ' + histObj['LH'] + ', TH: ' +
      histObj['TH'] + ', WP: ' + histObj['WP'] + ', LP: ' + histObj['LP'] + ', TP: ' +
      histObj['TP'] + ', p: "' + histObj['p'] + '"}' + (i == teams.length-1 ? '' : ','));
  }
  console.log('\t};');
}


//type bd()
