let data = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    genre: "Science Fiction",
    year: 2010,
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    genre: "Science Fiction",
    year: 1999,
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    genre: "Science Fiction",
    year: 2014,
  },
  {
    id: 4,
    title: "Blade Runner 2049",
    director: "Denis Villeneuve",
    genre: "Science Fiction",
    year: 2017,
  },
  {
    id: 5,
    title: "The Martian",
    director: "Ridley Scott",
    genre: "Science Fiction",
    year: 2015,
  },
  {
    id: 6,
    title: "Avatar",
    director: "James Cameron",
    genre: "Science Fiction",
    year: 2009,
  },
];

const handleCreate = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const item = JSON.parse(body);
    item.id = data.length ? data[data.length - 1].id + 1 : 1;
    data.push(item);

    res.writeHead(201, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Movie successfully added", item }));
  });
};

const handleRead = (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  res.end(JSON.stringify(data));
};

const updateMovie = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  let body = "";
  let movieFound = false;

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const updatedMovie = JSON.parse(body);

    data = data.map((movie) => {
      if (movie.id === id) {
        movieFound = true;
        return { ...movie, ...updatedMovie };
      }
      return movie;
    });

    if (movieFound) {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({ message: "Movie updated successfully", updatedMovie })
      );
    } else {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "Movie not found" }));
    }
  });
};

const patchMovie = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  let body = "";
  let movieFound = false;

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const patchedMovie = JSON.parse(body);

    data = data.map((movie) => {
      if (movie.id === id) {
        movieFound = true;
        return { ...movie, ...patchedMovie };
      }
      return movie;
    });

    if (movieFound) {
      res.writeHead(200, { "Content-type": "application/json" });
      res.end(
        JSON.stringify({ message: "Movie patched successfully", patchedMovie })
      );
    } else {
      res.writeHead(404, { "Content-type": "application/json" });
      res.end(JSON.stringify({ message: "Movie not found" }));
    }
  });
};

const handleDelete = (req, res) => {
  const id = parseInt(req.url.split("/")[2]);
  const initialLength = data.length;

  data = data.filter((movie) => movie.id !== id);

  if (data.length < initialLength) {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Movie deleted successfully" }));
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.end(JSON.stringify({ message: "Movie not found" }));
  }
};

module.exports = {
  handleCreate,
  handleRead,
  updateMovie,
  handleDelete,
  patchMovie,
};
