const TelegramBot = require('node-telegram-bot-api');
const mongoose = require('mongoose');
require('dotenv').config();

// console.log('Bot started!');

const token = process.env.DB_TOKEN;
const bot = new TelegramBot(token, { polling: true });
const Question = require('./model/question');

const notes = [];
let questionNumber;
let questionItem;
let arrayAnswers = [];

bot.getMe().then((me) => {
  // console.log('Hello! My name is %s!', me.first_name);
  // console.log('My id is %s.', me.id);
  // console.log('And my username is @%s.', me.username);
});

const options = {
  parse_mode: 'Markdown',
  reply_markup: {
    keyboard: [
      [{ text: 'Я на нервяке' }], 
      [{ text: 'Пройти мини-тест' }],
      [{ text: 'Пройти большой тест' }],
    ],
  },
};

bot.onText(/\/start/, async (msg, match) => {
  const userId = msg.from.id;
  const text = match[1];
  const time = match[2];

  notes.push({ uid: userId, time, text });

  await bot.sendMessage(userId, 'Дядя Ёся рад тебя видеть. Начнем!? :)');
  await bot.sendMessage(userId, 'Я здесь не настолько разговорчив, как в жизни. \n\nЕсть всего 3 варианта развития событий:');
  await bot.sendMessage(userId, '1. Нажми "Пройти мини-тест" - и я быстро тебя протестирую.');
  await bot.sendMessage(userId, '2. Нажмешь "Пройти большой тест" и мы залипнем надолго.');
  await bot.sendMessage(userId, '3. Отправь мне "Я на нервяке" и я постараюсь тебя успокоить.');
  await bot.sendMessage(userId, 'Выбирай!', options);
});

