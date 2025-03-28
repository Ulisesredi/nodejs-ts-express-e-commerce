import { UserEntity } from "../../user/entities/user.entity";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { AuthService } from "../services/auth.service";
import { passportUse } from "../utils/passport.use";

const authService: AuthService = new AuthService();

export class LoginStrategy {
  async validate(
    username: string,
    password: string,
    done: any
  ): Promise<UserEntity> {
    const user = await authService.validateUser(username, password);
    if (!user) {
      return done(null, false, { message: "Invalid username or password." });
    }
    return done(null, user);
  }

  get use() {
    return passportUse<LocalStrategy, Object, VerifyFunction>(
      "login",
      LocalStrategy,
      { usernameField: "username", passwordField: "password" },
      this.validate
    );
  }
}
