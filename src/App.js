import React, { Component } from 'react';
import Data from './data/people.json'
import './App.css';
import './styles.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      businessData: [],
      cityFilters: [],
      typeFilters: [],
      isChecked: true,
      categoryFilters: [],
      category: 'All'
    };
    this.handleChecked = this.handleChecked.bind(this);
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
      all: [],
      city: [],
      type: [],
      category: []
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
        if (item.dataset['type'] === 'city') {
          newData = Data.filter(itemJson => {
            return itemJson.city === item.value;
          });
          finalData.push(...newData);
        }
        else if (item.dataset['type'] === 'type') {
          /*
          newData = finalData.filter(itemJson => {
            return itemJson.type === item.value;
          });
          finalData.push(...newData);
          */
        }
        else if (item.dataset['type'] === 'category') {
          /*
          newData = finalData.filter(itemJson => {
            return itemJson.category === item.value;
          });
          finalData.push(...newData);
          */

        }
        
        return finalData;
      })
    
      this.setState({businessData: finalData});
      return finalData;
    }

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
              <h2 className="title">Filtra tu busqueda:</h2>
              <div className="form-block">
                <h4 className="title">Ciudad</h4>
                {this.state.cityFilters.map((item, key) => 
                  <div className="filters filters-city" key={key}>
                    <input type="checkbox" id={"city_"+key} data-type="city" value={item} onChange={ this.handleChecked } /> <label htmlFor={"city_"+key}>{item}</label>
                  </div>
                )}
              </div>
              <div className="form-block">              
                <h4 className="title">Tipo</h4>
                {this.state.typeFilters.map((item, key) => 
                  <div className="filters filters-type" key={key}>
                    <input type="checkbox" id={"type_"+key} data-type="type" value={item} onChange={ this.handleChecked } /> <label htmlFor={"type_"+key}>{item}</label>
                  </div>
                )}
              </div>
              <div className="form-block">              
                <h4 className="title">Categoría</h4>
                {this.state.categoryFilters.map((item, key) => 
                  <div className="filters filters-type" key={key}>
                    <input type="checkbox" id={"classif_"+key} data-type="category" value={item} onChange={ this.handleChecked } /> <label htmlFor={"classif_"+key}>{item}</label>
                  </div>
                )}
              </div>
            </div>
            <div className="right-side">
              <h4 className="title">Category: {this.state.category}</h4>
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
