import {Container, IconButton, TextField} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
interface searchProps {
    searchText: string
}

const searchBarContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"
}

const wideSearchBar = {
    width: "70vw"
}




const SearchBar = () => {
    const [searchText, setSearchText] = useState("");

    const search = (props : searchProps) => {
        console.log(props.searchText)
        clearSearchField()
    }

    const clearSearchField = () => {
        setSearchText("")
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        search({searchText})
    }

    return(
        <>
            <Container sx={searchBarContainer}>
                <TextField sx={wideSearchBar}  label="Search Topic" value={searchText} onChange={(event) => setSearchText(event.target.value)} onKeyUp={(event) => {event.key === 'Enter' && search({searchText})}}/>
                <IconButton onClick={handleClick}>
                    <SearchIcon color="primary"/>
                </IconButton>
            </Container>
        </>
        )

}

export default SearchBar
