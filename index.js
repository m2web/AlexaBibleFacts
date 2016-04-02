/**
    Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

    Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at

        http://aws.amazon.com/apache2.0/

    or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
    
    Thanks to https://github.com/deegles
*/

/**
 * This simple sample has no external dependencies or session management, and shows the most basic
 * example of how to create a Lambda function for handling Alexa Skill requests.
 *
 * Examples:
 * One-shot model:
 *  User: "Alexa, ask Bible Geek for a Bible fact"
 *  Alexa: "Here's your Bible fact: ..."
 */

/**
 * App ID for the skill
 */
var APP_ID = undefined; //replace with "amzn1.echo-sdk-ams.app.[your-unique-value-here]";

/**
 * Array containing Bible facts.
 */
var BIBLE_FACTS = [
    "The Bible was written over a 1600 year period by approximately 40 men. The time of the writing was from 1500 BC to AD 100.",
    "While the Bible is 1 book, it contain 66 smaller books. The books of the Old Testament were written before the birth of Jesus Christ and the New Testament covers the life of Christ and beyond.",
    "Each of the books of the Bible, except 5, are divided into chapters and verses. The 5 which aren't divided by chapters are Obadiah, Philemon, 2 John, 3 John, and Jude. These are short books which only have verse divisions. Chapters were introduced to the Bible in 1238 by Cardinal Hugo de S. Caro. Verse divisions were not added until 1551 by Robertus Stephanus.",
    "The longest chapter if the Bible is Psalm 119 with 176 verses. The shortest chapter is Psalm 117 with only 2 verses. Incidentally, the middle chapter of the Bible is also Psalm 117. The longest book of the Bible is Psalms with 150 chapters, or psalms. It contains 43,743 words. The shortest book is  3 John with only 1 chapter and 299 words. The longest verse in the Bible is Esther 8:9 with 90 words. The shortest verse is John 11:35 with only 2 words, Jesus wept.",
    "There are many books written about and by various religions. But the Bible is the only one which claims to be the actual words of God. Those who believe the Bible also believe that God inspired various people through the years to write down His actual words for mankind. The Bible says more than 3,000 times thus saith the Lord. The words which follow are quotes from God.",
    "There were several secular historians who wrote about the events of the New Testament at the same time the Bible was being written. Josephus is the most well-known of them. He was a Jewish historian. Tacitus was a Roman historian who would have no benefit from not telling the truth. Both these men, as well as others, can be used to back up the historical accuracy of the Bible. There are historical discoveries regularly coming to light that continue to support the accuracy of the Bible. Merrill Unger, who compiled a Bible dictionary wrote, Old Testament archeology has rediscovered whole nations, resurrected important peoples, and in a most astonishing manner filled in historical gaps, adding immeasurably to the knowledge of Biblical backgrounds.",
    "There are more than 168,000 Bibles either sold or given away per day in the United States according to the Gideons, Wycliffe International and the International Bible Societies. Historically it has been said that the Bible is the most sold book of all time. It is regularly on various best seller lists. The Bible has been translated into more than 1,200 languages.",
    "There are no contradictions in the Bible. Various people claim to find contradictions but they have to take verses out of context to do so. When looking at the Bible as a whole and understanding its teachings there are no contradictions. This is amazing when one considers that the Bible was written over such a long period of time.",
    "There are more than 3,200 verses with fulfilled prophecy either within the Bible itself or since the Bible was written.",
    "While there were at least 40 different people who wrote parts of the Bible, some were more prolific than others. The Apostle Paul wrote at least 13 books of the Bible. He may have also been the author of the book of Hebrews. Moses wrote the first 5 books.",
    "The Bible attributes more than 3,000 proverbs to King Solomon. These are not all written in the book of Proverbs. However, most of that book is said to be the proverbs of Solomon.",
    "Only in recent years has science discovered that everything we see is composed of invisible atoms. Here, Scripture tells us that quote the things which are seen were not made of things which do appear unquote.",
    "Medical science has only recently discovered that blood-clotting in a newborn reaches its peak on the eighth day, then drops. The Bible consistently says that a baby must be circumcised on the eighth day.",
    "At a time when it was believed that the earth sat on a large animal or a giant (1500 B.C.), the Bible spoke of the earth’s free float in space. Quote He hangs the earth upon nothing unquote in Job 26:7.",
    "The prophet Isaiah tells us that the earth is round. It is he that sits upon the circle of the earth Isaiah 40:22. This is not a reference to a flat disk, as some skeptic maintain, but to a sphere. Secular man discovered this 2,400 years later. At a time when science believed that the earth was  flat, is was the Scriptures that inspired Christopher Columbus to sail around the world.",
    "God told Job in circa 1500 B.C. quote Can you send lightnings, that they may go, and say to you, Here we are? unquote in Job 38:35. The Bible here is making what appears to be a scientifically ludicrous statement—that light can be sent, and then manifest itself in speech. But did you know that radio waves travel at the speed of light? This is why you can have instantaneous wireless communication with someone on the other side of the earth. Science didn’t discover this until 1864 when British scientist James Clerk Maxwell suggested that electricity and light waves were two forms of the same thing.",
    "Job 38:19 asks, Where is the way where light dwells? Modern man has only recently discovered that light (electromagnetic radiation) has a kind of way, traveling at 186,000 miles per second.",
    "Science has discovered that stars emit radio waves, which are received on earth as a high pitch. God mentioned this in Job 38:7 When the morning stars sang together.",
    "Solomon described a cycle of air currents two thousand years before scientists discovered them. Quote The wind goes toward the south, and turns about unto the north; it whirls about continually, and the wind returns again according to his circuits unquote Ecclesiastes 1:6."
];

/**
 * The AlexaSkill prototype and helper functions
 */
var AlexaSkill = require('./AlexaSkill');

/**
 * BibleGeek is a child of AlexaSkill.
 * To read more about inheritance in JavaScript, see the link below.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Introduction_to_Object-Oriented_JavaScript#Inheritance
 */
var BibleGeek = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BibleGeek.prototype = Object.create(AlexaSkill.prototype);
BibleGeek.prototype.constructor = BibleGeek;

BibleGeek.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("BibleGeek onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

BibleGeek.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("BibleGeek onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    handleNewFactRequest(response);
};

/**
 * Overridden to show that a subclass can override this function to teardown session state.
 */
BibleGeek.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("BibleGeek onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

BibleGeek.prototype.intentHandlers = {
    "GetNewFactIntent": function (intent, session, response) {
        handleNewFactRequest(response);
    },

    "AMAZON.HelpIntent": function (intent, session, response) {
        response.ask("You can ask Bible Geek tell me a Bible fact, or, you can say exit... What can I help you with?", "What can I help you with?");
    },

    "AMAZON.StopIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    },

    "AMAZON.CancelIntent": function (intent, session, response) {
        var speechOutput = "Goodbye";
        response.tell(speechOutput);
    }
};

/**
 * Gets a random new fact from the list and returns to the user.
 */
function handleNewFactRequest(response) {
    // Get a random Bible fact from the Bible facts list
    var factIndex = Math.floor(Math.random() * BIBLE_FACTS.length);
    var fact = BIBLE_FACTS[factIndex];

    // Create speech output
    var speechOutput = "Here's your Bible fact: " + fact;

    response.tellWithCard(speechOutput, "BibleGeek", speechOutput);
}

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the BibleGeek skill.
    var BibleGeek = new BibleGeek();
    BibleGeek.execute(event, context);
};

