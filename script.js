// ----------------------------------
// Ανάκτηση στοιχείων DOM
// ----------------------------------
const table = document.getElementById('multiplicationTable');
const levelSelect = document.getElementById('levelSelect');
const startQuizBtn = document.getElementById('startQuiz');
const quizArea = document.getElementById('quizArea');
const quizQuestion = document.getElementById('quizQuestion');
const questionSelect = document.getElementById('questionCountSelect');
const quizAnswer = document.getElementById('quizAnswer');
const submitAnswer = document.getElementById('submitAnswer');
const result = document.getElementById('result');
const advice = document.getElementById('advice');
const progressBar = document.getElementById('progressBar');
const correctSound = document.getElementById('correctSound');
const wrongSound = document.getElementById('wrongSound');
const showHintBtn = document.getElementById('showHint');

// ----------------------------------
// Μεταβλητές κατάστασης Quiz
// ----------------------------------
let currentA, currentB, numberSetA, numberSetB; 
let score = 0, questionCount = 0, totalQuestions = 10;
let availablePairs = [];
let usedPairs = new Set();

document.addEventListener('DOMContentLoaded', () => {
    createTable();
});
// ----------------------------------
// Λίστα με συμβουλές για το quiz
// ----------------------------------
const adviceList = [

    "Μπορείς να σκεφτείς σαν να προσθέτεις το ίδιο νούμερο πολλές φορές!",
    "Χρησιμοποίησε τα δάχτυλά σου για να μετρήσεις!",
    "Δες τον πίνακα για βοήθεια!",
    "Σκέψου σε σειρές, π.χ. 2 x 3 = 2 + 2 + 2!",
    "Σπάσε το πρόβλημα σε μικρότερα βήματα!",
    "Δες μοτίβα στον πίνακα πολλαπλασιασμού!",
    "Μην ξεχνάς ότι κάθε αριθμός επί 1 είναι ο ίδιος αριθμός!",
    "Σκέψου σαν να μοιράζεις κάτι σε ομάδες!",
    "Σημείωνε τα αποτελέσματα που θυμάσαι καλά!",
    "Μην ανησυχείς αν κάνεις λάθος, δοκίμασε ξανά!",
    "Μερικές φορές τα μικρότερα αποτελέσματα επαναλαμβάνονται σε άλλα γινόμενα!",
    "Χρησιμοποίησε παιχνίδια ή κάρτες για να θυμάσαι τις προπαίδειες!",
    "Δες ποια γινόμενα είναι εύκολα και ξεκίνα από αυτά!",
    "Μοιράσου τη γνώση σου με φίλους, έτσι μαθαίνεις καλύτερα!",
    "Τα διπλά (2x, 4x, 8x) έχουν ωραία μοτίβα — ψάξ’ τα!",
    "Η προπαίδεια του 5 τελειώνει πάντα σε 0 ή 5!",
    "Η προπαίδεια του 10 είναι απλή — απλώς πρόσθεσε ένα μηδενικό!",
    "Κάθε αριθμός επί 0 είναι πάντα 0!",
    "Η προπαίδεια του 9 έχει ένα μαγικό κόλπο με τα δάχτυλα!",
    "Παρατήρησε ότι 3 x 4 και 4 x 3 δίνουν το ίδιο αποτέλεσμα!",
    "Όσο περισσότερο εξασκείσαι, τόσο πιο εύκολα τα θυμάσαι!",
    "Δοκίμασε να τραγουδήσεις τις προπαίδειες!",
    "Φτιάξε μικρές ιστορίες για να θυμάσαι τα αποτελέσματα!",
    "Χρησιμοποίησε διαφορετικά χρώματα για κάθε προπαίδεια!",
    "Αν κολλήσεις, ξεκίνα να μετράς βήμα-βήμα!",
    "Η προπαίδεια του 2 είναι σαν να προσθέτεις διπλά!",
    "Η προπαίδεια του 4 είναι το διπλό του διπλού!",
    "Σκέψου τα γινόμενα σαν μικρούς αριθμητικούς χορούς!",
    "Κάνε ένα μικρό διάλειμμα και ξαναπροσπάθησε!",
    "Πες δυνατά το αποτέλεσμα — ο εγκέφαλος θυμάται καλύτερα με τη φωνή!",
    "Σχεδίασε τον πίνακα της προπαίδειας μόνος σου!",
    "Παίξε με φίλους: ποιος βρίσκει πιο γρήγορα το σωστό αποτέλεσμα;",
    "Η προπαίδεια του 3 έχει ρυθμό, π.χ. 3, 6, 9, 12, 15...",
    "Αν πολλαπλασιάζεις με 9, το άθροισμα των ψηφίων είναι πάντα 9!",
    "Χρησιμοποίησε τα βήματα σαν μετρητή: 7, 14, 21, 28, 35...",
    "Μάθε πρώτα τις εύκολες προπαίδειες και μετά τις πιο δύσκολες!",
    "Η προπαίδεια του 11 είναι παιχνιδάκι ως το 9 (11, 22, 33...)!",
    "Γράψε τα δύσκολα αποτελέσματα σε χαρτάκια και κοίταξέ τα συχνά!",
    "Μπορείς να φτιάξεις flashcards για εξάσκηση!",
    "Κάθε λάθος είναι ένα βήμα πιο κοντά στη σωστή απάντηση!",
    "Χρησιμοποίησε πίνακες ή γραφήματα για να δεις τις σχέσεις των αριθμών!",
    "Οι αριθμοί έχουν ρυθμό — βρες το μοτίβο τους!",
    "Μάθε με τη μουσική — βάλε ρυθμό και τραγούδησε!",
    "Παρατήρησε τις συμμετρίες: 6x7 = 42 και 7x6 = 42!",
    "Φαντάσου τα γινόμενα σαν κουτιά που γεμίζουν με ομάδες αντικειμένων!",
    "Μην απογοητεύεσαι — η εξάσκηση κάνει θαύματα!",
    "Δες πόσο αλλάζει ο αριθμός όταν προσθέτεις μία φορά ακόμα!",
    "Χρησιμοποίησε το μυαλό σου σαν αριθμομηχανή — μπορείς!",
    "Θυμήσου: κάθε μικρό βήμα είναι πρόοδος!",
    "Να χαμογελάς — τα μαθηματικά είναι διασκεδαστικά!",  
    "Ξεκίνα από τους μικρούς αριθμούς και προχώρα στα μεγαλύτερα!",
    "Δες ποια γινόμενα επαναλαμβάνονται συχνά και μάθε τα πρώτα!",
    "Κράτα ημερολόγιο προόδου — βλέπεις πόσο βελτιώνεσαι!",
    "Χρησιμοποίησε τα χρώματα για να ξεχωρίζεις τις σειρές στον πίνακα!",
    "Δοκίμασε να ζωγραφίσεις τα αποτελέσματα!",
    "Σκέψου κάθε γινόμενο σαν μικρό παζλ!",
    "Χρησιμοποίησε καρτέλες με αριθμούς και ανακάτεψέ τις!",
    "Κάνε μικρά quiz στον εαυτό σου κάθε μέρα!",
    "Βάλε χρόνο και προσπάθησε να θυμάσαι γρήγορα τα γινόμενα!",
    "Δες τα μοτίβα στους αριθμούς και βρες συντομεύσεις!",
    "Συγκρίνοντας αριθμούς, καταλαβαίνεις γρήγορα ποιο είναι μεγαλύτερο!",
    "Δες τη σχέση των αριθμών μεταξύ τους, π.χ. 2x3 = 3x2!",
    "Μάθε τις προπαίδειες με τραγούδι ή ρυθμό!",
    "Μην φοβάσαι τα λάθη — είναι μέρος της μάθησης!",
    "Δες τα γινόμενα σαν παιχνίδι με επίπεδα!",
    "Δημιούργησε τον δικό σου πίνακα προπαίδειας!",
    "Χρησιμοποίησε μικρά αντικείμενα για να μετρήσεις, π.χ. μπίλιες ή κουκκίδες!",
    "Δες τα διπλά και τα τετραπλά — είναι ευκολότερα να τα θυμάσαι!",
    "Μοιράσου τα γινόμενα με φίλους και ανταλλάξτε ερωτήσεις!",
    "Κάνε έναν πίνακα επιβράβευσης για κάθε σωστή απάντηση!",
    "Σκέψου τα γινόμενα σαν σκαλοπάτια που ανεβαίνεις!",
    "Παίξε παιχνίδια μνήμης με κάρτες πολλαπλασιασμού!",
    "Δες ποια γινόμενα είναι συμβολικά και ευκολότερα!",
    "Μάθε πρώτα τα μοτίβα του 2, 5 και 10 — είναι εύκολα!",
    "Χρησιμοποίησε τον χάρτη των γινόμενων στο μυαλό σου!",
    "Σκέψου τις ομάδες σαν να μοιράζεις καραμέλες!",
    "Βάλε ρυθμό με τα χέρια σου όταν λες τα γινόμενα!",
    "Χρησιμοποίησε τα σχήματα για να οπτικοποιήσεις τα γινόμενα!",
    "Συνδέσε κάθε αριθμό με κάτι που θυμάσαι εύκολα!",
    "Δες τα γινόμενα σαν μικρές προκλήσεις!",
    "Κάνε σύντομες προπονήσεις μνήμης καθημερινά!",
    "Χρησιμοποίησε τη φαντασία σου για να θυμάσαι δύσκολα γινόμενα!",
    "Δες τα γινόμενα σαν σκακιές: κάθε αριθμός κινείται με σχέδιο!",
    "Σκέψου τις προπαίδειες σαν χορευτικά βήματα!",
    "Δοκίμασε να λες δυνατά τα αποτελέσματα με ρυθμό!",
    "Κάνε flashcards και ανακάτεψέ τις συχνά!",
    "Παρατήρησε τα συστήματα που επαναλαμβάνονται σε κάθε σειρά!",
    "Δες ποιοι αριθμοί είναι εύκολοι και ξεκίνα από αυτούς!",
    "Σημείωνε τα αγαπημένα σου γινόμενα!",
    "Μην ξεχνάς να χαμογελάς — η μάθηση είναι διασκεδαστική!",
    "Σκέψου το γινόμενο σαν παιχνίδι με μπόνους!",
    "Δες τη σχέση των αριθμών με το 10 — πολλές φορές βοηθά!",
    "Μάθε τα μυστικά των αριθμών με μικρές ιστορίες!",
    "Χρησιμοποίησε σύμβολα και χρώματα για κάθε σειρά!",
    "Δες τα γινόμενα σαν μικρές προκλήσεις!",
    "Κάνε μικρά διαλείμματα και ξαναπροσπάθησε!",
    "Χρησιμοποίησε τραγούδια και επαναλήψεις για μνήμη!",
    "Σκέψου τα αποτελέσματα σαν δώρα που ανακαλύπτεις!",
    "Μάθε πρώτα τα μοτίβα του 3, 4 και 6!",
    "Δες πώς οι αριθμοί επαναλαμβάνονται σε άλλα γινόμενα!",
    "Παρατήρησε τα άκρα των γινόμενων για μοτίβα!",
    "Σκέψου τα γινόμενα σαν παιχνίδι με επίπεδα!",
    "Δες πώς αλλάζουν τα αποτελέσματα όταν αυξάνεις τον αριθμό!",
    "Χρησιμοποίησε χρώματα και σχέδια για ευκολότερη μνήμη!",
    "Σκέψου κάθε αριθμό σαν φίλο που πολλαπλασιάζεται!",
    "Δοκίμασε να λες τα γινόμενα σαν ρυθμό για χορό!",
    "Παρατήρησε πώς οι αριθμοί συνδέονται μεταξύ τους!",
    "Κάνε μικρές δοκιμές με φίλους ή οικογένεια!",
    "Σκέψου κάθε γινόμενο σαν ένα μικρό μυστικό που θυμάσαι!",
    "Χρησιμοποίησε τον πίνακα σαν εργαλείο εξερεύνησης!",
    "Δες τα μοτίβα στα άκρα και μέσα στα γινόμενα!",
    "Μάθε να αναγνωρίζεις γρήγορα τα εύκολα αποτελέσματα!",

    "Κάνε ένα παιχνίδι μνήμης με αριθμούς και εικόνες!",
    "Χρησιμοποίησε χάντρες ή μικρά αντικείμενα για κάθε γινόμενο!",
    "Δοκίμασε να βρεις μοτίβα στα πολλαπλάσια κάθε αριθμού!",
    "Κάνε σύνδεση κάθε γινόμενου με κάτι που αγαπάς!",
    "Σκέψου τα γινόμενα σαν βήματα σε σκάλες!",
    "Παίξε με φίλους και κάνε διαγωνισμό ταχύτητας!",
    "Σημείωσε την πρόοδό σου με χρωματιστές καρτέλες!",
    "Κάνε μικρές ιστορίες για τα δύσκολα γινόμενα!",
    "Δες ποιοι αριθμοί δίνουν εύκολα αποτελέσματα μαζί!",
    "Χρησιμοποίησε το τραγούδι για να θυμάσαι γρήγορα!",
    "Δες τα γινόμενα σαν πίνακα θησαυρών που ανακαλύπτεις!",
    "Σκέψου κάθε αριθμό σαν ομάδα φίλων που συνεργάζονται!",
    "Κάνε quiz με εικόνες για κάθε γινόμενο!",
    "Δες πώς τα ψηφία των αποτελεσμάτων ακολουθούν μοτίβα!",
    "Μάθε τα γινόμενα με μικρές νικηφόρες προκλήσεις!",
    "Σκέψου τα γινόμενα σαν παιχνίδι στρατηγικής!",
    "Χρησιμοποίησε κάθε λάθος σαν ευκαιρία να μάθεις!",
    "Κράτα ένα ημερολόγιο για τις νίκες σου στις προπαίδειες!",
    "Δες τα γινόμενα σαν μικρά μυστικά του κόσμου των αριθμών!",
    "Παίξε με χρώματα, σχήματα και ήχους για κάθε γινόμενο!",
    "Σκέψου κάθε γινόμενο σαν μια μικρή ιστορία επιτυχίας!",
    "Δες πώς οι αριθμοί συνεργάζονται για να φτιάξουν αποτελέσματα!",
    "Μάθε να αναγνωρίζεις γρήγορα τα εύκολα και δύσκολα γινόμενα!",
    "Κάνε τα γινόμενα μέρος της καθημερινότητάς σου με παιχνίδια!",
    "Σκέψου τα αποτελέσματα σαν μικρά βραβεία!",
    "Δημιούργησε τον δικό σου πίνακα με χρώματα και εικόνες!",
    "Δες κάθε γινόμενο σαν μια πρόκληση που μπορείς να κερδίσεις!",
    "Χρησιμοποίησε τον πίνακα σαν χάρτη για να εξερευνήσεις αριθμούς!",
    "Σκέψου τα γινόμενα σαν βήματα προς τη μεγάλη νίκη!",
    "Δες τα γινόμενα σαν μικρές μαγικές πράξεις αριθμών!"
];



