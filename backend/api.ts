import express from "express";
import cors from "cors";
import {
  Server,
  Path,
  GET,
  POST,
  PUT,
  QueryParam,
  PathParam,
} from "typescript-rest";
import { DocumentStore } from "ravendb";
import swaggerDocument from "../dist_api/swagger.json";
import * as swaggerUi from "swagger-ui-express";
import { Tags } from "typescript-rest-swagger";

const store = new DocumentStore("http://localhost:8080", "appglue_test");
store.initialize();
const session = store.openSession();

interface User {
  id?: string,
  firstName: string;
  lastName: string;
  age: number;
}

@Path("users")
export class UserService {
  @GET
  async allUsers(): Promise<Array<object>> {
    let users: object[] = await session.query({ collection: "@empty" }).all();
    return users;
  }

  @GET
  @Path(":id")
  async getUser(@PathParam("id") id: number): Promise<User> {
    let user: User = await session.load(`users/${id}`);
    return user;
  }

  @PUT
  @Path(":id")
  async updateUser(@PathParam("id") id: string, user: User): Promise<any> {
    try {
      let current_user: User = await session.load(`${user.id}`);
      current_user.firstName = user.firstName;
      current_user.lastName = user.lastName;
      current_user.age = user.age;

      await session.saveChanges();
    } catch (error) {
      console.log("Hello:", error);
      return "failed";
    }

    return "success";
  }

  @POST
  async createUser(user: User): Promise<any> {
    await session.store(user, "users/");
    await session.saveChanges();
    return "success";
  }
}

let app: express.Application = express();
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

Server.buildServices(app);

app.listen(4000, function () {
  console.log("Rest Server listening on port 4000!");
});
