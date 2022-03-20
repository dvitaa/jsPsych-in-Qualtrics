Qualtrics.SurveyEngine.addOnload(function () {

    /*Place your JavaScript here to run when the page loads*/

    /* Change 1: Hiding the Next button */
    // Retrieve Qualtrics object and save in qthis
    var qthis = this;

    // Hide buttons
    qthis.hideNextButton();

    /* Change 2: Defining and load required resources */
    // https://cdn.jsdelivr.net/gh/<github-username>/<repository-name>/<experiment-folder>
    var task_github = "https://cdn.jsdelivr.net/gh/dvitaa/jsPsych-in-Qualtrics60/flanker/";

    // requiredResources must include all the JS files that demo-simple-rt-task-transformed.html uses.
    var requiredResources = [
        task_github + "jspsych-6.1.0/jspsych.js",
        task_github + "jspsych-6.1.0/plugins/jspsych-html-keyboard-response.js",
        task_github + "jspsych-6.1.0/plugins/jspsych-image-keyboard-response.js",
        task_github + "flanker_main.js"
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
                var accuracy_flanker = Math.round(jsPsych.data.get().filter({
                    correct: true,
                    practice: 0
                }).count() / total_trials * 100);
				
				//var ctr = 1;

                // get congruent trial values as an array
                /*var congruent_arr = jsPsych.data.get().filter({
                    stim_type: 'congruent',
                    practice: 0
                }).values()*/
				
                /*// create string of form "trial_1:283,trial_2:100"
                var congr_arr_len = congruent_arr.length;
                var congruent_trials = "";
				
                for (var i = 1; i <= congr_arr_len; i++) {
                    console.log(i);
                    console.log(congruent_arr[i]);
                    congruent_trials += 'trial_' +  String(ctr)   + ':' + String(congruent_arr[i-1].rt);
					if (i != congr_arr_len) {
						congruent_trials += ',';
					}
					ctr++;
                }
                console.log(congruent_trials);*/

                var flanker_trials = JSON.stringify(jsPsych.data.get().filter({
                        //stim_type: 'incongruent',
                        practice: 0
                    }).values())

                // var incongruent_arr = jsPsych.data.get().filter({
                //     stim_type: 'incongruent',
                //     practice: 0
                // }).values()
				
				// var incongr_arr_len = incongruent_arr.length;
                // var incongruent_trials = "";
				
                // for (var i = 1; i <= incongr_arr_len; i++) {
                //     console.log(i);
                //     console.log(incongruent_arr[i]);
                //     incongruent_trials += 'trial_' +  String(ctr) + ':' + String(incongruent_arr[i-1].rt);
				// 	if (i != incongr_arr_len) {
				// 		incongruent_trials += ',';
				// 	}
				// 	ctr++;
                // }
                console.log(flanker_trials);
				
				

                // var congruent_rt = Math.round(jsPsych.data.get().filter({
                //     correct: true,
                //     stim_type: 'congruent',
                //     practice: 0
                // }).select('rt').mean());
                // var incongruent_rt = Math.round(jsPsych.data.get().filter({
                //     correct: true,
                //     stim_type: 'incongruent',
                //     practice: 0
                // }).select('rt').mean());
                

                // save to qualtrics embedded data

                Qualtrics.SurveyEngine.setEmbeddedData("accuracy_flanker", accuracy_flanker);
                // Qualtrics.SurveyEngine.setEmbeddedData("congruent_rt", congruent_rt);
                // Qualtrics.SurveyEngine.setEmbeddedData("incongruent_rt", incongruent_rt);
                Qualtrics.SurveyEngine.setEmbeddedData("flanker_trials", flanker_trials);
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