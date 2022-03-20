// Use JSDELIVR to get the files from a GitHub repository
// https://cdn.jsdelivr.net/gh/<github-username>/<repository-name>/
var repo_site = "https://cdn.jsdelivr.net/gh/dvitaa/jsPsych-in-Qualtrics61/countingstroop/";

/* experiment parameters */
var reps_per_trial_type_practice = 1;
var reps_per_trial_type = 1;

/*set up welcome block*/
var welcome = {
    type: "html-keyboard-response",
    stimulus: "Press any key to continue."
};

/*set up practice instructions block*/
var instructions_practice = {
    type: "html-keyboard-response",
    stimulus: "<p>For this task, you will see words appear on the screen. </p>" +
        "<p> All words will be number words, such as 'two'. </p>" +
        "<p> Words will be written either once, twice, three times, or four times.</p>" +
        "<p> Press: </p>" +
        "<p>  1 if the word appears only once </p>" +
        "<p>  2 if it appears twice </p>" +
        "<p>  3 if it appears three times </p>" +
        "<p>  4 if it appears four times. </p>" +
        "<p> Ignore the meaning of the word, just focus on how many times it is presented. </p>" +
        "<p> Please try to respond as quickly as you can, while making as few mistakes as possible. </p>" +
        "<p> You will complete a set of practice trials before you begin. </p>" +
        "<p> Press any key to begin the practice trials. </p>",

    post_trial_gap: 1000
};

/*defining stimuli*/ //*add imgs*//
var test_stimuli = [{
    stimulus: repo_site + "img/1con.png",
    data: {
        stim_type: 'congruent',
        count: '1'
    } 
},
{
    stimulus: repo_site + "img/1incon2.png",
    data: {
        stim_type: 'incongruent',
        count: '2'
    }
},
{
    stimulus: repo_site + "img/1incon3.png",
    data: {
        stim_type: 'incongruent',
        count: '3'
    }
},
{
    stimulus: repo_site + "img/1incon4.png",
    data: {
        stim_type: 'incongruent',
        count: '4'
    }
},
{

    stimulus: repo_site + "img/2incon1.png",
    data: {
        stim_type: 'incongruent',
        count: '1'
        }
    },
{
    stimulus: repo_site + "img/2con.png",
    data: {
        stim_type: 'congruent',
        count: '2'
        }
    },
    {
    stimulus: repo_site + "img/2incon3.png",
    data: {
        stim_type: 'incongruent',
        count: '3'
        }
    },
    {
    stimulus: repo_site + "img/2incon4.png",
    data: {
        stim_type: 'incongruent',
        count: '4'
        }
},
{
    stimulus: repo_site + "img/3incon1.png",
    data: {
        stim_type: 'incongruent',
        count: '1'
    }
},
{
    stimulus: repo_site + "img/3incon2.png",
    data: {
        stim_type: 'incongruent',
        count: '2'
    }
},
{
    stimulus: repo_site + "img/3con.png",
    data: {
        stim_type: 'congruent',
        count: '3'
    }
},
{
    stimulus: repo_site + "img/3incon4.png",
    data: {
        stim_type: 'incongruent',
        count: '4'
    }
},
{

    stimulus: repo_site + "img/4incon1.png",
    data: {
        stim_type: 'incongruent',
        count: '1'
        }
    },
{
    stimulus: repo_site + "img/4incon2.png",
    data: {
        stim_type: 'congruent',
        count: '2'
        }
    },
    {
        stimulus: repo_site + "img/4incon3.png",
        data: {
            stim_type: 'incongruent',
            count: '3'
        }
    },
    {
        stimulus: repo_site + "img/4con.png",
        data: {
            stim_type: 'incongruent',
            count: '4'
        }
}
];

/*defining practice trial*/

var practice = {
    timeline: [{
        type: 'image-keyboard-response',
        choices: [49, 50, 51, 52],
        trial_duration: 1500,
        stimulus: jsPsych.timelineVariable('stimulus'),
        data: jsPsych.timelineVariable('data'),
         on_finish: function (data) {
            var correct = false;
            if (data.count == '1' && data.key_press == 49 && data.rt > -1) {
                correct = true;
            } else if (data.count == '2' && data.key_press == 50 && data.rt > -1) {
                correct = true;
            } else if (data.count == '3' && data.key_press == 51 && data.rt > -1) {
                correct = true;
            } else if (data.count == '4' && data.key_press == 52 && data.rt > -1) {
                correct = true;
            }
            data.correct = correct;
            data.practice = 1;
        },
        post_trial_gap: function () {
            return Math.floor(Math.random() * 1500) + 500;
        }
    }],
    timeline_variables: test_stimuli,
    sample: {
        type: 'fixed-repetitions',
        size: reps_per_trial_type_practice
    }
};

/*task instructions*/
var instructions = {
    type: "html-keyboard-response",
    stimulus: "<p> The task will now begin. Press any key to start. </p>",
    post_trial_gap: 1000
};


/* defining test timeline */
var test = {
    timeline: [{
        type: 'image-keyboard-response',
        choices: [49, 50, 51, 52],
        trial_duration: 1500,
        stimulus: jsPsych.timelineVariable('stimulus'),
        data: jsPsych.timelineVariable('data'),
        on_finish: function (data) {
            var correct = false;
            if (data.count == '1' && data.key_press == 49 && data.rt > -1) {
                correct = true;
            } else if (data.count == '2' && data.key_press == 50 && data.rt > -1) {
                correct = true;
            }else if (data.count == '3' && data.key_press == 51 && data.rt > -1) {
                correct = true;
            }else if (data.count == '4' && data.key_press == 52 && data.rt > -1) {
                correct = true;
            }
            data.correct = correct;
            data.practice = 0;
        },
        post_trial_gap: function () {
            return Math.floor(Math.random() * 1500) + 500;
        }
    }],
    timeline_variables: test_stimuli,
    sample: {
        type: 'fixed-repetitions',
        size: reps_per_trial_type
    }
};

/*maybe don't use count*/
/*defining debriefing block*/
var debrief = {
    type: "html-keyboard-response",
    stimulus: function () {
        /* var total_trials = jsPsych.data.get().filter({
            trial_type: 'image-keyboard-response'
        }).count();
        var accuracy_stroop = Math.round(jsPsych.data.get().filter({
            correct: true
        }).count() / total_trials * 100);
        var noun_rt = Math.round(jsPsych.data.get().filter({
            correct: true,
            stim_type: 'noun'
        }).select('rt').mean());
        var number_rt = Math.round(jsPsych.data.get().filter({
            correct: true,
            stim_type: 'number'
        }).select('rt').mean());
        return "<p>You responded correctly on <strong>" + accuracy_stroop + "%</strong> of the trials.</p> " +
            "<p>Your average response time for noun trials was <strong>" + noun_rt + "ms</strong>.</p>" +
            "<p>Your average response time for number trials was <strong>" + number_rt + "ms</strong>.</p>" +
            "<p>Press any key to complete the experiment. Thank you!</p>";*/
        return "Press any key to continue"
    }
};

/*set up experiment structure*/

var timeline = [];
timeline.push(welcome);
timeline.push(instructions_practice);
timeline.push(practice);
timeline.push(instructions);
timeline.push(test);
timeline.push(debrief);
