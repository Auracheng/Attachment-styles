
document.addEventListener('DOMContentLoaded', function() {

    // Global variable tracking calculation output state
    let userStyle = "Secure";


    // 1. Core Evaluation Matrix & Graph Vector Plotter

    const quizForm = document.getElementById('quiz-form');
    const resultSection = document.getElementById('result-section');
    const statusDot = document.getElementById('status-dot');
    const resultText = document.getElementById('result-text');

    if (quizForm) {
        quizForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const rawAnswers = {
                q1: formData.get('q1'),
                q2: formData.get('q2'),
                q3: formData.get('q3'),
                q4: formData.get('q4'),
                q5: formData.get('q5')
            };

            let myX = 0; 
            let myY = 0; 

          
            for (let q in rawAnswers) {
                let val = rawAnswers[q];
                // Local static parsing rules standardisation compatibility fallback
                if (val === 'A' || val === 'secure') { myX -= 2; myY -= 2; } 
                else if (val === 'B' || val === 'anxious') { myX -= 2; myY += 2; } 
                else if (val === 'C' || val === 'avoidant') { myX += 2; myY -= 2; } 
                else if (val === 'D' || val === 'fearful') { myX += 2; myY += 2; }
            }

         
            const center = 160; 
            let leftPercent = center + (myX * 13);
            let topPercent = center - (myY * 13);

            if (statusDot) {
                statusDot.style.left = leftPercent + 'px';
                statusDot.style.top = topPercent + 'px';
            }

            if (resultText) {
                resultText.className = 'result-box';
                
                if (myX < 0 && myY >= 0) {
                    userStyle = "Anxious";
                    resultText.classList.add('type-anxious');
                    resultText.innerHTML = `<h4>🔮 Diagnostic Result: Anxious Attachment Style</h4><p>In relationships, you are like a cat with highly sensitive antennae—extremely observant and easily affected. You possess a natural alertness to any threat signals in intimacy, easily falling into overthinking patterns like 'Does he/she still love me?'. Try to trust your partner, and learn to re-allocate some of life's weight back to yourself.</p>`;
                } else if (myX >= 0 && myY >= 0) {
                    userStyle = "Fearful";
                    resultText.classList.add('type-fearful');
                    resultText.innerHTML = `<h4>🔮 Diagnostic Result: Fearful-Avoidant Attachment Style</h4><p>Deep down, you are constantly acting out a conflicted script of 'pushing away, then pulling back.' You profoundly crave love and intimacy, but the second someone steps close, your trauma-defending instincts set off an alarm, causing you to push them away prematurely out of fear of getting hurt.</p>`;
                } else if (myX >= 0 && myY < 0) {
                    userStyle = "Avoidant";
                    resultText.classList.add('type-avoidant');
                    resultText.innerHTML = `<h4>🔮 Diagnostic Result: Dismissive-Avoidant Attachment Style</h4><p>You are a 'lone wolf' who values absolute independence above all else. When friction or pressure appears in a relationship, your first instinct is not to solve it, but to retreat, give the silent treatment, or hide in your shell. Try telling your partner, 'I just need some quiet time alone, I'm not leaving you' before you pull away.</p>`;
                } else {
                    userStyle = "Secure";
                    resultText.classList.add('type-secure');
                    resultText.innerHTML = `<h4>🔮 Diagnostic Result: Secure Attachment Style</h4><p>Congratulations! You are an incredibly precious 'secure base' in interpersonal relationships. You can comfortably enjoy deep intimacy and healthy reliance, while maintaining a robust capacity for independent living. You are not afraid to show your vulnerability, and you offer high levels of trust to your partner.</p>`;
                }
            }

            if (quizForm) quizForm.style.display = 'none';
            const quizWrapper = document.getElementById('quiz-wrapper');
            if (quizWrapper) quizWrapper.style.display = 'none';
            if (resultSection) resultSection.style.display = 'block';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    // 2. Compatibility Matrix Dynamics Processing Engine
 
    document.querySelectorAll('.partner-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.partner-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const partnerType = this.getAttribute('data-type');
            const outputCard = document.getElementById('match-mode-output');
            if (!outputCard) return;
            
            outputCard.style.display = 'block';
            let reportHTML = `<h5>🔗 Relationship Blueprint: Your 【${userStyle} Style】 ➔ Partner's 【${partnerType} Style】</h5>`;

            if (userStyle === 'Anxious' && partnerType === 'Avoidant') {
                reportHTML += `<p>⚠️ <strong>Triggers the "Anxious-Avoidant Trap" (The Pursuer-Distancer Cycle):</strong><br>This is an incredibly classic yet exhausting dynamic in romantic relationships. During conflicts, the Anxious type (you), driven by inner insecurity, instinctively tries to talk it out immediately, seeking reassurance and sending strings of messages. Meanwhile, facing this high-density emotional pressure, the Avoidant type (your partner) feels suffocated, goes on the defensive, and chooses to shut down or withdraw. One pursues, the other flees. <strong>The Way Out:</strong> You need to leave them room to breathe in their cave, while they need to explicitly state when they will return before retreating, providing you with a reliable anchor of commitment.</p>`;
            } else if (userStyle === 'Avoidant' && partnerType === 'Anxious') {
                reportHTML += `<p>⚠️ <strong>Reverse "Pursuit-Distancer Showdown" (You Flee, They Pursue):</strong><br>When differences arise or things get too clingy, the Avoidant type (you) instinctively pulls away, retreats into a shell, or remains silent. This immediately triggers a 'lost kitten effect' in the Anxious type's (your partner's) subconscious, sending them into an absolute panic. This panic manifests as pursuit behaviors like endless calls and emotional outbursts, which only makes you feel more resistant and eager to escape. <strong>The Way Out:</strong> Try adding a sentence before you pull back: 'I just need a moment to process, I'm not going anywhere.' This simple reassurance prevents your partner from panicking during your silence.</p>`;
            } else if (userStyle === 'Secure' || partnerType === 'Secure') {
                reportHTML += `<p>🌱 <strong>"Secure Base" Healing Dynamic:</strong><br>Your relationship contains an exceptionally solid lighthouse. The Secure partner naturally has a high emotional capacity and healing presence. Whether the other person is frequently demanding reassurances (Anxious) or habitually ducking into their shell (Avoidant), the Secure individual uses steady, un-exhausting emotional consistency to slowly soften and dissolve the other's psychological defenses. Over long-term coexistence, the insecure partner will gradually shift closer toward the secure quadrant.</p>`;
            } else if (userStyle === 'Anxious' && partnerType === 'Anxious') {
                reportHTML += `<p>🧡 <strong>"Resonating Porcupines" Dynamic:</strong><br>Both of you strongly desire to be glued together, placing immense value on instant replies and absolute favoritism from your partner. When things are good, it's passionately sweet and inseparable. However, because both sides harbor deep baseline insecurities, if you both happen to hit a personal low point at the same time, mutual suspicion takes over. Minor things get blown way out of proportion, transforming the connection into a painful 'porcupine dance.' The shared homework here is learning not to depend entirely on your partner for validation.</p>`;
            } else if (userStyle === 'Avoidant' && partnerType === 'Avoidant') {
                reportHTML += `<p>🔹 <strong>"Parallel Lines" Independent Dynamic:</strong><br>You both deeply respect each other's private boundaries and never overstep. While you coexist with mutual respect and rarely engage in explosive, dramatic arguments, both sides carry high defensive mechanisms. Because you are both terrified of showing vulnerability, the relationship can easily stagnate in lukewarm waters, making it hard to establish deep, soul-stirring intimacy. Try picking a quiet night to share some childhood stories to break the ice.</p>`;
            } else {
                reportHTML += `<p>🔮 <strong>"Tug-of-War Labyrinth" Dynamic:</strong><br>Because this involves the psychological traits of Fearful-Avoidance, your relationship frequently traps you both in a loop of 'craving intimacy yet deeply doubting its authenticity.' It resembles an emotional roller coaster—exceptionally close today, yet suddenly freezing and pushing each other away tomorrow over a tiny detail. Navigating this successfully requires high levels of psychological tolerance and self-awareness.</p>`;
            }

            outputCard.innerHTML = reportHTML;
            outputCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
    });
});