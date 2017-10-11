import axios from "axios";

const APIKEY = "cd6565bd65d149ad84f23ade76e66355";

const helpers = {
    runQuery: function(term, start, end) {
        let formattedTerm = term.trim();
        let formattedStart = start.trim() + '0101';
        let formattedEnd = end.trim() + '1231';

        return axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', {
            params: {
                'api-key': APIKEY,
                'q': formattedTerm,
                'begin_date': formattedStart,
                'end_date': formattedEnd
            }
        })
        .then(function(results){
            console.log('axios', results);
            return results.data.response;
        });
    },
    postSaved: function(title, url, date) {
        var newBook = {title: title, url: url, date: date};
        return axios.post("/api/books/saved", newBook)
        .then(function(response) {
            return response.data._id;
        });
    }
};

export default helpers;