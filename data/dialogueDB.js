/*--Notes to add your own dialogue:
 * 
 * 1. the game is hard coded for 3 lines of dialogue per box. each box has 32 chars.
 * This means a given dialogue snippet has a limit of 96 chars
 * 2. in the test example below, there's a longer dialogue statement than 96 chars,
 * So it was seperated into two segments to fit this limit.
 * 3. "How do I know it exceeds 96 chars?" That's the fun part. You'll know when
 * The Dialogue starts acting stupid and cutting stuff off. Or you can just count it
 * 4. Give it an animation as the 2nd paramter, if you don't want one, set it to null
 * 
 */

const testDiag = new Dialogue('Mr. Bug', null,
    ['If you\'re seeing this text in-game, this is a bug.', 'Pls let Brandon know. thanks :)']);

const plungerNpc = new Dialogue('Friendly Plunger', PlungerAnim,
    ['Ah, a fine non-violent member of society!', 'Have you ever played...', 'Um, what was it called..?', 'Shane Maygoomi Tensay..?',
        'Something like that. I\d much rather do that right now compared to talking to you.']);

const microwaveNpc = new Dialogue('Hungry Man',
    ['They call me Hungry Man cause i\'m hungry for some men.', 'Not you of course, it\'s just not that kind of game.']);

const battleDiag = new Dialogue('', null, ['The Battle Begins!']);