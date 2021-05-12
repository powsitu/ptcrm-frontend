import React, { useState } from "react";
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
import { useQuery } from "@apollo/react-hooks";
import { GET_PLACES } from "../../store/places/gql_places";
import { GET_TYPES } from "../../store/trainingTypes/gql_trainingTypes";

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
  const [checkbox, set_checkbox] = useState(true);
  const [whereToTrain, set_whereToTrain] = useState("");
  const [whatTraining, set_whatTraining] = useState("");

  const { data: places } = useQuery(GET_PLACES);
  const { data: trainingTypes } = useQuery(GET_TYPES);

  const handleCheckboxChange = (event) => {
    set_checkbox(event.target.checked);
  };

  const handlePlaceChange = (event) => {
    set_whereToTrain(event.target.value);
  };

  const handleTrainingChange = (event) => {
    set_whatTraining(event.target.value);
  };

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
                onChange={props.dateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkbox}
                    onChange={handleCheckboxChange}
                    name="checkedB"
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
                value={props.time}
                onChange={props.timeChange}
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
                value={props.time}
                onChange={props.timeChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.form}>
                <InputLabel id="places">Place</InputLabel>
                <Select
                  labelId="places"
                  id="places"
                  value={whereToTrain}
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
                <InputLabel id="places">Training</InputLabel>
                <Select
                  labelId="Training"
                  id="Training"
                  value={whatTraining}
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
            onClick={props.clickSubmit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
