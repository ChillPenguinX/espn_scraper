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
    "Colt .45s": {Wi: 90, L: 15, T: 5, WH: 93, LH: 16, TH: 1, WP: 43, LP: 44, TP: 23, p: "...................... ", fam: "Brasuell"},
    "Assault Rifle Hunters": {Wi: 75, L: 26, T: 9, WH: 73, LH: 28, TH: 9, WP: 44, LP: 47, TP: 19, p: "..... ", fam: "Loechel"},
    "The Emperor's Club": {Wi: 54, L: 48, T: 8, WH: 55, LH: 43, TH: 12, WP: 44, LP: 46, TP: 20, p: "....... ", fam: "Holmdopia"},
    "Irish Dawgs": {Wi: 51, L: 45, T: 14, WH: 47, LH: 47, TH: 16, WP: 61, LP: 43, TP: 6, p: ".................. ", fam: "Fleming"},
    "Chicago Dawgs": {Wi: 52, L: 49, T: 9, WH: 43, LH: 54, TH: 13, WP: 61, LP: 33, TP: 16, p: "............. ", fam: "Loechel"},
    "Irish Guinness07": {Wi: 50, L: 48, T: 12, WH: 47, LH: 53, TH: 10, WP: 49, LP: 45, TP: 16, p: "........... ", fam: "Fleming"},
    "Don't Mess with Texas": {Wi: 50, L: 50, T: 10, WH: 38, LH: 52, TH: 20, WP: 45, LP: 48, TP: 17, p: "... ", fam: "Fleming"},
    "I Punt Cats": {Wi: 43, L: 56, T: 11, WH: 58, LH: 45, TH: 7, WP: 40, LP: 46, TP: 24, p: "................... ", fam: "Loechel"},
    "Wilpon Still Sucks": {Wi: 41, L: 62, T: 7, WH: 41, LH: 62, TH: 7, WP: 42, LP: 49, TP: 19, p: "......... ", fam: "Holmdopia"},
    "Tropical Storm Braz": {Wi: 40, L: 64, T: 6, WH: 47, LH: 55, TH: 8, WP: 33, LP: 62, TP: 15, p: "...... ", fam: "Brasuell"},
    "The Brewsers": {Wi: 29, L: 68, T: 13, WH: 29, LH: 70, TH: 11, WP: 41, LP: 55, TP: 14, p: "............... ", fam: "Brasuell"},
    "Football Tailgater": {Wi: 31, L: 75, T: 4, WH: 27, LH: 73, TH: 10, WP: 55, LP: 40, TP: 15, p: ".......... ", fam: "Holmdopia"}
  };
  //list your categories here in the order they appear on the scoreboard. They do not need to match the text on the site.
  var cats = ['R', 'HR', 'RBI', 'SB', 'OBP', 'SLG',
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
  console.log('\n[b][u]Season Breakdowns (Combined, Hitting, Pitching)[/u][/b]')
  for (i=0; i<teams.length; i++) {
    histObj = hist[teams[i]]
    console.log(teams[i] + histObj['p'] + '[b]' + histObj['Wi'] + '-' + histObj['L'] + '-' + histObj['T'] + '[/b]' +
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
