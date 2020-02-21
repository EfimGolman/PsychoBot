const TelegramBot = require('node-telegram-bot-api');

const token = '956069730:AAGqHzw-6C3rFgPZ1NsvcuwRQROXo0GEVzo';
const bot = new TelegramBot(token, { polling: true });

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
  await bot.sendMessage(userId, '2. Напиши "Пройти большой тест" и мы залипнем надолго.');
  await bot.sendMessage(userId, '3. Отправь мне "Я на нервяке" и я постараюсь тебя успокоить.');
  await bot.sendMessage(userId, 'Выбирай!', options);
});

bot.on('callback_query', async (msg) => {
  // console.log(msg.data);
  const ans = msg.data;
  let sum = 0;

  if (ans === 'Я на нервяке') {
    await bot.sendMessage(msg.from.id, 'Вообще-то, всем сейчас тяжело!');
  }

  if (ans === 'Пройти большой тест') {
    await bot.sendMessage(msg.from.id, 'Тест состоит из 200 вопросов, займет у Вас около часа, отвлекаться нельзя! Готовы? (напишите мне "/да" если готовы!)');
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
    sum = sum + firstQuestMini(msg)
    

 
});

async function firstQuestMini(msg) {
  console.log(msg.data);
  
  
  const answerButtonMini1 = {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: '1.1. Все время', callback_data: 3 }],
        [{ text: '1.2. Часто', callback_data: 2 }],
        [{ text: '1.3. Время от времени, иногда', callback_data: 1 }],
        [{ text: '1.4. Совсем не испытываю', callback_data: 0 }],
      ],
    }),
  };
  await bot.sendMessage(msg.from.id, 'Я испытываю напряжение, мне не по себе ...', answerButtonMini1);
  return  await firstAnsMini(msg,0)
}


async function firstAnsMini(msg,sum) {
console.log(msg);


if (msg.data === '1.1. Все время') { sum += msg.message.reply_markup.inline_keyboard[0]; console.log(sum); }
if (msg.data === '1.2. Часто') { sum += msg.message.reply_markup.inline_keyboard[0]; console.log(sum); }
if (msg.data === '1.3. Время от времени, иногда') { sum += msg.message.reply_markup.inline_keyboard[0]; console.log(sum); }

console.log(msg);
return sum;
};
