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
      classificationFilters: [],
      category: 'All'
    };
    this.handleChecked = this.handleChecked.bind(this);
  }

  componentDidMount() {
    this.setState({businessData: Data});
    this.setState({cityFilters: this.cityFilters()});
    this.setState({typeFilters: this.typeFilters()});
    this.setState({classificationFilters: this.classificationFilters()});
  }

  handleChecked (e) {
    e.persist()
    let newData = [];
    this.setState({isChecked: !this.state.isChecked});
    
    switch (e.target.dataset.type) {
      case "city":
        this.state.businessData.map(item => {
          if (item.city === e.target.value) {
            console.log('CITY', item)
            newData.push(item);
          }
          return item;
        });
        break;
      case "type":
        this.state.businessData.filter(item => {
          if (item.type === e.target.value) {
            newData.push(item);
          }
          return item;
        });
        break;
      case "classification":
        this.state.businessData.filter(item => {
          if (item.classification === e.target.value) {
            newData.push(item);
          }
          return item;
        });
        break;    
      default:
        break;
    }
    console.log(newData);
    if (newData.length <= 0) {
      newData = Data;
    }
    this.setState({businessData: newData});
  }

  moveIntro(e) {
    e.preventDefault();
    let introDiv = document.querySelector('.full-side');
    introDiv.classList.add('out');
    console.log('The link was clicked.');
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

  classificationFilters() {
    let classification = [];
    Data.map((item, key) => 
      classification.push(item.classification)
    );
    var cleanClass = [ ...new Set(classification) ];
    return cleanClass;
  }

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="full-side">
            <div className="intro">
              <h1 className="intro-title">Emprendedores Colombianos, busca lo que necesites, en la ciudad que necesites!</h1>
              <button id="introButton" className="button button-inverse" onClick={this.moveIntro}>Ver Emprendimientos</button>
            </div>
          </div>
          <div className="left-side">
            <h2>Filtra tu busqueda:</h2>
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
              {this.state.classificationFilters.map((item, key) => 
                <div className="filters filters-type" key={key}>
                  <input type="checkbox" id={"classif_"+key} data-type="classification" value={item} onChange={ this.handleChecked } /> <label htmlFor={"classif_"+key}>{item}</label>
                </div>
              )}
            </div>
          </div>
          <div className="right-side">
            <h4 className="title">Category: {this.state.category}</h4>
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
    );
  }
}

export default App;
