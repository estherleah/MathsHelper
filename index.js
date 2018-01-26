/* This code has been generated from your interaction model

/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

// There are three sections, Text Strings, Skill Code, and Helper Function(s).
// You can copy and paste the contents as the code for a new Lambda function, using the alexa-skill-kit-sdk-factskill template.
// This code includes helper functions for compatibility with versions of the SDK prior to 1.0.9, which includes the dialog directives.



// 1. Text strings =====================================================================================================
//    Modify these strings and messages to change the behavior of your Lambda function


var speechOutput;
var reprompt;
var welcomeMessages = [
    "Welcome to Maths Helper",
    "Welcome",
    "Hello",
    "Heya",
    "Hi"
];
var welcomeOutput = "Shall we get started?";
var welcomeReprompt = "Shall we get started?";

// 2. Skill Code =======================================================================================================
"use strict";
var Alexa = require('alexa-sdk');
var APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).
var speechOutput = '';
var handlers = {
    'LaunchRequest': function () {
        var welcome = randomPhrase(welcomeMessages) + welcomeOutput;
        this.emit(':ask', welcome, welcomeReprompt);
    },
    'AMAZON.HelpIntent': function () {
        speechOutput = "To start a mixed times tables test say 'yes'. To start a test on a specific times tables say, for example, 'test me on my seven times table'. Do you want to start a test?";
        reprompt = "Do you want to get started?";
        this.emit(':ask', speechOutput, reprompt);
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
        //this.emit(':saveState', true);//uncomment to save attributes to db on session end
        this.emit(':tell', speechOutput);
    },
    "AMAZON.YesIntent": function () {
        this.attributes['set'] = false;
        // set the values of op1 and op2
        this.attributes['op1'] = Math.floor(Math.random()*13);
        this.attributes['op2'] = Math.floor(Math.random()*13);
        // set score and total to zero
        this.attributes['score'] = 0;
        this.attributes['total'] = 0;
        var speechOutput = "";
        //any intent slot variables are listed here for convenience

        //Your custom intent handling goes here
        speechOutput = "Ok, let's get started. What is: " + this.attributes['op1'] + " times " + this.attributes['op2'];
        this.emit(":ask", speechOutput, speechOutput);
    },
    "AnswerIntent": function () {
        var speechOutput = "";

        // get values of op1 and op2 from the question to calculate solution
        var op1 = this.attributes['op1'];
		var op2 = this.attributes['op2'];
        var solution = parseInt(op1) * parseInt(op2);
        
        // reset the values of op1 and op2
        this.attributes['op1'] = Math.floor(Math.random()*13);
        if (!this.attributes['set']) {
            this.attributes['op2'] = Math.floor(Math.random()*13);
        }

        //any intent slot variables are listed here for convenience
        var answerSlotRaw = this.event.request.intent.slots.answer.value;
        console.log(answerSlotRaw);
        var answerSlot = resolveCanonical(this.event.request.intent.slots.answer);
        console.log(answerSlot);

        if (solution == parseInt(answerSlotRaw)) {
            //Your custom intent handling goes here
            speechOutput = "Correct! What is: " + this.attributes['op1'] + " times " + this.attributes['op2'];
            // increment score and total
            this.attributes['score'] += 1;
            this.attributes['total'] += 1;
            this.emit(":ask", speechOutput, speechOutput);
        } else {
            //Your custom intent handling goes here
            speechOutput = "Wrong! The answer is " + solution + ". What is: " + this.attributes['op1'] + " times " + this.attributes['op2'];
            // increment total
            this.attributes['total'] += 1;
            this.emit(":ask", speechOutput, speechOutput);
        }

        //Your custom intent handling goes here
        speechOutput = "This is a place holder response for the intent named AnswerIntent. This intent has one slot, which is number. Anything else?";
        this.emit(":ask", speechOutput, speechOutput);
    },
    "SetTimesTables": function () {
        this.attributes['set'] = true;
        var speechOutput = "";
        //any intent slot variables are listed here for convenience
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
        //Your custom intent handling goes here
        if (Number.isNaN(this.attributes['op2'])) {
            speechOutput = "I didn't catch that. Please try again.";
            this.emit(":ask", speechOutput, speechOutput);
        } else {
            speechOutput = "Ok, let's get started. What is: " + this.attributes['op1'] + " times " + this.attributes['op2'];
            this.emit(":ask", speechOutput, speechOutput);
        }
    },	
    'Unhandled': function () {
        speechOutput = "The skill didn't quite understand what you wanted.  Do you want to try something else?";
        this.emit(':ask', speechOutput, speechOutput);
    }
};

exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    //alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    //alexa.dynamoDBTableName = 'DYNAMODB_TABLE_NAME'; //uncomment this line to save attributes to DB
    alexa.execute();
};

//    END of Intent Handlers {} ========================================================================================
// 3. Helper Function  =================================================================================================

function resolveCanonical(slot){
    //this function looks at the entity resolution part of request and returns the slot value if a synonyms is provided
    try{
        var canonical = slot.resolutions.resolutionsPerAuthority[0].values[0].value.name;
    }catch(err){
        console.log(err.message);
        var canonical = slot.value;
    };
    return canonical;
};

function delegateSlotCollection(){
console.log("in delegateSlotCollection");
console.log("current dialogState: "+this.event.request.dialogState);
    if (this.event.request.dialogState === "STARTED") {
    console.log("in Beginning");
    var updatedIntent= null;
    // updatedIntent=this.event.request.intent;
    //optionally pre-fill slots: update the intent object with slot values for which
    //you have defaults, then return Dialog.Delegate with this updated intent
    // in the updatedIntent property
    //this.emit(":delegate", updatedIntent); //uncomment this is using ASK SDK 1.0.9 or newer
    
    //this code is necessary if using ASK SDK versions prior to 1.0.9 
    if(this.isOverridden()) {
            return;
        }
        this.handler.response = buildSpeechletResponse({
            sessionAttributes: this.attributes,
            directives: getDialogDirectives('Dialog.Delegate', updatedIntent, null),
            shouldEndSession: false
        });
        this.emit(':responseReady', updatedIntent);
        
    } else if (this.event.request.dialogState !== "COMPLETED") {
    console.log("in not completed");
    // return a Dialog.Delegate directive with no updatedIntent property.
    //this.emit(":delegate"); //uncomment this is using ASK SDK 1.0.9 or newer
    
    //this code necessary is using ASK SDK versions prior to 1.0.9
        if(this.isOverridden()) {
            return;
        }
        this.handler.response = buildSpeechletResponse({
            sessionAttributes: this.attributes,
            directives: getDialogDirectives('Dialog.Delegate', updatedIntent, null),
            shouldEndSession: false
        });
        this.emit(':responseReady');
        
    } else {
    console.log("in completed");
    console.log("returning: "+ JSON.stringify(this.event.request.intent));
    // Dialog is now complete and all required slots should be filled,
    // so call your normal intent handler.
    return this.event.request.intent;
    }
}


function randomPhrase(array) {
    // the argument is an array [] of words or phrases
    var i = 0;
    i = Math.floor(Math.random() * array.length);
    return(array[i]);
}
function isSlotValid(request, slotName){
        var slot = request.intent.slots[slotName];
        //console.log("request = "+JSON.stringify(request)); //uncomment if you want to see the request
        var slotValue;

        //if we have a slot, get the text and store it into speechOutput
        if (slot && slot.value) {
            //we have a value in the slot
            slotValue = slot.value.toLowerCase();
            return slotValue;
        } else {
            //we didn't get a value in the slot.
            return false;
        }
}

//These functions are here to allow dialog directives to work with SDK versions prior to 1.0.9
//will be removed once Lambda templates are updated with the latest SDK

function createSpeechObject(optionsParam) {
    if (optionsParam && optionsParam.type === 'SSML') {
        return {
            type: optionsParam.type,
            ssml: optionsParam['speech']
        };
    } else {
        return {
            type: optionsParam.type || 'PlainText',
            text: optionsParam['speech'] || optionsParam
        };
    }
}

function buildSpeechletResponse(options) {
    var alexaResponse = {
        shouldEndSession: options.shouldEndSession
    };

    if (options.output) {
        alexaResponse.outputSpeech = createSpeechObject(options.output);
    }

    if (options.reprompt) {
        alexaResponse.reprompt = {
            outputSpeech: createSpeechObject(options.reprompt)
        };
    }

    if (options.directives) {
        alexaResponse.directives = options.directives;
    }

    if (options.cardTitle && options.cardContent) {
        alexaResponse.card = {
            type: 'Simple',
            title: options.cardTitle,
            content: options.cardContent
        };

        if(options.cardImage && (options.cardImage.smallImageUrl || options.cardImage.largeImageUrl)) {
            alexaResponse.card.type = 'Standard';
            alexaResponse.card['image'] = {};

            delete alexaResponse.card.content;
            alexaResponse.card.text = options.cardContent;

            if(options.cardImage.smallImageUrl) {
                alexaResponse.card.image['smallImageUrl'] = options.cardImage.smallImageUrl;
            }

            if(options.cardImage.largeImageUrl) {
                alexaResponse.card.image['largeImageUrl'] = options.cardImage.largeImageUrl;
            }
        }
    } else if (options.cardType === 'LinkAccount') {
        alexaResponse.card = {
            type: 'LinkAccount'
        };
    } else if (options.cardType === 'AskForPermissionsConsent') {
        alexaResponse.card = {
            type: 'AskForPermissionsConsent',
            permissions: options.permissions
        };
    }

    var returnResult = {
        version: '1.0',
        response: alexaResponse
    };

    if (options.sessionAttributes) {
        returnResult.sessionAttributes = options.sessionAttributes;
    }
    return returnResult;
}

function getDialogDirectives(dialogType, updatedIntent, slotName) {
    let directive = {
        type: dialogType
    };

    if (dialogType === 'Dialog.ElicitSlot') {
        directive.slotToElicit = slotName;
    } else if (dialogType === 'Dialog.ConfirmSlot') {
        directive.slotToConfirm = slotName;
    }

    if (updatedIntent) {
        directive.updatedIntent = updatedIntent;
    }
    return [directive];
}