/*! t9 v0.0.0 - MIT license */
'use strict';

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
    var tempKeys = keys;
    var num = parseInt(tempKeys.shift());
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