// ----------------------------------
// Δημιουργία Πίνακα Προπαίδειας (10x10)
// ----------------------------------
function createTable() {
    table.innerHTML = '';
    for (let i = 1; i <= 10; i++) {
        const row = document.createElement('tr');
        for (let j = 1; j <= 10; j++) {
            const cell = document.createElement('td');
            cell.textContent = i * j;
            cell.dataset.row = i;
            cell.dataset.col = j;
            cell.dataset.value = i * j;

            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            tooltip.textContent = `✨ ${i} x ${j} = ${i*j} ✨`;
            cell.appendChild(tooltip);

            cell.addEventListener('click', () => {
                cell.classList.add('show-tooltip');
                setTimeout(() => cell.classList.remove('show-tooltip'), 1200);
            });

            row.appendChild(cell);
        }
        table.appendChild(row);
    }
}

// ----------------------------------
// Ρύθμιση Επιπέδου Δυσκολίας Quiz
// ----------------------------------
function setDifficulty(level = null) {
    const chosenLevel = level || levelSelect.value;
    switch(chosenLevel){
        case 'easy': numberSetA = numberSetB = [1,2,3,5,10]; break;
        case 'medium': numberSetA = numberSetB = [3,4,6,7]; break;
        case 'hard': numberSetA = numberSetB = [6,7,8,9]; break;
        default: numberSetA = numberSetB = [1,2,3,4,5,6,7,8,9,10];
    }
}