bot.onText(/.+/g, async (msg, match) => {
  // console.log(match)
  if (match[0] === 'Я на нервяке') {
    await bot.sendMessage(msg.from.id, 'Вообще-то, всем сейчас тяжело!');
    await bot.sendMessage(msg.from.id, 'Выбери что-то еще!');
  }

  if (match[0] === 'Пройти большой тест') {
    await bot.sendMessage(msg.from.id, 'Тест состоит из 200 вопросов, займет у Вас около часа, отвлекаться нельзя! Готовы?');
    setTimeout(async () => { await bot.sendMessage(msg.from.id, 'А я нет!!! Мне лень... :)))'); }, 3000);
    setTimeout(async () => { await bot.sendMessage(msg.from.id, 'Выбери короткий тест', options); }, 3000);
  }

  if (match[0] === 'Пройти мини-тест') {
    const optionsMini0 = {
      parse_mode: 'Markdown',
      reply_markup: {
        keyboard: [
          [{ text: 'Да. Я хочу пройти мини-тест', callback_data: 'Да. Я хочу пройти мини-тест' }],

        ],
      },
    };
    await bot.sendMessage(msg.from.id, 'Тест состоит из 14 вопросов, займет у Вас 3 минуты, но нельзя отвлекаться! Готовы? (Жмите "ДА")', optionsMini0);
  }

  mongoose.connect(`mongodb+srv://${process.env.DB_DATA}@cluster0-zioju.mongodb.net/test?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });
  const questions = await Question.find({ });

  if (match[0] === 'Да. Я хочу пройти мини-тест') {
    questionNumber = 1;
    questionItem = questions[questionNumber - 1];
    const options1 = {
      parse_mode: 'Markdown',
      reply_markup: {
        keyboard: [
          [{ text: questionItem.answer1[1] }],
          [{ text: questionItem.answer2[1] }],
          [{ text: questionItem.answer3[1] }],
          [{ text: questionItem.answer4[1] }],
        ],
      },
    };

    setTimeout(async () => { await bot.sendMessage(msg.from.id, questionItem.question, options1); }, 1000);
  }
  questionItem = questions[questionNumber - 1];
  if (questionItem !== undefined && questionNumber < 15) {

    switch (match[0]) {

      // CASE -  1

      case (questionItem.answer1[1]): {
        arrayAnswers.push(questionItem.answer1[2]);
        questionNumber += 1;
        if (questionNumber < 15) {
          questionItem = questions[questionNumber - 1];
          const options1 = {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                [{ text: questionItem.answer1[1] }],
                [{ text: questionItem.answer2[1] }],
                [{ text: questionItem.answer3[1] }],
                [{ text: questionItem.answer4[1] }],
              ],
            },
          };
          setTimeout(async () => { await bot.sendMessage(msg.from.id, questionItem.question, options1); }, 100);
          console.log(arrayAnswers);
        }
        break;
      }

      // CASE -  2

      case (questionItem.answer2[1]): {
        arrayAnswers.push(questionItem.answer2[2]);
        questionNumber += 1;
        if (questionNumber < 15) {
          questionItem = questions[questionNumber - 1];
          const options1 = {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                [{ text: questionItem.answer1[1] }],
                [{ text: questionItem.answer2[1] }],
                [{ text: questionItem.answer3[1] }],
                [{ text: questionItem.answer4[1] }],
              ],
            },
          };
          setTimeout(async () => { await bot.sendMessage(msg.from.id, questionItem.question, options1); }, 100);
          // console.log(arrayAnswers);
        }
        break;
      }

      // CASE -  3

      case (questionItem.answer3[1]): {
        arrayAnswers.push(questionItem.answer3[2]);
        questionNumber += 1;
        if (questionNumber < 15) {
          questionItem = questions[questionNumber - 1];
          const options1 = {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                [{ text: questionItem.answer1[1] }],
                [{ text: questionItem.answer2[1] }],
                [{ text: questionItem.answer3[1] }],
                [{ text: questionItem.answer4[1] }],
              ],
            },
          };
          setTimeout(async () => { await bot.sendMessage(msg.from.id, questionItem.question, options1); }, 100);
          // console.log(arrayAnswers);
        }
        break;
      }

      // CASE -  4

      case (questionItem.answer4[1]): {
        arrayAnswers.push(questionItem.answer4[2]);
        questionNumber += 1;
        if (questionNumber < 15) {
          questionItem = questions[questionNumber - 1];
          const options1 = {
            parse_mode: 'Markdown',
            reply_markup: {
              keyboard: [
                [{ text: questionItem.answer1[1], callback_data: questionItem.answer1[2] }],
                [{ text: questionItem.answer2[1], callback_data: questionItem.answer2[2] }],
                [{ text: questionItem.answer3[1], callback_data: questionItem.answer3[2] }],
                [{ text: questionItem.answer4[1], callback_data: questionItem.answer4[2] }],
              ],
            },
          };
          setTimeout(async () => { await bot.sendMessage(msg.from.id, questionItem.question, options1); }, 100);
          // console.log(arrayAnswers);
        }
        break;
      }

      default: {
        // console.log('Some shit happend!');
        // console.log('MATCH', match[0]);
        // console.log('Answer1 - ', questionItem.answer1[1]);
        // console.log('Answer2 - ', questionItem.answer2[1]);
        // console.log('Answer3 - ', questionItem.answer3[1]);
        // console.log('Answer4 - ', questionItem.answer4[1]);
      
      }
    }
  }
  if (questionNumber === 15) {
    let res1 = 0; let res2 = 0;
    for (let i = 0; i < 7; i += 1) {
      res1 += +arrayAnswers[i];
    }
    for (let i = 7; i < 14; i += 1) {
      res2 += +arrayAnswers[i];
    }

    // console.log('Тревожность:', res1, 'Депрессия:', res2);
    const fin = {
      parse_mode: 'Markdown',
      reply_markup: {
        keyboard: [
          [{ text: 'Я на нервяке' }],
          [{ text: 'Пройти мини-тест' }],
          [{ text: 'Пройти большой тест' }],
        ],
      },
    };

    await bot.sendMessage(msg.from.id, `\u2605 \u2605 \u2605  Результаты: Тревожность: ${res1}, Депрессия:${res2} \u2605  \u2605  \u2605 `);
    await bot.sendMessage(msg.from.id, 'Если у тебя 7 и более баллов по каждому пункту => дядя Ёся ждет звонка +7 (985) 999-2364');
    await bot.sendMessage(msg.from.id, 'Чтобы начать сначала, жмите "Пройти мини-тест"', fin);
    arrayAnswers = [];
    questionNumber += 1;
  }
});
