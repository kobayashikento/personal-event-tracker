import React from 'react';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from '../../assets/styles/views/piano/pianoStyle.js';

import constructionImage from '../../assets/images/26531-construction-in-process.gif';

const useStyles = makeStyles(styles);

export default function PianoView(props) {
    const classes = useStyles();

    return (
        <Grid
            className={classes.container}
            container
            justify="center"
            alignItems="center"
            direction="column"
            spacing={5}
            style={{backgroundColor: "rgba(252,252,252)"}}
        >
             <Typography gutterBottom variant="h5" component="h1">
                Under Construction
            </Typography>
            <img style={{zoom: "0.9"}} src={constructionImage} />
        </Grid>
    );
}

{/* <div className={classes.sheetlibrary}>
<IconButton >
    <ChevronLeftIcon />
</IconButton>
<Document
    file={
        temp
    }
    onLoadSuccess={onDocumentLoadSuccess}
>
    <Page pageNumber={pageNumber} height={state.pageHeight} width={state.pageWidth} />
</Document>
<IconButton style={{ paddingLeft: "0px" }}>
    <ChevronRightIcon />
</IconButton>
 <Typography variant="body2" color="textSecondary" component="p"> Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'} </Typography>
                    <Button
                        type="button"
                        variant="outlined"
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                    >
                        Previous Page
                    </Button>
                    <Button
                        type="button"
                        variant="outlined"
                        disabled={pageNumber >= numPages}
                        onClick={nextPage}
                    >
                        Next Page
                    </Button>
</div> */}

//  // pdf states 
//  const [numPages, setNumPages] = React.useState(null);
//  const [pageNumber, setPageNumber] = React.useState(1);
//  function onDocumentLoadSuccess({ numPages }) {
//      setNumPages(numPages);
//      setPageNumber(1);
//  }
//  function changePage(offset) {
//      setPageNumber(prevPageNumber => prevPageNumber + offset);
//  }
//  function previousPage() {
//      changePage(-1);
//  }
//  function nextPage() {
//      changePage(1);
//  }

