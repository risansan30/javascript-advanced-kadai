let untyped = '';
let typed = '';
let score = 0;
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');
const typedcount = document.getElementById('typedcount');

const textLists = [
    'Hello World', 'This is my App', 'How are you?',
    'Today is sunny', 'I love JavaScript!', 'Good morning',
    'I am Japanese', 'Let it be', 'Samurai',
    'Typing Game', 'Information Technology',
    'I want to be a programmer', 'What day is today?',
    'I want to build a web app', 'Nice to meet you',
    'Chrome Firefox Edge Safari', 'machine learning',
    'Brendan Eich', 'John Resig', 'React Vue Angular',
    'Netscape Communications', 'undefined null NaN',
    'Thank you very much', 'Google Apple Facebook Amazon',
    'ECMAScript', 'console.log', 'for while if switch',
    'var let const', 'Windows Mac Linux iOS Android',
    'programming'
];

const createText = () => {

    typed = '';
    typedfield.textContent = typed;

    let random = Math.floor(Math.random() * textLists.length);

    untyped = textLists[random];
    untypedfield.textContent = untyped;
};

const keyPress = e => {

    //入力が間違っていた場合
    if (e.key !== untyped.substring(0, 1)) {
        wrap.classList.add('mistyped'); // 背景赤くする
        setTimeout(() => {
            wrap.classList.remove('mistyped'); // 0.1秒後に赤色を解除
        }, 100);
        return; // 間違いなので処理終了
    }

    // 入力が正しかった場合
    score++; // スコアを1加算
    typedcount.textContent = score; // スコアを画面に表示

    // typed: 入力済み文字列に追加
    typed += untyped.substring(0, 1);

    // untyped: 未入力文字列から先頭1文字を削除
    untyped = untyped.substring(1);

    // 画面表示を更新
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;

    // 3. 未入力文字がなくなったら
    if (untyped === '') {
        createText();   // 新しい問題を作成
    }
};

const rankCheck = score => {
    let text = '';
    if (score < 100) {
        text = `あなたのランクはCランクです。\nbランクまであと${100 - score}文字です。`;
    } else if (score < 200) {
        text = `あなたのランクはBランクです。\nAランクまであと${200 - score}文字です。`;
    } else if (score < 300) {
        text = `あなたのランクはAランクです。\nSランクまであと${300 - score}文字です。`;
    } else if (score >= 300) {
        text = `あなたのランクはSランクです。\nおめでとうございます!`;
    };

    return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};
const gameOver = id => {
    clearInterval(id);

    const result = confirm(rankCheck(score));
    if (result == true) {
        window.location.reload();
    }
};

const timer = () => {

    let time = count.textContent;

    const id = setInterval(() => {

        time--;
        count.textContent = time;

        if (time <= 0) {
            gameOver(id);
        }
    }, 1000);
};

start.addEventListener('click', () => {

    timer();

    createText();

    start.style.display = 'none';
    score = 0;
    typedcount.textContent = score;
    typedcount.style.display = 'block';
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';