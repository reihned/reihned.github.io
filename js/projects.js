const projectTemplate = [ '<article class=\"row\">'
                            '<details class=\"row\">',
                              '<summary> <%= name %> </summary>',
                              '<a class=\"row\" href=\"<%= link %>\" > <%= link %> </a>',
                              '<p class=\"row\"> <%= description %> </p>',
                            '</details>'
                          '</article>'
                        ].join("");

var Ray = {};

Ray.Project = Backbone.Model.extend({
  initialize: function(){
    console.log("Projects! Projects Galore!");
  },

  defaults: {
    name: "",
    link: "",
    description: "",
  }
});

Ray.Projects = Backbone.Collection.extend({
  model: Ray.Project
  url: '/json/projects.json'
});
