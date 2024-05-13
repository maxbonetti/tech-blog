const { dateHelper } = require('date-fns');

const helpers = {
    formatDate: (date) => {
        return dateHelper(new Date(date), 'MMMM dd, yyyy');
    }
};

module.exports = helpers;