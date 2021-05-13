import React, { useState, useEffect } from "react";
import moment from "moment";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PLACES } from "../../store/places/gql_places";
import { GET_TYPES } from "../../store/trainingTypes/gql_trainingTypes";
import {
  ADD_TRAINING,
  TRAININGS_ON_DAY,
} from "../../store/trainings/gql_trainings";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    padding: "20px",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function AddTraining(props) {
  const classes = useStyles();
  const [isBookable, set_isBookable] = useState(true);
  const [placeId, set_placeId] = useState("");
  const [trainingTypeId, set_trainingTypeId] = useState("");
  const [date, set_date] = useState(props.date);
  const [time, set_time] = useState("");
  const [attendees, set_attendees] = useState(0);
  const [addTraining] = useMutation(ADD_TRAINING);

  useEffect(() => {
    set_date(props.date);
  }, [props.date]);

  const { data: places } = useQuery(GET_PLACES);
  const { data: trainingTypes } = useQuery(GET_TYPES);

  const handleCheckboxChange = (event) => {
    set_isBookable(event.target.checked);
  };

  const handlePlaceChange = (event) => {
    set_placeId(event.target.value);
  };

  const handleTrainingChange = (event) => {
    set_trainingTypeId(event.target.value);
  };

  const timeChange = (event) => {
    set_time(event.target.value);
  };

  const attendeesChange = (event) => {
    set_attendees(event.target.value);
  };

  async function clickSubmit(event) {
    event.preventDefault();
    const response = await addTraining({
      variables: {
        date: date,
        time: time,
        attendees: parseInt(attendees),
        isBookable: isBookable,
        placeId: parseInt(placeId),
        trainingTypeId: parseInt(trainingTypeId),
      },
      refetchQueries: [
        {
          query: TRAININGS_ON_DAY,
          variables: { date: moment(date).format("YYYY-MM-DD") },
        },
      ],
    });
    set_time("");
    set_attendees(0);
    set_placeId("");
    set_trainingTypeId("");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add a training
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Input
                type="date"
                autoComplete="date"
                name="date"
                variant="outlined"
                required
                fullWidth
                id="date"
                label="Date"
                autoFocus
                value={props.date}
                // onChange={dateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isBookable}
                    onChange={handleCheckboxChange}
                    name="isBookable"
                    color="primary"
                  />
                }
                label="Bookable"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="time"
                label="Time"
                name="time"
                autoComplete="time"
                value={time}
                onChange={timeChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="attendees"
                label="Attendees"
                name="attendees"
                autoComplete="attendees"
                value={attendees}
                onChange={attendeesChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.form}>
                <InputLabel id="placeId">Place</InputLabel>
                <Select
                  labelId="placeId"
                  id="placeId"
                  value={placeId}
                  onChange={handlePlaceChange}
                  label="Place"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {places !== undefined && places.length !== 0
                    ? places.getAllPlaces.map((place) => {
                        return (
                          <MenuItem key={place.id} value={place.id}>
                            {place.city}, {place.street}
                          </MenuItem>
                        );
                      })
                    : null}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.form}>
                <InputLabel id="trainingTypeId">Training</InputLabel>
                <Select
                  labelId="trainingTypeId"
                  id="trainingTypeId"
                  value={trainingTypeId}
                  onChange={handleTrainingChange}
                  label="Training"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {trainingTypes !== undefined && trainingTypes.length !== 0
                    ? trainingTypes.getAllTrainingTypes.map((type) => {
                        return (
                          <MenuItem key={type.id} value={type.id}>
                            {type.name}
                          </MenuItem>
                        );
                      })
                    : null}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={clickSubmit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
