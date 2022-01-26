/*--Notes to add your own dialogue:
 * 
 * 1. the game is hard coded for 3 lines of dialogue per box. each box has 32 chars.
 * This means a given dialogue snippet has a limit of 99 chars
 * 2. in the test example below, there's a longer dialogue statement than 96 chars,
 * So it was seperated into two segments to fit this limit.
 * 3. "How do I know it exceeds 96 chars?" That's the fun part. You'll know when
 * The Dialogue starts acting stupid and cutting stuff off.
 * 
 */

const testDiag = new Dialogue( 'Mr. PG', 
    ['What the flip did you just fliping say about me, you little guy? I\'ll have you know I graduated top of my class in',
        'the Navy Seals, and I\'ve been involved in numerous secret raids on Alf-Quaeda, and I have over 300 confirmed',
        'Bills.I am trained in gorilla training and I\'m the top swiper in the entire US armed forces.You are something to ',
        'me besides another target. I will wipe you clean because I am a nice person']);

const battleDiag = new Dialogue('', ['The Battle Begins!']);