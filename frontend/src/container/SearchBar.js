import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { withRouter } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { setSearchKeyword } from '../store/actions/searchBar'
import { getPosting } from '../store/actions/searchBar'
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme) => ({
  search: {
    position: 'relative',
    height: '2rem',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid #000000;',
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    alignSelf: 'center',
    flexGrow: '2',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    boxShadow: '0 8px 8px 0 rgba(0,0,0,.05)',
    width: '100% !important',
    // input[type="text"]:focus {
    //     'outline: 0'
    // },
  },
  inputForm: {
    display: 'flex',
  },
}));

const sampleKeywords = ['Car', 'Room for rent', 'Smart Phone', 'Book']
const randomKeyword = sampleKeywords[Math.floor(Math.random() * sampleKeywords.length)]

const SearchBar = (props) => {
  const dispatch = useDispatch();
  const { sites, keyword } = useSelector(state => ({
    sites: [state.selectPage.craigslist, state.selectPage.kijiji],
    keyword: state.searchBar.keyword
  }));
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  const firstSearch = () =>{
    if(!keyword){
      dispatch(getPosting(randomKeyword, sites))
      dispatch(setSearchKeyword(randomKeyword))
      return randomKeyword
    }else{
      return keyword
    }
  }

  const triggerSearch = (data, e) => {
    e.preventDefault();
    props.history.push('/')
    dispatch(getPosting(data.search, sites))
  }

  return (
    <div className={classes.search}>
      <form model="SearchForm" onSubmit={handleSubmit((data, e) => triggerSearch(data, e))} className={classes.inputForm}>
        <InputBase
          placeholder="Search…"
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput,
          }}
          defaultValue={firstSearch()}
          inputProps={{ 'aria-label': 'search' }}
          name="search"
          id="search"
          inputRef={register}
        />
        <Button className={classes.searchIcon} type='submit'>
          <SearchIcon />
        </Button>
      </form>
    </div>
  )
}

export default withRouter(SearchBar)
