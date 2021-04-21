//----- LEZIONE 19-04-2021-----


function initVue(){

  new Vue({


    el:'#app',
    data:{

      filmCollection:[],
      serieCollection:[],
      // cast:[],
      flags: {
        it:'./img/ita.png',
        en:'./img/en.png'
      },

      ricerca: '',
      showCast: false,
    },


    methods:{

      search: function(){
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



      // ----------------------------cast for Movies------------------------
      getCastMovie: function(film){
        this.showCast = !this.showCast
        const url = 'https://api.themoviedb.org/3/movie/'+ film.id + '/credits';
        axios.get(url, {

          params:{
            'api_key': '4955b3ad5fd2000eecc33be3fbdbb4f8',
          }
        })

        .then(data => {
          const castArr = [];
          for(let i=0; i<5;i++){

            let actor = data.data.cast[i];
            castArr.push(actor)
          };
          //    oggetto  proprietà  valore assegnato alla proprietà
          Vue.set(film, 'cast', castArr);
          // film.cast = data.data.cast;

          console.log(data.data.cast,'castFilm');

        })

        .catch(() => console.log('error'))
      },

      // ----------------------------cast for Serie------------------------
      getCastSerie: function(serie){
        this.showCast = !this.showCast
        const url = 'https://api.themoviedb.org/3/tv/'+ serie.id + '/credits';
        axios.get(url, {

          params:{
            'api_key': '4955b3ad5fd2000eecc33be3fbdbb4f8',
          }
        })

        .then(data => {
          const castArr = [];
          for(let i=0; i<5;i++){

            let actor = data.data.cast[i];
            castArr.push(actor)
          };
          //    oggetto  proprietà  valore assegnato alla proprietà
          Vue.set(serie, 'cast', castArr);
          // film.cast = data.data.cast;

          console.log(data, data.data.cast,'castSerie');

        })

        .catch(() => console.log('error'))
      },

      whenMouseOut: function (){

        this.showCast = false;
      },


      //------------ a function to get the average vote--------------
      getVote: function (vote){
        let localVote = vote;
        return Math.round(localVote / 2);
      },

      //------------ a function to cut the text--------------
      cutText: function (text, length, suffix) {

        if (text.length > length) {
          return text.substring(0, length) + suffix;
        } else {
          return text;
        }
      },

      compare: function(title1, title2){

        if(title1.toLowerCase() != title2.toLowerCase()){

          return title2;
        } else {}
      },

    },


  });

}





function init(){

  initVue();
}

document.addEventListener('DOMContentLoaded', init);
