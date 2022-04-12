Qualtrics.SurveyEngine.addOnload(function () {

    /*Place your JavaScript here to run when the page loads*/

    /* Change 1: Hiding the Next button */
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    /* Change 2: Defining and load required resources */
    // https://cdn.jsdelivr.net/gh/<github-username>/<repository-name>/<experiment-folder>
    var task_github = "https://cdn.jsdelivr.net/gh/dvitaa/jsPsych-in-Qualtrics64/countingstroop/";

    // requiredResources must include all the JS files that demo-simple-rt-task-transformed.html uses.
    var requiredResources = [
        task_github + "jspsych-6.1.0/jspsych.js",
        task_github + "jspsych-6.1.0/plugins/jspsych-html-keyboard-response.js",
        task_github + "jspsych-6.1.0/plugins/jspsych-image-keyboard-response.js",
        task_github + "countingstroop_main.js"
    ];

    function loadScript(idx) {
        console.log("Loading ", requiredResources[idx]);
        jQuery.getScript(requiredResources[idx], function () {
            if ((idx + 1) < requiredResources.length) {
                loadScript(idx + 1);
            } else {
                initExp();
            }
        });
    }

    if (window.Qualtrics && (!window.frameElement || window.frameElement.id !== "mobile-preview-view")) {
        loadScript(0);
    }

    /* Change 3: Appending the display_stage Div using jQuery */
    // jQuery is loaded in Qualtrics by default
    jQuery("<div id = 'display_stage_background'></div>").appendTo('body');
    jQuery("<div id = 'display_stage'></div>").appendTo('body');

    /* Change 4: Wrapping jsPsych.init() in a function */
    function initExp() {

        jsPsych.init({
            timeline: timeline,
            display_element: 'display_stage',
            on_finish: function (data) {
                /* Change 5: Summarizing and save the results to Qualtrics */
                // summarize the results
                var total_trials = jsPsych.data.get().filter({
                    trial_type: 'image-keyboard-response',
					practice: 0
                }).count();
                var stroop_accuracy = Math.round(jsPsych.data.get().filter({
                    correct: true,
                    practice: 0
                }).count() / total_trials * 100);
				
                var stroop_raw = jsPsych.data.get().filter({
                        practice: 0
                    }).values()
                    
                var strooptrials;
                for (let i = 0; i < Math.ceil(Object.keys(stroop_raw).length / 30); i++) { 
                        strooptrials = JSON.stringify(stroop_raw.slice(i*30, (i+1)*30));
                        Qualtrics.SurveyEngine.setEmbeddedData("stroop_trials_"+i, strooptrials);

                    }

                // console.log(strooptrials);

                // save to qualtrics embedded data

                Qualtrics.SurveyEngine.setEmbeddedData("accuracy_stroop", accuracy_stroop);
                Qualtrics.SurveyEngine.setEmbeddedData("num_columns", i+1)
                // Qualtrics.SurveyEngine.setEmbeddedData("congruent_rt", congruent_rt);
                // Qualtrics.SurveyEngine.setEmbeddedData("incongruent_rt", incongruent_rt);
                
                // Qualtrics.SurveyEngine.setEmbeddedData("incongruent_trials", incongruent_trials);

                /* Change 6: Adding the clean up and continue functions.*/
                // clear the stage
                jQuery('#display_stage').remove();
                jQuery('#display_stage_background').remove();

                // simulate click on Qualtrics "next" button, making use of the Qualtrics JS API
                qthis.clickNextButton();
            }
        });
    }
});

Qualtrics.SurveyEngine.addOnReady(function () {
    /*Place your JavaScript here to run when the page is fully displayed*/

});

Qualtrics.SurveyEngine.addOnUnload(function () {
    /*Place your JavaScript here to run when the page is unloaded*/

});