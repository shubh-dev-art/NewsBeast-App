import React, {useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from 'prop-types'


const News = (props) => {

    const [articles, setArticles] = useState([])
    const [nextPage, setNextPage] = useState(null)
    const [totalResults, setTotalResults] = useState(0)
    const [loading, setLoading] = useState(true)


    const capitalizeCategory = (string)=>{
        const categories = string.split(",")
        const capitalizedWords = categories.map(word => {
            if (word.length === 0) {
                return '';
            }
            return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        });
        return capitalizedWords.join(', ');
    }

    // constructor(props){
    //     super(props);
    //     this.state = {
    //         // pages: [],            // array of results for each page
    //         // currentPageIndex: 0,  // which page we’re showing
    //         articles: [],
    //         nextPage: null,
    //         totalResults: 0,
    //         loading: true
    //     };
    //     // document.title = `${this.capitalizeCategory(props.category)} - NewsBeast!`;
    // }

    const updateNews = async() => {
        props.setProgress(10);
        const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&country=in&language=hi,en&category=${props.category}&prioritydomain=top&image=1&removeduplicate=1&size=${props.pageSize}`;

        // this.setState({
        //     loading : true
        // });
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.results);
        setNextPage(parsedData.nextPage);
        setLoading(false);
        setTotalResults(parsedData.totalResults);
        // this.setState({
        //     // pages: [parsedData.results],   // store first page
        //     // currentPageIndex: 0,
        //     articles: parsedData.results,
        //     nextPage: parsedData.nextPage,
        //     loading: false,
        //     totalResults: parsedData.totalResults
        // });
        props.setProgress(100);
    }

    useEffect(() => {
        document.title = `${capitalizeCategory(props.category)} - NewsBeast`;
        updateNews(); 
        // eslint-disable-next-line
    }, [])
    

    // async componentDidMount(){
    //     this.updateNews();
    // }

    // handlePrevClick = async () => {
    //     const { currentPageIndex } = this.state;
    //     this.setState({
    //         loading : true
    //     })
    //     if (currentPageIndex === 0) return; // already at first page
    //     this.setState({
    //         currentPageIndex: currentPageIndex - 1,
    //         loading : false
    //     });
    // }

    // handleNextClick = async () => {
    //     const { nextPage, pages } = this.state;
    //     if (!nextPage) return;

    //     const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&country=in&language=hi,en&category=${props.category}&prioritydomain=top&image=1&removeduplicate=1&size=${props.pageSize}${nextPage ? `&page=${nextPage}` : ""}`;

    //     this.setState({loading : true});
    //     let data = await fetch(url);
    //     let parsedData = await data.json();
    //     this.setState({
    //         pages: [...pages, parsedData.results],   // append new page
    //         currentPageIndex: pages.length,          // move index forward
    //         nextPage: parsedData.nextPage,
    //         loading : false
    //     });

    // }

    const fetchMoreData = async () => {
        const url = `https://newsdata.io/api/1/latest?apikey=${props.apiKey}&country=in&language=hi,en&category=${props.category}&prioritydomain=top&image=1&removeduplicate=1&size=${props.pageSize}${nextPage ? `&page=${nextPage}` : ""}`;

        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.results))
        setNextPage(parsedData.nextPage)
        setTotalResults(parsedData.totalResults)
        // this.setState({
        //     // pages: [parsedData.results],   // store first page
        //     // currentPageIndex: 0,
        //     articles: this.state.articles.concat(parsedData.results),
        //     nextPage: parsedData.nextPage,
        //     totalResults: parsedData.totalResults
        // });
    }

    return (
        <>
            <h2 className="text-center" style = {{margin: "30px 0px", marginTop: "90px"}}>NewsBeast - Top {capitalizeCategory(props.category)} Headlines</h2>
            {loading && <Spinner/>}
            <InfiniteScroll dataLength={articles.length} next={fetchMoreData} hasMore={articles.length !== totalResults} loader={<Spinner/>}>
                <div className="container">
                    <div className="row my-3">
                        {articles.map((element) => (
                            <div className="col-md-4 my-3" key={element.article_id}>
                                <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 100) : ""} imageUrl={element.image_url} newsUrl={element.link} creator={element.creator ? element.creator.join(", ") : "Unknown"} pubDate={element.pubDate} source= {element.source_name} category={element.category.join(", ")}/>
                            </div>
                        ))}
                    </div>
                </div>
            </InfiniteScroll>
            {/* <div className="container d-flex justify-content-between">
                <button disabled={this.state.currentPageIndex === 0} onClick={this.handlePrevClick}  className="btn btn-dark">&larr; Previous</button>
                <button disabled={!this.state.nextPage} onClick={this.handleNextClick} className="btn btn-dark"> Next &rarr; </button>
            </div> */}
        </>
    )
}

export default News

News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
}

