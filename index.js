
let screen = document.getElementById("screen");//გადმოვიტანეთ ჰტმლ ფაილი
let pastResult = document.getElementById("pastResult");//აქაც იგივე

//  გავწერეთ ტექსტი, რომ ეკრანზე საწყისში გამოჩნდეს “Click to Start”.
screen.textContent = "Click to Start";

// აქ შევინახავთ ზუსტად იმ მომენტს, როცა ეკრანი გახდება თეთრი, რათა შემდეგ გამოთვალოთ რეაქციის დრო.
let reactionStart;  
//false — თეთრი ფერი არ არის დაწყებული. true — ველოდებით ეკრანის თეთრად ცვლილებას.
let waitingForWhite = false;//თავდაპირველად ფალსი უუნდა იყოს რადგან შევიდეთ if-ში


screen.addEventListener("click", () => {//აქ კლიკის ფუნქციაა როცა დავაკლიკებთ სქრიინს
    if (!waitingForWhite) {   // აქ waiting for white გვაქ ტრუე ამიტომ 
        // Start the test
        screen.style.backgroundColor = "red";// ბექგრაუნდი წითელია
        screen.textContent = "Wait for white..."; //შევვცვლით სქრინის ტექსტს 
        waitingForWhite = true;//

        // Random delay before turning white
        let delay = Math.random() * 3000 + 2000; // აქ რენდომულად ვაკეთებთ დილეის 0 იდა 5 ამდე 
        setTimeout(() => {//აქ   ვაძლევთ delay setTimeout როდის უნდა გამოჩნდეს თეთრი ფერი 
            screen.style.backgroundColor = "white"; //სქრინი იცვლის ფერს თეთრად 
            screen.textContent = "CLICK!";//აქ ეკრანზე გამოგვაქ click 
            reactionStart = performance.now();//აქ  ვადგენთ რამდენი ხანია თეთრი ფერი გვაქ უფრო ზუუსტად
        }, delay);
    } else {//როდესაც გახდება თეთრი ეკრანი გადმოვა else ციკლში 
        if (screen.style.backgroundColor === "white") {// აქ screen თეთრია ამიტომ შემოვა უკვე if ციკლში
            let reactionTime = performance.now() - reactionStart;//აქ ვინახავთ შედეგს 
            screen.textContent = `Your reaction time: ${Math.round(reactionTime)} ms`;//აქ ეწერება უკვე ჩვენი რეაქცისს დრო

            // Show past result
            pastResult.textContent = `Past Result: ${Math.round(reactionTime)} ms`;//აქ კი შედეგს ვინახავთ როგორც ძველს 

            waitingForWhite = false;//აქ  უუკვე  თეთრი ფერი falsia 
            screen.style.backgroundColor = "red"; // reset to red for next round
        } else {
            // Clicked too soon
            screen.textContent = "Too soon! Click to try again.";// 
            waitingForWhite = false; // აქ გადავა თავდაპირველ if ციკლში 
        }
    }
});