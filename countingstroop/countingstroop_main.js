// Use JSDELIVR to get the files from a GitHub repository
// https://cdn.jsdelivr.net/gh/<github-username>/<repository-name>/
var repo_site = "https://cdn.jsdelivr.net/gh/dvitaa/jsPsych-in-Qualtrics05/countingstroop/";

/* experiment parameters */
var reps_per_trial_type_practice = 1;
var reps_per_trial_type = 2;

/*set up welcome block*/
var welcome = {
    type: "html-keyboard-response",
    stimulus: "You will now complete a series of tasks. Press any key to begin."
};

/*set up practice instructions block*/
var instructions_practice = {
    type: "html-keyboard-response",
    stimulus: "<p>In this task, you will see words on a screen, like the example below.</p>" +
        "<img src='" + repo_site + "img/4.png'></img>" +
        "<p> Count the number of words on the screen. </p>" +
        "<p>Press the number key corresponding to the number of words on the screen. </p>" +
        "<p> For example, if there is 1 word on the screen you will press the '1' number key on your keyboard. </p>" +
        "<p>You will first complete a practice round. </p>" +
        "<p>Press any key to begin.</p>",
    post_trial_gap: 1000
};

/*defining stimuli*/ //*add imgs*//
var test_stimuli = [{
        stimulus: repo_site + "img/1.png",
        data: {
            stim_type: 'noun',
            count: '4'
        }
    },
    {
        stimulus: repo_site + "img/2.png",
        data: {
            stim_type: 'noun',
            count: '3'
        }
    },
    {
       stimulus: repo_site + "img/3.png",
        data: {
            stim_type: 'noun',
            count: '2'
        }
    },
    {
        stimulus: repo_site + "img/4.png",
        data: {
            stim_type: 'noun',
            count: '1'
        } 
    },
    {
    stimulus: repo_site + "img/5.png",
        data: {
            stim_type: 'number',
            count: '4'
        }
    },
    {
        stimulus: repo_site + "img/6.png",
        data: {
            stim_type: 'number',
            count: '3'
        }
    },
    {
       stimulus: repo_site + "img/7.png",
        data: {
            stim_type: 'number',
            count: '2'
        }
    },
    {
        stimulus: repo_site + "img/8.png",
        data: {
            stim_type: 'number',
            count: '1'
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
        data_prac: jsPsych.timelineVariable('data_prac'),
         on_finish: function (data) {
            var correct = false;
            if (data_prac.count == '1' && data_prac.key_press == 49 && data_prac.rt > -1) {
                correct = true;
            } else if (data_prac.count == '2' && data_prac.key_press == 50 && data_prac.rt > -1) {
                correct = true;
            }else if (data_prac.count == '3' && data_prac.key_press == 51 && data_prac.rt > -1) {
                correct = true;
            }else if (data_prac.count == '4' && data_prac.key_press == 52 && data_prac.rt > -1) {
                correct = true;
            }
            data_prac.correct = correct;
        },
        post_trial_gap: function () {
            return Math.floor(Math.random() * 1000) + 500;
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
        var total_trials = jsPsych.data.get().filter({
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
            "<p>Press any key to complete the experiment. Thank you!</p>";
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


/*is the data also coming from "practice"?*/