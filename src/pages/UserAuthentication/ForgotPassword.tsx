import { TextField, Alert, Button } from "@mui/material";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import WebTitle from "../../components/WebTitle";
import { firebaseAuth, trimFirebaseErrors } from "../../helpers/firebase";
import { usePageTitle } from "../../helpers/helpers";
import FormValidator, { ErrorMessages } from "../../helpers/validateFrom";
import { setToast } from "../../redux/toast";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    usePageTitle("Password Reset");
    const [email, setEmail] = useState("");
    const [validate, setValidate] = useState<ErrorMessages>({});
    const [emailError, setEmailError] = useState("");
    const dispatch = useDispatch();

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
    const handleSubmit = (e: any) => {
        e.preventDefault();

        const validate = validateRegister();

        if (validate) {
            sendPasswordResetEmail(firebaseAuth, email)
                .then(() => {
                    setEmailError("");
                    dispatch(setToast({ type: "success", message: "Password Reset Email sent" }));
                })
                .catch((error) => {
                    setEmailError(trimFirebaseErrors(error.message));
                });
        }
    };
    return (
        <div className="login">
            <form className="content" onSubmit={handleSubmit}>
                <WebTitle />
                <TextField
                    error={validate && !!validate.email}
                    id="email"
                    label="Enter Email to reset Password"
                    type={"email"}
                    className="inputField"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError || validate.email ? (
                    <Alert severity="error" variant="filled">
                        {emailError || validate.email}
                    </Alert>
                ) : null}
                <Button
                    variant="contained"
                    type="submit"
                    className="submit-button"
                    style={{ background: "#009ffd", margin: "1rem 0" }}
                >
                    Reset Password
                </Button>
                <Link to="/login">Return To Login</Link>
            </form>
        </div>
    );
};

export default ForgotPassword;