// ----------------------------------
// Δημιουργία νέας ερώτησης Quiz
// ----------------------------------
let usedResults = new Set(); // Νέο set για τα αποτελέσματα

function newQuestion() {
    if (availablePairs.length === 0) {
        availablePairs = [];
        for (let a of numberSetA) {
            for (let b of numberSetB) {
                if (a !== 0 && b !== 0) {
                    const resultValue = a * b;
                    if (!usedResults.has(resultValue)) {
                        availablePairs.push([a, b]);
                    }
                }
            }
        }
    }

    if (availablePairs.length === 0) {
        // Όλα τα αποτελέσματα έχουν χρησιμοποιηθεί
        quizQuestion.textContent = "🎉 Τέλος Quiz! Δεν υπάρχουν περισσότερες μοναδικές ερωτήσεις.";
        quizAnswer.style.display = 'none';
        submitAnswer.style.display = 'none';
        showHintBtn.style.display = 'none';
        progressBar.style.width = '100%';
        return;
    }

    const randomIndex = Math.floor(Math.random() * availablePairs.length);
    const [a, b] = availablePairs.splice(randomIndex, 1)[0];
    currentA = a;
    currentB = b;

    usedResults.add(a * b); // Αποθηκεύουμε το αποτέλεσμα για να μην ξαναεμφανιστεί

    quizQuestion.textContent = `Ερώτηση ${questionCount + 1}: Πόσο κάνει ${currentA} x ${currentB} ;`;
    quizAnswer.value = '';
    result.style.opacity = 1;
    result.textContent = '';
    advice.textContent = '';
    progressBar.style.width = `${(questionCount / totalQuestions) * 100}%`;
}



