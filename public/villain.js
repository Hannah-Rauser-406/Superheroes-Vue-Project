var title = 'Villains';

var app = new Vue({
  el: "#app",
  data: {
      title: title,
      villains: undefined,
      postTitle: "Create a Villain",
      name: undefined,
      evilPower: undefined,
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
            url: "/api/villains",
        }).done(function(response){
          console.log(response);
          self.villains = response.data
          console.log("received villains", self.villains);
      })
      },
      postVillain: function(){
        var self = this;
        var newVillain = {
          name: this.name,
          evilPower: this.evilPower,
          img: this.img,
        };
        console.log("New villain")
        $.ajax({
          url: '/api/villains',
          method: 'POST',
          data: newVillain
        }).done(function(response){
          console.log(response);
          console.log(response.data, "Villain created!");
        })
      },
      deleteVillain: function(_id){
        console.log("Deleting Villain", _id);
        var self = this;
        $.ajax({
          method: "DELETE",
          url: '/api/villains/'+ _id,
        }).done(function(response){
          console.log(response);
        });
      }
  }
});
