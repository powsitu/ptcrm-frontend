import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useMutation } from "@apollo/react-hooks";
import { ADD_PLACE, GET_PLACES } from "../../store/places/gql_places";

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

export default function AddPlace(props) {
  const classes = useStyles();
  const [street, set_street] = useState("");
  const [city, set_city] = useState("");
  const [zip, set_zip] = useState("");
  const [country, set_country] = useState("");
  const [description, set_description] = useState("");
  const [addPlace] = useMutation(ADD_PLACE);

  const handleStreetChange = (event) => {
    set_street(event.target.value);
  };

  const handleCityChange = (event) => {
    set_city(event.target.value);
  };

  const handleZipChange = (event) => {
    set_zip(event.target.value);
  };

  const handleCountryChange = (event) => {
    set_country(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    set_description(event.target.value);
  };

  async function clickSubmit(event) {
    event.preventDefault();
    const response = await addPlace({
      variables: {
        street: street,
        city: city,
        zip: zip,
        country: country,
        description: description,
      },
      refetchQueries: [
        {
          query: GET_PLACES,
        },
      ],
    });
    set_street("");
    set_city("");
    set_zip("");
    set_country("");
    set_description("");
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add a place
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="street"
                label="Street"
                name="street"
                autoComplete="street"
                value={street}
                onChange={handleStreetChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                autoComplete="city"
                value={city}
                onChange={handleCityChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="zip"
                label="ZIP Code"
                name="zip"
                autoComplete="zip"
                value={zip}
                onChange={handleZipChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                autoComplete="country"
                value={country}
                onChange={handleCountryChange}
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