// ----------------------------------
// Εύρεση κελιού πίνακα με βάση τους παράγοντες
// ----------------------------------
function getCellByFactors(a,b){
    for(let r=0;r<table.rows.length;r++){
        for(let c=0;c<table.rows[r].cells.length;c++){
            const cell = table.rows[r].cells[c];
            if((parseInt(cell.dataset.row) === a && parseInt(cell.dataset.col) === b) ||
               (parseInt(cell.dataset.row) === b && parseInt(cell.dataset.col) === a)) {
                return cell;
            }
        }
    }
    return null;
}

// ----------------------------------
// Εμφάνιση Αστείου Ζώου
// ----------------------------------
function spawnFunnyAnimal(){
    const animalEmoji=['🐶','🐱','🐭','🐹','🐰','🐸','🐵','✨','🌟','⭐'];
    const a=document.createElement('div');
    a.textContent=animalEmoji[Math.floor(Math.random()*animalEmoji.length)];
    a.className='funnyAnimal';
    const rect=quizArea.getBoundingClientRect();
    a.style.left=(rect.left + Math.random()*rect.width)+'px';
    a.style.top=(rect.top - 50 + Math.random()*20)+'px';
    document.body.appendChild(a);
    setTimeout(()=>document.body.removeChild(a),1200);
}

