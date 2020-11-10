import React, { Fragment } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { addBookmark } from '../store/actions/bookmark';
import Loading from '../components/Loading';
import LoginPop from '../components/LoginPop';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const useStyles = makeStyles({
  media: {
    height: 140,
    objectFit: 'contain'
  },
  container: {
    background: 'white',
  },
  card: {
    position: 'relative',
    height: '100%'
  },
  icons: {
    position: 'absolute',
    right: 0,
    zIndex: 99,
    bottom: 0,
  },
  grid: {
    height: '340px',
    left: 'auto',
    right: 'auto',
    padding: '1vw'
  },
  button: {
    height: '100%'
  },
  title: {
    fontSize: '1rem'
  },
  gutterTop: {
    marginTop: '.35em'
  }
});


const ItemList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { sites, result, isFetching, bookmarkErr, isAuthenticated } = useSelector(state => ({
    sites: [state.selectPage.craigslist, state.selectPage.kijiji],
    result: [state.searchBar.result[0], state.searchBar.result[1]],
    isFetching: state.searchBar.isFetching,
    bookmarkErr: state.bookmark.error,
    isAuthenticated: state.auth.isAuthenticated,
  }));

  const addToBookmark = (posting) => {
    const payload = {
      'title': posting[0],
      'urls': posting[1],
      'price':posting[2],
      'img':posting[3],
      };
    dispatch(addBookmark(payload));
  }

  const adjustGrid = (x, y) => {
    return sites[0].isSelected && sites[1].isSelected ? x : y
  }

  if(!isFetching){
  return (
    <Grid container item sm={12} className={classes.container}>
   
      {
        result.map((page, index) =>
          sites[index].isSelected && page &&
          <Grid container alignContent='flex-start' item xs={adjustGrid(6,12)}>
            <Grid item xs={12}>
              <Typography gutterBottom variant="subtitle2" align="left" className={classes.gutterTop}>
                {page.i}
              </Typography>
            </Grid>
            {
              page.final_posting.map((posting, index) => (
                <Fragment key={posting[0] + index}>
                  <Grid item xs={adjustGrid(12,6)} sm={adjustGrid(6,3)} key={index} className={classes.grid}>
                    <Card className={classes.card} square={true} >
                    {isAuthenticated ? 
                      <FormControlLabel 
                        control={<Checkbox onClick={addToBookmark.bind(this, posting)} icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
                        className={classes.icons} 
                      />
                      :
                      <LoginPop/>
                    }
						          <a href={posting[1]} alt={posting[0]} target="_blank">
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            alt={posting[0]}
                            className={classes.media}
                            image={posting[3]}
                            title={posting[0]}
                          />
                          <CardContent>
                            <Typography gutterBottom variant="h5" component="h4" className={classes.title}>
                              {posting[0]}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                              {posting[2]}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </a>
                      <CardActions>
                      </CardActions>
                    </Card>
                  </Grid>
                </Fragment>
              ))
            }
          </Grid>
        )
      }
    </Grid>
  )}else{
    return <Loading />
  }
}

export default ItemList;
