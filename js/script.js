//----- LEZIONE 19-04-2021-----


function initVue(){

  new Vue({


    el:'#app',
    data:{

      filmCollection:[],
      serieCollection:[],

      flags: {
        it:'./img/ita.png',
        en:'./img/en.png'
      },

      'ricerca': '',
      // css classes

    },


    methods:{

      searchInMovies: function(){
        //----------------- Films ----------------------
        axios.get('https://api.themoviedb.org/3/search/movie', {

          params:{
            'api_key': '4955b3ad5fd2000eecc33be3fbdbb4f8',
            'query': this.ricerca,
          }
        })

        .then(data => {
          this.filmCollection = data.data.results;
          this.ricerca = '';
          console.log(this.filmCollection, 'films');
        })

        .catch(() => console.log('error'))

        // ---------------- TV Series --------------------
        axios.get('https://api.themoviedb.org/3/search/tv', {

          params:{
            'api_key': '4955b3ad5fd2000eecc33be3fbdbb4f8',
            'query': this.ricerca,
          }
        })

        .then(data => {
          this.serieCollection = data.data.results;
          this.ricerca = '';
          console.log(this.serieCollection,'serie tv');
        })

        .catch(() => console.log('error'))


      }, /*---- end of searchInMovies ----*/

      getVote: function (vote){
        let localVote = vote;
        return Math.round(localVote / 2);
      },




    },


  });

}





function init(){

  initVue();
}

document.addEventListener('DOMContentLoaded', init);
