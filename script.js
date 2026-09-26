let fuel = 100;
let crewSafety = 100;
let missionScore = 0;
let currentChallenge = 0;

const challenges = [
    {
        icon: "☀️",
        title: "Solar Storm",
        description:
            "Mission Control detects a sudden increase in solar radiation. The crew is preparing for a scheduled spacewalk.",
        choices: [
            {
                name: "Delay the spacewalk",
                info: "Wait until radiation levels return to a safer range.",
                fuel: 0,
                safety: 10,
                score: 25,
                correct: true
            },
            {
                name: "Continue the spacewalk",
                info: "Keep the original schedule despite the radiation.",
                fuel: 0,
                safety: -20,
                score: 5,
                correct: false
            },
            {
                name: "Increase engine power",
                info: "Use the engines to try to escape the storm.",
                fuel: -15,
                safety: -5,
                score: 10,
                correct: false
            },
            {
                name: "Shut down communications",
                info: "Reduce communications while the storm passes.",
                fuel: 0,
                safety: -15,
                score: 5,
                correct: false
            }
        ],
        explanation:
            "Solar storms can increase radiation exposure. During elevated radiation conditions, limiting crew exposure is an important safety consideration."
    },

    {
        icon: "🛰️",
        title: "Trajectory Correction",
        description:
            "Artemis is slightly off its planned lunar trajectory. Mission Control must correct the spacecraft's path.",
        choices: [
            {
                name: "Make a small course correction",
                info: "Use a controlled engine burn to adjust the trajectory.",
                fuel: -8,
                safety: 5,
                score: 25,
                correct: true
            },
            {
                name: "Use maximum engine power",
                info: "Make a very large correction immediately.",
                fuel: -25,
                safety: -5,
                score: 10,
                correct: false
            },
            {
                name: "Ignore the trajectory",
                info: "Continue without changing the spacecraft's path.",
                fuel: 0,
                safety: -15,
                score: 5,
                correct: false
            },
            {
                name: "Turn off the engines",
                info: "Stop using propulsion during the correction window.",
                fuel: 5,
                safety: -20,
                score: 0,
                correct: false
            }
        ],
        explanation:
            "Small, controlled engine burns can adjust a spacecraft's trajectory while conserving valuable fuel. Mission planners carefully balance correction size with fuel reserves."
    },

    {
        icon: "🌕",
        title: "Lunar Orbit",
        description:
            "Artemis has reached the Moon. Fuel reserves are healthy, but Mission Control must decide how to enter lunar orbit.",
        choices: [
            {
                name: "Perform a controlled orbit insertion",
                info: "Use a carefully planned burn to enter lunar orbit.",
                fuel: -10,
                safety: 5,
                score: 25,
                correct: true
            },
            {
                name: "Use a powerful rapid burn",
                info: "Enter orbit as quickly as possible.",
                fuel: -25,
                safety: -5,
                score: 10,
                correct: false
            },
            {
                name: "Skip lunar orbit",
                info: "Attempt to proceed directly toward landing.",
                fuel: 5,
                safety: -25,
                score: 5,
                correct: false
            },
            {
                name: "Wait indefinitely",
                info: "Remain in the approach phase without committing.",
                fuel: -10,
                safety: 0,
                score: 5,
                correct: false
            }
        ],
        explanation:
            "Lunar orbit insertion is a carefully planned maneuver. The spacecraft must use its engines at the right time and for the right amount of thrust."
    },

    {
        icon: "🛬",
        title: "Lunar Landing",
        description:
            "Final approach has begun. Artemis is descending toward the lunar surface. Fuel and crew safety are critical.",
        choices: [
            {
                name: "Begin a controlled descent",
                info: "Follow the planned landing profile and monitor altitude.",
                fuel: -15,
                safety: 10,
                score: 25,
                correct: true
            },
            {
                name: "Descend as fast as possible",
                info: "Reduce altitude quickly to reach the surface sooner.",
                fuel: -5,
                safety: -25,
                score: 5,
                correct: false
            },
            {
                name: "Abort immediately",
                info: "Stop the landing attempt and return to orbit.",
                fuel: -20,
                safety: 5,
                score: 15,
                correct: false
            },
            {
                name: "Ignore the landing instruments",
                info: "Continue without using the spacecraft's navigation data.",
                fuel: -10,
                safety: -30,
                score: 0,
                correct: false
            }
        ],
        explanation:
            "A lunar landing requires constant monitoring of altitude, velocity, fuel, and spacecraft systems. Controlled descent is essential for managing those risks."
    }
];


