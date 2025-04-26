import React, { Component } from 'react';
import NewsItem from './NewsItem';
import { Spinner } from './Spinner';
import propTypes from "prop-types"
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
  articles = [
    {
      "source": {
        "id": null,
        "name": "BBC News"
      },
      "author": null,
      "title": "Oldest serving US astronaut returns to Earth on 70th birthday - BBC",
      "description": "A capsule with Dan Pettit and his two Russian crewmates lands in Kazakhstan after a space station mission.",
      "url": "https://www.bbc.com/news/articles/czx1g0q43gqo",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/cb92/live/d049de80-1d95-11f0-a71c-ebf2a471f30c.png",
      "publishedAt": "2025-04-20T04:05:16Z",
      "content": "America's oldest serving astronaut Dan Pettit has returned to Earth on his 70th birthday.\r\nThe Soyuz MS-26 space capsule carrying Pettit and his Russian crewmates Alexey Ovchinin and Ivan Vagner made… [+887 chars]"
    }

  ]

  static defaultProps = {
    country: 'us',
    pageSize: 6,
  }
  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
  }


  capitalize = (s) => {
    return String(s[0]).toUpperCase() + String(s).slice(1);
  }
  // function capitalize(s){
  // return String(s[0]).toUpperCase() + String(s).slice(1);
  // } // this not work



  constructor(props) {
    super(props)
    console.log("Hello I am constructor from News ");
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults: 0
    }
    document.title = `News Buddy | ${this.capitalize(this.props.category)}`;

  }




  async updateNews() {
    // console.log("EE",this.state.page);
      this.props.setProgress(20)
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
      // this.setState({loading : true})
      this.props.setProgress(30)
      let data = await (fetch(url))
      this.props.setProgress(50)
      let parseddata = await (data.json())
      
      
      
      this.setState({
        articles: parseddata.articles,
        totalResults: parseddata.totalResults,
        loading: false
      })
      this.props.setProgress(100)


  }


  async componentDidMount() {


    this.updateNews()


  }

 
// this if for infinite scroll func
 fetchMoreData = async() => {
      // a fake async api call like which sends
      // 20 more records in 1.5 secs
     
        this.setState({
          page : this.state.page +1, });

          let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pagesize=${this.props.pageSize}`
          // this.setState({loading : true})
          let data = await (fetch(url))
          let parseddata = await (data.json())
      
      
          this.setState({
            articles: this.state.articles.concat(parseddata.articles),
            totalResults: parseddata.totalResults,
            loading: false
          })
      
     
    };





  







  render() {
    console.log("render"); // it will run before cdm output

    return (
      <div>
        <div className="container my-3">

          <h2 style={{ display: "flex", justifyContent: "center" }}>News Buddy -  Headlines</h2>

          {this.state.loading ? <Spinner /> : null}




{/* for infinite scroll  */}


         
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}

            // inverse={true} //
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<h4><Spinner /></h4>}
            // scrollableTarget="scrollableDiv"

          >
 
            <div className="container">


              <div className="row">

                {this.state.articles.map((element) => {
                  return <div className="col-md-4" >
                    <NewsItem Title={element.title.slice(0, 30)} Description={element.description ? element.description.slice(0, 80) : ""} Imageurl={element.urlToImage} newsUrl={element.url} publishedAt={element.publishedAt} />
                    {/* .slice(0,100) mean it will take upto 100 char to display and elemt.description ? if not written print " " */}
                  </div>

                    })}
              </div>
            </div>
          </InfiniteScroll>



        </div>
      </div>
    )
  }

}
export default News
