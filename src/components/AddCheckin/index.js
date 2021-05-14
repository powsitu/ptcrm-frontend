import React, { useState } from "react";
import moment from "moment";
import { useMutation } from "@apollo/react-hooks";
import {
  ADD_CHECKIN,
  CHECKINS_FOR_USER,
} from "../../store/checkins/gql_checkins";
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

export default function AddCheckin() {
  const dispatch = useDispatch();
  const [addCheckin] = useMutation(ADD_CHECKIN);
  const classes = useStyles();
  const currentUser = useSelector(selectUserId);
  const [date, set_date] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [dailyRating, set_dailyRating] = useState("");
  const [comment, set_comment] = useState("");
  const [proteins, set_proteins] = useState("");
  const [calories, set_calories] = useState("");
  const [carbs, set_carbs] = useState("");
  const [fats, set_fats] = useState("");

  const dateChange = (event) => {
    set_date(event.target.value);
  };
  const dailyRatingChange = (event) => {
    set_dailyRating(event.target.value);
  };
  const commentChange = (event) => {
    set_comment(event.target.value);
  };
  const proteinsChange = (event) => {
    set_proteins(event.target.value);
  };
  const caloriesChange = (event) => {
    set_calories(event.target.value);
  };
  const carbsChange = (event) => {
    set_carbs(event.target.value);
  };
  const fatsChange = (event) => {
    set_fats(event.target.value);
  };

  async function clickSubmit(event) {
    event.preventDefault();
    dispatch(appLoading());
    try {
      const response = await addCheckin({
        variables: {
          userId: parseInt(currentUser),
          date: date,
          calories: parseInt(calories),
          proteins: parseInt(proteins),
          carbs: parseInt(carbs),
          fats: parseInt(fats),
          dailyRating: parseInt(dailyRating),
          comment: comment,
        },
        refetchQueries: [
          {
            query: CHECKINS_FOR_USER,
            variables: { id: parseInt(currentUser) },
          },
        ],
      });
      dispatch(
        showMessageWithTimeout("success", false, "Checkin added!", 1500)
      );
      dispatch(appDoneLoading());
    } catch (error) {
      dispatch(setMessage("danger", true, error.message));
      dispatch(appDoneLoading());
    }
    set_dailyRating("");
    set_comment("");
    set_calories("");
    set_proteins("");
    set_carbs("");
    set_fats("");
  }

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
                onChange={dateChange}
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
                onChange={dailyRatingChange}
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
                onChange={caloriesChange}
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
                onChange={proteinsChange}
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
                onChange={carbsChange}
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
                onChange={fatsChange}
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
                onChange={commentChange}
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
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
}
