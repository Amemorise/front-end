import {
    TextField,
    Button,
    IconButton,
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Alert,
} from "@mui/material";
import React, { useState, useCallback } from "react";
import { ReactComponent as GoogleLogo } from "../images/google.svg";
import { ReactComponent as FacebookLogo } from "../images/facebook.svg";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { completeSignIn, firebaseAuth, signInWithProvider, trimFirebaseErrors } from "../helpers/firebase";
import { Link } from "react-router-dom";
import "./styles/login.scss";
import FormValidator, { ErrorMessages } from "../helpers/validateFrom";
import { debounce } from "lodash";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { usePageTitle } from "../helpers/helpers";
import WebTitle from "../components/WebTitle";
import { useDispatch } from "react-redux";

const SignUp = () => {
    usePageTitle("Sign Up");
    const [email, setEmail] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [validate, setValidate] = useState<ErrorMessages>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmedPassword, setShowConfirmPassword] = useState(false);
    const [signInError, setSignInError] = useState("");
    const navigate = useNavigate();

    const updatePassword = () => {
        setPasswordMismatch(password !== confirmPassword);
    };
    // eslint-disable-next-line
    const debouncedPasswordMatch = useCallback(debounce(updatePassword, 1000), [confirmPassword]);

    React.useEffect(() => {
        debouncedPasswordMatch();
        // eslint-disable-next-line
    }, [confirmPassword]);

    const validateRegister = () => {
        let isValid = true;

        let validator = FormValidator.validator({
            email: {
                value: email,
                isRequired: true,
                isEmail: true,
            },
            name: {
                value: displayName,
                isRequired: true,
            },
            password: {
                value: password,
                isRequired: true,
                minLength: 6,
            },
        });

        if (validator !== null) {
            setValidate(validator.errors);
            isValid = false;
        }
        return isValid;
    };

    const dispatch = useDispatch();
    const handleSignUp = (e: any) => {
        e.preventDefault();

        const validate = validateRegister();

        if (validate) {
            createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName,
                    });
                    sendEmailVerification(user);
                    completeSignIn(userCredential, dispatch, navigate);
                })
                .catch((error) => {
                    setSignInError(trimFirebaseErrors(error.message));
                });
        }
    };

    const toggleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const toggleClickShowConfirmedPassword = () => {
        setShowConfirmPassword(!showConfirmedPassword);
    };
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const signUpWithProvider = async (provider: string) => {
        const { user, error } = await signInWithProvider(provider);
        if (error) {
            setSignInError(error);
            return;
        }

        completeSignIn(user, dispatch, navigate);
    };

    return (
        <div className="login" onSubmit={handleSignUp}>
            <form className="content">
                <WebTitle />
                <TextField
                    error={validate && !!validate.name}
                    id="display-name"
                    value={displayName}
                    label="Display Name"
                    type="text"
                    className="inputField"
                    onChange={(e) => setDisplayName(e.target.value)}
                />
                {validate && validate.name ? <div className={`invalid-feedback`}> {validate.name[0] || ""}</div> : null}
                <TextField
                    error={validate && !!validate.email}
                    id="email"
                    value={email}
                    label="Email"
                    type={"email"}
                    className="inputField"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {validate && validate.email ? (
                    <div className={`invalid-feedback`}> {validate.email[0] || ""}</div>
                ) : null}
                <FormControl sx={{ margin: "1rem 0" }} variant="outlined" error={validate && !!validate.password}>
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
                </FormControl>{" "}
                {validate && validate.password ? (
                    <div className={`invalid-feedback`}> {validate.password[0] || ""}</div>
                ) : null}
                <FormControl sx={{ margin: "1rem 0" }} variant="outlined" error={passwordMismatch}>
                    <InputLabel htmlFor="confirm-password">Confirm password</InputLabel>

                    <OutlinedInput
                        id="confirm-password"
                        value={confirmPassword}
                        label="Confirm password"
                        type={showConfirmedPassword ? "text" : "password"}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    edge="end"
                                    onClick={toggleClickShowConfirmedPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {!showConfirmedPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                {passwordMismatch ? <div className={`invalid-feedback`}> Passwords do not match</div> : null}
                {signInError ? (
                    <Alert severity="error" variant="filled">
                        {signInError}
                    </Alert>
                ) : null}
                <Button
                    disabled={passwordMismatch}
                    variant="contained"
                    type="submit"
                    className="submit-button"
                    style={{ margin: "1rem 0" }}
                >
                    Sign Up
                </Button>
                <div className="social-logins">
                    <IconButton onClick={() => signUpWithProvider("Google")}>
                        <GoogleLogo />
                    </IconButton>

                    <IconButton onClick={() => signUpWithProvider("Facebook")}>
                        <FacebookLogo />
                    </IconButton>
                </div>
                <p>
                    Already have an account? <Link to="/login">Sign In here</Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
