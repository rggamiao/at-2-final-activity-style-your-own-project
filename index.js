const questions = [
    {
      question: "Which trait do you value the most?",
      options: ["Bravery", "Ambition", "Intelligence", "Loyalty"],
      houses: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]
    },
    {
      question: "What is your greatest fear?",
      options: ["Betrayal", "Ignorance", "Being overlooked", "Failure"],
      houses: ["Hufflepuff", "Ravenclaw", "Slytherin", "Gryffindor"]
    },
    {
      question: "What would be your go-to spell?",
      options: ["Alohamora", "Wingardium Leviosa", "Avada Kadavra", "Expelliarmus"],
      houses: ["Ravenclaw", "Hufflepuff", "Slytherin", "Gryffindor"]
    },
    {
      question: "What kind of people do you admire?",
      options: ["Leaders", "Heroes", "Friends", "Scholars"],
      houses: ["Slytherin", "Gryffindor", "Hufflepuff", "Ravenclaw"]
    },
    {
      question: "What would your animagus be?",
      options: ["Badger", "Dog", "Raven", "Basilisk"],
      houses: ["Hufflepuff", "Gryffindor", "Ravenclaw", "Slytherin"]
    },
    {
      question: "Which Hogwarts subject do you find the most fascinating?",
      options: ["Defense Against the Dark Arts", "Apparition", "History of Magic", "Divination"],
      houses: ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"]
    },
    {
      question: "If you could visit one place in the wizarding world, where would you go?",
      options: ["Florish & Blotts", "Weasleys' Wizard Wheezes", "The Leaky Cauldron", "Hogsmeade"],
      houses: ["Ravenclaw", "Gryffindor", "Slytherin", "Hufflepuff"]
    },
    {
      question: "Which magical artifact would you like to possess?",
      options: ["Invisibility Cloak", "Alastor Moody's Eyeball", "Elder Wand", "Marauder's Map"],
      houses: ["Hufflepuff", "Ravenclaw", "Slytherin", "Gryffindor"]
    },
    {
      question: "What is your favorite magical creature?",
      options: ["Unicorn", "Thestral", "Dragon", "Phoenix"],
      houses: ["Ravenclaw", "Hufflepuff", "Slytherin", "Gryffindor"]
    },
    {
      question: "If you could have one magical ability, what would it be?",
      options: ["Legilimency", "Apparition", "Animagus", "Occlumency"],
      houses: ["Slytherin", "Gryffindor", "Hufflepuff", "Ravenclaw"]
    }
  ];
  
  
  
  
  
  function startQuiz() {
  
    
  
    document.getElementById('startPage').style.display = 'none';
    
    document.getElementById('quizPage').style.display = 'block';
   
    loadQuestion();
  }
  
  let currentQuestion = 0;
  let answers = [];
  
  function loadQuestion() {
    const q = questions[currentQuestion];
    document.getElementById('questionNum').textContent = currentQuestion + 1;
    document.getElementById('question').textContent = q.question;
    const options = document.getElementsByClassName('option');
    for (let i = 0; i < options.length; i++) {
      options[i].textContent = q.options[i];
    }
  }
  
  let gryffindorAnswers = [];
  let slytherinAnswers = [];
  let ravenclawAnswers = [];
  let hufflepuffAnswers = [];
  
  function selectAnswer(btn) {
    const selectedAnswerIndex = Array.from(btn.parentNode.children).indexOf(btn);
    answers.push(selectedAnswerIndex);
  
   
    const currentHouse = questions[currentQuestion].houses[selectedAnswerIndex];
    
  
    switch (currentHouse) {
      case "Gryffindor":
        gryffindorAnswers.push(selectedAnswerIndex);
        break;
      case "Slytherin":
        slytherinAnswers.push(selectedAnswerIndex);
        break;
      case "Ravenclaw":
        ravenclawAnswers.push(selectedAnswerIndex);
        break;
      case "Hufflepuff":
        hufflepuffAnswers.push(selectedAnswerIndex);
        break;
    }
  
    const options = document.getElementsByClassName('option');
    for (let i = 0; i < options.length; i++) {
      options[i].classList.remove('selected');
    }
  
    btn.classList.add('selected');
  
    document.getElementById('nextButton').style.display = 'block';
    document.getElementById('options').style.pointerEvents = 'none';
  }
  
  function resetAnswer() {
    answers = []; 
    const options = document.getElementsByClassName('option');
    for (let i = 0; i < options.length; i++) {
      options[i].classList.remove('selected'); 
    }
    document.getElementById('nextButton').style.display = 'none'; 
    document.getElementById('options').style.pointerEvents = 'auto'; 
  }
  
  function retryQuiz() {
    window.location.reload(); 
  }
  
  function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
  
      const options = document.getElementsByClassName('option');
      for (let i = 0; i < options.length; i++) {
        options[i].classList.remove('selected');
      }
  
      document.getElementById('nextButton').style.display = 'none';
      document.getElementById('options').style.pointerEvents = 'auto';
    } else {
      sortUser();
    }
  }
  
  
  function sortUser() {
    const houseCounts = {
      "Gryffindor": gryffindorAnswers.length,
      "Slytherin": slytherinAnswers.length,
      "Ravenclaw": ravenclawAnswers.length,
      "Hufflepuff": hufflepuffAnswers.length
    };
  
    let dominantHouse = "";
    let maxCount = 0;
  
    for (const [house, count] of Object.entries(houseCounts)) {
      if (count > maxCount) {
        maxCount = count;
        dominantHouse = house;
      }
    }
  
    const resultContainer = document.getElementById('result');
    resultContainer.textContent = `Congratulations! You belong to ${dominantHouse}!`;
  
    const imageContainer = document.getElementById('houseImageContainer');
    let imageName;
    switch (dominantHouse) {
      case "Gryffindor":
        imageName = "gryffindorhat.png";
        break;
      case "Hufflepuff":
        imageName = "hufflepuffHat.png";
        break;
      case "Ravenclaw":
        imageName = "ravenclawhat.png";
        break;
      case "Slytherin":
        imageName = "slytherinhat.png";
        break;
      default:
        imageName = "default.png"; 
    }
    imageContainer.innerHTML = `<img src="assets/${imageName}" alt="${dominantHouse} Hat">`;
  }
  
  // switch(expression) {
  //   case x:
  //     // code block
  //     break;
  //   case y:
  //     // code block
  //     break;
  //   default:
  //     // code block
  // }
  
  loadQuestion();