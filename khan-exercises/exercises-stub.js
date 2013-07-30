/**
 * Stub version of the Exercises object used in the live Khan Academy site.
 */
var Exercises = {
    localMode: true,

    khanExercisesUrlBase: "../../khan-exercises/",

    getCurrentFramework: function() {
        return "khan-exercises";
    },

    PerseusBridge: {
        cleanupProblem: function() {
            return false;
        }
    }
};
