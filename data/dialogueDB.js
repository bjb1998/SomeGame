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

const healerDiag = new Dialogue('First-Aid Kit', null,
    ['Do not fret human, I can heal you in these trying times.', 'all you must do is ask and it shall be given.']);

const storeDiag = new Dialogue('Vending Machine', null,
    ['Buy something, will ya?']);

const notEnoughDiag = new Dialogue('Vending Machine', null,
    ['Stop fooling around and buying things you can\'t.']);

const plungerNpc = new Dialogue('Friendly Plunger', PlungerAnim,
    ['Ah, a fine non-violent member of society!', 'Have you ever played...', 'Um, what was it called..?', 'Shane Maygoomi Tensay..?',
        'Something like that. I\d much rather do that right now compared to talking to you.']);

const washerNpc = new Dialogue('Wishy-Washy', WashingMachineAnim, 
    ['Welcome to Hell, loser.', 'Receptionist is down the hall and to the left.', 'Which one you ask..?',
    'Like hell I\'m telling you.']);

const bossNpc = new Dialogue('Very Hyperactive Mage', bossAnim,
    ['So it is you who has been fooling around with my creations.', 'Oh, so you live here?',
        'Very well then, guess i\ll kill you.']);

const battleDiag = new Dialogue('', null, ['The Battle Begins!']);