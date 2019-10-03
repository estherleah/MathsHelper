/* This code has been generated from your interaction model

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the contents as the code for a new Lambda function, using the alexa-skill-kit-sdk-factskill template.
// This code includes helper functions for compatibility with versions of the SDK prior to 1.0.9, which includes the dialog directives.



// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function

var speechOutput = '';
var welcomeMessages = [
    "Welcome to Multiplication Madness! ",
    "Welcome! ",
    "Hello! ",
    "Heya! ",
    "Hi! "
];
var welcomeOutput = "Do you really know your times tables? Ask me to test you to find out.";


// 2. Skill Code =======================================================================================================

"use strict";
const Alexa = require('ask-sdk-v1adapter');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

var handlers = {
    'LaunchRequest': function () {
        var welcome = randomPhrase(welcomeMessages) + welcomeOutput;
        this.emit(':ask', welcome, welcomeOutput);
    },
	'AMAZON.HelpIntent': function () {
        speechOutput = "To start a test on a specific times tables say, for example, 'test me on my seventeen times table'. What would you like to try?";
        this.emit(':ask', speechOutput, speechOutput);
    },
    'AMAZON.CancelIntent': function () {
        var score = this.attributes['score'];
        var total = this.attributes['total'];
        if (this.attributes['total'] == 0 || this.attributes['total'] == null) {
            speechOutput = '';
        } else {
            speechOutput = "You got " + score + " out of " + total + " answers correct.";
        }
        this.emit(':tell', speechOutput);
    },
    'AMAZON.StopIntent': function () {
        var score = this.attributes['score'];
        var total = this.attributes['total'];
        if (this.attributes['total'] == 0 || this.attributes['total'] == null) {
            speechOutput = '';
        } else {
            speechOutput = "You got " + score + " out of " + total + " answers correct.";
        }
        this.emit(':tell', speechOutput);
    },
    'SessionEndedRequest': function () {
        var score = this.attributes['score'];
        var total = this.attributes['total'];
        if (this.attributes['total'] == 0 || this.attributes['total'] == null) {
            speechOutput = '';
        } else {
            speechOutput = "You got " + score + " out of " + total + " answers correct.";
        }
        // this.emit(':saveState', true); // uncomment to save attributes to db on session end
        this.emit(':tell', speechOutput);
    },
	"AnswerIntent": function () {
        var speechOutput = "";

        // get values of op1 and op2 from the question to calculate solution
        var op1 = this.attributes['op1'];
		var op2 = this.attributes['op2'];
        var solution = parseInt(op1) * parseInt(op2);
        
        // reset the value of op1
        this.attributes['op1'] = Math.floor(Math.random()*13);

        // any intent slot variables are listed here for convenience
        var answerSlotRaw = this.event.request.intent.slots.answer.value;
        console.log(answerSlotRaw);
        var answerSlot = resolveCanonical(this.event.request.intent.slots.answer);
        console.log(answerSlot);

        if (solution == parseInt(answerSlotRaw)) {
            // your custom intent handling goes here
            speechOutput = "Correct! What is: " + this.attributes['op1'] + " times " + this.attributes['op2'];
            // increment score and total
            this.attributes['score'] += 1;
            this.attributes['total'] += 1;
            this.emit(":ask", speechOutput, speechOutput);
        } else {
            // your custom intent handling goes here
            speechOutput = "Wrong! The answer is " + solution + ". What is: " + this.attributes['op1'] + " times " + this.attributes['op2'];
            // increment total
            this.attributes['total'] += 1;
            this.emit(":ask", speechOutput, speechOutput);
        }
    },
	"SetTimesTables": function () {
        var speechOutput = "";
        // any intent slot variables are listed here for convenience
        var tableSlotRaw = this.event.request.intent.slots.table.value;
        console.log(tableSlotRaw);
        var tableSlot = resolveCanonical(this.event.request.intent.slots.table);
        console.log(tableSlot);

        // set the values of op1 and op2
        this.attributes['op1'] = Math.floor(Math.random()*13);
        this.attributes['op2'] = parseInt(tableSlotRaw);
        // set score and total
        if (this.attributes['total'] == 0 || this.attributes['total'] == null) {
            this.attributes['total'] = 0;
            this.attributes['score'] = 0;
        }
        // your custom intent handling goes here
        if (Number.isNaN(this.attributes['op2'])) {
            speechOutput = "I didn't catch that. Please try again.";
            this.emit(":ask", speechOutput, speechOutput);
        } else {
            speechOutput = "Ok, let's get started. What is: " + this.attributes['op1'] + " times " + this.attributes['op2'];
            this.emit(":ask", speechOutput, speechOutput);
        }
    },	
	'Unhandled': function () {
        speechOutput = "The skill didn't quite understand what you wanted. Do you want to try something else?";
        this.emit(':ask', speechOutput, speechOutput);
    }
};

exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // to enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    // alexa.dynamoDBTableName = 'DYNAMODB_TABLE_NAME'; // uncomment this line to save attributes to DB
    alexa.execute();
};

//    END of Intent Handlers {} ========================================================================================


// 3. Helper Functions  ================================================================================================

function resolveCanonical(slot) {
    // this function looks at the entity resolution part of request and returns the slot value if a synonyms is provided
    try {
        var canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    } catch(err) {
        console.log(err.message);
        var canonical = slot.value;
    };
    return canonical;
}

function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
