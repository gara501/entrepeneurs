import React, { Component } from 'react';
import Data from './data/people.json'
import './App.css';
import './styles.css';
import logo from './logo.png';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessData: [],
      cityFilters: [],
      typeFilters: [],
      filteredData: [],
      categorySelected: 'Todas',
      categoryFilters: [],
      category: 'All'
    };
    this.handleChecked = this.handleChecked.bind(this);
    this.handleCheckedSecondary = this.handleCheckedSecondary.bind(this);
    this.showMenu = this.showMenu.bind(this);
  }

  componentDidMount() {
    this.setState({cityFilters: this.cityFilters()});
    this.setState({typeFilters: this.typeFilters()});
    this.setState({categoryFilters: this.categoryFilters()});
    this.getChecked();
  }

  getChecked() {
    let filters = document.querySelectorAll('input[type=checkbox]');

    let checked = {
      all: []
    };

    let empty = [].filter.call( filters, function( el ) {
      return !el.value
    });
    let filled = [].filter.call( filters, function( el ) {
      if (el.checked) {
        return el.checked
      }
    });
    
    if (filters.length === empty.length) {
      this.setState({businessData: Data});
      this.setState({filteredData: Data});
    } else {
      checked.all = filled;
    }

    return checked;
  }

  handleChecked (e) {
    e.persist();
    let filters = this.getChecked();
    let newData = [];
    let finalData = [];
    
    if (filters.all.length > 0) {
      filters.all.forEach(item => {
        console.log('item', item); 
        if (item.dataset['type'] === 'city') {
          newData = Data.filter(itemJson => {
            return itemJson.city === item.value;
          });
          finalData.push(...newData);
          this.setState({filteredData: finalData});
        }
        return newData;
      });
      this.setState({businessData: finalData});
    } else {
      this.setState({businessData: Data});
    }
  }

  handleCheckedSecondary (e) {
    e.persist();
    let newData = [];
    let selected = e.target.dataset['type'];
    let selectedValue = e.target.value;
    
    if (selected === 'category') {
     if (selectedValue !== 'all') {
        newData = this.state.filteredData.filter(item => {
          this.setState({categorySelected: selectedValue});
          return item.category === selectedValue;
        });
     } else {
        this.setState({categorySelected: 'Todas'});
        newData = this.state.filteredData;
     } 
      this.setState({businessData: newData});
    }
  }

  showMenu(e) {
    const menu = document.querySelector('.full-side');

  }

  moveIntro(e) {
    e.preventDefault();
    let introDiv = document.querySelector('.full-side');
    let contentDiv = document.querySelector('.content');
    introDiv.classList.add('out');
    contentDiv.classList.add('active');
  }

  cityFilters() {
    let cities = [];
    Data.map((item, key) => 
      cities.push(item.city)
    );
    var cleanCities = [ ...new Set(cities) ];
    return cleanCities;
  }

  typeFilters() {
    let types = [];
    Data.map((item, key) => 
      types.push(item.type)
    );
    var cleanTypes = [ ...new Set(types) ];
    return cleanTypes;
  }

  categoryFilters() {
    let category = [];
    Data.map((item, key) => 
      category.push(item.category)
    );
    var cleanClass = [ ...new Set(category) ];
    return cleanClass;
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <button className="menu-mobile-action">
            <i className="material-icons">menu</i>
          </button>
          <div className="full-side">
            <div className="intro">
              <h1 className="intro-title">Emprendedores Colombianos, busca lo que necesites, en la ciudad que necesites!</h1>
              <button id="introButton" className="button button-inverse" onClick={this.moveIntro}>Ver Emprendimientos</button>
            </div>
          </div>
          <div className="content">
            <div className="left-side">
              <div className="logo">
                <img src={logo} alt="logo" />
              </div>
              <div className="form-block">
                <h4 className="title">Ciudad</h4>
                {this.state.cityFilters.map((item, key) => 
                  <div className="filters filters-city" key={key}>
                    <input type="checkbox" id={"city_"+key} data-type="city" value={item} onChange={ this.handleChecked } /> <label htmlFor={"city_"+key}>{item}</label>
                  </div>
                )}
              </div>
              <div className="form-block">              
                <h4 className="title">Categoría</h4>
                <div className="filters filters-type">
                  <input type="radio" id={"classif_all"} data-type="category" name="category" value="all" onChange={ this.handleCheckedSecondary } /> <label htmlFor={"classif_all"}>Todas</label>
                </div>
                {this.state.categoryFilters.map((item, key) => 
                  <div className="filters filters-type" key={key}>
                    <input type="radio" id={"classif_"+key} key={key} data-type="category" name="category" value={item} onChange={ this.handleCheckedSecondary } /> <label htmlFor={"classif_"+key}>{item}</label>
                  </div>
                )}
              </div>
            </div>
            <div className="right-side">
              <h4 className="title">Categoría seleccionada: {this.state.categorySelected}</h4>
              <div className="products-container">
                <div className="products"> 
                  {this.state.businessData.map((business, key) => 
                    <div className="product-item" key={key}>
                      <div className= {"product-city product-city-" + business.citycode}>
                        {business.city}
                      </div>
                      <h5 className="title-item">{business.business.name}</h5>
                      <p className="description">{business.business.description}</p>
                      <ul className="info">
                        <li><a href={"https://www.twitter.com/"+business.business.twitter}><span className="socicon socicon-twitter"></span></a></li>
                        <li><a href={business.business.web}><span className="socicon socicon-internet"></span></a></li>
                        <li><a href={"https://www.facebook.com/"+business.business.facebook}><span className="socicon socicon-facebook"></span></a></li>
                      </ul>
                      <p className="small">
                        Contacto: <a href={"https://www.twitter.com/"+business.twitter}>{business.username}</a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
