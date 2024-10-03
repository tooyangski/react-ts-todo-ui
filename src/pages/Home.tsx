import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";

const Home = () => {
  return (
    <Container sx={{ display: "flex", gap: "3em", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 200, width: 300 }}
          image="https://picsum.photos/id/350/1000/300"
          title="rain"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create new todo?
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Would you like to create a new to-do item?
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Create Todo</Button>
        </CardActions>
      </Card>

      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 200, width: 300 }}
          image="https://picsum.photos/id/237/1000/300"
          title="rain"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            View your todos
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Would you like to view your to do list?
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Todos</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default Home;
