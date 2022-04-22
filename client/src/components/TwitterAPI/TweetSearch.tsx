import axios from "axios";


interface TweetSearchProps {
    keyword: string,
    location: string | undefined,
    date: string | undefined
}

export const searchTweets = async (props: TweetSearchProps, callback: any) => {

    axios('/tweets/search', {
        method: 'GET',
        responseType: 'json',
        params: {
            keyword: props.keyword,
            location: props.location,
            date: props.date
        }
    }).then(
        (res: any) => {
            callback(res.data)
        },
        (err: any) => {
            console.log(err);
        },
    );
};
