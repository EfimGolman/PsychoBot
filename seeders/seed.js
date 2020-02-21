
const mongoose = require('mongoose');
const Question = require('../model/question');
//const Test = require('../model/test');

mongoose.connect('mongodb://localhost:27017/miniTest');
async function seed() {
  const question1 = new Question({
    question: 'Я испытываю напряжение, мне не по себе',
    questionNumber: 1,
    answer1: [1, 'Все время', 3],
    answer2: [2, 'Часто', 2],
    answer3: [3, 'Время от времени, иногда', 1],
    answer4: [4, 'Совсем не испытываю', 0],
  });

  const question2 = new Question({
    question: 'Я испытываю страх, кажется, что что-то ужасное может вот-вот случиться',
    questionNumber: 2,
    answer1: [1, 'Определенно это так, и страх очень велик', 3],
    answer2: [2, 'Да, это так, но страх не очень велик', 2],
    answer3: [3, 'Иногда, но это меня не очень беспокоит', 1],
    answer4: [4, 'Cовсем не итспытываю', 0],
  });

  const question3 = new Question({
    question: 'Беспокойные мысли крутятся у меня в голове',
    questionNumber: 3,
    answer1: [1, 'Постоянно', 3],
    answer2: [2, 'Большую часть времени', 2],
    answer3: [2, 'Время от времени и не так часто', 1],
    answer4: [4, 'Только иногда', 0],
  });

  const question4 = new Question({
    questionNumber: 4,
    question: 'Я легко могу присесть и расслабиться',
    answer1: [1, 'Определенно, это так', 0],
    answer2: [2, 'Наверно, это так', 1],
    answer3: [3, 'Лишь изредка, это так', 2],
    answer4: [4, 'Совсем не могу', 3],
  });

  const question5 = new Question({
    question: 'Я испытываю внутренне напряжение или дрожь',
    questionNumber: 5,
    answer1: [1, 'Совсем не испытываю', 0],
    answer2: [2, 'Иногда', 1],
    answer3: [3, 'Часто', 2],
    answer4: [4, 'Очень часто', 3],
  });


  const question6 = new Question({
    question: 'Я испытываю неусидчивость, мне постоянно нужно двигаться',
    questionNumber: 6,
    answer1: [1, 'Определенно, это так', 3],
    answer2: [2, 'Наверно, это так', 2],
    answer3: [3, 'Лишь в некоторой степени это так', 1],
    answer4: [4, 'Совсем не испытываю', 0],
  });

  const question7 = new Question({

    question: 'У меня бывает внезапное чувство паники',
    questionNumber: 7,
    answer1: [1, 'Очень часто', 3],
    answer2: [2, 'Довольно часто', 2],
    answer3: [3, 'Не так уж часто ', 1],
    answer4: [4, 'Совсем не бывает', 0],
  });

  const question8 = new Question({
    question: 'То, что приносило мне большое удовольствие, и сейчас вызывает у меня такое же чувство',
    questionNumber: 8,
    answer1: [1, 'Определенно, это так', 0],
    answer2: [2, 'Наверно, это так', 1],
    answer3: [3, 'Лишь в некоторой степени это так ', 2],
    answer4: [4, 'Это совсем не так', 3],
  });

  const question9 = new Question({
    question: 'Я способен рассмеяться и увидеть в том или ином событии смешное',
    questionNumber: 9,
    answer1: [1, 'Определенно, это так', 0],
    answer2: [2, 'Наверно, это так', 1],
    answer3: [3, 'Лишь в некоторой степени это так ', 2],
    answer4: [4, 'Совсем не способен', 3],
  });

  const question10 = new Question({
    question: 'Я испытываю бодрость',
    questionNumber: 10,
    answer1: [1, 'Совсем не испытываю', 3],
    answer2: [2, 'Очень редко', 2],
    answer3: [3, 'Иногда ', 1],
    answer4: [4, 'Практически все время', 0],
  });

  const question11 = new Question({
    question: 'Мне кажется, что я стал все делать очень медленно',
    questionNumber: 11,
    answer1: [1, 'Практически все время', 3],
    answer2: [2, 'Иногда', 2],
    answer3: [3, 'Очень редко', 1],
    answer4: [4, 'Совсем нет', 0],
  });

  const question12 = new Question({
    question: 'Я больше не слежу за своей внешностью                       ',
    questionNumber: 12,
    answer1: [1, 'Определенно, это так', 3],
    answer2: [2, 'Я не уделяю этому столько времени, сколько нужно', 2],
    answer3: [3, 'Похоже я стал уделять этому меньше времени', 1],
    answer4: [4, 'Я слежу за собой также, как и раньше', 0],
  });

  const question13 = new Question({
    question: 'Я считаю, что мои дела (занятия, увлечения) могут принести мне чувство удовлетворения ',
    questionNumber: 13,
    answer1: [1, 'Точно так же, как и обычно', 0],
    answer2: [2, 'Да, но не втой степени, как раньше', 1],
    answer3: [3, 'Значительно меньше чем обычно', 2],
    answer4: [4, 'Совсем так не считаю', 3],
  });

  const question14 = new Question({
    question: 'Я могу получить удовольствие от хорошей книги, радио- или телепрограммы ',
    questionNumber: 14,
    answer1: [1, 'Часто', 0],
    answer2: [2, 'Иногда', 1],
    answer3: [3, 'Редко', 2],
    answer4: [4, 'Очень редко', 3],
  });

  // const miniTest = new Test({
  //   testName: 'miniTest',
  //   qustions: [question1, question2, question3, question4, question5, question6, question7, question8, question9, question10, question11, question12, question13, question14],
  // });

  await question1.save();
  await question2.save();
  await question3.save();
  await question4.save();
  await question5.save();
  await question6.save();
  await question7.save();
  await question8.save();
  await question9.save();
  await question10.save();
  await question11.save();
  await question12.save();
  await question13.save();
  await question14.save();
  // await miniTest.save();

  await mongoose.disconnect();
}
seed();
