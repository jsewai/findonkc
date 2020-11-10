import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../store/actions/selectPage';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';


const PageSelection = (props) =>{
  const dispatch = useDispatch();
  const { sites } = useSelector(state => ({
    sites: [state.selectPage.craigslist, state.selectPage.kijiji]
  }));

	const useStyles = makeStyles((theme) => ({
    toCenter: {
      alignSelf: 'center',
    },
  }))

  const classes = useStyles();
  const pageSelect = (event) => {
    dispatch(setPage(event.target.value, event.target.checked));
  }
    return (
      <div className={classes.toCenter}>
          {
            props.pageChoice.map((page, index) => {
              return(
                <FormControlLabel
                  value={page.title}
                  control={<Checkbox color="secondary" onClick={pageSelect} checked={sites[index].isSelected}/>}
                  label={page.title}
                  labelPlacement="start"
                  key={index}
                />
              );
            }) 
          }
      </div>
    );
}

export default PageSelection;
