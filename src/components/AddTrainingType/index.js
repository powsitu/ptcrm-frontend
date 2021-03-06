import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation } from "@apollo/react-hooks";
import {
  ADD_TRAININGTYPE,
  GET_TYPES,
} from "../../store/trainingTypes/gql_trainingTypes";
import {
  setMessage,
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../../store/appState/actions";
import { useDispatch } from "react-redux";

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

export default function AddTrainingType(props) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [name, set_name] = useState("");
  const [description, set_description] = useState("");
  const [intensity, set_intensity] = useState(0);
  const [addTrainingType] = useMutation(ADD_TRAININGTYPE);

  const handleNameChange = (event) => {
    set_name(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    set_description(event.target.value);
  };

  const handleIntensityChange = (event) => {
    set_intensity(event.target.value);
  };

  async function clickSubmit(event) {
    event.preventDefault();
    dispatch(appLoading());
    try {
      const response = await addTrainingType({
        variables: {
          name: name,
          description: description,
          intensity: parseInt(intensity),
        },
        refetchQueries: [
          {
            query: GET_TYPES,
          },
        ],
      });
      dispatch(
        showMessageWithTimeout("success", false, "Training type added!", 1500)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      dispatch(appDoneLoading());
      dispatch(setMessage("danger", true, error.message));
    }
    set_name("");
    set_description("");
    set_intensity(0);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add a training type
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="intensity"
                name="intensity"
                variant="outlined"
                required
                fullWidth
                id="intensity"
                label="Intensity"
                autoFocus
                value={intensity}
                onChange={handleIntensityChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                value={name}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="description"
                label="Description"
                name="description"
                autoComplete="description"
                value={description}
                onChange={handleDescriptionChange}
              />
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
            Add
          </Button>
        </form>
      </div>
    </Container>
  );
}
