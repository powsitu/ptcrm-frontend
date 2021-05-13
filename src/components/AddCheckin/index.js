import React, { useState, useEffect } from "react";
import moment from "moment";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector } from "react-redux";
import { selectUserId } from "../../store/user/selectors";
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

export default function AddCheckin() {
  const classes = useStyles();
  const [date, set_date] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [dailyRating, set_dailyRating] = useState();
  const [comment, set_comment] = useState("");
  const [proteins, set_proteins] = useState();
  const [calories, set_calories] = useState();
  const [carbs, set_carbs] = useState();
  const [fats, set_fats] = useState();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Add a checkin
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
                value={date}
                // onChange={dateChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="dailyRating"
                label="DailyRating"
                name="dailyRating"
                autoComplete="dailyRating"
                value={dailyRating}
                // onChange={dailyRatingChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="calories"
                label="Calories"
                name="calories"
                autoComplete="calories"
                value={calories}
                // onChange={caloriesChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="proteins"
                label="proteins"
                name="proteins"
                autoComplete="proteins"
                value={proteins}
                // onChange={proteinsChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="carbs"
                label="Carbs"
                name="carbs"
                autoComplete="carbs"
                value={carbs}
                // onChange={carbsChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="fats"
                label="fats"
                name="fats"
                autoComplete="fats"
                value={fats}
                // onChange={fatsChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="comment"
                label="Comment"
                name="comment"
                autoComplete="comment"
                value={comment}
                // onChange={commentChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            // onClick={clickSubmit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
