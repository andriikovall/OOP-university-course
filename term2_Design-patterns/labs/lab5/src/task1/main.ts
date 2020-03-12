import { User, Friend, Credit } from "./Middleware";

const user = new User();
const friend1 = new Friend();
const friend2 = new Friend();

user.use(new Friend());

friend1.use(friend2);
friend1.use(new Friend());

user.use(friend1);
user.use(new Friend());
user.use(new Credit());

user.buyProduct();