function updateStatus() {

    document.querySelector("#fuel").textContent = fuel + "%";
    document.querySelector("#safety").textContent = crewSafety + "%";
    document.querySelector("#score").textContent = missionScore + "%";

    document.querySelector("#fuelBar").style.width = fuel + "%";
    document.querySelector("#safetyBar").style.width = crewSafety + "%";
    document.querySelector("#scoreBar").style.width = missionScore + "%";
}


function showMissionInterface(content) {

    document.querySelector("#app").innerHTML = `

        <section class="mission-screen">

            <div class="mission-header">
                <p class="eyebrow">ARTEMIS // MISSION CONTROL</p>
                <h1>MISSION OPERATIONS</h1>
                <p>
                    Monitor the spacecraft and make decisions
                    that keep the mission on course.
                </p>
            </div>

            <div class="status-grid">

                <div class="status-card">
                    <div class="label">
                        <span>FUEL</span>
                        <span class="status-number" id="fuel">${fuel}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" id="fuelBar"></div>
                    </div>
                </div>

                <div class="status-card">
                    <div class="label">
                        <span>CREW SAFETY</span>
                        <span class="status-number" id="safety">${crewSafety}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" id="safetyBar"></div>
                    </div>
                </div>

                <div class="status-card">
                    <div class="label">
                        <span>MISSION SCORE</span>
                        <span class="status-number" id="score">${missionScore}%</span>
                    </div>
                    <div class="progress">
                        <div class="progress-bar" id="scoreBar"></div>
                    </div>
                </div>

            </div>

            ${content}

        </section>
    `;

    updateStatus();
}


function startMission() {

    fuel = 100;
    crewSafety = 100;
    missionScore = 0;
    currentChallenge = 0;

    document.querySelector("#app").innerHTML = `

        <section class="mission-screen">

            <div class="mission-header">
                <p class="eyebrow">MISSION AUTHORIZATION</p>
                <h1>MISSION BRIEFING</h1>

                <p>
                    Artemis is preparing for a lunar mission.
                    You are now responsible for helping Mission Control
                    make critical decisions throughout the flight.
                </p>
            </div>

            <div class="event-card">

                <div class="event-icon">🌙</div>

                <h2>Your Mission</h2>

                <p>
                    Monitor spacecraft systems, protect the crew,
                    manage resources, and guide Artemis toward a
                    successful lunar landing.
                </p>

                <button class="primary-btn" onclick="launchCountdown()">
                    BEGIN LAUNCH →
                </button>

            </div>

        </section>
    `;
}


function launchCountdown() {

    document.querySelector("#app").innerHTML = `

        <section class="mission-screen">

            <p class="eyebrow">LAUNCH OPERATIONS</p>

            <h1>LAUNCH SEQUENCE</h1>

            <p>
                All primary systems are being checked.
                Prepare for liftoff.
            </p>

            <div class="countdown-number" id="countdown">10</div>

            <p class="small-note">
                ENGINE STATUS: NOMINAL • GUIDANCE: NOMINAL
            </p>

        </section>
    `;

    let countdown = 10;

    const timer = setInterval(function() {

        countdown--;

        document.querySelector("#countdown").textContent = countdown;

        if (countdown === 0) {

            clearInterval(timer);

            document.querySelector("#countdown").textContent = "🚀";

            setTimeout(function() {
                showChallenge();
            }, 1200);
        }

    }, 1000);
}


function showChallenge() {

    const challenge = challenges[currentChallenge];

    let buttons = "";

    challenge.choices.forEach(function(choice, index) {

        buttons += `
            <button
                class="choice-btn"
                onclick="makeDecision(${index})"
            >
                <strong>${choice.name}</strong>
                <small>${choice.info}</small>
            </button>
        `;
    });

    showMissionInterface(`

        <div class="event-card">

            <div class="event-icon">${challenge.icon}</div>

            <p class="eyebrow">
                CHALLENGE ${currentChallenge + 1} / ${challenges.length}
            </p>

            <h2>${challenge.title}</h2>

            <p>${challenge.description}</p>

            <div class="choice-grid">
                ${buttons}
            </div>

        </div>

    `);
}


function makeDecision(index) {

    const challenge = challenges[currentChallenge];
    const choice = challenge.choices[index];

    fuel += choice.fuel;
    crewSafety += choice.safety;
    missionScore += choice.score;

    fuel = Math.max(0, Math.min(100, fuel));
    crewSafety = Math.max(0, Math.min(100, crewSafety));
    missionScore = Math.max(0, Math.min(100, missionScore));

    showDecisionResult(choice, challenge);
}


