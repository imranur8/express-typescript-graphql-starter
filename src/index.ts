import cors from "cors";
import express from "express";
import graphqlHTTP from "express-graphql";
import { createServer, Server } from "http";
import morgan from "morgan";
import logger from "./utils/logger";
const { transpileSchema } = require("graphql-s2s").graphqls2s;
import dotenv from "dotenv";
import { makeExecutableSchema } from "graphql-tools";
import mongoose from "mongoose";
import glue from "schemaglue";

// initialize environment variable
dotenv.config();

// define graphql context here
export interface GraphQLContext {
  user: string;
}

const g = glue("build/graphql");

const schema = makeExecutableSchema({
  typeDefs: [transpileSchema(g.schema)],
  resolvers: g.resolver
});

export { schema };

const port: string = process.env.PORT || "4000";
const environment: string = process.env.NODE_ENV;

/**
 * Express api  Bootstrapping Class
 * In here we initialize Express Server and Database connection
 */
class ApiServer {

  private httpServer: Server;

  public async configure() {

    logger.info("Configuring Express API 1.0 Server");

    const db = process.env.MONGO_URL;
    mongoose.connect(db, {
      useNewUrlParser: true
    }, (err) => {
      if (err) {
        logger.error(err.message);
      } else {
        logger.info("Connected to MongoDb");
      }
    });

    const app = express();

    const corsOption = {
      headers: "Origin, X-Requested-With, Content-Type, Accept",
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      origin: "*",
    };

    app.use(cors(corsOption));

    if (environment === "development") {
      // Morgan for HTTP request logging
      app.use(morgan("dev"));
    }

    // By the time Express is up, we are both healthy and ready
    app.get(["/health", "/ready"], (request, response) => {
      response.status(200).send("👍");
    });

    app.use("/graphql", graphqlHTTP((req, res) => ({
      schema,
      graphiql: true,
      context: {} // graphql context
    })));
    // create HTTP server
    this.httpServer = createServer(app);

    // handle error and listening
    this.httpServer.on("error", this.onError);
    this.httpServer.on("listening", this.onListening);
  }

  /**
   * Starts server
   * Database connection establish and port listening
   */
  public async start() {
    await this.configure();
    logger.info("Starting Express API 1.0 Server");
    this.httpServer.listen(port);
  }

  /**
   * HTTP Server on Error
   * @param error
   */
  public onError(error: NodeJS.ErrnoException): void {

    if (error.syscall !== "listen") {
      throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    switch (error.code) {
      case "EACCES":
        logger.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case "EADDRINUSE":
        logger.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  }

  /**
   * HTTP server is listening
   */
  public onListening(): void {
    logger.info(`Express API 1.0 is Listening on ${port}`);
  }
}

//  Initialize the Express API server
const server = new ApiServer();
server.start();
