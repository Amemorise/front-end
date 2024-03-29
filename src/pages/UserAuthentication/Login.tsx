import React, { useState } from "react";
import "./styles/login.scss";
import {
    Button,
    TextField,
    OutlinedInput,
    IconButton,
    InputAdornment,
    InputLabel,
    FormControl,
    Alert,
} from "@mui/material";
import { ReactComponent as GoogleLogo } from "../../images/google.svg";
import { ReactComponent as FacebookLogo } from "../../images/facebook.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { completeSignIn, firebaseAuth, signInWithProvider } from "../../helpers/firebase";
import { Link, useNavigate } from "react-router-dom";
import FormValidator, { ErrorMessages } from "../../helpers/validateFrom";
import { usePageTitle } from "../../helpers/helpers";
import WebTitle from "../../components/WebTitle";
import { useDispatch } from "react-redux";

const Login = () => {
    usePageTitle("Login");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [validate, setValidate] = useState<ErrorMessages>({});
    const [signInError, setSignInError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const validateRegister = () => {
        let isValid = true;

        let validator = FormValidator.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true,
            },
        });

        if (validator !== null) {
            setValidate(validator.errors);
            isValid = false;
        }
        return isValid;
    };

    const dispatch = useDispatch();

    const handleLogin = (e: any) => {
        e.preventDefault();

        const validate = validateRegister();

        if (validate) {
            signInWithEmailAndPassword(firebaseAuth, email, password)
                .then((userCredential) => {
                    completeSignIn(userCredential, dispatch, navigate);
                })
                .catch(() => {
                    setSignInError("Incorrect email/password combination");
                });
        }
    };

    const signUpWithProvider = async (provider: string) => {
        const { user, error } = await signInWithProvider(provider);
        if (error) {
            setSignInError(error);
            return;
        }

        completeSignIn(user, dispatch, navigate);
    };

    const toggleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <div className="login">
            <form className="content" onSubmit={handleLogin}>
                <WebTitle />
                <TextField
                    error={validate && !!validate.email}
                    id="email"
                    label="Email"
                    type={"email"}
                    className="inputField"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {validate && validate.email ? (
                    <div className={`invalid-feedback`}> {validate.email[0] || ""}</div>
                ) : null}
                <FormControl sx={{ margin: "1rem 0" }} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        onChange={(e) => setPassword(e.target.value)}
                        label="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={toggleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {!showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {signInError ? (
                    <Alert severity="error" variant="filled">
                        {signInError}
                    </Alert>
                ) : null}
                <Button
                    variant="contained"
                    type="submit"
                    className="submit-button"
                    style={{ background: "#009ffd", margin: "1rem 0" }}
                >
                    Log In
                </Button>
                <Link to="/reset-password">Forgot Password?</Link>
                <div className="social-logins">
                    <IconButton onClick={() => signUpWithProvider("Google")}>
                        <GoogleLogo />
                    </IconButton>

                    <IconButton onClick={() => signUpWithProvider("Facebook")}>
                        <FacebookLogo />
                    </IconButton>
                </div>
                <p>
                    Don't have an account? <Link to="/register">Sign Up here</Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
