import { User, FriendHandler, CreditHandler } from "./Middleware";

const user = new User();

user.use(new FriendHandler());
user.use(new FriendHandler());
user.use(new FriendHandler());
user.use(new FriendHandler());
user.use(new CreditHandler());

user.buyProduct();