// ----------------------------------
// Event Listeners
// ----------------------------------

// Αρχικοποίηση default επιπέδου
levelSelect.value = 'easy';
setDifficulty();
levelSelect.addEventListener('change', () => setDifficulty());

startQuizBtn.addEventListener('click',()=> {
    totalQuestions = parseInt(questionSelect.value, 10);
    quizArea.style.display='block';
    score=0; questionCount=0;
    quizAnswer.style.display='inline-block';
    submitAnswer.style.display='inline-block';
    showHintBtn.style.display='inline-block';
    setDifficulty();
    availablePairs = [];
    usedPairs.clear();
    newQuestion();
});

showHintBtn.addEventListener('click', ()=> {
    advice.textContent = adviceList[Math.floor(Math.random()*adviceList.length)];
});

// ----------------------------------
// Έλεγχος Απάντησης Quiz
// ----------------------------------
submitAnswer.addEventListener('click', () => {
    const ans = parseInt(quizAnswer.value.trim(),10);
    if(isNaN(ans)) return;

    const correct = currentA * currentB;
    const cell = getCellByFactors(currentA, currentB);

    if(ans === correct){
        result.textContent = '✅ Σωστά!';
        result.style.color = 'green';
        score++;
        if(cell){
            cell.style.animation = 'none';
            cell.offsetHeight;
            cell.style.animation = 'bounceCellCorrect 1.5s forwards';
        }
        correctSound.play();
        confetti({ particleCount: 80, spread: 100, origin: { y: 0.6 }, shapes: ['star','circle'], emojis:['✨','🌟','⭐'] });
    } else {
        result.textContent = '❌ Λάθος!';
        result.style.color = 'red';
        if(cell){
            cell.style.animation = 'none';
            cell.offsetHeight;
            cell.style.animation = 'bounceCellWrong 1.5s forwards';
        }
        wrongSound.play();
        spawnFunnyAnimal();
        setTimeout(() => {
            result.textContent = `❌ Λάθος! Σωστή απάντηση: ${correct}`;
            advice.textContent = adviceList[Math.floor(Math.random()*adviceList.length)];
        }, 1000);
    }

    setTimeout(()=>{ result.style.opacity=0; }, 3000);
    questionCount++;
    progressBar.style.width = `${(questionCount / totalQuestions) * 100}%`;

    if(questionCount < totalQuestions){
        setTimeout(newQuestion, 3200);
    } else {
        setTimeout(()=> {
            quizQuestion.textContent = `🎉 Τέλος Quiz! Βαθμολογία: ${score}/${totalQuestions} 🎉`;
            quizAnswer.style.display='none';
            submitAnswer.style.display='none';
            showHintBtn.style.display='none';
            result.textContent='';
            advice.textContent='';
            progressBar.style.width='100%';
        }, 3200);
    }
});

