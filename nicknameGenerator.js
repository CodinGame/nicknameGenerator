/*
 * nicknameGenerator v1.0
 * Copyright (c) 2016 CodinGame
 * License: MIT
 * 
 * The famous Random Nickname Generator used on the CodinGame chat.
 * Provide a JavaScript function to generate nicknames. Can be used with a seed.
 *
 */

(function(target) {
  target.generateNickname = function(seed) {
    // Use Math.random as default random generator
    var rand = Math.random;
    // If a seed is provided, use a seeded "random" generator
    if (seed) {
      rand = (function(s) {
        return function() {
          s = Math.sin(s) * 10000;
          return s - Math.floor(s);
        };
      })(seed);
    }

    /** Used as separator **/
    var base = '_';

    /** Chance of adding a third part **/
    var thirdPartChance = 4; // One out of 4

    /** Chance of adding a prefix **/
    var prefixChance = 3; // One out of 3

    /** Length above which the nick will be trimmed **/
    var maxNicknameLength = 30;

    /** Add hash to prevent collisions **/
    var hashLength = 4;

    /** Word base for the first part of the nickname **/
    var firsts = ['Fire',
      'Red',
      'Blue',
      'Flash',
      'Musical',
      'Twilight',
      'Zombie',
      'Disco',
      'Ninja',
      'Flying',
      'Captain',
      'Undying',
      'Funky',
      'Ice',
      'Sunny',
      'Perpetual',
      'Holy',
      'Rusty',
      'Lovely',
      'Massive',
      'Fake',
      'Flaming',
      'Great',
      'WaterCooled',
      'RadioControlled',
      'Bold',
      'Bio',
      'BigBad',
      'Private',
      'Undisclosed',
      'Doomed',
      'Broken',
      'Mysterious',
      'Lumpy',
      'Theoretical',
      'Heretical',
      'Maneating',
      'Silent',
      'Sweaty',
      'Hot',
      'Forgotten',
      'Mad',
      'Heroic',
      'Noiseless',
      'Bouncy',
      'Double',
      'Lonely',
      'Flat',
      'Battle',
      'Bearded',
      'Evil',
      'AwardWinning',
      'Invisible',
      'Dark',
      'Black',
      'Phantom',
      'Iron',
      'Brutal',
      'Mighty',
      'Almighty',
      'Atomic',
      'Nuclear',
      'SugarCoated',
      'TenYearOld'];

    /** Word base for the second part of the nickname **/
    var seconds = ['Panda',
      'Jetski',
      'Brocolli',
      'RubberDuck',
      'PostItNote',
      'Sponge',
      'Stopwatch',
      'Cocktail',
      'Noodle',
      'Saxophone',
      'Snowflake',
      'PencilCase',
      'Scone',
      'Cheesecake',
      'LoremIpsum',
      'Jelly',
      'Frenchman',
      'Cockroach',
      'Comet',
      'Moustache',
      'Wrestler',
      'Mystery',
      'Dictator',
      'Carpet',
      'Traveller',
      'Breakfast',
      'Superstar',
      'Giant',
      'Didgeridoo',
      'Committer',
      'Lady',
      'Clown',
      'Auntie',
      'Llama',
      'Pony',
      'Worm',
      'Kitten',
      'Longcoat',
      'Lampshade',
      'Firefighter',
      'Octopus',
      'Imp',
      'Castle',
      'Sausage',
      'Ghost',
      'Spoon',
      'Pirate',
      'Taxidermist',
      'Cat',
      'Samourai',
      'Shoe',
      'Skull',
      'Knight',
      'Beast',
      'Master',
      'Carnivore',
      'Skater',
      'Child',
      'Mutant',
      'Vampire',
      'Robot',
      'Demon',
      'Cube',
      'TopHat'];

    /** Word base for a third part of the nickname **/
    var thirds = ['OfDeath',
      'VonKirschenwald',
      'AndHisDog',
      'Machine',
      'Eater',
      'FromHell',
      'VanDerSwag',
      'FTW',
      'OfPower',
      'OfWisdom',
      'OfDoom',
      'FromAfar',
      'FromTheSwamps',
      'FromTheFuture',
      's',
      'InSpace'];

    // Pick random parts
    var first = firsts[Math.floor(rand() * firsts.length)];
    var second = seconds[Math.floor(rand() * seconds.length)];
    var third = '';

    // A 1 out of 4 chance to have a third apart
    if (Math.floor(rand() * thirdPartChance) === 0) {

      third = thirds[Math.floor(rand() * thirds.length)];

      // Don't add the particle to the nickname if it makes it too big
      if ((third + base + first + second).length > maxNicknameLength) {
        third = '';
      }
    }

    // A 1 out of 3 chance to get a prefix
    if (Math.floor(rand() * prefixChance) === 0) {
      var prefixes = ['The', 'The', 'The', 'DJ'];   // Cheap hack to give more weight to "the"
      var prefix = prefixes[Math.floor(rand() * prefixes.length)];

      // Don't add the particle to the nickname if it makes it too big
      if ((prefix + third + base + first + second).length < maxNicknameLength) {
        first = prefix + first;
      }
    }

    // This random hash at the end is here to prevent (already unlikely) collisions
    var hash = '';
    if (hashLength > 0) {
      hash = base + Math.floor(Math.pow(16, hashLength) * rand()).toString(16);
    }

    return first + second + third + hash;
  };
}(this));

if (typeof module === "object") module.exports = this.generateNickname;