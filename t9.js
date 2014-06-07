/*! t9 v0.0.0 - MIT license */
'use strict';

var words = "the of to and a in is it you that he was for on are with as I his they be at one have this from or had by hot word but what some we can out other were all there when up use your how said an each she which do their time if will way about many then them write would like so these her long make thing see him two has look more day could go come did number sound no most people my over know water than call first who may down side been now find any new work part take get place made live where after back little only round man year came show every good me give our under name very through just form sentence great think say help low line differ turn cause much mean before move right boy old too same tell does set three want air well also play small end put home read hand port large spell add even land here must big high such follow act why ask men change went light kind off need house picture try us again animal point mother world near build self earth father head stand own page should country found answer school grow study still learn plant cover food sun four between state keep eye never last let thought city tree cross farm hard start might story saw far sea draw left late run dont while press close night real life few north open seem together next white children begin got walk example ease paper group always music those both mark often letter until mile river car feet care second book carry took science eat room friend began idea fish mountain stop once base hear horse cut sure watch color face wood main enough plain girl usual young ready above ever red list though feel talk bird soon body dog family direct pose leave song measure door product black short numeral class wind question happen complete ship area half rock order fire south problem piece told knew pass since top whole king space heard best hour better true during hundred five remember step early hold west ground interest reach fast verb sing listen six table travel less morning ten simple several vowel toward war lay against pattern slow center love person money serve appear road map rain rule govern pull cold notice voice unit power town fine certain fly fall lead cry dark machine note wait plan figure star box noun field rest correct able pound done beauty drive stood contain front teach week final gave green oh quick develop ocean warm free minute strong special mind behind clear tail produce fact street inch multiply nothing course stay wheel full force blue object decide surface deep moon island foot system busy test record boat common gold possible plane stead dry wonder laugh thousand ago ran check game shape equate miss brought heat snow tire bring yes distant fill east paint language among grand ball yet wave drop heart am present heavy dance engine position arm wide sail material size vary settle speak weight general ice matter circle pair include divide syllable felt perhaps pick sudden count square reason length represent art subject region energy hunt probable bed brother egg ride cell believe fraction forest sit race window store summer train sleep prove lone leg exercise wall catch mount wish sky board joy winter sat written wild instrument kept glass grass cow job edge sign visit past soft fun bright gas weather month million bear finish happy hope flower clothe strange gone jump baby eight village meet root buy raise solve metal whether push seven paragraph third shall held hair describe cook floor either result burn hill safe cat century consider type law bit coast copy phrase silent tall sand soil roll temperature finger industry value fight lie beat excite natural view sense ear else quite broke case middle kill son lake moment scale loud spring observe child straight consonant nation dictionary milk speed method organ pay age section dress cloud surprise quiet stone tiny climb cool design poor lot experiment bottom key iron single stick flat twenty skin smile crease hole trade melody trip office receive row mouth exact symbol die least trouble shout except wrote seed tone join suggest clean break lady yard rise bad blow oil blood touch grew cent mix team wire cost lost brown wear garden equal sent choose fell fit flow fair bank collect save control decimal gentle woman captain practice separate difficult doctor please protect noon whose locate ring character insect caught period indicate radio spoke atom human history effect electric expect crop modern element hit student corner party supply bone rail imagine provide agree thus capital wont chair danger fruit rich thick soldier process operate guess necessary sharp wing create neighbor wash bat rather crowd corn compare poem string bell depend meat rub tube famous dollar stream fear sight thin triangle planet hurry chief colony clock mine tie enter major fresh search send yellow gun allow print dead spot desert suit current lift rose continue block chart hat sell success company subtract event particular deal swim term opposite wife shoe shoulder spread arrange camp invent cotton born determine quart nine truck noise level chance gather shop stretch throw shine property column molecule select wrong gray repeat require broad prepare salt nose plural anger claim continent oxygen sugar death pretty skill women season solution magnet silver thank branch match suffix especially fig afraid huge sister steel discuss forward similar guide experience score apple bought led pitch coat mass card band rope slip win dream evening condition feed tool total basic smell valley nor double seat arrive master track parent shore division sheet substance favor connect post spend chord fat glad original share station dad bread charge proper bar offer segment slave duck instant market degree populate chick dear enemy reply drink occur support speech nature range steam motion path liquid log meant quotient teeth shell neck"  