// ----------------------------------
// Εκτύπωση Πίνακα
// ----------------------------------
document.getElementById('printTable').addEventListener('click', () => {
    const printWindow = window.open('', '', 'width=900,height=700');
    printWindow.document.write('<html><head><title>Πίνακας Προπαίδειας</title>');
    printWindow.document.write('<style>body{text-align:center;font-family:Arial,sans-serif;}table{border-collapse:collapse;margin:0 auto;}td,th{border:2px solid #ffcc00;padding:10px;text-align:center;width:50px;height:50px;border-radius:8px;background-color:#fff8dc;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h1>Μαθαίνω την Προπαίδεια!</h1><table>');
    for(let r=0;r<table.rows.length;r++){
        printWindow.document.write('<tr>');
        for(let c=0;c<table.rows[r].cells.length;c++){
            printWindow.document.write(`<td>${table.rows[r].cells[c].dataset.value}</td>`);
        }
        printWindow.document.write('</tr>');
    }
    printWindow.document.write('</table></body></html>');
    printWindow.document.close(); printWindow.focus(); printWindow.print(); printWindow.close();
});

// ----------------------------------
// Αναλυτικοί Πίνακες
// ----------------------------------
document.getElementById('openDetailedTables').addEventListener('click', () => {
    const newWindow = window.open('', '', 'width=1200,height=800,scrollbars=yes');
    newWindow.document.write('<html><head><title>Προπαίδεια Αναλυτικά</title>');
    newWindow.document.write('<link rel="icon" type="image/x-icon" href="Favicon.ico">');
    newWindow.document.write(`<style>
        body{font-family:'Mynerve',cursive;font-weight:bold;background-color:#d0f0c0;background-image:url('back.png');background-repeat:repeat;background-size:cover;display:flex;flex-direction:column;align-items:center;padding:20px;overflow-x:auto;}
        h1{text-align:center;font-size:40px;margin-bottom:20px;}
        table{border-collapse:collapse;margin:10px;min-width:120px;}
        td,th{border:2px solid #ffcc00;padding:8px;text-align:center;min-width:60px;border-radius:8px;background-color:#fff8dc;font-weight:bold;white-space:nowrap;}
        th{background-color:#ffcc00;color:#000;}
        .line{display:flex;justify-content:center;flex-wrap:nowrap;margin-bottom:20px;}
        button{padding:10px 20px;font-size:16px;border-radius:10px;border:none;font-weight:bold;cursor:pointer;background-color:#ffcc00;margin-bottom:20px;}
        button:hover{background-color:#ffdd33;}
    </style>`);
    newWindow.document.write('</head><body>');
    newWindow.document.write('<h1>Προπαίδεια Αναλυτικά</h1><button onclick="window.print()">🖨️ Εκτύπωση</button>');

    function writeLine(start,end){
        newWindow.document.write('<div class="line">');
        for(let i=start;i<=end;i++){
            newWindow.document.write('<table>');
            newWindow.document.write(`<tr><th colspan="1">Προπαίδεια του ${i}</th></tr>`);
            for(let j=1;j<=10;j++) newWindow.document.write(`<tr><td>${i} x ${j} = ${i*j}</td></tr>`);
            newWindow.document.write('</table>');
        }
        newWindow.document.write('</div>');
    }

    writeLine(1,5);
    writeLine(6,10);

    newWindow.document.write('</body></html>');
    newWindow.document.close(); newWindow.focus();
});

