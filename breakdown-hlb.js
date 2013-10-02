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
    "Chris, Proven 2 Not  Be Stupid": {Wi: 135, L: 88, T: 19, WH: 110, LH: 116, TH: 16, WP: 151, LP: 58, TP: 33, p: "..... ", fam: "undefined"},
    "Dont Mess with Texas": {Wi: 135, L: 90, T: 17, WH: 118, LH: 98, TH: 26, WP: 126, LP: 87, TP: 29, p: "... ", fam: "undefined"},
    "Colt .45s": {Wi: 116, L: 96, T: 30, WH: 124, LH: 97, TH: 21, WP: 94, LP: 107, TP: 41, p: "...................... ", fam: "undefined"},
    "o  GUKUGAMI o": {Wi: 118, L: 100, T: 24, WH: 127, LH: 92, TH: 23, WP: 112, LP: 94, TP: 36, p: "................... ", fam: "undefined"},
    "Irish Guinness07": {Wi: 105, L: 103, T: 34, WH: 102, LH: 108, TH: 32, WP: 112, LP: 88, TP: 42, p: "........... ", fam: "undefined"},
    "Tropical Storm Braz": {Wi: 108, L: 107, T: 27, WH: 90, LH: 124, TH: 28, WP: 109, LP: 103, TP: 30, p: "...... ", fam: "undefined"},
    "The Emperor's Club": {Wi: 109, L: 115, T: 18, WH: 97, LH: 120, TH: 25, WP: 117, LP: 87, TP: 38, p: "....... ", fam: "undefined"},
    "Chicago Dawgs": {Wi: 104, L: 112, T: 26, WH: 128, LH: 98, TH: 16, WP: 89, LP: 125, TP: 28, p: "............. ", fam: "undefined"},
    "Ángel in the Outfield": {Wi: 102, L: 112, T: 28, WH: 97, LH: 123, TH: 22, WP: 111, LP: 98, TP: 33, p: ".......... ", fam: "undefined"},
    "Who Dat Ninja": {Wi: 101, L: 116, T: 25, WH: 101, LH: 109, TH: 32, WP: 90, LP: 123, TP: 29, p: "............... ", fam: "undefined"},
    "Football Tailgater": {Wi: 96, L: 117, T: 29, WH: 105, LH: 116, TH: 21, WP: 87, LP: 118, TP: 37, p: ".......... ", fam: "undefined"},
    "Irish Dawgs": {Wi: 69, L: 142, T: 31, WH: 108, LH: 106, TH: 28, WP: 48, LP: 158, TP: 36, p: ".................. ", fam: "undefined"}
  };

  //list your categories here in the order they appear on the scoreboard. They do not need to match the text on the site.
  var cats = ['R', 'HR', 'RBI', 'SB', 'AVG', 'OPS',
              'QS', 'W', 'SV', 'ERA', 'WHIP', 'K/9'];
  //list any categories where it's better to have a lower number here, in any order. They need to match the text in cats.
  var neg_cats = ['ERA', 'WHIP'];
  //how many hitting categories do you have?
  var num_hitting_cats = 6;
  //for display purposes when showing highs
  var periods = ['....... ','..... ','.... ', '..... ','.... ','.... ' ,'...... ', '....... ', '...... ', '.... ','.. ','..... '];



  var stats = {};
  var teams = [];
  var highs = {};
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
  });
  var teamAWinsH, teamBWinsH, teamAWinsP, teamBWinsP, i, j, k, teamAVal, teamBVal;

  for (i=0; i<teams.length; i++) {
    for (j=i+1; j<teams.length; j++) {
      teamA = stats[teams[i]];
      teamB = stats[teams[j]];
      teamAWinsH = teamBWinsH = teamAWinsP = teamBWinsP = 0;
      for (k=0; k<cats.length; k++) {
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
    percentage = (histObj['Wi'] + histObj['T']/2)/totalGames;
    console.log(teams[i] + histObj['p'] + '(' + percentage + ')' + '[b]' + histObj['Wi'] + '-' + histObj['L'] + '-' + histObj['T'] + '[/b]' +
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
      histObj['TP'] + ', p: "' + histObj['p'] + '", fam: "' + histObj['fam'] + '"}' + (i == teams.length-1 ? '' : ','));
  }
  console.log('\t};');

  console.log('\n[b][u]Family Standings[/u][/b]');
  var famStand = {};
  var famObj;
  var families = [];
  for (i=0; i<teams.length; i++) {
    histObj = hist[teams[i]];
    if (famStand[histObj['fam']] == null) {
      famStand[histObj['fam']] = {Wi: 0, L: 0, T: 0, WH: 0, LH: 0, TH: 0, WP: 0, LP: 0, TP: 0};
      families.push(histObj['fam']);
    }
    famObj = famStand[histObj['fam']]
    famObj['Wi'] += histObj['Wi'];
    famObj['L']  += histObj['L'];
    famObj['T']  += histObj['T'];
    famObj['WH'] += histObj['WH'];
    famObj['LH'] += histObj['LH'];
    famObj['TH'] += histObj['TH'];
    famObj['WP'] += histObj['WP'];
    famObj['LP'] += histObj['LP'];
    famObj['TP'] += histObj['TP'];
  }
  totalGames = famObj['Wi'] + famObj['L'] + famObj['T'];
  families.sort(function(a,b){
    teamA = famStand[a];
    teamB = famStand[b];
    return ((teamB['Wi'] + teamB['T']/2)/totalGames) - ((teamA['Wi'] + teamA['T']/2)/totalGames);
  });
  for (i=0; i<families.length; i++) {
    famObj = famStand[families[i]]
    console.log(families[i] + ': [b]' + famObj['Wi'] + '-' + famObj['L'] + '-' + famObj['T'] + '[/b]' +
                           ', ' + famObj['WH'] + '-' + famObj['LH'] + '-' + famObj['TH'] +
                           ', ' + famObj['WP'] + '-' + famObj['LP'] + '-' + famObj['TP']);
  }
}


//type bd()
