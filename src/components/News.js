import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    static defaultProps = {
        country:"in",
        pageSize:5,
        category:"general"
    }

    static propTypes = {
        country:PropTypes.string,
        pageSize:PropTypes.number,
        category:PropTypes.string
    }
    
    capitalize(str){
        return str.charAt(0).toUpperCase()+str.slice(1);
    }

    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading:false,
            page:1,
            totalResults:0
        }
        document.title=`${this.capitalize(this.props.category)} - Quick News`
    }

    async updateNews(){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=bfc4f462f52248b282976b794d4471e6&page=${this.state.page}&pagesize=${this.props.pageSize}`;
        this.setState({
            loading:true
        })
        let data= await fetch(url);
        let parsedData= await data.json();
        this.setState({
            articles:this.state.articles.concat(parsedData.articles),
            totalResults:parsedData.totalResults,
            loading:false
        });
    }

    async componentDidMount(){
        this.updateNews();
    }

    handlePrevClick= async ()=>{
        await this.setState({page: this.state.page-1});
        this.updateNews();
    }

    handleNextClick = async()=>{
        this.setState({page: this.state.page + 1});
        this.updateNews();
    }

    // fetchMoreData = async () => {
    //     await this.setState({page:this.state.page+1});
    //     this.updateNews();
    // };

    fetchMoreData = () => {
        if (this.state.articles.length < this.state.totalResults) {
            this.setState(prevState => ({
                page: prevState.page + 1
            }), () => {
                this.updateNews();
            });
        }
    };
    

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{margin:"35px 0px"}}>Quick News - Top Headlines </h1>
                {/* {this.state.loading && <Spinner/>} */}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.state.totalResults}
                    loader={<Spinner/>}
                >   
                    <div className="conatainer">
                        <div className="row">
                        {this.state.articles.map((element)=>{
                            return <div className="col-md-4" key={element.url}>
                            <NewsItem title={element.title? element.title:""} description={element.description? element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} date={element.publishedAt} author={element.author} source={element.source["name"]}/>
                            </div>
                        })}
                        </div>
                    </div>
                </InfiniteScroll>
            </div>
        )
    }
}

export default News
