const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
require('dotenv').config()

const token = '956069730:AAGqHzw-6C3rFgPZ1NsvcuwRQROXo0GEVzo';
const bot = new TelegramBot(token, { polling: true });
const Question = require('./model/question');

const notes = [];


bot.getMe().then((me) => {
  console.log('Hello! My name is %s!', me.first_name);
  console.log('My id is %s.', me.id);
  console.log('And my username is @%s.', me.username);
  // bot.sendMessage(userId, 'Дядя Ёся рад Вас видеть. Начнем!?)');
});

const options = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: 'Я на нервяке', callback_data: 'Я на нервяке' }],
      [{ text: 'Пройти мини тест', callback_data: 'Пройти минитест' }],
      [{ text: 'Пройти большой тест', callback_data: 'Пройти большой тест' }],
    ],
  }),
};

bot.onText(/\/start/, async (msg, match) => {

  const userId = msg.from.id;
  const text = match[1];
  const time = match[2];

  notes.push({ uid: userId, time, text });

  await bot.sendMessage(userId, 'Дядя Ёся рад тебя видеть. Начнем!? :)');
  await bot.sendMessage(userId, 'Я здесь не настолько разговорчив, как в жизни. \n\nЕсть всего 3 варианта развития событий:');
  await bot.sendMessage(userId, '1. Нажми "Пройти мини тест" - и я быстро тебя протестирую.');
  await bot.sendMessage(userId, '2. Нажмешь "Пройти большой тест" и мы залипнем надолго.');
  await bot.sendMessage(userId, '3. Отправь мне "Я на нервяке" и я постараюсь тебя успокоить.');
  await bot.sendMessage(userId, 'Выбирай!', options);
});


bot.on('callback_query', async (msg) => {
  // console.log(msg.data);
  const ans = msg.data;
  const sum = 0;
  let arrayAnswers = [];
  if (ans === 'Я на нервяке') {
    await bot.sendMessage(msg.from.id, 'Вообще-то, всем сейчас тяжело!');
  }

  if (ans === 'Пройти большой тест') {
    await bot.sendMessage(msg.from.id, 'Тест состоит из 200 вопросов, займет у Вас около часа, отвлекаться нельзя! Готовы?');
    setTimeout(async () => { await bot.sendMessage(msg.from.id, 'А я нет!!! Мне лень... :)))'); }, 5000);
    setTimeout(async () => { await bot.sendMessage(msg.from.id, 'Выбери короткий тест', options); }, 5000);
  }
  if (ans === 'Пройти минитест') {
    const optionsMini0 = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: 'Да. Я хочу пройти минитест', callback_data: 'Да. Я хочу пройти минитест' }],
        ],
      }),
    };
    await bot.sendMessage(msg.from.id, 'Тест состоит из 12 вопросов, займет у Вас 3 минуты, но нельзя отвлекаться! Готовы? (Жмите "ДА")', optionsMini0);
  }
  if (ans === 'Да. Я хочу пройти минитест') {
    
    let questionItem;
    mongoose.connect('mongodb://localhost:27017/miniTest', { useNewUrlParser: true, useUnifiedTopology: true });


    let questionNumber = 1;
    questionItem = await Question.findOne({ questionNumber }, {
      question: 1, answer1: 1, answer2: 1, answer3: 1, answer4: 1,
    });

    let options = {
      reply_markup: JSON.stringify({
        inline_keyboard: [
          [{ text: questionItem.answer1[1], callback_data: questionItem.answer1[2] }],
          [{ text: questionItem.answer2[1], callback_data: questionItem.answer2[2] }],
          [{ text: questionItem.answer3[1], callback_data: questionItem.answer3[2] }],
          [{ text: questionItem.answer4[1], callback_data: questionItem.answer4[2] }],
        ],
      }),
    };

    setTimeout(async () => { await bot.sendMessage(msg.from.id, questionItem.question, options); }, 3000);

    bot.on('callback_query', async (msg) => {
      arrayAnswers.push(msg.data);

      console.log(arrayAnswers);

      questionNumber++;
      let res1 = 0; let res2 = 0;

      if (questionNumber === 15) {
        for (let i = 0; i < 7; i++) {
          res1 += +arrayAnswers[i];
        }
        for (let i = 7; i < 14; i++) {
          res2 += +arrayAnswers[i];
        }

        console.log('Тревожность:', res1, 'Депрессия:', res2)
        arrayAnswers = [];
        await bot.sendMessage(msg.from.id,  `\u2605 \u2605 \u2605  Результаты: Тревожность: ${res1}, Депрессия:${res2} \u2605  \u2605  \u2605 `);
        await bot.sendMessage(msg.from.id, `Если у тебя 7 и более баллов по каждому пункту => дядя Ёся ждет звонка +7 (985) 999-2364`);
        await bot.sendMessage(msg.from.id, 'Чтобы начать сначала отправьте сообщение /start'); ;
      }
      if (questionNumber < 15) {
        questionItem = await Question.findOne({ questionNumber }, {
          question: 1, answer1: 1, answer2: 1, answer3: 1, answer4: 1,
        });
        options = {
          reply_markup: JSON.stringify({
            inline_keyboard: [
              [{ text: questionItem.answer1[1], callback_data: questionItem.answer1[2] }],
              [{ text: questionItem.answer2[1], callback_data: questionItem.answer2[2] }],
              [{ text: questionItem.answer3[1], callback_data: questionItem.answer3[2] }],
              [{ text: questionItem.answer4[1], callback_data: questionItem.answer4[2] }],
            ],
          }),
        };
        await bot.sendMessage(msg.from.id, questionItem.question, options);
      }
    });
  }
});
