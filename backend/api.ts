import * as express from "express";
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
import { swaggerUi } from "swagger-ui-express";
import { Tags } from "typescript-rest-swagger";

const store = new DocumentStore("http://live-test.ravendb.net", "appglue_test");
store.initialize();
const session = store.openSession();

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
}

@Path("users")
export class UserService {
  @GET
  async allUsers(): Promise<Array<User>> {
    let users: User[] = await session.load("users");
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
  async updateUser(@PathParam("id") id: number, user: User): Promise<any> {
    try {
      let current_user: User = await session.load(`users/${id}`);
      current_user.firstName = user.firstName;
      current_user.lastName = user.lastName;
      current_user.age = user.age;

      await session.saveChanges();
    } catch (error) {
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
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

Server.buildServices(app);

app.listen(3000, function () {
  console.log("Rest Server listening on port 3000!");
});
