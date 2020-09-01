import React from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import ReactPlayer from 'react-player'
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

// import material ui cores
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionActions from '@material-ui/core/AccordionActions';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Collapse from '@material-ui/core/Collapse';
import Snackbar from '@material-ui/core/Snackbar';
import Slider from '@material-ui/core/Slider';

// import material ui icons 
import PauseIcon from '@material-ui/icons/Pause';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ScheduleIcon from '@material-ui/icons/Schedule';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import StraightenIcon from '@material-ui/icons/Straighten';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import InsertInvitationIcon from '@material-ui/icons/InsertInvitation';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import LoopIcon from '@material-ui/icons/Loop';

import MaterialTable from 'material-table';

import workoutRoutine from '../../assets/data/workoutRoutine.json';

import CountDownTimer from '../../components/CountDownTimer.js';
import styles from '../../assets/styles/views/dashboard/dashcontainerStyle.js';

import { icons } from '../../assets/styles/masterStyle.js';

import musicData from '../../assets/data/musicLibrary.json';
import sheetData from '../../assets/data/sheetmusic.json';

const useStyle = makeStyles(styles);

export default function DashContainer(props) {
    // variables
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
    const theme = useTheme(styles);
    const targetRef = React.useRef();
    const targetRef1 = React.useRef();
    // styles 
    const classes = useStyle();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    // states 
    const [expanded, setExpanded] = React.useState(false);
    const [sheetExpanded, setSheetExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleSheetExpandClick = () => {
        setSheetExpanded(!sheetExpanded);
    };

    const [state, setState] = React.useState(
        {
            pianoCurrentRow: {},
            pianoSelected: true,
            pianoSelectedRowId: null,
            sheetCurrentRow: {},
            sheetSelected: true,
            sheetSelectedRowId: null,
            cardIndex: null,
            width: "30vh",
            sheetHeight: 0,
            buttonLocation: 0,
            pageWidth: 0,
            musicColumns: [
                { title: 'Group', field: 'group' },
                { title: 'Name', field: 'name' },
                { title: 'Composer', field: 'composer' },
            ],
            sheetColumns: [
                { title: 'Name', field: 'name' },
                { title: 'Composer', field: 'composer' }
            ],
            sheetSelected: true,
            sheetIndex: 0,
            snackbarOpen: false,
        }
    );

    const handleSheetIndexChange = (direction) => {
        if (direction === "prev" && state.sheetIndex !== 0) {
            setState({ ...state, sheetIndex: state.sheetIndex - 1 })
        } else if (direction === "next" && state.sheetIndex !== sheetData.length) {
            setState({ ...state, sheetIndex: state.sheetIndex + 1 })
        }
    }

    // media player function
    const handlePlayPause = () => {
        setExpanded(false);
        props.handlePlayPause();
    }

    const handleLoop = () => {
        setState({ ...state, snackbarOpen: true });
        props.handleLoop();
    }
    const handleSeekMouseDown = e => {
        props.handleSeekMouseDown(e);
    }
    const handleSeekChange = e => {
        props.handleSeekChange(e);
    }
    const handleSeekMouseUp = e => {
        props.handleSeekMouseUp(e);
    }
    // const handleChange = (panel, index) => (event, isExpanded) => {
    //     setExpanded(isExpanded ? panel : false);
    //     props.handleIndexChange(index);
    // }
    const handleCardClick = (index) => {
        if (index === state.cardIndex) {
            setState({ ...state, cardIndex: null })
        } else {
            setState({ ...state, cardIndex: index })
        }
    }
    // pdf states 
    const [numPages, setNumPages] = React.useState(null);
    const [pageNumber, setPageNumber] = React.useState(1);
    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1);
    }
    function changePage(offset) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
    function previousPage() {
        changePage(-1);
    }
    function nextPage() {
        changePage(1);
    }

    // Getting ratio of divs 
    // React.useEffect(() => {
    //     if (props.checkedSwitch && expanded !== 'panel1') {
    //         setExpanded('panel1');
    //     } else if (!props.checkedSwitch & expanded !== false) {
    //         setExpanded(false)
    //         props.handleIndexChange(0)
    //     }
    // }, [props.checkedSwitch])

    React.useLayoutEffect(() => {
        if (targetRef.current) {
            setState({
                ...state,
                buttonLocation: (targetRef.current.offsetWidth * 0.50),
                sheetHeight: (targetRef.current.offsetWidth * 0.75),
                pageWidth: (targetRef.current.offsetWidth * 0.5),
            });
        }
    }, [targetRef])

    // functions 
    const titleCase = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const displayMusicLibrary = () => {
        return (
            <Grid container direction="column">
                <Grid item>
                    <MaterialTable
                        style={{ width: "100%" }}
                        columns={state.musicColumns}
                        data={
                            musicData.map((music) => {
                                return {
                                    group: music.group,
                                    name: music.name,
                                    composer: music.subtitle
                                }
                            })
                        }
                        options={{
                            showTitle: false,
                            rowStyle: rowData => ({
                                backgroundColor:
                                    state.pianoSelected &&
                                        rowData.tableData.id === props.currMusicIndex ? props.theme.colors.primary : "#fff"
                            })
                        }}
                        icons={icons}
                        onRowClick={(event, rowData) => {
                            setState({ ...state, pianoCurrentRow: rowData });
                            if (rowData.tableData.id === state.pianoSelectedRowId) {
                                setState({ ...state, pianoSelected: false });
                                setState({ ...state, pianoSelectedRowId: null });
                            } else {
                                setState({ ...state, pianoSelected: true });
                                props.handleMusicIndexChange(rowData.tableData.id);
                            }
                        }}
                    />
                </Grid>
                <Grid item style={{ display: "flex" }}>
                    <Divider />
                    <Button style={{ marginLeft: "auto", marginTop: "16px" }} color="secondary" size="large" variant="outlined">More Details</Button>
                </Grid>
            </Grid>
        );
    };

    const displaySheetLibrary = () => {
        return (
            <Grid container direction="column">
                <Grid item>
                    <MaterialTable
                        style={{ width: "100%" }}
                        columns={state.sheetColumns}
                        data={
                            sheetData.map((sheet) => {
                                return {
                                    name: sheet.name,
                                    composer: sheet.composer
                                }
                            })
                        }
                        options={{
                            showTitle: false,
                            rowStyle: rowData => ({
                                backgroundColor:
                                    state.sheetSelected &&
                                        rowData.tableData.id === state.sheetIndex ? props.theme.colors.primary : "#fff"
                            })
                        }}
                        icons={icons}
                        onRowClick={(event, rowData) => {
                            setState({ ...state, sheetCurrentRow: rowData });
                            if (rowData.tableData.id === state.pianoSelectedRowId) {
                                setState({ ...state, sheetSelected: false });
                                setState({ ...state, sheetSelectedRowId: null });
                            } else {
                                setState({ ...state, sheetSelected: true });
                                setState({ ...state, sheetIndex: rowData.tableData.id });
                            }
                        }}
                    />
                </Grid>
                <Grid item style={{ display: "flex" }}>
                    <Divider />
                    <Button style={{ marginLeft: "auto", marginTop: "16px" }} color="secondary" size="large" variant="outlined">More Details</Button>
                </Grid>
            </Grid>
        );
    }

    //style 
    const matchesLgUp = useMediaQuery(theme.breakpoints.up('lg'));

    return (
        <Grid
            container
            spacing={5}
        >
            <Typography className={classes.typo} variant="h5">Music</Typography>
            <Grid item xs={7} ref={targetRef}
            >
                <Card style={{ height: expanded ? "" : state.width }}>
                    <Grid container >
                        <Grid item xs={7} style={{ display: "flex", flexDirection: "column" }}>
                            <CardContent className={classes.content}>
                                <Typography gutterBottom variant="h5" component="h2"> {musicData[props.currMusicIndex].name} </Typography>
                                <Typography variant="subtitle1" color="textSecondary"> {musicData[props.currMusicIndex].subtitle}</Typography>
                                <input
                                    type='range' min={0} max={0.999999} step='any'
                                    value={props.played}
                                    onChange={handleSeekChange}
                                    onMouseUp={handleSeekMouseUp}
                                    onMouseDown={handleSeekMouseDown}
                                    style={{ marginTop: "16px", width: "200px"}}
                                />
                            </CardContent>
                            <div className={classes.controls}>

                                <IconButton aria-label="previous" onClick={() => props.handleChangeMusic("prev")}>
                                    {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
                                </IconButton>
                                <IconButton aria-label="play/pause" onClick={() => handlePlayPause()}>
                                    {props.playing ? <PauseIcon className={classes.playIcon} /> : <PlayArrowIcon className={classes.playIcon} />}
                                </IconButton>
                                <IconButton aria-label="next" onClick={() => props.handleChangeMusic("next")}>
                                    {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
                                </IconButton>
                                <IconButton style={{ marginLeft: "16px" }} onClick={() => handleLoop()}>
                                    <LoopIcon style={{ color: props.loop ? props.theme.colors.primary : "" }} />
                                </IconButton>
                                <Snackbar
                                    open={state.snackbarOpen} autoHideDuration={5000} onClose={() => setState({ ...state, snackbarOpen: false })}
                                    message={props.loop ? "Loop Enabled" : "Loop Disabled"}
                                />
                            </div>
                            <IconButton
                                className={clsx(classes.expand, {
                                    [classes.expandOpen]: expanded,
                                })}
                                style={{ marginTop: "auto", marginRight: "0px", padding: "16px" }}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                aria-label="show more"
                            >
                                <ExpandMoreIcon />
                            </IconButton>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    {displayMusicLibrary()}
                                </CardContent>
                            </Collapse>
                        </Grid>
                        <Grid item xs={5} style={{ marginTop: "auto", marginBottom: "auto" }}>
                            <img
                                style={{ height: state.width }}
                                src={`https://img.youtube.com/vi/${musicData[props.currMusicIndex].src}/0.jpg`}
                            />
                        </Grid>
                    </Grid>

                </Card>
            </Grid>
            <Grid item xs={5} >
                <Card style={{ height: sheetExpanded ? "" : state.width, display: "flex", flexDirection: "column" }}>
                    <CardContent>
                        <div className={classes.cardColumn}>
                            <FileCopyIcon size="large" style={{ marginRight: "32px", marginTop: "4px" }} />
                            <Typography gutterBottom variant="h5" component="h2"> Piano Sheet Library </Typography>
                        </div>
                    </CardContent>
                    <div className={classes.sheetCardActionContainer}>
                        <IconButton style={{ marginLeft: "16px" }} onClick={() => handleSheetIndexChange("prev")}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <CardActionArea style={{ width: "fit-content", padding: "16px" }}>
                            <Grid>
                                <Typography variant="h5" color="textSecondary" component="p"> {titleCase(sheetData[state.sheetIndex].name)} <AspectRatioIcon /></Typography>
                                <Typography variant="body2" color="textSecondary" component="p"> {titleCase(sheetData[state.sheetIndex].composer)}</Typography>
                            </Grid>
                        </CardActionArea>
                        <IconButton style={{ marginRight: "auto" }} onClick={() => handleSheetIndexChange("next")}>
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                    <IconButton
                        style={{ marginLeft: "auto", padding: "16px", right: "4px" }}
                        onClick={handleSheetExpandClick}
                        aria-expanded={sheetExpanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                    <Collapse in={sheetExpanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            {displaySheetLibrary()}
                        </CardContent>
                    </Collapse>
                </Card>
            </Grid>
            <Typography className={classes.typo} variant="h5" style={{ display: (expanded || sheetExpanded) ? "none" : "", paddingTop: "16px" }}>Gym</Typography>
            <Grid item xs={[2].includes(state.cardIndex) ? 8 : 4} style={{ display: (expanded || sheetExpanded) ? "none" : "" }}>
                <div>
                    <Card>
                        <CardActionArea onClick={() => handleCardClick(2)}>
                            <CardContent>
                                <div className={classes.cardColumn}>
                                    <AddToPhotosIcon size="large" style={{ marginRight: "32px", marginTop: "4px" }} />
                                    <Typography gutterBottom variant="h5" component="h2"> Add a Gym Entry </Typography>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card>
                        <CardActionArea onClick={() => handleCardClick(2)}>
                            <CardContent>
                                <div className={classes.cardColumn}>
                                    <AddToPhotosIcon size="large" style={{ marginRight: "32px", marginTop: "4px" }} />
                                    <Typography gutterBottom variant="h5" component="h2"> Quick Progress Check</Typography>
                                </div>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </div>
            </Grid>
            <Grid item xs={[3].includes(state.cardIndex) ? 8 : 4} style={{ display: (expanded || sheetExpanded) ? "none" : "" }}>
                <Card>
                    <CardActionArea>
                        <CardContent>
                            <div className={classes.cardColumn}>
                                <InsertInvitationIcon style={{ marginRight: "32px", marginTop: "4px" }} />
                                <Typography gutterBottom variant="h5" component="h2"> Next Workout </Typography>
                            </div>
                            <Typography variant="body2" color="textSecondary" component="p"
                                style={{ paddingTop: "16px" }} className={classes.subTypo} >
                                Next workout day is : {titleCase(workoutRoutine[0].routineName)}
                            </Typography>
                            {workoutRoutine[0].workouts.map((routine, index) => {
                                return (
                                    <Typography key={routine.workout.name + index} variant="body2" color="textSecondary" component="p" className={classes.subTypo}>
                                        {(index + 1)} : {titleCase(routine.workout.name)}
                                    </Typography>
                                );
                            })}
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Grid>
            <Grid item xs={4} style={{ display: (expanded || sheetExpanded) ? "none" : "" }}>
                <Grid container spacing={5}>
                    <Grid item xs={6} >
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(2)} style={{ height: "15vh" }}>
                                <CardContent>
                                    <div className={classes.cardColumn}>
                                        <AddToPhotosIcon style={{ marginRight: "32px", marginTop: "4px" }} />
                                        <Typography gutterBottom variant="h5" component="h2"> Days into the Routine</Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(2)} style={{ height: "15vh" }}>
                                <CardContent>
                                    <div className={classes.cardColumn}>
                                        <AddToPhotosIcon size="large" style={{ marginRight: "32px", marginTop: "4px" }} />
                                        <Typography gutterBottom variant="h5" component="h2"> Days until next One Rep max</Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(2)} style={{ height: "15vh" }}>
                                <CardContent>
                                    <div className={classes.cardColumn}>
                                        <AddToPhotosIcon size="large" style={{ marginRight: "32px", marginTop: "4px" }} />
                                        <Typography gutterBottom variant="h5" component="h2"> Rotations of {titleCase(workoutRoutine[0].routineName)}</Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(2)} style={{ height: "15vh" }}>
                                <CardContent>
                                    <div className={classes.cardColumn}>
                                        <AddToPhotosIcon size="large" style={{ marginRight: "32px", marginTop: "4px" }} />
                                        <Typography gutterBottom variant="h5" component="h2"> Quick Progress Check</Typography>
                                    </div>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid >

        // <div className={classes.container}>
        //     <div className={classes.toggleText}>
        //         <Typography color="textPrimary" className={classes.typo} variant="h5">Gym</Typography>
        //         <FormGroup row>
        //             <FormControlLabel
        //                 className={classes.typo}
        //                 control={<Switch color="primary" checked={props.state.checkedSwitch} onChange={props.handleSwitchChange} name="checkedSwitch" />}
        //                 label={<Typography className={classes.switchTypo} variant="h4">In the gym</Typography>}
        //             />
        //         </FormGroup>
        //     </div>
        //     {props.state.checkedSwitch && !matches ? <CountDownTimer /> : null}
        //     <Accordion
        //         expanded={expanded === 'panel1'}
        //         onChange={handleChange('panel1', 1)}
        //         className={classes.accordion}>
        //         <AccordionSummary
        //             className={classes.accordionSummary}
        //             expandIcon={<ExpandMoreIcon />}
        //             aria-controls="panel1c-content"
        //             id="panel1c-header"
        //         >
        //             <div className={classes.column}>
        //                 <ScheduleIcon className={classes.icon} />
        //                 <Typography className={classes.heading}>Next Workout</Typography>
        //             </div>
        //             <div className={classes.column}>
        //                 <Typography className={classes.secondaryHeading}>Muscle Group : {workoutRoutine[0].routineName}</Typography>
        //             </div>
        //         </AccordionSummary>
        //         <AccordionDetails className={classes.details}>
        //             <MaterialTable
        //                 style={{ width: "100%" }}
        //                 columns={[
        //                     { title: 'Exercise', field: 'exercise', },
        //                     { title: 'Sets', field: 'sets' },
        //                     { title: 'Reps', field: 'reps' },
        //                     { title: 'Rest', field: 'rest' },
        //                 ]}
        //                 data={
        //                     (workoutRoutine[0].workouts.map((routine, index) => {
        //                         return {
        //                             exercise: titleCase(routine.workout.name),
        //                             sets: titleCase(routine.sets),
        //                             reps: titleCase(routine.reps),
        //                             rest: titleCase(routine.rest)
        //                         };
        //          
        //                 }
        //                 options={{
        //                     showTitle: false,
        //                     search: false,
        //                     toolbar: false,
        //                     rowStyle: rowData => ({
        //                         backgroundColor:
        //                             state.selected &&
        //                                 rowData.tableData.id === state.selectedRowId ? props.theme.colors.primary : "#fff"
        //                     })
        //                 }}
        //                 icons={icons}
        //                 onRowClick={(event, rowData) => {
        //                     setState({ ...state, currentRow: rowData });
        //                     if (rowData.tableData.id === state.selectedRowId) {
        //                         setState({ ...state, selected: false });
        //                         setState({ ...state, selectedRowId: null });
        //                     } else {
        //                         setState({ ...state, selected: true });
        //                         setState({ ...state, selectedRowId: rowData.tableData.id });
        //                         props.handleCellChange(rowData.tableData.id + 1)
        //                     }
        //                 }}
        //             />
        //         </AccordionDetails>
        //         <Divider />
        //         <AccordionActions>
        //             <Link
        //                 to={"/main-menu/gym-routine"}
        //                 style={{ textDecoration: 'none' }}
        //             >
        //                 <Button color="secondary" size="large">More Details</Button>
        //             </Link>
        //         </AccordionActions>
        //     </Accordion>

        // </div>
    );
}