(function ($) {
  "use strict";

  // 問題一覧.
  const prefecturalCapital = [
    {
      id: "01",
      question: "競技プログラミングのハンドルネーム「tourist」として知られる人物の本名はどれでしょう？",
      answer01: "ゲンナジー・ウラジーミロヴィチ・コロトケビッチ",
      answer02: "セルゲイ・アレクサンドロヴィチ・カラセフ",
      answer03: "イリヤ・ミハイロヴィチ・ニコライエフ",
      answer04: "高橋・S・直大",
    },
    {
      id: "02",
      question: "touristは何人でしょう？",
      answer01: "ベラルーシ人",
      answer02: "日本人",
      answer03: "ラトビア人",
      answer04: "人類では無い",
    },
    {
      id: "03",
      question: "touristのhighestはいくつでしょう？(2020/8/9時点)",
      answer01: "4229",
      answer02: "4231",
      answer03: "4310",
      answer04: "1729",
    },
    {
      id: "04",
      question: "touristの誕生日はいつでしょう？",
      answer01: "1994年9月25日",
      answer02: "1918年5月4日",
      answer03: "1992年2月6日",
      answer04: "1997年6月13日",
    },
    {
      id: "05",
      question: "touristの大学はどこでしょう？",
      answer01: "サンクトペテルブルク国立情報技術・機械・光学大学",
      answer02: "ゴメリ州立大学",
      answer03: "マサチューセッツ工科大学",
      answer04: "高卒",
    },
    {
      id: "06",
      question: "touristがIOIに初出場したのは何歳でしょう？",
      answer01: "11歳",
      answer02: "9歳",
      answer03: "16歳",
      answer04: "3歳",
    },
    {
      id: "07",
      question: "touristのX(旧Twitter)IDは何でしょう？",
      answer01: "que_tourist",
      answer02: "set_tourist",
      answer03: "map_tourist",
      answer04: "vec_tourist",
    },
    {
      id: "08",
      question: "touristの好きなスポーツは何でしょう？",
      answer01: "サッカーと卓球",
      answer02: "野球とバスケットボール",
      answer03: "サッカーとバスケットボール",
      answer04: "バスケットボールと卓球",
    },
    {
      id: "09",
      question: "touristが獲得した、IOIでの連続金メダル記録は何回でしょう？",
      answer01: "6回",
      answer02: "3回",
      answer03: "4回",
      answer04: "8回",
    },
    {
      id: "10",
      question: "touristが獲得した、Google Code Jamでの連続金メダルは何回でしょう？",
      answer01: "7回",
      answer02: "3回",
      answer03: "4回",
      answer04: "8回",
    },
  ];

  // 問題数.
  let $questionTotalNum = prefecturalCapital.length;

  // クイズをシャッフルする.
  function shuffleQuiz(array) {
    for (let i = array.length - 1; 0 < i; i--) {
      let random = Math.floor(Math.random() * (i + 1));
      let selected = array[i];
      array[i] = array[random];
      array[random] = selected;
    }
    return array;
  }
  let quizId = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10"];
  shuffleQuiz(quizId);

  // 現在の問題番号.
  let $currentNum = 0;

  // 正解時のポイント.
  let $pointPerCorrect = 1;

  let questionObject = (function () {
    let Obj = function ($target) {
      this.$questionNumber = $target.find(".quiz-question-number");
      this.$questionName = $target.find(".quiz-question");
      this.$questionButton = $target.find(".quiz-button");
      this.$button01 = $target.find(".button01");
      this.$button02 = $target.find(".button02");
      this.$button03 = $target.find(".button03");
      this.$button04 = $target.find(".button04");
      this.$answer01 = $target.find(".quiz-text01");
      this.$answer02 = $target.find(".quiz-text02");
      this.$answer03 = $target.find(".quiz-text03");
      this.$answer04 = $target.find(".quiz-text04");
      this.$score = $target.find(".score-wrap .score");
      this.init();
    };
    Obj.prototype = {
      init: function () {
        this.event();
      },
      event: function () {
        let _this = this;
        let score = 0;
        $(window).on("load", function () {
          let value = quizId[$currentNum];
          let nextQuestion = _this.searchQuestion(value);
          _this.changeQuestion(nextQuestion);
          _this.shuffleAnswer($(".quiz-answer"));
        });
        this.$questionButton.on("click", function () {
          if ($(this).hasClass("button01")) {
            $(this).parents(".quiz-answer").addClass("is-correct");
            score = score + $pointPerCorrect;
          } else {
            $(this).parents(".quiz-answer").addClass("is-incorrect");
          }

          $(this).addClass("is-checked");

          if ($currentNum + 1 == $questionTotalNum) {
            setTimeout(function () {
              $(".finish").addClass("is-show");
              $(".score-wrap .score").text(score);
              const href = `https://twitter.com/intent/tweet?text=げんちゃんクイズで${score}点取ったよ!&url=https://genchan.tellpro.net`;
              $(".twitter-share-button").attr("href", href);
            }, 1000);
          } else {
            setTimeout(function () {
              $currentNum = $currentNum + 1;
              let value = quizId[$currentNum];
              let nextQuestion = _this.searchQuestion(value);
              _this.changeQuestion(nextQuestion);
              _this.$questionButton.removeClass("is-checked");
              $(".quiz-answer").removeClass("is-correct").removeClass("is-incorrect");
              _this.shuffleAnswer($(".quiz-answer"));
            }, 1000);
          }
          return false;
        });
      },
      searchQuestion: function (questionId) {
        let nextQuestion = null;
        prefecturalCapital.forEach(function (item) {
          if (item.id == questionId) {
            nextQuestion = item;
          }
        });
        return nextQuestion;
      },
      changeQuestion: function (nextQuestion) {
        if (!nextQuestion) return;
        let _this = this;
        _this.$questionName.text(nextQuestion.question);
        let numPlusOne = $currentNum + 1;
        _this.$questionNumber.text("問題 " + numPlusOne);
        _this.$answer01.text(nextQuestion.answer01);
        _this.$answer02.text(nextQuestion.answer02);
        _this.$answer03.text(nextQuestion.answer03);
        _this.$answer04.text(nextQuestion.answer04);
      },
      shuffleAnswer: function (container) {
        let content = container.find("> *");
        let total = content.length;
        content.each(function () {
          content.eq(Math.floor(Math.random() * total)).prependTo(container);
        });
      },
    };
    return Obj;
  })();

  let quiz = $(".quiz");
  if (quiz[0]) {
    new questionObject(quiz);
  }
})(jQuery);