function showDecisionResult(choice, challenge) {

    const resultTitle = choice.correct
        ? "✅ SYSTEM RESPONSE: OPTIMAL"
        : "⚠️ SYSTEM RESPONSE: SUBOPTIMAL";

    const resultMessage = choice.correct
        ? "Mission Control has successfully managed this challenge."
        : "The mission can continue, but the decision created additional risk or resource use.";

    showMissionInterface(`

        <div class="event-card">

            <div class="event-icon">
                ${choice.correct ? "✅" : "⚠️"}
            </div>

            <p class="eyebrow">DECISION ANALYSIS</p>

            <h2>${resultTitle}</h2>

            <p>${resultMessage}</p>

            <div class="timeline">

                <div class="timeline-item">
                    <div class="timeline-dot complete"></div>
                    <span>Decision processed by Mission Control</span>
                </div>

                <div class="timeline-item">
                    <div class="timeline-dot complete"></div>
                    <span>Fuel reserve: ${fuel}%</span>
                </div>

                <div class="timeline-item">
                    <div class="timeline-dot complete"></div>
                    <span>Crew safety: ${crewSafety}%</span>
                </div>

            </div>

            <p>
                <strong>Why it matters:</strong><br>
                ${challenge.explanation}
            </p>

            <button
                class="primary-btn"
                onclick="nextChallenge()"
            >
                ${currentChallenge === challenges.length - 1
                    ? "VIEW MISSION RESULTS →"
                    : "CONTINUE MISSION →"}
            </button>

        </div>

    `);
}


function nextChallenge() {

    currentChallenge++;

    if (currentChallenge >= challenges.length) {
        showFinalResults();
    } else {
        showChallenge();
    }
}


function showFinalResults() {

    let title;
    let message;

    if (crewSafety >= 75 && fuel >= 45 && missionScore >= 80) {

        title = "🌕 MISSION SUCCESS";
        message =
            "Artemis completed the mission with strong crew safety, healthy fuel reserves, and effective decision-making.";

    } else if (crewSafety >= 50 && fuel >= 20) {

        title = "🛰️ MISSION COMPLETED";
        message =
            "Artemis reached the end of the mission, although Mission Control had to manage several difficult trade-offs.";

    } else {

        title = "⚠️ MISSION ABORTED";
        message =
            "Mission Control could not maintain enough resources or safety margin to continue the mission safely.";
    }

    document.querySelector("#app").innerHTML = `

        <section class="mission-screen">

            <div class="result-card">

                <p class="eyebrow">FINAL MISSION REPORT</p>

                <div class="event-icon">🚀</div>

                <h1>${title}</h1>

                <div class="result-score">
                    ${missionScore}%
                </div>

                <p>${message}</p>

                <div class="status-grid">

                    <div class="status-card">
                        <div class="label">
                            <span>FUEL</span>
                            <span>${fuel}%</span>
                        </div>

                        <div class="progress">
                            <div
                                class="progress-bar"
                                style="width: ${fuel}%"
                            ></div>
                        </div>
                    </div>

                    <div class="status-card">
                        <div class="label">
                            <span>CREW SAFETY</span>
                            <span>${crewSafety}%</span>
                        </div>

                        <div class="progress">
                            <div
                                class="progress-bar"
                                style="width: ${crewSafety}%"
                            ></div>
                        </div>
                    </div>

                    <div class="status-card">
                        <div class="label">
                            <span>DECISION SCORE</span>
                            <span>${missionScore}%</span>
                        </div>

                        <div class="progress">
                            <div
                                class="progress-bar"
                                style="width: ${missionScore}%"
                            ></div>
                        </div>
                    </div>

                </div>

                <div class="timeline">

                    <div class="timeline-item">
                        <div class="timeline-dot complete"></div>
                        <span>🚀 Launch completed</span>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-dot complete"></div>
                        <span>☀️ Solar storm managed</span>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-dot complete"></div>
                        <span>🛰️ Trajectory evaluated</span>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-dot complete"></div>
                        <span>🌕 Lunar orbit reached</span>
                    </div>

                    <div class="timeline-item">
                        <div class="timeline-dot complete"></div>
                        <span>🛬 Landing sequence completed</span>
                    </div>

                </div>

                <button
                    class="primary-btn"
                    onclick="location.reload()"
                >
                    RUN ANOTHER MISSION ↻
                </button>

            </div>

        </section>
    `;
}