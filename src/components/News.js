import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'

export class News extends Component {

  static defaultProps = {
    country: 'in',
    category: 'general',
    pageSize: 8
  }

  static propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
  }

  capitalize = (string) => {
    return string.toLowerCase().replace( /\b./g, function(a){ return a.toUpperCase(); } );
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    };
    document.title = `${this.capitalize(this.props.category)} - AKS News`;
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=d0e641f1929a4a3d8303ce06eb395c75&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({loading: true});
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles, 
      totalResults: parsedData.totalResults,
      loading: false  
    });
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1
    });
    this.updateNews();
  }

  handleNextClick = async () => {
      this.setState({
        page: this.state.page + 1
      });
      this.updateNews();
  }

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin: "30px 0px"}}>News AKS - Top {this.capitalize(this.props.category)} Headlines</h1>
        
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => 
          <div className="col-md-4" key={element.url}>
            <NewsItem
              title={(element.title) ? element.title.slice(0, 45): ''}
              description={(element.description) ? element.description.slice(0, 88): ''}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source={element.source.name}
            />
          </div>
          )}
        </div>
        <div className="container d-flex justify-content-between my-2">
          <button disabled={this.state.page <= 1} className='btn btn-dark' onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
