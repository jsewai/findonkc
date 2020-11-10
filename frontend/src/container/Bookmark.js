import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getBookmark, removeBookmark } from '../store/actions/bookmark';
import Navbar from '../components/Navbar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
  media: {
    height: 140,
  },
  container: {
    marginTop: '3rem',
  },
  card: {
    position: 'relative',
    height: '100%'
  },
  icons: {
    position: 'absolute',
    right: 0,
    zIndex: 99,
    top: 0,
  },
  grid: {
    height: '340px',
    left: 'auto',
    right: 'auto',
    padding: '1vw'
  },
  button: {
    position: 'absolute',
    right: '10px',
    bottom: '10px',
  },
  title: {
    fontSize: '1rem'
  }
});


const Bookmark = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { bookmarkList } = useSelector(state => ({
    bookmarkList: state.bookmark.bookmarkList
  }));

  useEffect(() => {
    dispatch(getBookmark());
  },[])

  const removeItem = (pk) => {
    dispatch(removeBookmark(pk));
  }

  if(bookmarkList !== null){
    return (
      <Fragment>
      <Navbar />
      <Grid container item xs={12} className={classes.container}>
        {
          <Grid container alignContent='flex-start' item>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                Bookmarks
              </Typography>
            </Grid>
            {
              bookmarkList.map((posting, index) => (
                <Fragment key={posting.pk + index}>
                  <Grid item sm={3} xs={6} key={index} className={classes.grid}>
                    <Card className={classes.card + ' hereere'} square={true} >
                      <a href={posting.urls} alt={posting.title} target="_blank">
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={posting.title}
                          className={classes.media}
                          image={posting.img}
                          title={posting.title}
                        />
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h4" className={classes.title}>
                            {posting.title}
                          </Typography>
                          <Typography variant="body2" color="textSecondary" component="p">
                            {posting.price}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                      </a>
                      <IconButton aria-label="delete" className={classes.button} onClick={()=>removeItem(posting.pk)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                      
                    </Card>
                  </Grid>
                </Fragment>
              ))
            }
          </Grid>
        }
      </Grid>
      </Fragment>
    );
  }else{
    return (
      <Fragment>
      <Navbar />
      <Grid container item xs={12} className={classes.container}>
        {
          <Grid container alignContent='flex-start' item>
            <Grid item xs={12}>
              <Typography gutterBottom variant="h5" component="h2" align="center">
                There is no Bookmarks yet.
              </Typography>
            </Grid>
          </Grid>
        }
      </Grid>
      </Fragment>
    );
  }  
}


export default Bookmark;
