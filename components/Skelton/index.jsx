
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Skeleton from '@material-ui/lab/Skeleton';
const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 845,
    margin: theme.spacing(2),
  },
  media: {
    height: 190,
  },
}));
function Media(props) {
  const { loading = false } = props;
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          loading ? (
            <Skeleton animation="wave" variant="circle" width={40} height={40} />
          ) : (
            <Avatar
              alt="Ted talk"
              src="https://pbs.twimg.com/profile_images/877631054525472768/Xp5FAPD5_reasonably_small.jpg"
            />
          )
        }
        action={
          loading ? null : (
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          )
        }
        title={
          loading ? (
            <Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />
          ) : (
            'Ted'
          )
        }
        subheader={loading ? <Skeleton animation="wave" height={10} width="40%" /> : '5 hours ago'}
      />
      {loading && (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      )}
      <CardContent>
        {loading && (
          <React.Fragment>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </React.Fragment>
        )}
      </CardContent>
    </Card>
  );
}
Media.propTypes = {
  loading: PropTypes.bool,
};
export default function Facebook() {
  return (
    <div>
      <Media loading />
    </div>
  );
}