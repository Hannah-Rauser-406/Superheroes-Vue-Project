var title = 'Superheroes';

var app = new Vue({
  el: "#app",
  data: {
      title: title,
      heroes: undefined,
      postTitle: "Create a Superhero",
      name: undefined,
      superpower: undefined,
      img: undefined,
  },
  created:function(){
    this.fetchData()
  },
      methods: {
      fetchData: function(){
        var self = this
        //if you just used this without defining it as self and tried to use the .ajax method it would only refer to the ajax method
        $.ajax({
            method: "GET",
            url: "/api/heroes",
        }).done(function(response){
          self.heroes = response.data
          console.log("received heroes", self.heroes);
      })
      },
      postHero: function(){
        var self = this;
        var newSuperhero = {
          name: this.name,
          superpower: this.superpower,
          img: this.img,
        };
        console.log("New superhero")
        $.ajax({
          url: '/api/heroes',
          method: 'POST',
          data: newSuperhero
        }).done(function(response){
          console.log(response.data, "Hero created!");
        })
      }
      //Syntax error on 45
      deleteHero: function(_id){
        console.log("Deleting Hero", _id);
        var self = this;
        $.ajax({
          method: "DELETE",
          url: '/api/heroes/'+ _id,
        }).done(function(response){
          console.log(response);
        });
      }
  }
});
