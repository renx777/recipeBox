var Modal = ReactBootstrap.Modal;
var Accordion = ReactBootstrap.Accordion;
var Button = ReactBootstrap.Button;
var Popover = ReactBootstrap.Popover;
var Tooltip = ReactBootstrap.Tootip;
var FormGroup = ReactBootstrap.FormGroup;
var Input = ReactBootstrap.Input;
var Textarea = ReactBootstrap.TextArea;
var FormControl = ReactBootstrap.FormControl;
var ListGroup = ReactBootstrap.ListGroup,
    ListGroupItem = ReactBootstrap.ListGroupItem;
var Panel = ReactBootstrap.Panel;

var AddModal = React.createClass({
  displayName: "AddModal",
  getInitialState: function getInitialState() {
    return { showModal: false };
  },
  close: function close() {
    this.setState({ showModal: false });
  },
  open: function open() {
    this.setState({ showModal: true });
  },
  render: function render() {

    return React.createElement(
      "div",
      null,
      React.createElement(
        Button,
        {
          bsStyle: this.props.bStyle,
          bsSize: this.props.bSize,
          onClick: this.open
        },
        this.props.name
      ),
      React.createElement(
        Modal,
        { show: this.state.showModal, onHide: this.close },
        React.createElement(
          Modal.Header,
          { closeButton: true },
          React.createElement(
            Modal.Title,
            null,
            this.props.title
          )
        ),
        React.createElement(
          Modal.Body,
          null,
          React.createElement(Input, {
            id: "name",
            type: "text",
            label: "Recipe",
            placeholder: "Recipe Name",
            defaultValue: this.props.rvalue
          }),
          React.createElement(Input, {
            id: "ingri",
            type: "textarea",
            label: "Ingredients",
            placeholder: "Enter Ingredients,Separated,By Commas",
            defaultValue: this.props.ivalue
          })
        ),
        React.createElement(
          Modal.Footer,
          null,
          React.createElement(
            Button,
            { id: "blue", bsStyle: "primary", "data-key": this.props.keys, onClick: this.props.onClick },
            this.props.title
          ),
          React.createElement(
            Button,
            { onClick: this.close },
            "Close"
          )
        )
      )
    );
  }
});

var RecipeBox = React.createClass({
  displayName: "RecipeBox",
  getInitialState: function getInitialState() {
    return {
      recipes: [{
        name: "Pumpkin Pie",
        ingredients: ["Pumpkin Puree", "Sweetened Condensed Milk", "Eggs", "Pumpkin Pie Spice", "Pie Crust"]
      }, {
        name: "Spaghetti",
        ingredients: ["Noodles", "Tomato Sauce", "(Optional) Meatballs"]
      }, {
        name: "Onion Pie",
        ingredients: ["Onion", "Pie Crust", "Sounds Yummy right?"]
      }]
    };
  },
  addRecipe: function addRecipe(x) {
    var recipe = {};
    recipe.name = $("#name").val();
    recipe.ingredients = $("#ingri").val().split(",");

    var newState = this.state.recipes;
    newState.push(recipe);
    this.setState({
      recipes: newState
    });
  },
  editRecipe: function editRecipe(e) {
    var orecipe = {};
    orecipe.name = $("#name").val();
    orecipe.ingredients = $("#ingri").val().split(",");

    var i = e.target.attributes.getNamedItem("data-key").value;
    var editedRecipe = this.state.recipes;
    editedRecipe[i].name = orecipe.name;
    editedRecipe[i].ingredients = orecipe.ingredients;
    this.setState({
      recipes: editedRecipe
    });
  },
  delete: function _delete(e) {
    var i = e.target.attributes.getNamedItem("data-key").value;
    var editedRecipe = this.state.recipes;

    editedRecipe.splice(i, 1);
    this.setState({
      recipes: editedRecipe
    });
  },
  render: function render() {
    return React.createElement(
      "div",
      null,
      React.createElement(RecipeBars, { recipes: this.state.recipes, editRecipe: this.editRecipe, "delete": this.delete, onClick: this.addRecipe }),
      React.createElement(AddModal, {
        onClick: this.addRecipe,
        title: "Add a Recipe",
        name: "Add Recipe",
        bSize: "large",
        bStyle: "primary"
      })
    );
  }
});

var RecipeBars = React.createClass({
  displayName: "RecipeBars",
  render: function render() {
    var _this = this;

    var recipes = this.props.recipes;

    var bars = recipes.map(function (recipe, i) {
      var igrid = recipe.ingredients.map(function (val, i) {
        return React.createElement(
          ListGroupItem,
          null,
          val
        );
      });
      var hstyle = { "text-align": "center" };
      var bstyle = { "margin-right": "5px", float: "right", display: "inline" };

      return React.createElement(
        Panel,
        { eventKey: i, bsStyle: "success", collapsible: true, header: recipe.name },
        React.createElement(
          "h4",
          { style: hstyle },
          "Ingredients"
        ),
        React.createElement(
          ListGroup,
          { fill: true },
          igrid
        ),
        React.createElement(
          Button,
          { "data-key": i, style: bstyle, onClick: _this.props.delete, bsSize: "small", bsStyle: "danger" },
          "delete"
        ),
        React.createElement(AddModal, {
          title: "Edit Recipe",
          onClick: _this.props.editRecipe,
          keys: i,
          name: "Edit",
          bSize: "small",
          bStyle: "info",
          rvalue: recipe.name,
          ivalue: recipe.ingredients.join(',')
        })
      );
    });

    return React.createElement(
      "div",
      null,
      React.createElement(
        Accordion,
        { onSelect: this.pclick },
        bars
      )
    );
  }
});

// ReactDOM.render(<AddModal title="Add a Recipe" name="Add Recipe" bSize="large" bStyle="primary"/>,document.getElementById('app'))

ReactDOM.render(React.createElement(RecipeBox, null), document.getElementById("app"));