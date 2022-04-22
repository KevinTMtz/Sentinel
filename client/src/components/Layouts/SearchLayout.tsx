import {useState} from "react";
import SearchBar from "../SearchBar";
import TweetList from "../TweetList";

const SearchLayout = () => {
    const [tweets, setTweets] = useState<any>();

    return(
        <>
            <SearchBar callback={setTweets}/>
            <TweetList tweets={tweets}/>
        </>

    )
}

export default SearchLayout;