//we don't have to sort because the tree will do that for us
var wordsArray = words.split(' ');

var keyboard = [null, null, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'];
var inverseKeyboard = {
  a: 2, b: 2, c: 2,
  A: 2, B: 2, C: 2,
  d: 3, e: 3, f: 3,
  D: 3, E: 3, F: 3,
  g: 4, h: 4, i: 4,
  G: 4, H: 4, I: 4,
  j: 5, k: 5, l: 5,
  J: 5, K: 5, L: 5,
  m: 6, n: 6, o: 6,
  M: 6, N: 6, O: 6,
  p: 7, q: 7, r: 7, s: 7,
  P: 7, Q: 7, R: 7, S: 7,
  t: 8, u: 8, v: 8,
  T: 8, U: 8, V: 8,
  w: 9, x: 9, y: 9, z: 9,
  W: 9, X: 9, Y: 9, Z: 9
}


var Node = function (numberKey) {

  this._numberKey = numberKey;

  this._wordLocations = [];

  this._children = [];
  //set [0...9] to null so that when we access a random one later there are no errors
  for (var i = 0; i < 10; i++) {
    this._children[i] = null;
  }
};

Node.prototype.addWord = function (word, indexOfWord) {

  //if the word length is 0:
  // debugger;
  if (word.length === 0) {
    //save a reference to the word's location in the array to node.index
    this._wordLocations.push(indexOfWord);

  //otherwise shift off the first character
  } else {
    var firstChar = word.shift();

    //get that character's keyboard number
    var num = inverseKeyboard[firstChar];

    if (num === undefined) {
      debugger;
    }
    //check if there is a node at that location
    if (this._children[num] === null) {
      //if not, create it
      this._children[num] = new Node(num);
    };

    //and call add word at that node
    if (this._children[num] === undefined) {
      debugger;
    }
    this._children[num].addWord(word, indexOfWord);
  }
};


//takes an array of number keys and returns the possible words' locations in the array

Node.prototype.getWordLocations = function(keys) {

  //if keys' length is 1
  if (keys.length === 0) {
    //return this._wordLocations and the word locations of ALL children
    var result = this._wordLocations;
    for (var i = 0; i < 10; i++) {
      if (this._children[i] !== null) {
        result = result.concat(this._children[i].getWordLocations(keys));
      }
    }
    return result;

  } else {

    //otherwise shift off the first element
    var num = parseInt(keys.shift());
    // debugger;
    //if there is a node at this num
    if (this._children[num] !== null) {
      //pass the remaining array to the child at the appropriate #
      return this._children[num].getWordLocations(keys);
    } else {
      return [];
    }
  }
};

//expects wordList to be an array of words, where each word is also an array
var buildTree = function(wordsList) {

  //the head has a 0 value (i.e. no valid keypresses yet)
  var head = new Node(0);
  head._wordsList = wordsList;

  //add all words to our node
  for (var i = 0; i < head._wordsList.length; i++ ) {
    head.addWord(head._wordsList[i].split(""), i);    
  };


  head.retrieve = function (keys) {
    //convert the string to an array
    var keysArr = keys.split('');

    //this will return an array of locations
    var resultsLocations = head.getWordLocations(keysArr);

    
    //collect all of the words at those locations and return them
    if (resultsLocations !== null) {
      var results = [];
      for (var i = 0; i <resultsLocations.length; i++) {
        results.push(head._wordsList[resultsLocations[i]]);
      }
    }
    return results;

  };

  return head;
};

var t9Tree = buildTree(wordsArray);

console.dir(t9Tree);

// console.log(t9Tree.retrieve("546"));

// console.log(t9Tree.retrieve("222"));