document.getElementById('downloadPoster').addEventListener('click', () => {
    const imageUrl = 'poster.png'; // Βάλε εδώ το path ή URL της αφίσας
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'Αφίσα_Προπαίδειας.png'; // Όνομα αρχείου για download
    document.body.appendChild(link);
    link.click(); // Προκαλεί το κατέβασμα
    document.body.removeChild(link);

    // Επιπλέον: ανοίγει την εικόνα σε νέο παράθυρο
    window.open(imageUrl, '_blank');
});

// Εμφάνιση Οδηγιών Χρήσης
document.getElementById('showInstructions').addEventListener('click', () => {
    // Δημιουργία νέου παραθύρου για οδηγίες
    const instructionsWindow = window.open('', '', 'width=500,height=700,scrollbars=yes');
    instructionsWindow.document.write('<html><head><title>Οδηγίες Χρήσης</title>');
	instructionsWindow.document.write('<link rel="icon" type="image/x-icon" href="Favicon.ico">');

	
    // Ενσωμάτωση CSS
    instructionsWindow.document.write('<style>');
    instructionsWindow.document.write(`
        body { font-family: 'Mynerve', cursive; background-color: #d0f0c0; background-image: url('back.png'); text-align: center; padding: 20px; }
        h1 { font-size: 30px; margin-bottom: 20px; }
        p { font-size: 18px; margin: 10px 0; }
        ul { text-align: left; display: inline-block; font-size: 16px; }
        button { padding: 10px 20px; margin-top: 20px; font-size: 16px; border-radius: 10px; border: none; cursor: pointer; background-color: #ffcc00; font-weight: bold; }
        button:hover { background-color: #ffdd33; }
    `);
    instructionsWindow.document.write('</style></head><body>');
    
    // Περιεχόμενο οδηγιών
    instructionsWindow.document.write('<h1>📚 Οδηγίες Χρήσης!</h1>');
    instructionsWindow.document.write('<ul>');
    instructionsWindow.document.write('<li>🎯 Κοίτα τον πίνακα προπαίδειας και κάνε κλικ στα τετράγωνα για να δεις τις πράξεις.</li>');
    instructionsWindow.document.write('<li>🚀 Πάτησε "Ξεκίνα Quiz" για να παίξεις και να μάθεις πολλαπλασιασμό!</li>');
	instructionsWindow.document.write('<li>📚 Μπορείς να επιλέξεις Επίπεδο δυσκολίας και αριθμό ερωτήσεων</li>');
    instructionsWindow.document.write('<li>💡 Αν δυσκολεύεσαι, πάτησε "Βοήθεια" για να πάρεις συμβουλή.</li>');
    instructionsWindow.document.write('<li>✅ Αν απαντήσεις σωστά, θα ακούσεις ήχο και θα δεις confetti 🎉.</li>');
    instructionsWindow.document.write('<li>❌ Αν απαντήσεις λάθος, θα εμφανιστεί η σωστή απάντηση και ένα αστείο ζώο θα πηδήξει 🐶🐱🐰.</li>');
    instructionsWindow.document.write('<li>📊 Παρακολούθησε την πρόοδο στο progress bar.</li>');
    instructionsWindow.document.write('<li>🖨️ Μπορείς να εκτυπώσεις τον πίνακα με το κουμπί "Εκτύπωση Πίνακα".</li>');
	instructionsWindow.document.write('<li>📖 Αν θέλεις να δεις την αναλυτική προπαίδεια, πάτησε το κουμπί "Προπαίδεια Αναλυτικά" για να ανοίξει σε νέο παράθυρο με όλους τους πίνακες.</li>');
	instructionsWindow.document.write('<li>🖼️ Αν θέλεις μπορείς να κατεβάσεις την αφίσσα που έφτιαξα για σένα, πάτησε το κουμπί "Κατέβασε την αφίσα !!" για να ανοίξει σε νέο παράθυρο.</li>');
    instructionsWindow.document.write('</ul>');
    instructionsWindow.document.write('<button onclick="window.close()">❌ Κλείσιμο</button>');
    instructionsWindow.document.write('</body></html>');
    instructionsWindow.document.close();
    instructionsWindow.focus();
});

